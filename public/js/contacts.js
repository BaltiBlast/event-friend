const contactModal = document.querySelector("#contact-modal");
const openContactModalButton = document.querySelector("#open-contact-modal");
const closeContactModalButton = document.querySelector("#close-contact-modal");
const contactSuccessMessage = document.querySelector("#contact-success-message");

if (contactSuccessMessage) {
  window.showSuccessMessage(contactSuccessMessage.dataset.message);
}

openContactModalButton.addEventListener("click", () => {
  contactModal.showModal();
});

closeContactModalButton.addEventListener("click", () => {
  contactModal.close();
});

document.querySelectorAll("[data-contact-modal-open]").forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(`#${button.dataset.contactModalOpen}`);
    modal?.showModal();
  });
});

document.querySelectorAll("[data-contact-modal-close]").forEach((button) => {
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
