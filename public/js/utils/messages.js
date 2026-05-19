function showSuccessMessage(message) {
  Toastify({
    text: message,
    duration: 3500,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#168A5F",
      borderRadius: "8px",
    },
  }).showToast();
}

window.showSuccessMessage = showSuccessMessage;
