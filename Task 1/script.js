const btn = document.querySelector('.btn');
const btnOne = document.querySelector('.btn_icon1');
const btnTwo = document.querySelector('.btn_icon2');

btn.addEventListener('click', () => {
  btnOne.classList.toggle('hidden');
  btnTwo.classList.toggle('active');
});
