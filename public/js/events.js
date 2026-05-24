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
