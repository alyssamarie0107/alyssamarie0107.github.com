(function(){
    'use strict'; 

    // -----------------------
    // JS for slideshow
    // -----------------------
    let currImg = 0;
    const myPhotos = [
        "image1.jpg",
        "image2.jpg",
        "image3.jpg",
        "image4.jpg",
        "image5.jpg",
        "image6.jpg"
    ]
 
    const container = document.querySelector('#content');
 
     setInterval(function(){
         currImg++;
         if (currImg > (myPhotos.length - 1)) {
             currImg = 0;
         }
         swapImage();
    },2000);
 
    function swapImage() {
        let newSlide = document.createElement('img');
        newSlide.src = `images/slides/${myPhotos[currImg]}`;
        newSlide.className = "fadeinimg";
        container.appendChild(newSlide);
 
        // never want more than two img elements 
        if(container.children.length > 2) {
            // remove element 0 which is the bottom one
            container.removeChild(container.children[0]);
        }
    }
    // -----------------------
    // end of JS for slideshow 
    // -----------------------

    // -----------------------
    // JS for smooth scrolling
    // -----------------------
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(function(eachLink){
        eachLink.addEventListener('click', smoothScroll);
    });

    function smoothScroll(event){
        event.preventDefault();

        const targetID = event.target.getAttribute('href');
        const targetAnchor = document.querySelector(targetID);

        // console.log(targetAnchor.getBoundingClientRect().top);

        const originalTop = Math.floor(targetAnchor.getBoundingClientRect().top);
        window.scrollBy({top: originalTop, left:0, behavior: 'smooth'});
    }
    // ------------------------------
    // end of JS for smooth scrolling
    // ------------------------------

    // -----------------------
    // JS for overlay
    // -----------------------
    const openBtn = document.querySelector('#open');
    const closeBtn = document.querySelector('#close');


    openBtn.addEventListener('click', function(event){
        event.preventDefault();
        document.querySelector('#ol').className = 'overlay showing';
    });

    closeBtn.addEventListener('click', function(event){
        event.preventDefault();

        document.querySelector('.showing').className = 'overlay hidden';
    });

    document.addEventListener('keydown', function(event){
        if(event.key == "Escape"){
            document.querySelector('.showing').className = 'overlay hidden';
        }
    });
 }());

// ------------------------------------------
// JS for changing background color on scroll
// ------------------------------------------
window.addEventListener('load', function(){
    'use strict';
    const posts = document.querySelectorAll('section');
    console.log(posts);
    let postTops = [];
    let pagetop;
    let counter = 1; // goes up or down depending on which section we are in
    let prevCounter = 1;
    let doneResizing;

    const colors = [
        "#acb4c2",
        "#d3c0b1",
        "#97a897",
        "#978888",
        "#c9c28a",
        "#c5c5c5"
    ];

    posts.forEach(function(post){
        postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset)
    });
    console.log(postTops);

    window.addEventListener('scroll', function(event){
        pagetop = window.pageYOffset + 50;
        console.log(pagetop);

        if(pagetop > postTops[counter]) {
            // scrolling down
            counter++;
            console.log(`scrolling down ${counter}`);
        } else if(counter > 1 && pagetop < postTops[counter - 1]) {
            // scrolling up
            counter--;
            console.log(`scrolling up ${counter}`);
        }

        // change background of body depending on which section you are in
        // console.log(posts[counter - 1]);
        // console.log(colors[counter-1]);

        if (pagetop < postTops[0]) {
            console.log("hello");
            document.querySelector('body').style.backgroundColor = "#FFFFFF";
        }
        else {
            document.querySelector('body').style.backgroundColor = colors[counter-1];
        }
    });
});
// -------------------------------------------------
// end of JS for changing background color on scroll
// -------------------------------------------------