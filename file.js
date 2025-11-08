let lastScrollTop = 0;
const logoHeading = document.querySelector('.logo-heading');

window.addEventListener('scroll', function() {
  let scrollTop = window.scrollY || document.documentElement.scrollTop;

  if (scrollTop > 0) {
    // Always keep it shrunk unless at the very top
    logoHeading.classList.add('shrink');
  } else {
    // Only expand when at the very top of the page
    logoHeading.classList.remove('shrink');
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

const hamburger = document.getElementById('hamburger');
const hamLinks = document.querySelector('.hamLinks');
let isOpen = false;

hamburger.addEventListener('click', () => {
  isOpen = !isOpen;
  hamLinks.style.display = isOpen ? 'flex' : 'none';
});

// 👇 Close dropdown if user resizes to desktop view
window.addEventListener('resize', () => {
  if (window.innerWidth > 800) {
    hamLinks.style.display = 'none'; // hide menu
    isOpen = false; // reset toggle state
  }
});






const credits = `
credits
Programmed by : Rylan Franco
Coloring,hosting and consulting : Gleena
pictures : andrew , princeton , siyanda and others
special thanks to : brother Aaron , Kenny
history information : sebiola
`;

console.log(credits);
