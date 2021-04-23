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
    let outputText = document.querySelector('#output-text');

    // handles when form is submitted
    form.addEventListener('submit', function(event){
        event.preventDefault();

        form.style.display = "none";
        output.style.display = "block";

        // get form values
        const fname = document.querySelector('#fname').value;
        console.log("fname: " + fname);

        const feelings = document.querySelectorAll('input[type="checkbox"]:checked');
        for(let feeling of feelings) {
            console.log(feeling.value);
        }
    
        const hobby = document.querySelector('#hobby').value;
        console.log("hobby: " + hobby);

        const food = document.querySelector('#food').value;
        console.log("food: " + food);

        const person = document.querySelector('#person').value;
        console.log("person: " + person);

        // generate madlibs output
        outputText.innerHTML = 
        `
        Hello ${fname}!
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        `;
    });

    const resetBtn = document.querySelector('#reset-btn');
    
    resetBtn.addEventListener('click', function(){
        form.style.display = "block";
        output.style.display = "none";

        // reset form 
        form.reset();
    });
})();