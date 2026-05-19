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
