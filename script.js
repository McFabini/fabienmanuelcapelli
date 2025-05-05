// JavaScript to handle the scroll event
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('visible');
    } else {
        header.classList.remove('visible');
    }
});
