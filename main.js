const btnHeader = document.querySelector(".header-btn");
const navMobile = document.querySelector(".nav-mobile");
const menuClose = document.querySelector(".close-icon");
const menuBars = document.querySelector(".menu-icon");
const headerBtn = document.querySelector("header-btn");

btnHeader.addEventListener("click", () => {
  navMobile.classList.toggle("nav-mobile--active");
  menuBars.classList.toggle("icon--active");
  menuClose.classList.toggle("icon--active");
});

document.addEventListener("click", function (event) {
  const outsideClick = !navMobile.contains(event.target);
});

//! shtr

// url validation
const errorMsg = document.querySelector("#errorMsg");
function isValidURL(string) {
  var res = string.match(
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm
  );
  return res !== null;
}

let shtrIt = document.querySelector("#shtr-it");
const urlInput = document.querySelector("#shtr-input");
const shtrContainer = document.querySelector("#shtr-container");
const shtrSecondary = document.querySelector("#shorter-secundary");

shtrIt.addEventListener("click", () => {
  const urlOriginal = urlInput.value;

  // console.log(isValidURL(urlOriginal));
  // console.log(urlOriginal);

  if (isValidURL(urlOriginal) === false || urlOriginal === " ") {
    errorMsg.classList.add("errorMsg--active");
    urlInput.classList.add("error");
  } else {
    errorMsg.classList.remove("errorMsg--active");
    urlInput.classList.remove("error");
    const GET_URL = `https://api.shrtco.de/v2/shorten?url=${urlOriginal}`;
    fetch(GET_URL)
      .then((response) => response.json())
      .then((response) => {
        let shortUrl = response.result.full_short_link;
        let originalUrl = response.result.original_link;

        shtrContainer.innerHTML = `
             <div class="shorter-secundary" id="shorter-secundary">
          <p class="original-link" id="original-link">${originalUrl}</p>
          <hr>
          <p id="short-link" class="short-link">${shortUrl}</p>
          <div class="shorter-secundary__copy-btn" id="copyBtn">Copy</div>
          <div class="copied-btn" id="copied-btn">Copied!</div>
        </div>
      `;

        // clipboard
        const copyBtn = document.querySelector("#copyBtn");
        const copiedBtn = document.querySelector("#copied-btn");

        copyBtn.addEventListener("click", () => {
          copyBtn.style.display = "none";
          copiedBtn.style.display = "flex";
          navigator.clipboard.writeText(
            copyBtn.previousElementSibling.textContent
          );
        });
      });
  }
});
