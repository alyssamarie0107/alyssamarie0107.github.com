(function () {

    'use strict';

    // JS for overlays
    const openBtns = document.querySelectorAll('.open');
    const closeBtns = document.querySelectorAll('.close');

    for(const eachOpenBtn of openBtns) {
        eachOpenBtn.addEventListener('click', function(event){
            event.preventDefault();

            console.log(event.target.id);
            
            const thisBtn = event.target.id;
            document.querySelector(`#ol-${thisBtn}`).className = 'overlay showing';
            if (thisBtn == 3 || thisBtn ==4) {
                
            }
        });
    }

    for(const eachCloseBtn of closeBtns) {
        eachCloseBtn.addEventListener('click', function(event){
            event.preventDefault();

            // only one overlay showing at a time
            document.querySelector('.showing').className = 'overlay hidden';
        });
    }

    document.addEventListener('keydown', function(event){
        if(event.key == "Escape"){
            document.querySelector('.showing').className = 'overlay hidden';
        }
    });

    // JS for slideshows
    const slideshow1Imgs = [
        "image1.png",
        "image2.png",
        "image3.png"
    ]

    const imgCaptions = [
        "Keana Delos Santons - 2021",
        "Catalina Navarro - 2016",
        "Alyssa Rodriguez (Me) - 2021",
    ]

    let currImage = 0;
    let currCap = 0;

    const prevBtn = document.querySelector('#previous');
    const nextBtn = document.querySelector('#next');
    const slide = document.querySelector('#myimage');
    const caption = document.querySelector('#cap1');

    prevBtn.addEventListener('click', prevPhoto);
    nextBtn.addEventListener('click', nextPhoto);

    function prevPhoto() {
        // decreme the counter
        currImage--;
        currCap--;

        if(currImage < 0) {
            currImage = slideshow1Imgs.length - 1;
        }

        if(currCap < 0) {
            currCap = imgCaptions.length - 1;
        }

        // set the source for the slide to the next image
        slide.src = `images/${slideshow1Imgs[currImage]}`;
        caption.innerHTML = imgCaptions[currCap];
    }

    function nextPhoto() {
        // increment the counter
        currImage++;
        currCap++;

        if(currImage > slideshow1Imgs.length - 1) {
            // if the user is at the end of the array, go back to the beginning
            currImage = 0;
        }

        if(currCap > imgCaptions.length - 1) {
            currCap = 0;
        }

        // set the source for the slide to the next image
        slide.src = `images/${slideshow1Imgs[currImage]}`;
        caption.innerHTML = imgCaptions[currCap];
    }
})();