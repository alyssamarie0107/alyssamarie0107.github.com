(function () {
    "use strict";

    // -----------------------
    // JS for welcome circle
    // -----------------------

    // helper function that converts angle to radians
    const angleToRadians = function (angle) {
        return angle * (Math.PI / 180);
    }

    // function that handles curving the welcome text
    // referenced: https://www.youtube.com/watch?v=a0FIA_qSVLs
    function curveWelcomeText () {
        const radius = 250;
        const diameter = radius * 2;

        const circle = document.querySelector('#circular-welcome');
        circle.style.width = `${diameter}px`;
        circle.style.height = `${diameter}px`;

        const welcome = circle.innerHTML;

        // split text into an array of characters
        const characters = welcome.split('');

        // need to clear our default text 
        circle.innerHTML = null;

        let angle = -90;
        const deltaAngle = 360 / characters.length;

        // loop over all the characters and position them 
        characters.forEach((char, index) => {
            // create element that will store single character 
            const spanElement = document.createElement('span');

            // put char into span element
            spanElement.innerHTML = char;

            const xPos = radius * (1+ Math.cos(angleToRadians(angle)));
            const yPos = radius * (1+ Math.sin(angleToRadians(angle)));

            angle += deltaAngle;

            // transform element 
            const transform = `translate(${xPos}px, ${yPos}px)`;
            const rotate = `rotate(${index * deltaAngle}deg)`;

            spanElement.style.transform = `${transform} ${rotate}`;

            // every character is contained in its own element now
            circle.appendChild(spanElement);
        });
    }
    
    curveWelcomeText();

    // -----------------------
    // JS for form
    // -----------------------
    const form = document.querySelector('form');
    const output = document.querySelector('#output');

    // handles when form is submitted
    form.addEventListener('submit', function(event){
        event.preventDefault();

        form.style.display = "none";
        output.style.display = "block";
    });

    const resetBtn = document.querySelector('#reset-btn');
    
    resetBtn.addEventListener('click', function(){
        form.style.display = "block";
        output.style.display = "none";
    });


})();