let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;

let cl = 0

next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
// let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    // clearInterval(refreshInterval);
    // refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};








// Get the slider container and slides
const sldr = document.querySelector('.slider');
const slides = sldr.querySelectorAll('.item');
const imgs = slider.querySelectorAll('img')
 
let sld_cont = [...slides, document.querySelector('.slider .buttons')]
// Initialize the current slide index
let currentIndex = 0;

imgs.forEach((el) => {
  el.addEventListener('dragstart', (e)=>{
    e.preventDefault();
  })
})

sld_cont.forEach((el) => {
  el.addEventListener('mousedown', handleMouseDown);
  el.addEventListener('mouseup', handleMouseUp);
})

function handleMouseDown(event) {
  // Get the mouse coordinates
  startX = event.clientX;
  startY = event.clientY;
  cl = 1
}

function handleMouseUp(event) {
  if (cl == 1) {
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    // if (Math.abs(deltaX) > Math.abs(deltaY)
    if ((deltaX > 10) && (Math.abs(deltaX) > Math.abs(deltaY))) {
      active = active - 1 >= 0 ? active - 1 : lengthItems;

      slider.style.left = -items[active].offsetLeft + 'px'
      let last_active_dot = document.querySelector('.slider .dots li.active');
      last_active_dot.classList.remove('active');
      dots[active].classList.add('active');
    }
    else if ((deltaX < -10) && (Math.abs(deltaX) > Math.abs(deltaY))) {
      active = active + 1 <= lengthItems ? active + 1 : 0;
      
      slider.style.left = -items[active].offsetLeft + 'px'
      let last_active_dot = document.querySelector('.slider .dots li.active');
      last_active_dot.classList.remove('active');
      dots[active].classList.add('active');
    }
  }
  startX = null;
  startY = null;
  cl = 0
}








