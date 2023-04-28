(function() {

    // Get all images and texts, get the `canvas` element, and save slider length
    var sliderCanvas = document.querySelector('.pieces-slider__canvas');
    var imagesEl = [].slice.call(document.querySelectorAll('.pieces-slider__image'));
    var textEl = [].slice.call(document.querySelectorAll('.pieces-slider__text'));
    var slidesLength = imagesEl.length;

    // Define indexes related variables and functions
    var currentIndex = 0, currentImageIndex, currentTextIndex, currentNumberIndex;
    // Update current indexes for image, text and number
    function updateIndexes() {
        currentImageIndex = currentIndex * 3;
        currentTextIndex = currentImageIndex + 1;
        currentNumberIndex = currentImageIndex + 2;
    }
    updateIndexes();
    var textIndexes = [];
    var numberIndexes = [];

    // Some other useful variables
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
	var piecesSlider;

    // Options for images
    var imageOptions = {
        angle: 45,
        extraSpacing: {extraX: 100, extraY: 200},
        piecesWidth: function() { return Pieces.random(50, 200); },
        ty: function() { return Pieces.random(-400, 400); }
    };

    // Options for texts
    var textOptions = {
		color: 'black',
        backgroundColor: '#fff',
		fontSize: function() { return windowWidth > 720 ? 50 : 30; },
        padding: '15 20 10 20',
        angle: -45,
        piecesSpacing: 2,
		extraSpacing: {extraX: 0, extraY: 300},
        piecesWidth: function() { return Pieces.random(50, 200); },
        ty: function() { return Pieces.random(-200, 200); },
        translate: function() {
			
			var bannerHight = windowHeight - 200;
			var bannerCenter = bannerHight / 2 ;
			
			var translateTX = 0;  // 140
			var hpos = bannerCenter - 120 ;   // 270
			
			if (windowWidth >= 1600){ hpos = bannerCenter - 50;}
            else if (windowWidth >= 1360){ hpos = bannerCenter - 50; }
			else if (windowWidth >= 1024){ hpos = bannerCenter - 100;  }
            else if (windowWidth >= 768){ hpos = bannerCenter - 400;  }
			
			
			return {translateX: translateTX, translateY: hpos}
        
		
		
			/*if (windowWidth > 1600) translateTX = 525;
            else if (windowWidth > 1360) translateTX = 412;
            else if (windowWidth > 1024) translateTX = 345;
            else if (windowWidth > 768) translateTX = 345;
			*/
		}
    };

    // Options for numbers
    var numberOptions = {
        color: 'black',
        backgroundColor: '#fff',
        fontSize: function() { return windowWidth > 720 ? 60 : 20; },
        padding: function() { return windowWidth > 720 ? '18 35 10 38' : '18 25 10 28'; },
        angle: 0,
        piecesSpacing: 2,
        extraSpacing: {extraX: 10, extraY: 10},
        piecesWidth: 35,
        ty: function() { return Pieces.random(-200, 200); },
        translate: function() {
            
			var bannerHight = windowHeight - 200;
			var bannerCenter = bannerHight / 2 ;
			var numberHeight = -(bannerCenter - 120);
			
			var translateX = -145;
			if (windowWidth >= 1600){ translateX = -425; }
			else if (windowWidth >= 1360){ translateX = -312; }
            else if (windowWidth >= 1024){ translateX = -280; }
			else if (windowWidth >= 768){ translateX = -300; }
			
			return {translateX: translateX, translateY: numberHeight}
			
			/*
			if (windowWidth > 1600) return {translateX: -525, translateY: -300};
            if (windowWidth > 1360) return {translateX: -412, translateY: -220};
            if (windowWidth > 1024) return {translateX: -345, translateY: -250};
            if (windowWidth > 768) return {translateX: -345, translateY: -180};
            return {translateX: -140, translateY: -100};
			*/
        }
    };

    // Build the array of items to draw using Pieces
    var items = [];
    var imagesReady = 0;
    for (var i = 0; i < slidesLength; i++) {
        // Wait for all images to load before initializing the slider and event listeners
        var slideImage = new Image();
		slideImage.onload = function() {
            if (++imagesReady == slidesLength) {
                initSlider();
                initEvents();
            }
        };
        // Push all elements for each slide with the corresponding options
        items.push({type: 'image', value: imagesEl[i], options: imageOptions});
        items.push({type: 'text', value: textEl[i].innerText, options: textOptions});
        items.push({type: 'text', value: i + 1, options: numberOptions});
        // Save indexes
        textIndexes.push(i * 3 + 1);
        numberIndexes.push(i * 3 + 2);
        // Set image src
        slideImage.src = imagesEl[i].src;
    }

    // Initialize a Pieces instance with all items we want to draw
    function initSlider() {
        // Stop any current animation if the slider was initialized before
        if (piecesSlider) {
            piecesSlider.stop();
        }

        // Save the new Pieces instance
        piecesSlider = new Pieces({
            canvas: sliderCanvas,
            items: items,
            x: 'centerAll',
            y: 'centerAll',
            piecesSpacing: 1,
            fontFamily: ["'Josefin Sans', sans-serif"],
            animation: {
                duration: function() { return Pieces.random(1000, 2000); },
                easing: 'easeOutQuint'
            },
            // debug: true
        });

        // Animate all numbers to rotate clockwise indefinitely
        piecesSlider.animateItems({
            items: numberIndexes,
            duration: 20000,
            angle: 360,
            loop: true
        });

        // Show current items: image, text and number
        showItems();
    }

    // Init Event Listeners
    function initEvents() {
        // Select prev or next slide using buttons
        document.querySelector('.pieces-slider__button--prev').addEventListener('click', prevItem);
        document.querySelector('.pieces-slider__button--next').addEventListener('click', nextItem);

        // Select prev or next slide using arrow keys
        document.addEventListener('keydown', function (e) {
            if (e.keyCode == 37) { // left
                prevItem();
            } else if (e.keyCode == 39) { // right
                nextItem();
            }
        });

        // Handle `resize` event
        window.addEventListener('resize', resizeStart);
    }

    // Show current items: image, text and number
    function showItems() {
        // Show image pieces
        piecesSlider.showPieces({items: currentImageIndex, ignore: ['tx'], singly: true, update: (anim) => {
            // Stop the pieces animation at 60%, and run a new indefinitely animation of `ty` for each piece
            if (anim.progress > 60) {
                var piece = anim.animatables[0].target;
                var ty = piece.ty;
                anime.remove(piece);
                anime({
                    targets: piece,
                    ty: piece.h_ty < 300
                        ? [{value: ty + 10, duration: 1000}, {value: ty - 10, duration: 2000}, {value: ty, duration: 1000}]
                        : [{value: ty - 10, duration: 1000}, {value: ty + 10, duration: 2000}, {value: ty, duration: 1000}],
                    duration: 2000,
                    easing: 'linear',
                    loop: true
                });
            }
        }});
        // Show pieces for text and number, using alternate `ty` values
        piecesSlider.showPieces({items: currentTextIndex});
        piecesSlider.showPieces({items: currentNumberIndex, ty: function(p, i) { return p.s_ty - [-3, 3][i % 2]; }});
    }

    // Hide current items: image, text and number
    function hideItems() {
        piecesSlider.hidePieces({items: [currentImageIndex, currentTextIndex, currentNumberIndex]});
    }

    // Select the prev item: hide current items, update indexes, and show the new current item
    function prevItem() {
        hideItems();
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slidesLength - 1;
        updateIndexes();
        showItems();
    }

    // Select the next item: hide current items, update indexes, and show the new current item
    function nextItem() {
        hideItems();
        currentIndex = currentIndex < slidesLength - 1 ? currentIndex + 1 : 0;
        updateIndexes();
        showItems();
    }

    // Handle `resize` event
    
    var initial = true, hideTimer, resizeTimer;

    // User starts resizing, so wait 300 ms before reinitialize the slider
    function resizeStart() {
        if (initial) {
            initial = false;
            if (hideTimer) clearTimeout(hideTimer);
            sliderCanvas.classList.add('pieces-slider__canvas--hidden');
        }
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeEnd, 300);
    }

    // User ends resizing, then reinitialize the slider
    function resizeEnd() {
        initial = true;
        windowWidth = window.innerWidth;
        initSlider();
        hideTimer = setTimeout(() => {
            sliderCanvas.classList.remove('pieces-slider__canvas--hidden');
        }, 500);
    }
})();
