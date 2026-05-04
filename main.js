console.log('main.js loaded');

const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generatorBtn = document.getElementById('generator-btn');

if (generatorBtn) {
  console.log('Button found');
  generatorBtn.addEventListener('click', () => {
    console.log('Button clicked');
    lottoNumbersContainer.innerHTML = '';
    const numbers = generateLottoNumbers();
    numbers.forEach(number => {
      const numberEl = document.createElement('div');
      numberEl.classList.add('lotto-number');
      numberEl.textContent = number;
      lottoNumbersContainer.appendChild(numberEl);
    });
  });
} else {
  console.error('Button not found!');
}

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return [...numbers].sort((a, b) => a - b);
}
