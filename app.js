// toggle
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

/*navToggle.addEventListener("click", function () {
  linksContainer.classList.toggle("show-links");
});*/

// KNOWN height, so, it's added to css and this works in js
// if we add one more link -> doesn't work, so, it's not DYNAMIC

navToggle.addEventListener("click", function () {
  const containerHeight = linksContainer.getBoundingClientRect().height;
  //height = 0 by default as we hide it
  const linksHeight = links.getBoundingClientRect().height;

  if (containerHeight === 0) {
    linksContainer.style.height = `${linksHeight}px`;
  } else {
    linksContainer.style.height = 0;
  }
});
// height AUTO to links-container in css!
//height = 150 as we have 3 links, so, if we change the quantity the height will be autocalculated

// fixed navbar

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
  const scrollHeight = window.scrollY;
  const navHeight = document
    .querySelector(".navbar")
    .getBoundingClientRect().height;

  if (scrollHeight > navHeight) {
    document.querySelector(".navbar").classList.add("fixed-nav");
  } else {
    document.querySelector(".navbar").classList.remove("fixed-nav");
  }
});

//date
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

//PROFILE
document.addEventListener("DOMContentLoaded", function () {
  const profileIcon = document.getElementById("profileIcon");
  const profileDropdown = document.getElementById("profileDropdown");
  const loginLink = document.getElementById("loginLink");
  const registerLink = document.getElementById("registerLink");
  const loginModal = document.getElementById("loginModal");
  const closeLoginModalButton = document.getElementById("close-login-popup");
  const registerLinkLoginPopup = document.getElementById(
    "registerLinkLoginPopup"
  );
  const registerModal = document.getElementById("registerModal");
  const closeRegisterModalButton = document.getElementById(
    "close-register-popup"
  );
  const loginLinkRegisterPopup = document.getElementById(
    "loginLinkRegisterPopup"
  );
  const profileModal = document.getElementById("profileModal");
  const closeProfileModalButton = document.getElementById(
    "close-profile-popup"
  );
  const copyButton = document.getElementById("copy-button");
  const copyText = document.getElementById("copy-text");

  profileIcon.addEventListener("click", toggleDropdown);
  loginLink.addEventListener("click", openLoginModal);
  registerLink.addEventListener("click", openRegisterModal);

  closeLoginModalButton.addEventListener("click", function () {
    loginModal.style.display = "none";
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && loginModal.style.display === "block") {
      loginModal.style.display = "none";
    }
  }); //Event listener for close button with Esc key

  registerLinkLoginPopup.addEventListener("click", function (event) {
    event.preventDefault();
    openRegisterModal();
    loginModal.style.display = "none"; // Hide the login modal
  }); // Open the register modal from the Register link in log in popup

  closeRegisterModalButton.addEventListener("click", function () {
    registerModal.style.display = "none";
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && registerModal.style.display === "block") {
      registerModal.style.display = "none";
    }
  }); //Event listener for close button with Esc key

  loginLinkRegisterPopup.addEventListener("click", function (event) {
    event.preventDefault();
    openLoginModal();
    registerModal.style.display = "none"; // Hide the reg modal
  }); // Open the login modal from the Login link in reg popup

  closeProfileModalButton.addEventListener("click", function () {
    profileModal.style.display = "none";
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && profileModal.style.display !== "none") {
      profileModal.style.display = "none";
    }
  }); //Event listener for close button with Esc key

  function toggleDropdown() {
    profileDropdown.style.display =
      profileDropdown.style.display === "block" ? "none" : "block";
  }

  function openLoginModal() {
    loginModal.style.display = "block";
    registerModal.style.display = "none";
    profileModal.style.display = "none";
    profileDropdown.style.display = "none";
  }

  function openRegisterModal() {
    registerModal.style.display = "block";
    loginModal.style.display = "none";
    profileModal.style.display = "none";
    profileDropdown.style.display = "none";
  }

  const storedName = "John"; // Simulated stored name
  const storedSurname = "Doe"; // Simulated stored surname
  const storedEmail = "john.doe@hotmail.com"; // Simulated stored email
  const storedCard = "F00234030"; // Simulated stored card number
  const storedPassword = "12345%uJD"; // Simulated stored password

  const loginForm = document.querySelector("#loginModal form");
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredIdentifier = loginForm.elements.identifier.value;
    const enteredPassword = loginForm.elements.password.value;

    if (
      (enteredIdentifier === storedEmail || enteredIdentifier === storedCard) &&
      enteredPassword === storedPassword
    ) {
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      updateProfileDropdown();
      loginModal.style.display = "none";
      profileDropdown.style.display = "none";
      alert("Login successful!");
    } else {
      alert("Something went wrong. Please check your credentials.");
    }
  });

  function updateProfileDropdown() {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (isLoggedIn) {
      loginLink.textContent = "My Profile";
      registerLink.textContent = "Log Out";
      loginLink.addEventListener("click", openProfileModal);
      registerLink.addEventListener("click", logOut);
    } else {
      loginLink.textContent = "Log In";
      registerLink.textContent = "Register";
      loginLink.addEventListener("click", openLoginModal);
      registerLink.addEventListener("click", openRegisterModal);
    }
  }

  function openProfileModal() {
    function generateAvatarInitials(name, surname) {
      return `${name.charAt(0)}${surname.charAt(0)}`;
    }

    const avatarInitials = generateAvatarInitials(storedName, storedSurname);

    const profileContent = `<div class="center profile-popup" id="profile-popup">
    <button id="close-profile-popup">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
        >
            <path d="M2 16.8507L17 2.00001" stroke="#0C0C0E" stroke-width="3" />
            <path d="M2 2.14928L17 17" stroke="#0C0C0E" stroke-width="3" />
        </svg>
    </button>
    <div class="left-col">
        <div class="profile-data">
            <div class="avatar">
                <img src="" alt="" class="profile-img" />
                <div class="letters">${avatarInitials}</div>
            </div>
            <div class="profile-name-container">
                <h3 class="profile-name">${storedName} ${storedSurname}</h3>
            </div>
        </div>
    </div>
                <div class="right-col">
                    <h1>My profile</h1>
                    <div class="stats">
                        <div class="first-card">
                            <h3>Visits</h3>
                            <img src="./img/Union.svg" alt="" />
                            <div class="visits">23</div>
                        </div>
                        <div class="second-card">
                            <h3>Bonuses</h3>
                            <img src="./img/Star.svg" alt="" />
                            <div class="bonuses">1240</div>
                        </div>
                        <div class="third-card">
                            <h3>Books</h3>
                            <img src="./img/book.svg" alt="" />
                            <div class="books">2</div>
                        </div>
                    </div>
                    <div class="your-books">
                        <h2>Your books</h2>
                        <ul>
                            <li><a href="#">The Last Queen, Clive Irving</a></li>
                            <li><a href="#">Dominicana, Angie Cruz</a></li>
                        </ul>
                    </div>
                    <div class="card-number">
                        <h3>Card number</h3>
                        <div class="copy-container">
                            <a href="">
                                <input type="text" id="copy-text" value="${storedCard}" disabled />
                            </a>
                            <button id="copy-button">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="14"
                                    height="12"
                                    viewBox="0 0 14 12"
                                    fill="none"
                                >
                                    <rect
                                        x="2.46826"
                                        y="0.25"
                                        width="10.5917"
                                        height="9.5"
                                        rx="0.75"
                                        stroke="black"
                                        stroke-width="0.5"
                                    />
                                    <rect
                                        x="0.25"
                                        y="2.25"
                                        width="10.5917"
                                        height="9.5"
                                        rx="0.75"
                                        fill="white"
                                        stroke="black"
                                        stroke-width="0.5"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;

    profileModal.innerHTML = profileContent;

    // Reattach event listener to the close button
    const updatedCloseProfileModalButton = document.getElementById(
      "close-profile-popup"
    );
    updatedCloseProfileModalButton.addEventListener("click", function () {
      profileModal.style.display = "none";
    });

    // Ensure profileModal is displayed after content update
    profileModal.style.display = "block";

    loginModal.style.display = "none"; // Add this line to hide the login modal

    // Set up the copy functionality separately
    function setupCopyButton() {
      const copyButton = document.getElementById("copy-button");
      const copyText = document.getElementById("copy-text");

      copyButton.addEventListener("click", function () {
        copyText.select();
        copyText.setSelectionRange(0, 99999); // For mobile devices

        navigator.clipboard
          .writeText(copyText.value)
          .then(function () {
            copyButton.textContent = "Copied!";
            setTimeout(() => {
              copyButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="12" viewBox="0 0 14 12" fill="none">
  <rect x="2.46826" y="0.25" width="10.5917" height="9.5" rx="0.75" stroke="black" stroke-width="0.5"/>
  <rect x="0.25" y="2.25" width="10.5917" height="9.5" rx="0.75" fill="white" stroke="black" stroke-width="0.5"/>
</svg>`;
            }, 1000); // Reset button text after 1 second
          })
          .catch(function (error) {
            console.error("Failed to copy text: ", error);
          });
      });
    }

    // Call the setup function to initialize the copy functionality
    setupCopyButton();
  }

  function logOut() {
    localStorage.removeItem("isLoggedIn");
    updateProfileDropdown();
    registerModal.style.display = "none"; //Hide register modal
    location.reload(); // Reload the page after logout to reset the state
  }
});

