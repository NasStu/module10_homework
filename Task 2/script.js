const btn = document.querySelector('.btn');
const windowWidth = window.screen.width;
const windowHeight = window.screen.height;

btn.addEventListener('click', () => {
    alert(`Размер вашего экрана - ширина: ${windowWidth} px и высота: ${windowHeight} px`);
})