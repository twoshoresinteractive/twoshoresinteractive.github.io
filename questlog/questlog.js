const screenButtons = document.querySelectorAll('[data-screen]');
const screenImage = document.getElementById('screen-image');
const screenTitle = document.getElementById('screen-title');
const screenCaption = document.getElementById('screen-caption');
const screenLink = document.getElementById('screen-link');
const screenImageLink = document.getElementById('screen-image-link');

// Keep a direct image link available so every screenshot can be inspected at
// full resolution with the browser's native zoom and keyboard controls.
for (const button of screenButtons) {
  button.addEventListener('click', () => {
    const path = 'assets/' + button.dataset.screen;
    for (const other of screenButtons) {
      other.setAttribute('aria-pressed', String(other === button));
    }
    screenImage.src = path;
    screenImage.alt = button.dataset.title + ' in Questlog';
    screenTitle.textContent = button.dataset.title;
    screenCaption.textContent = button.dataset.caption;
    screenLink.href = path;
    screenImageLink.href = path;
  });
}
