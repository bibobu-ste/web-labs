
const VARIANT = 24;
const MODAL_DELAY_MS = 60000; // 1 хвилина

function saveSystemInfo() {
  const info = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    uaPlatform: navigator.userAgentData?.platform ?? 'n/a',
    vendor: navigator.vendor,
    language: navigator.language,
    languages: (navigator.languages || []).join(', '),
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    hardwareConcurrency: navigator.hardwareConcurrency,
    screen: `${screen.width}x${screen.height}`,
    appVersion: navigator.appVersion,
  };
  Object.entries(info).forEach(([key, value]) => {
    localStorage.setItem(key, String(value));
  });
}

function renderStorageInfo() {
  const list = document.getElementById('storage-info');
  list.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const li = document.createElement('li');
    const b = document.createElement('b');
    b.textContent = key + ': ';
    li.append(b, document.createTextNode(localStorage.getItem(key)));
    list.appendChild(li);
  }
}

async function loadReviews() {
  const status = document.getElementById('reviews-status');
  const list = document.getElementById('reviews-list');
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const comments = await response.json();

    comments.forEach((c) => {
      const card = document.createElement('article');
      card.className = 'card';

      const h3 = document.createElement('h3');
      h3.textContent = c.name;
      const email = document.createElement('p');
      email.className = 'review-email';
      email.textContent = c.email;
      const body = document.createElement('p');
      body.textContent = c.body;

      card.append(h3, email, body);
      list.appendChild(card);
    });
    status.hidden = true;
  } catch (error) {
    status.textContent = 'Не вдалося завантажити відгуки.';
    console.error('Error:', error);
  }
}

// ===== 3. Модальне вікно форми =====
function setupModal() {
  const modal = document.getElementById('feedback-modal');
  const closeBtn = document.getElementById('modal-close');
  const form = document.getElementById('feedback-form');
  const status = document.getElementById('form-status');

  const closeModal = () => {
    modal.hidden = true;
    sessionStorage.setItem('feedbackClosed', 'true'); // не показувати повторно в цій сесії
  };

  if (!sessionStorage.getItem('feedbackClosed')) {
    setTimeout(() => {
      modal.hidden = false;
    }, MODAL_DELAY_MS);
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  // Відправка на formspree без перезавантаження
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Надсилання...';
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      status.textContent = 'Дякуємо! Повідомлення надіслано.';
      form.reset();
      setTimeout(closeModal, 1500);
    } catch (error) {
      status.textContent = 'Помилка надсилання. Спробуйте пізніше.';
      console.error('Error:', error);
    }
  });
}

function setupTheme() {
  const button = document.getElementById('theme-toggle');

  const applyTheme = (theme) => {
    document.body.classList.toggle('dark', theme === 'dark');
    button.textContent = theme === 'dark' ? '☀️ Денна тема' : '🌙 Нічна тема';
  };

  // Автоматично: день 07:00–21:00, інакше ніч
  const hours = new Date().getHours();
  applyTheme(hours >= 7 && hours < 21 ? 'light' : 'dark');

  // Вручну
  button.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('dark') ? 'light' : 'dark');
  });
}

// ===== Запуск =====
saveSystemInfo();
renderStorageInfo();
loadReviews();
setupModal();
setupTheme();
