// Set the max attribute for the year of birth dynamically
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("yearOfBirth").max = new Date().getFullYear();
  
  // Hide the Zipcode field by default
  document.getElementById("zipcode").parentElement.style.display = "none";
  
  // Toggle the visibility of the Zipcode field based on the checkbox
  document.getElementById("liveInUS").addEventListener("change", function () {
    const zipcodeField = document.getElementById("zipcode").parentElement;
    if (this.checked) {
      zipcodeField.style.display = "block";
    } else {
      zipcodeField.style.display = "none";
    }
  });
});

// Form submission handler
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let hasError = false;
    clearErrors();

    // Name Validation
    if (document.getElementById("name").value.length < 3) {
      setError("nameError", "Name must be at least 3 characters long.");
      hasError = true;
    }

    // Year of Birth Validation
    let yearOfBirth = parseInt(document.getElementById("yearOfBirth").value, 10);
    const currentYear = new Date().getFullYear();
    if (isNaN(yearOfBirth) || yearOfBirth < 1901 || yearOfBirth > currentYear) {
      setError(
        "yearOfBirthError",
        `Year of birth must be between 1901 and ${currentYear}.`
      );
      hasError = true;
    }

    // US Checkbox & Zipcode Validation
    let liveInUS = document.getElementById("liveInUS").checked;
    let zipcode = document.getElementById("zipcode").value;
    if (liveInUS && !/^\d{5}$/.test(zipcode)) {
      setError("zipcodeError", "Zipcode must be a 5 digit number.");
      hasError = true;
    }

    // Password Validation
    if (document.getElementById("password").value.length < 8) {
      setError("passwordError", "Password must be at least 8 characters long.");
      hasError = true;
    }

    // Preferred Pizza Type Validation
    if (document.getElementById("pizzaType").value === "") {
      setError("pizzaTypeError", "You must select a preferred type of pizza.");
      hasError = true;
    }

    // Show success message if there are no errors
    if (!hasError) {
      document.getElementById("submissionMessage").textContent =
        "🎉 Accepted! Your pizza is on the way! 🎉";
    }
  });

// Function to set error messages
function setError(id, message) {
  document.getElementById(id).textContent = message;
}

// Function to clear all error messages
function clearErrors() {
  document.querySelectorAll(".error").forEach(function (errorDiv) {
    errorDiv.textContent = "";
  });
  document.getElementById("submissionMessage").textContent = "";
}
