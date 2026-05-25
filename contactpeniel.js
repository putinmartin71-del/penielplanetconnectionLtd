const adminWhatsAppNumber = "2348157444459"; // WhatsApp admin number without plus sign
const contactForm = document.getElementById("contactForm");
const alertMessage = document.getElementById("alertMessage");
const submitButton = contactForm.querySelector("button[type='submit']");
const buttonSpinner = submitButton.querySelector(".btn-spinner");
const submitText = submitButton.querySelector(".submit-text");

function showAlert(message, type = "success") {
  alertMessage.textContent = message;
  alertMessage.className = `alert alert-${type} show`;
}

function hideAlert() {
  alertMessage.className = "alert d-none";
  alertMessage.textContent = "";
}

function setLoading(isLoading) {
  if (isLoading) {
    submitButton.disabled = true;
    buttonSpinner.classList.remove("d-none");
    submitText.textContent = "Preparing WhatsApp...";
  } else {
    submitButton.disabled = false;
    buttonSpinner.classList.add("d-none");
    submitText.textContent = "Send WhatsApp Message";
  }
}

function buildWhatsAppUrl(payload) {
  const text = encodeURIComponent(
    `Hello Peniel Planet Construction,\n\n` +
      `My name is ${payload.name}.\n` +
      `Email: ${payload.email}\n` +
      `Phone: ${payload.phone}\n\n` +
      `Project details:\n${payload.message}\n\n` +
      `Please contact me to discuss the next steps.`
  );

  return `https://api.whatsapp.com/send?phone=${adminWhatsAppNumber}&text=${text}`;
}

function validatePhone(phone) {
  const cleaned = phone.replace(/[^0-9+]/g, "").trim();
  return cleaned.length >= 7 ? cleaned : "Not provided";
}

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  hideAlert();
  contactForm.classList.remove("was-validated");

  if (!contactForm.checkValidity()) {
    contactForm.classList.add("was-validated");
    showAlert("Please complete the required fields before sending.", "danger");
    return;
  }

  const formData = new FormData(contactForm);
  const payload = {
    name: formData.get("name").trim(),
    email: formData.get("email").trim(),
    phone: validatePhone(formData.get("phone").trim()),
    message: formData.get("message").trim(),
  };

  if (!payload.name || !payload.email || !payload.message) {
    contactForm.classList.add("was-validated");
    showAlert("All required fields must be filled in before sending.", "danger");
    return;
  }

  const whatsappUrl = buildWhatsAppUrl(payload);
  setLoading(true);

  const newWindow = window.open(whatsappUrl, "_blank");
  if (!newWindow) {
    showAlert("Your browser blocked the WhatsApp window. Please allow popups and try again.", "warning");
    setLoading(false);
    return;
  }

  setTimeout(() => {
    setLoading(false);
    showAlert("WhatsApp chat opened successfully. Please review and send the message.", "success");
    contactForm.reset();
    contactForm.classList.remove("was-validated");
  }, 900);
});