//SLIDESHOW
let slideIndex = 1; // Initialize the slide index

// Display the initial slide
showSlides(slideIndex);

// Function to navigate to the next or previous slide
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Function to navigate to a specific slide
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Function to display the slide with the given index
function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides"); // Get all slide elements
  const dots = document.getElementsByClassName("dot"); // Get all navigation dots

  // Ensure the slide index is within valid bounds
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides and remove the "active" class from navigation dots
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Display the current slide and mark the corresponding dot as "active"
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].className += " active";
}

// PAGINATION
const itemsPerPage = 3;
const gallery = document.querySelector(".gallery");
const paginationItems = document.querySelectorAll(".pagination li");

function showPage(page) {
  const images = gallery.querySelectorAll(`.page-${page}`);
  images.forEach((image) => {
    image.style.display = "block";
  });

  const allImages = gallery.querySelectorAll("img");
  allImages.forEach((image) => {
    if (!image.classList.contains(`page-${page}`)) {
      image.style.display = "none";
    }
  });

  paginationItems.forEach((item) => {
    item.classList.remove("active");
  });
  paginationItems[page - 1].classList.add("active");
}

function changePage(page) {
  showPage(page);
}

// Initially show the first page
// showPage(1);

//800px+
function applyPagination() {
  if (window.innerWidth > 800) {
    showPage(1);
  } else {
    gallery.style.display = "none";
  }
}

