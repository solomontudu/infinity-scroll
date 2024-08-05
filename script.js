// unsplash API
let count = 3;

const apiKey = "odGcFeIH6ax_sitR_DXksy-7FhtYjwNV1F23qF_BvJk";
const secretKey = "OdXdLqJ-Txn_3tgp_fdWUmTS_bj9PR5-bh_e26oLQZ8";
const aipUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

const firstImage = document.getElementById("fistImage");
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let failedCount = 0;

// check if all images were loaded
function imageLoaded() {
  console.log("loadeded");
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    aipUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}

// helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links & photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    // create <a> to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // crate <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // event listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);

    // put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);

    imageContainer.appendChild(item);
  });

  loader.hidden = true;
}

// get photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(aipUrl);
    photosArray = await response.json();

    displayPhotos();
  } catch (error) {
    // catch error
    failedCount++;
    // retrying for five times in case of first failure to fetch the data after every 2 seconds
    if (failedCount < 5) {
      setTimeout(getPhotos, 2000);
    }

    // hiding the loader animation and showing the error message
    if (failedCount >= 5) {
      // hidding the loader animation
      loader.children[0].hidden = true;
      // appending the error message to the ui
      const errMsg = document.createElement("p");
      errMsg.textContent = "Request Rate Limit Exceeded";
      loader.classList.add("center-elements");
      loader.appendChild(errMsg);
    }
  }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight;

  const scrolled = window.scrollY;

  if (scrollable - 200 == scrolled + window.innerHeight && ready) {
    console.log("inside scroll");
    getPhotos();
  }
});

getPhotos();
