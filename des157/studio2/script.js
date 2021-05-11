(function () {

    'use strict';

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
})();