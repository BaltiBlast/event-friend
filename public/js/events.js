const eventSuccessMessage = document.querySelector("#event-success-message");

if (eventSuccessMessage) {
  window.showSuccessMessage(eventSuccessMessage.dataset.message);
}

document.querySelectorAll("[data-event-modal-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(`#${button.dataset.eventModalOpen}`);
    modal?.showModal();
  });
});

document.querySelectorAll("[data-event-modal-close]").forEach((button) => {
  button.addEventListener("click", () => {
    button.closest("dialog")?.close();
  });
});

document.querySelectorAll("[data-confirm-delete]").forEach((button) => {
  button.addEventListener("click", (event) => {
    if (button.dataset.confirmed === "true") {
      return;
    }

    event.preventDefault();
    button.dataset.confirmed = "true";
    button.textContent = "Confirmer la suppression ?";
  });
});

const contactsDataElement = document.querySelector("#contacts-data");
const contacts = contactsDataElement ? JSON.parse(contactsDataElement.textContent) : [];

const normalizeText = (value) => value?.toString().trim().toLowerCase() || "";

const formatContactName = (contact) => `${contact.firstName || ""} ${contact.lastName || ""}`.trim();

const filterContacts = (searchTerm) => {
  const normalizedSearch = normalizeText(searchTerm);

  if (!normalizedSearch) {
    return contacts;
  }

  return contacts.filter((contact) => {
    const haystack = [contact.firstName, contact.lastName, contact.nickname]
      .map((field) => normalizeText(field))
      .filter(Boolean);

    return haystack.some((field) => field.includes(normalizedSearch));
  });
};

document.querySelectorAll("[data-participants-picker]").forEach((picker) => {
  const hiddenInput = picker.querySelector("[data-participants-hidden]");
  const searchInput = picker.querySelector("[data-participants-search]");
  const optionsList = picker.querySelector("[data-participants-options]");
  const tagsContainer = picker.querySelector("[data-participants-tags]");

  if (!hiddenInput || !searchInput || !optionsList || !tagsContainer) {
    return;
  }

  const selectedParticipants = new Set(
    (hiddenInput.value || "")
      .split(",")
      .map((participant) => participant.trim())
      .filter(Boolean),
  );

  const syncHiddenInput = () => {
    hiddenInput.value = [...selectedParticipants].join(", ");
  };

  const renderTags = () => {
    tagsContainer.innerHTML = "";

    [...selectedParticipants].forEach((participant) => {
      const tag = document.createElement("span");
      tag.className = "participants-tag";
      tag.textContent = participant;
      tagsContainer.append(tag);
    });
  };

  const renderOptions = (searchTerm = "") => {
    optionsList.innerHTML = "";

    const filteredContacts = filterContacts(searchTerm);

    if (filteredContacts.length === 0) {
      const emptyState = document.createElement("p");
      emptyState.className = "participants-empty";
      emptyState.textContent = "Aucun contact trouvé.";
      optionsList.append(emptyState);
      return;
    }

    filteredContacts.forEach((contact) => {
      const participantLabel = formatContactName(contact);

      if (!participantLabel) {
        return;
      }

      const optionLabel = document.createElement("label");
      optionLabel.className = "participants-option";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = participantLabel;
      checkbox.checked = selectedParticipants.has(participantLabel);

      checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
          selectedParticipants.add(participantLabel);
        } else {
          selectedParticipants.delete(participantLabel);
        }

        syncHiddenInput();
        renderTags();
      });

      const content = document.createElement("span");
      const fullName = document.createElement("strong");
      fullName.textContent = participantLabel;
      content.append(fullName);

      if (contact.nickname) {
        const nickname = document.createElement("small");
        nickname.className = "participants-option-nickname";
        nickname.textContent = contact.nickname;
        content.append(nickname);
      }

      optionLabel.append(checkbox, content);
      optionsList.append(optionLabel);
    });
  };

  const openOptions = () => {
    optionsList.hidden = false;
    renderOptions(searchInput.value);
  };

  searchInput.addEventListener("focus", openOptions);
  searchInput.addEventListener("click", openOptions);

  searchInput.addEventListener("input", () => {
    optionsList.hidden = false;
    renderOptions(searchInput.value);
  });

  document.addEventListener("click", (event) => {
    if (!picker.contains(event.target)) {
      optionsList.hidden = true;
    }
  });

  syncHiddenInput();
  renderTags();
  renderOptions();
});
