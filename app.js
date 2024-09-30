// Add this to your JavaScript file
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentSlide = 0;

prevButton.addEventListener('click', () => {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  updateSlider();
});

nextButton.addEventListener('click', () => {
  currentSlide++;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  updateSlider();
});

function updateSlider() {
  slides.forEach((slide, index) => {
    slide.style.display = index === currentSlide ? 'flex' : 'none';
  });
}

updateSlider();