applyPagination();

// Listen for window resize events
window.addEventListener("resize", applyPagination);

// CARDS
// Show the current season
const seasonButtons = document.querySelectorAll('input[name="season"]');
const cards = document.querySelectorAll(".card");

function getCurrentSeason() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  let season = "";

  if (month >= 3 && month <= 5) {
    season = "spring";
  } else if (month >= 6 && month <= 8) {
    season = "summer";
  } else if (month >= 9 && month <= 11) {
    season = "autumn";
  } else {
    season = "winter";
  }

  return season;
}
const currentSeason = getCurrentSeason();

seasonButtons.forEach((button) => {
  if (button.value === currentSeason) {
    button.checked = true;
    button.dispatchEvent(new Event("change")); // Manually trigger the change event
  }

  button.addEventListener("change", () => {
    const selectedSeason = button.value;

    cards.forEach((card) => {
      card.classList.remove("active");

      if (card.classList.contains(selectedSeason)) {
        card.classList.add("active");
      }
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const currentSeason = getCurrentSeason();

  seasonButtons.forEach((button) => {
    if (button.value === currentSeason) {
      button.checked = true;
    }
    button.addEventListener("change", () => {
      const selectedSeason = button.value;

      cards.forEach((card) => {
        card.classList.remove("active");

        if (card.classList.contains(selectedSeason)) {
          card.classList.add("active");
        }
      });
    });
  });

  // Trigger the change event for the initially checked season button
  const checkedButton = document.querySelector('input[name="season"]:checked');
  if (checkedButton) {
    checkedButton.dispatchEvent(new Event("change"));
  }
});

//BUYING
document.addEventListener("DOMContentLoaded", function () {
  const buyButtons = document.querySelectorAll(".buy-button");
  const modal = document.getElementById("buy-popup");
  const closeButton = document.getElementById("close-buy-popup");

  buyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modal.style.display = "block";
    });
  });

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
});

