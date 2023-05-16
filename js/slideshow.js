let slideIndex = 1;
let slideInterval = setInterval(function() {
  plusSlides(1);
}, 5000);

showSlides(slideIndex);

function plusSlides(n) {
  clearInterval(slideInterval);
  slideInterval = setInterval(function() {
    plusSlides(1);
  }, 5000);

  showSlides(slideIndex += n);
}

function currentSlide(n) {
  clearInterval(slideInterval);
  slideInterval = setInterval(function() {
    plusSlides(1);
  }, 5000);

  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" slide_active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " slide_active";
}