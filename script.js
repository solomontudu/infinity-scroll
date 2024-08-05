// unsplash API
const count = 3;

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

// check if all images were loaded
function imageLoaded() {
  imageLoaded++;
  if (imageLoaded === totalImages) {
    ready = true;
    loader.hidden = ture;
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

    // put <img> inside <a>, then put both inside imageContainer element TODO: remove the console log
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
    if (error.message.toLowerCase().includes("Limit exceeded".toLowerCase()))
      console.log("Request Rate Limit Exceeded");
  }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