// validation of the form
// card number
document
  .getElementById("card-number")
  .addEventListener("input", function (event) {
    const input = event.target.value;
    const sanitizedInput = input.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedInput = sanitizedInput.replace(/(\d{4})/g, "$1 ").trim(); // Format input with spaces every 4 digits

    event.target.value = formattedInput; // Update input field with formatted value

    const cardNumberRegex = /^(?:\d{4}\s?){4}$/; // Adjust regex pattern for a 16-digit credit card number with spaces
    const errorElement = document.getElementById("card-number-error");

    if (cardNumberRegex.test(formattedInput)) {
      errorElement.textContent = "";
    } else {
      errorElement.textContent =
        "Please enter a valid 16-digit credit card number.";
    }
  });

//month
document.getElementById("month").addEventListener("input", function (event) {
  const input = event.target.value;
  const sanitizedInput = input.replace(/\D/g, ""); // Remove non-numeric characters
  const isValidMonth = sanitizedInput >= 1 && sanitizedInput <= 12;

  if (isValidMonth) {
    event.target.value = sanitizedInput;
  } else {
    event.target.value = "";
    // Display an error message or handle validation feedback for invalid month format
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const yearInput = document.getElementById("year");
  const expirationError = document.getElementById("expiration-error");

  yearInput.addEventListener("input", function () {
    const yearValue = yearInput.value;
    const currentYear = new Date().getFullYear() % 100; // Get last two digits of the current year

    if (yearValue.length > 2) {
      // If input length exceeds 2, truncate the input value
      yearInput.value = yearValue.slice(0, 2);
    }

    const truncatedYearValue = yearInput.value;

    if (
      truncatedYearValue.length !== 2 ||
      !/^\d{2}$/.test(truncatedYearValue)
    ) {
      expirationError.textContent = "Please enter a valid 2-digit year.";
      yearInput.classList.add("error");
    } else {
      const numericYear = parseInt(truncatedYearValue);
      if (numericYear < currentYear || numericYear > currentYear + 10) {
        expirationError.textContent =
          "Please enter a valid year within the next 10 years.";
        yearInput.classList.add("error");
      } else {
        expirationError.textContent = "";
        yearInput.classList.remove("error");
      }
    }
  });
});

//CVC
document.addEventListener("DOMContentLoaded", function () {
  const cvcInput = document.getElementById("CVC");
  const cvcError = document.getElementById("cvc-error");

  cvcInput.addEventListener("input", function () {
    const cvcValue = cvcInput.value;
    if (!/^\d+$/.test(cvcValue) || cvcValue.length > 4) {
      cvcError.textContent =
        "Please enter a valid CVC (numeric, up to 4 digits).";
      cvcInput.classList.add("error");
    } else {
      cvcError.textContent = "";
      cvcInput.classList.remove("error");
    }
  });
});

//cardholder
const cardholderInput = document.getElementById("cardholder");
const cardholderError = document.getElementById("cardholder-error");

cardholderInput.addEventListener("input", function (event) {
  const inputValue = event.target.value;
  const formattedValue = inputValue
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word

  if (/[^A-Za-z\s]/.test(inputValue)) {
    cardholderError.textContent = "Please enter a valid cardholder name.";
  } else {
    event.target.value = formattedValue;
    cardholderError.textContent = "";
  }
});

//post code
document.getElementById("post").addEventListener("input", function (event) {
  const postInput = event.target;
  const inputValue = postInput.value;

  if (inputValue.length < 5) {
    postInput.setCustomValidity("Please enter a valid postal code.");
  } else {
    postInput.setCustomValidity("");
  }
});

//city
const cityInput = document.getElementById("city");
const cityError = document.getElementById("city-error");

cityInput.addEventListener("input", function (event) {
  const inputValue = event.target.value;
  const formattedValue = inputValue
    .replace(/\s+/g, " ") // Replace multiple spaces with a single space
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word

  if (/[^A-Za-z\s]/.test(inputValue)) {
    cityError.textContent = "Please enter a valid city/town name.";
  } else {
    event.target.value = formattedValue;
    cityError.textContent = "";
  }
});

//submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const errorMessages = document.querySelectorAll(".error-message");

    for (const errorMessage of errorMessages) {
      if (errorMessage.textContent.trim() !== "") {
        // If there are error messages, prevent form submission
        return;
      }
    }

    // If no error messages, proceed with form submission
    // Here you can add further logic if submission is valid
    form.submit(); // Submit the form
  });
});

