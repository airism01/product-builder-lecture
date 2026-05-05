console.log('main.js loaded');

const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generatorBtn = document.getElementById('generator-btn');
const themeToggle = document.getElementById('theme-toggle');

// Theme Logic
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  
  let theme = 'light';
  if (document.body.classList.contains('dark-mode')) {
    theme = 'dark';
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }
  localStorage.setItem('theme', theme);
});

// Lotto Generation Logic
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
