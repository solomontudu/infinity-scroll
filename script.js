// unsplash API
const count = 3;
const apiKey = "odGcFeIH6ax_sitR_DXksy-7FhtYjwNV1F23qF_BvJk";
const secretKey = "OdXdLqJ-Txn_3tgp_fdWUmTS_bj9PR5-bh_e26oLQZ8";
const aipUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const firstImage = document.getElementById("fistImage");

// get photos from unsplash api

async function getPhotos() {
  try {
    const response = await fetch(aipUrl);
    const data = await response.json();
    firstImage.src = data[0].urls.regular;
    console.log(data[0].urls.regular);
  } catch (error) {
    // catch error
    console.log(error);
  }
}

getPhotos();