//reg validation
document
  .getElementById("reg-form")
  .addEventListener("submit", function (event) {
    let isValid = true;

    // Validation for first name
    const firstName = document.getElementById("first-name");
    const firstNameError = document.getElementById("first-name-error");
    if (firstName.value.trim() === "") {
      firstNameError.textContent = "Please enter your first name";
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(firstName.value.trim())) {
      firstNameError.textContent =
        "First name must start with a capital letter";
      isValid = false;
    } else {
      firstNameError.textContent = "";
    }

    // Validation for last name
    const lastName = document.getElementById("last-name");
    const lastNameError = document.getElementById("last-name-error");
    if (lastName.value.trim() === "") {
      lastNameError.textContent = "Please enter your last name";
      isValid = false;
    } else if (!/^[A-Z][a-z]*$/.test(lastName.value.trim())) {
      lastNameError.textContent = "Last name must start with a capital letter";
      isValid = false;
    } else {
      lastNameError.textContent = "";
    }

    // Validation for email
    const email = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex pattern
    if (!emailRegex.test(email.value.trim())) {
      emailError.textContent = "Please enter a valid email address";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // Validation for password
    const password = document.getElementById("password");
    const passwordError = document.getElementById("password-error");
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    if (
      password.value.trim().length < 8 ||
      !passwordRegex.test(password.value.trim())
    ) {
      passwordError.textContent =
        "Password must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, one digit, and one special character";
      isValid = false;
    } else {
      passwordError.textContent = "";
    }

    if (!isValid) {
      event.preventDefault(); // Prevent form submission if not valid
    }
  });

//Section when checked and logged
document.addEventListener("DOMContentLoaded", function () {
  const storedFullName = "John Doe"; // Simulated stored full name
  const storedCard = "F00234030"; // Simulated stored card number

  function setupProfileModal() {
    const profileBtn = document.querySelector(
      "#cards .right-col-card button[type='submit']"
    );
    const profileModal = document.getElementById("profileModal");
    const closeProfilePopupBtn = document.getElementById("close-profile-popup");

    if (profileBtn && profileModal && closeProfilePopupBtn) {
      profileBtn.addEventListener("click", function () {
        profileModal.style.display = "block";
      });

      closeProfilePopupBtn.addEventListener("click", function () {
        profileModal.style.display = "none";
      });
    }
  }

  function updateSectionContent(fullName, cardNumber) {
    const section = document.getElementById("cards");
    const sectionContent = `
      <div class="title">
        <h2>Your Library Card</h2>
      </div>
      <div class="wrapper-libcard">
        <div class="left-col-card">
          <h3>Your Library card</h3>
          <form action="" method="">
            <div class="center-form">
              <h2>Brooklyn Public Library</h2>
              <div class="input-frame">
                <input type="text" required disabled placeholder="${fullName}" />
                <input type="text" required disabled  placeholder="${cardNumber}" />
              </div>
            </div>
            <div class="modal-stats">
              <div class="first-card">
                <h3 class="stats-title">Visits</h3>
                <img src="./img/Union.svg" alt="" />
                <div class="number">23</div>
              </div>
              <div class="second-card">
                <h3 class="stats-title">Bonuses</h3>
                <img src="./img/Star.svg" alt="" />
                <div class="number">1240</div>
              </div>
              <div class="third-card">
                <h3 class="stats-title">Books</h3>
                <img src="./img/book.svg" alt="" />
                <div class="number">2</div>
              </div>
            </div>
          </form>
        </div>
        <div class="right-col-card">
          <h3>Visit your profile</h3>
          <div class="frame">
            <p>
              With a digital library card you get free access to the Library’s
              wide array of digital resources including e-books, databases,
              educational resources, and more.
            </p>
          </div>
          <div class="btns">
            <button id="profileBtn" type="submit">Profile</button>
          </div>
        </div>
      </div>
    </section>`;

    section.innerHTML = sectionContent;
    setupProfileModal(); // Call this function to set up the modal event listeners
  }

  const checkCardBtn = document.getElementById("checkCardBtn");

  if (checkCardBtn) {
    checkCardBtn.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent form submission

      const readerNameInput = document.getElementById("readerNameInput");
      const cardNumberInput = document.getElementById("cardNumberInput");

      if (readerNameInput && cardNumberInput) {
        const enteredFullName = readerNameInput.value.trim();
        const enteredCard = cardNumberInput.value.trim();

        if (enteredFullName === storedFullName && enteredCard === storedCard) {
          updateSectionContent(storedFullName, storedCard);
        } else {
          alert("Invalid name or card number. Please try again.");
        }
      }
    });
  }
});

