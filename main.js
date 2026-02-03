// main.js
// Handles the Yes/No option buttons

document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.querySelector('.option.yes');
  const noBtn = document.querySelector('.option.no');

  function disableAll() {
    yesBtn.disabled = true;
    noBtn.disabled = true;
  }

  function setSelected(btn) {
    btn.setAttribute('aria-pressed', 'true');
    btn.classList.add('selected');
  }

  yesBtn.addEventListener('click', () => {
    setSelected(yesBtn);
    disableAll();
    // Show the swinging message with the requested text
    showSwingMessage('I love you from STELI');
  });

  // Show a swinging message (accessible, dismissible)
  function showSwingMessage(text) {
    const swing = document.querySelector('.swing-message');
    if (!swing) return;
    const card = swing.querySelector('.swing-card');
    const swingText = swing.querySelector('.swing-text');
    const closeBtn = swing.querySelector('.swing-close');

    swingText.textContent = text;
    swing.removeAttribute('hidden');
    swing.setAttribute('aria-hidden', 'false');

    // Entrance and then gentle swing
    setTimeout(() => {
      card.classList.remove('swinging');
      setTimeout(() => card.classList.add('swinging'), 800);
      closeBtn.focus();
    }, 20);

    function hide() {
      card.classList.remove('swinging');
      swing.setAttribute('hidden', '');
      swing.setAttribute('aria-hidden', 'true');
      closeBtn.removeEventListener('click', onClose);
      document.removeEventListener('keydown', onKey);
    }

    function onClose() { hide(); }
    function onKey(e) { if (e.key === 'Escape') hide(); }

    closeBtn.addEventListener('click', onClose);
    document.addEventListener('keydown', onKey);

    // Auto-hide after a short time
    const autoHide = setTimeout(() => { if (!swing.hasAttribute('hidden')) hide(); }, 6000);
  }

  noBtn.addEventListener('click', () => {
    setSelected(noBtn);
    disableAll();
    // Optional feedback for No can go here
  });

  // Keyboard activation (Space / Enter)
  [yesBtn, noBtn].forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
});