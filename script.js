// unsplash API
const count = 3;
const apiKey = "odGcFeIH6ax_sitR_DXksy-7FhtYjwNV1F23qF_BvJk";
const secretKey = "OdXdLqJ-Txn_3tgp_fdWUmTS_bj9PR5-bh_e26oLQZ8";
const aipUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const firstImage = document.getElementById("fistImage");
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

// helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// create elements for links & photos, add to DOM
function displayPhotos() {
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
    // put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
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

getPhotos();