// //Login & reg btns
const ModalHandler = {
  init: function () {
    const signupBtn = document.getElementById("signupBtn");
    const loginBtn = document.getElementById("loginBtn");
    const loginModalBtn = document.getElementById("loginModal");
    const registerModalBtn = document.getElementById("registerModal");

    // Function to display the modal at the center of the screen
    function displayModalCentered(modal) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const modalHeight = modal.offsetHeight;

      const topPosition = scrollTop + (windowHeight - modalHeight) / 2;
      modal.style.top = topPosition + "px";
      modal.style.display = "block";
    }

    // Function to display the login modal
    function displayLoginModal() {
      displayModalCentered(loginModalBtn);
      registerModalBtn.style.display = "none";
    }

    // Function to display the register modal
    function displayRegisterModal() {
      displayModalCentered(registerModalBtn);
      loginModalBtn.style.display = "none";
    }

    // Event listener for Sign Up button
    signupBtn.addEventListener("click", function () {
      displayRegisterModal();
    });

    // Event listener for Log In button
    loginBtn.addEventListener("click", function () {
      displayLoginModal();
    });

    // Close modals when close buttons are clicked
    document.querySelectorAll(".modal button").forEach(function (closeBtn) {
      closeBtn.addEventListener("click", function () {
        loginModalBtn.style.display = "none";
        registerModalBtn.style.display = "none";
      });
    });
  },
};
// Call the init function to initialize the modal functionality for this specific use case
ModalHandler.init();
