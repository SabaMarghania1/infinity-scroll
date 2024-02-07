const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = "G8YpNOdlt2ve0Jgo1gPB8T2zql6tYeJk-dU-vEJU-5s";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper Function to set Attributes onm DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, Add to  DOM

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach(photo => {
    const item = document.createElement("a");

    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Creating images
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Attaching elements to each other
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash APi
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (!response.status) {
      throw new Error("OOPS");
    }
  } catch (error) {
    alert(error);
  }
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
