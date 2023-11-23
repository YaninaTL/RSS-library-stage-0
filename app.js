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
  const storedPassword = "12345%JD"; // Simulated stored password

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
                            <div class="number">23</div>
                        </div>
                        <div class="second-card">
                            <h3>bonuses</h3>
                            <img src="./img/Star.svg" alt="" />
                            <div class="number">1240</div>
                        </div>
                        <div class="third-card">
                            <h3>Books</h3>
                            <img src="./img/book.svg" alt="" />
                            <div class="number">2</div>
                        </div>
                    </div>
                    <div class="books">
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

// fix gallery big imgs -> sometimes don't have time to load?

//BUYING
// Function to open the modal
function openModal() {
  // Show the modal container
  const modalContainer = document.getElementById("buying-popup");
  modalContainer.classList.add("show-modal");

  // Send a message to the iframe to open its content
  const iframe = document.getElementById("buying-popup-iframe");
  iframe.contentWindow.postMessage({ openPopup: true }, "*");
}

// Add a click event listener to the Buy button
const buyButtons = document.querySelectorAll(".button");
buyButtons.forEach(function (button) {
  button.addEventListener("click", openModal);
});

// When it's clicked out of the field -> close + btn and try esc btn
window.addEventListener("message", function (event) {
  if (event.data.closePopup) {
    // Hide the iframe containing the popup profile
    const profilePopupIframe = document.getElementById("buying-popup");
    profilePopupIframe.style.display = "none";
  }
});
