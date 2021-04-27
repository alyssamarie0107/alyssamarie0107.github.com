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
    function curveWelcomeText() {
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

            const xPos = radius * (1 + Math.cos(angleToRadians(angle)));
            const yPos = radius * (1 + Math.sin(angleToRadians(angle)));

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
    let affirmation = document.querySelector('#affirmation');

    // handles when form is submitted
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        form.style.display = "none";
        output.style.display = "block";

        // get form values
        const fname = document.querySelector('#fname').value;
        console.log("fname: " + fname);

        const feeling = document.querySelector('input[type="radio"]:checked').value;
        console.log("feeling: " + feeling);

        const hobby = document.querySelector('#hobby').value;
        console.log("hobby: " + hobby);

        const food = document.querySelector('#food').value;
        console.log("food: " + food);

        const person = document.querySelector('#person').value;
        console.log("person: " + person);

        // generate madlibs output
        if (feeling == "happy") {
            // happy script
            outputText.innerHTML =
                `
            Hello ${fname.bold()}! Welcome to Mood Affirmation MadLibs, where you are given positive reminders or statements
            based on your mood. It is great that you are taking the time to hone into how you are feeling today. 
            Thank you for setting some time out of your busy day and for sharing a little about yourself. You mentioned
            that you are feeling ${feeling.bold()} today. That is awesome, for you are worthy of being happy! 
            To keep the happiness up, try doing some of the things you love and that make you happy, such as ${hobby.bold()},
            indulging in ${food.bold()}, or simply hanging out with the person who makes you the happiest, ${person.bold()}. 
            There is a lot in life to be happy about and it is great news to hear that you are. Keep it up :)
            `;

            affirmation.innerHTML = 'Affirmation: "Every day I have more and more reasons to be happy and joyful. - I am"';
        } else if (feeling == "sad") {
            // sad script
            outputText.innerHTML =
                `
            Hello ${fname.bold()}! Welcome to Mood Affirmation MadLibs, where you are given positive reminders or statements
            based on your mood. It is great that you are taking the time to hone into how you are feeling today. 
            Thank you for setting some time out of your busy day and for sharing a little about yourself. You mentioned
            that you are feeling ${feeling.bold()} today. I am sorry to hear that. I hope you know that it is okay to feel like
            this. Though it may not seem like it right now, things are going to be okay and better. Allow yourself to feel the way 
            you do, but how about doing some of the things you know you love and make you smile, such as ${hobby.bold()}, indulging 
            in ${food.bold()}, or simply hanging out with the person who makes you the happiest, ${person.bold()}. There is no rush 
            to feel better. These are just some reminders and suggestions. Do everything on your own time and if things do not work 
            out today, tomorrow will be better. Remember, this feeling is only temporary. You've got this.
            `;

            affirmation.innerHTML = 'Affirmation: "Difficult times are part of my journey and allow me to appreciate the good." - I am';
        } else if (feeling == "anxious") {
            // anxious and overwhelmed script
            outputText.innerHTML =
                `
            Hello ${fname.bold()}! Welcome to Mood Affirmation MadLibs, where you are given positive reminders or statements
            based on your mood. It is great that you are taking the time to hone into how you are feeling today. 
            Thank you for setting some time out of your busy day and for sharing a little about yourself. You mentioned that you are 
            feeling ${feeling.bold()} today. First, take a deep breath and try your best to step back from everything that is making
            you feel anxious. Remind yourself that you are stronger than your anxious thoughts. If you need someone, how about you 
            reaching out to ${person.bold()}? Once you feel at ease, how about doing some of your favorite things, such as 
            ${hobby.bold()} or indulging in ${food.bold()}. This feeling will pass. You're okay.
            `;

            affirmation.innerHTML = 'Affirmation: "Be gentle with yourself, you are doing the best you can." - I am';

        } else if (feeling == "angry") {
            // angry script
            outputText.innerHTML =
                `
            Hello ${fname.bold()}! Welcome to Mood Affirmation MadLibs, where you are given positive reminders or statements
            based on your mood. It is great that you are taking the time to hone into how you are feeling today. 
            Thank you for setting some time out of your busy day and for sharing a little about yourself. You mentioned that you are 
            feeling ${feeling.bold()} today. I'm sure there is a valid reason for this. Being angry is human. However, challenge yourself
            to control the way you respond to what is making you feel this way. Take a breather, go out and do some of your favorite things, 
            such as ${hobby.bold()}, indulging in ${food.bold()}, or hanging out with the person who makes you the happiest, ${person.bold()}.
            Then come back and check in with yourself to see if it is worth staying angry.
            `;

            affirmation.innerHTML = 'Affirmation: "Let things flow and be positive." - I am';

        } else {
            // overwhelmed script
            outputText.innerHTML =
                `
            Hello ${fname.bold()}! Welcome to Mood Affirmation MadLibs, where you are given positive reminders or statements
            based on your mood. It is great that you are taking the time to hone into how you are feeling today. 
            Thank you for setting some time out of your busy day and for sharing a little about yourself. You mentioned that you are 
            feeling ${feeling.bold()} today. That is okay! Life can be very hectic and it is only normal to feel like this.
            I am sure you have a lot going on right now and you may not be entirely sure how you are going to get everything sorted out. 
            But take a breath and trust in yourself. You don't have to tackle everything all at once. Do one thing at a time and trust
            that you will figure out the rest along the way. It is important though, that you take a break from whatever it is that is 
            overwhelming you. Take some time and do some of your favorite things, such as ${hobby.bold()}, indulging in ${food.bold()}, or 
            hanging out with the person who makes you the happiest, ${person.bold()}. Everything will be okay and will work out. 
            `;

            affirmation.innerHTML = 'Affirmation: "It is okay to take time for myself." - I am';
        }
    });

    const resetBtn = document.querySelector('#reset-btn');

    resetBtn.addEventListener('click', function () {
        form.style.display = "block";
        output.style.display = "none";

        // reset form 
        form.reset();
    });
})();