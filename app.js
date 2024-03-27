const apikey = "WIs3btbmkJIwgTmCXAKYoGJjoG9RRAuRBWr7tZ7Y9rJyPw37dzKGshLS";

async function fetchData(searchTerm, page_num) {
    try {
        // fetch the data from the API
        const data = await fetch(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${page_num}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: apikey 
            }
        });

        const response = await data.json();
        
        console.log(response);
        
        displayImages(response.photos);
    } catch (error) {
        console.error('Error fetching curated photos:', error);
    }
}

function displayImages(photos) {
    const recommendedSection = document.getElementById('recommended');
    recommendedSection.innerHTML = ''; 

    photos.forEach(photo => {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const imageElement = document.createElement('img');
        imageElement.classList.add("img");
        imageElement.src = photo.src.medium;
        imageElement.alt = photo.photographer;
        imageContainer.appendChild(imageElement);

        const titleElement = document.createElement('p');
        titleElement.textContent = photo.alt;
        imageContainer.appendChild(titleElement);

        const photographerElement = document.createElement('p');
        photographerElement.textContent = photo.photographer;
        imageContainer.appendChild(photographerElement);

        const addButton = document.createElement('img');
        addButton.src="Favorite.png";
        addButton.classList.add("add");
        addButton.addEventListener('click', function() {
            addToWishlist(photo);
            recommendedSection.removeChild(imageContainer);
        });
        imageContainer.appendChild(addButton);

        recommendedSection.appendChild(imageContainer);
    });

    if (photos.length > 0) {
        const initialSection = document.getElementById('initial');
        initialSection.innerHTML = ''; 

        const firstPhoto = photos[0];
        const firstImageContainer = document.createElement('div');
        firstImageContainer.classList.add('image-container');

        const firstImageElement = document.createElement('img');
        firstImageContainer.classList.add("img");
        firstImageElement.src = firstPhoto.src.medium;
        firstImageElement.alt = firstPhoto.photographer;
        firstImageContainer.appendChild(firstImageElement);

        let discriptionDiv=document.createElement("div");
        discriptionDiv.classList.add("discription");


        const titleElement = document.createElement('p');
        titleElement.textContent = firstPhoto.alt;
        discriptionDiv.appendChild(titleElement);

        const photographerElement = document.createElement('a');
        photographerElement.textContent = firstPhoto.photographer;
        photographerElement.href=firstPhoto.photographer_url
        discriptionDiv.appendChild(photographerElement);

        firstImageContainer.appendChild(discriptionDiv);

        initialSection.appendChild(firstImageContainer);
    }
}


function addToWishlist(photo) {
    const wishlistSection = document.getElementById('wishlist');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const imageElement = document.createElement('img');
    imageElement.classList.add("img");
    imageElement.src = photo.src.medium;
    imageElement.alt = photo.photographer;
    imageContainer.appendChild(imageElement);

    const titleElement = document.createElement('p');
    titleElement.textContent = photo.alt;
    imageContainer.appendChild(titleElement);

    const photographerElement = document.createElement('p');
    photographerElement.textContent = photo.photographer;
    imageContainer.appendChild(photographerElement);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add("remove")
    removeButton.addEventListener('click', function() {
        removeFromWishlist(imageContainer, photo);
    });
    imageContainer.appendChild(removeButton);

    wishlistSection.appendChild(imageContainer);

    // Store wishlist items in local storage
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistItems.push(photo);
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
}

function removeFromWishlist(imageContainer, photo) {
    const wishlistSection = document.getElementById('wishlist');
    wishlistSection.removeChild(imageContainer);

    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlistItems = wishlistItems.filter(item => item.id !== photo.id);
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
}

function populateWishlistFromLocalStorage() {
    const wishlistSection = document.getElementById('wishlist');
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];

    wishlistItems.forEach(photo => {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const imageElement = document.createElement('img');
        imageElement.src = photo.src.medium;
        imageElement.alt = photo.photographer;
        imageContainer.appendChild(imageElement);

        const titleElement = document.createElement('p');
        titleElement.textContent = photo.photographer;
        imageContainer.appendChild(titleElement);

        const photographerElement = document.createElement('p');
        photographerElement.textContent = photo.photographer;
        imageContainer.appendChild(photographerElement);

        wishlistSection.appendChild(imageContainer);
    });
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    const pageNum = 1; 
    fetchData(searchTerm, pageNum);
}

window.onload = populateWishlistFromLocalStorage;

