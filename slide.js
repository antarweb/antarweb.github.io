
    let slideIndex = 0;
    let slideInterval;
    let startX;
    const slideshowContainer = document.getElementById('slideshow-container');

    function showSlides() {
        const slides = document.getElementsByClassName("portfolio-item");
        const dots = document.getElementsByClassName("dot");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slideIndex++;
        if (slideIndex > slides.length) {
            slideIndex = 1;
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        slideInterval = setTimeout(showSlides, 3000); // Change slide every 3 seconds
    }

    function startSlideshow() {
        slideInterval = setTimeout(showSlides, 3000); // Start slideshow
    }

    function stopSlideshow() {
        clearTimeout(slideInterval); // Stop slideshow
    }

    // Initialize slideshow
    showSlides();

    // Touch event handlers
    slideshowContainer.addEventListener('touchstart', handleTouchStart, false);
    slideshowContainer.addEventListener('touchmove', handleTouchMove, false);

    function handleTouchStart(evt) {
        const firstTouch = evt.touches[0];
        startX = firstTouch.clientX;
    }

    function handleTouchMove(evt) {
        if (!startX) {
            return;
        }

        const xUp = evt.touches[0].clientX;
        const xDiff = startX - xUp;

        if (Math.abs(xDiff) > 0) { // Detect horizontal swipe
            stopSlideshow(); // Stop slideshow on swipe
            if (xDiff > 0) {
                nextSlide(); // Swipe left
            } else {
                prevSlide(); // Swipe right
            }
            startSlideshow(); // Restart slideshow after swipe
        }
        startX = null; // Reset startX
    }

    function nextSlide() {
        slideIndex++;
        if (slideIndex > document.getElementsByClassName("portfolio-item").length) {
            slideIndex = 1;
        }
        showCurrentSlide();
    }

    function prevSlide() {
        slideIndex--;
        if (slideIndex < 1) {
            slideIndex = document.getElementsByClassName("portfolio-item").length;
        }
        showCurrentSlide();
    }

    function showCurrentSlide() {
        const slides = document.getElementsByClassName("portfolio-item");
        const dots = document.getElementsByClassName("dot");
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    // Add event listeners to stop and start slideshow on hover
    slideshowContainer.addEventListener('mouseenter', stopSlideshow);
    slideshowContainer.addEventListener('mouseleave', startSlideshow);