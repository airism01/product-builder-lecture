console.log('main.js loaded');

const lottoNumbersContainer = document.querySelector('.lotto-numbers');
const generatorBtn = document.getElementById('generator-btn');
const themeToggle = document.getElementById('theme-toggle');
const emailSection = document.getElementById('email-section');
const emailForm = document.getElementById('email-form');
const hiddenNumbersInput = document.getElementById('hidden-numbers');
const formStatus = document.getElementById('form-status');

const partnershipForm = document.getElementById('partnership-form');
const partnershipStatus = document.getElementById('partnership-status');

let currentNumbers = [];

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
    currentNumbers = generateLottoNumbers();
    currentNumbers.forEach(number => {
      const numberEl = document.createElement('div');
      numberEl.classList.add('lotto-number');
      numberEl.textContent = number;
      lottoNumbersContainer.appendChild(numberEl);
    });
    
    // Show email section and set hidden input
    emailSection.classList.remove('hidden');
    hiddenNumbersInput.value = currentNumbers.join(', ');
    formStatus.textContent = '';
  });
} else {
  console.error('Button not found!');
}

// Form Submission Logic
if (emailForm) {
  emailForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(emailForm);
    formStatus.textContent = 'Sending...';
    formStatus.style.color = 'inherit';

    try {
      const response = await fetch(emailForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        formStatus.textContent = 'Numbers sent successfully!';
        formStatus.style.color = '#4CAF50';
        emailForm.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          formStatus.textContent = data.errors.map(error => error.message).join(", ");
        } else {
          formStatus.textContent = 'Oops! There was a problem submitting your form';
        }
        formStatus.style.color = '#f44336';
      }
    } catch (error) {
      formStatus.textContent = 'Oops! There was a problem submitting your form';
      formStatus.style.color = '#f44336';
    }
  });
}

// Partnership Form Submission Logic
if (partnershipForm) {
  partnershipForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(partnershipForm);
    partnershipStatus.textContent = '보내는 중...';
    partnershipStatus.style.color = 'inherit';

    try {
      const response = await fetch(partnershipForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        partnershipStatus.textContent = '문의가 정상적으로 접수되었습니다!';
        partnershipStatus.style.color = '#4CAF50';
        partnershipForm.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          partnershipStatus.textContent = data.errors.map(error => error.message).join(", ");
        } else {
          partnershipStatus.textContent = '오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
        }
        partnershipStatus.style.color = '#f44336';
      }
    } catch (error) {
      partnershipStatus.textContent = '오류가 발생했습니다. 네트워크 상태를 확인해주세요.';
      partnershipStatus.style.color = '#f44336';
    }
  });
}

function generateLottoNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }
  return [...numbers].sort((a, b) => a - b);
}
