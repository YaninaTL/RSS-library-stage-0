const closePopupButton = document.getElementById("close-popup");
closePopupButton.addEventListener("click", function () {
  // Send a message to the parent window to request the closure of the iframe
  parent.postMessage({ closePopup: true }, "*");
});
