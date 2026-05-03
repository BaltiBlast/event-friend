const participantInput = document.querySelector("#participant-search");
const participantOptions = document.querySelector("#participant-options");
const participantPicker = document.querySelector(".participant-picker");
const selectedParticipantsList = document.querySelector("#selected-participants");
const availableParticipants = ["Alex", "Camille", "Jordan", "Sam"];
const selectedParticipants = new Set();

function renderParticipantOptions() {
  const search = participantInput.value.trim().toLowerCase();
  const participants = availableParticipants.filter((participant) =>
    participant.toLowerCase().includes(search)
  );

  participantOptions.innerHTML = "";

  participants.forEach((participant) => {
    const option = document.createElement("label");
    const checkbox = document.createElement("input");
    const name = document.createElement("span");

    checkbox.type = "checkbox";
    checkbox.value = participant;
    checkbox.checked = selectedParticipants.has(participant);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selectedParticipants.add(participant);
      } else {
        selectedParticipants.delete(participant);
      }

      renderSelectedParticipants();
    });

    name.textContent = participant;
    option.append(checkbox, name);
    participantOptions.append(option);
  });
}

function renderSelectedParticipants() {
  selectedParticipantsList.innerHTML = "";

  selectedParticipants.forEach((participant, participantIndex) => {
    const item = document.createElement("li");
    const name = document.createElement("span");
    const hiddenInput = document.createElement("input");

    name.textContent = participantIndex < selectedParticipants.size - 1 ? `${participant},` : participant;

    hiddenInput.type = "hidden";
    hiddenInput.name = "participants";
    hiddenInput.value = participant;

    item.append(name, hiddenInput);
    selectedParticipantsList.append(item);
  });
}

function showParticipantOptions() {
  renderParticipantOptions();
  participantOptions.hidden = false;
}

participantInput.addEventListener("focus", showParticipantOptions);
participantInput.addEventListener("input", renderParticipantOptions);

document.addEventListener("click", (event) => {
  if (!participantPicker.contains(event.target)) {
    participantOptions.hidden = true;
  }
});
