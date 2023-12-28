// const accessKey = kxfH7vfwJOWL9t8J2wsbN861MdxrHas7zlEwkvLFT-c
const accessKey = 'kxfH7vfwJOWL9t8J2wsbN861MdxrHas7zlEwkvLFT-c';

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imagesContainer = document.querySelector('.images-container');
const loadMoreBtn = document.querySelector('.loadMoreBtn');

let page = 1; //gloabal variable kr dia ise
//kxfH7vfwJOWL9t8J2wsbN861MdxrHas7zlEwkvLFT-c
//document.getElementById('kxfH7vfwJOWL9t8J2wsbN861MdxrHas7zlEwkvLFT-c');  

//function to fetch images using Unsplash API
const fetchImages = async (query, pageNo) => {
    try {
        
   

if (pageNo === 1){
    imagesContainer.innerHTML = '';
}
    

//console.log(query);
const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`; //per_page 28 mtlb 28 imgs aaengi per page

const response = await fetch(url); //this will return us a Promise. Use of Promise being done here
const data = await response.json(); // jo promise return kia h url ne, use hum json mai convert krlenge, to read,extract data

//console.log(data); https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY  //https://api.unsplash.com/search/photos?query

if(data.results.length > 0){
    data.results.forEach(photo => {
        // creating image div   
       const imageElement = document.createElement('div');
       imageElement.classList.add('imageDiv');
       imageElement.innerHTML = `<img src="${photo.urls.regular}"/>`;
       
       //creating overlay
       const overlayElement = document.createElement('div');
       overlayElement.classList.add('overlay');
       
       // Creating overlay text
       const overlayText = document.createElement('h3');
       overlayText.innerText = `${photo.alt_description}`;
       
       overlayElement.appendChild(overlayText);
       imageElement.appendChild(overlayElement);
       
       imagesContainer.appendChild(imageElement);
       });
       
       if(data.total_pages === pageNo){
           loadMoreBtn.style.display = "none";
       }
       else{
           loadMoreBtn.style.display = "block";
       }
}

else{
    imagesContainer.innerHTML = `<h2>No image found.</h2>`;
    if(loadMoreBtn.style.display === "block")
            loadMoreBtn.style.display = "none";

}
} 
catch (error) {
    imagesContainer.innerHTML = `<h2>Failed to fetch images. Please try again later.</h2>`;
        
}

}


//Adding Event Listener to search form
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();//will stop our form from auto submission
    //console.log(searchInput.value);
    const inputText = searchInput.value.trim(); //trim islie taki //Value bekr ya extra space ht jae
    if (inputText !== ''){
       page = 1;
        fetchImages(inputText, page);
    }
    else{
        imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`;
        if(loadMoreBtn.style.display === "block")
            loadMoreBtn.style.display = "none";
        
    }
});

//Adding Event Listener to load more button to fetch more images
loadMoreBtn.addEventListener('click', () => {
  fetchImages(searchInput.value.trim(), ++page);
});