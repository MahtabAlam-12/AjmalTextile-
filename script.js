const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '✕' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));
document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#enquiryForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    'Ajmal Textile website enquiry',
    `Name: ${data.get('name')}`,
    `Company: ${data.get('company') || 'Not provided'}`,
    `Contact: ${data.get('contact')}`,
    `Enquiry: ${data.get('type')}`,
    `Message: ${data.get('message')}`
  ].join('\n');
  const status = document.querySelector('#formStatus');
  status.innerHTML = '';
  const note = document.createElement('p');
  note.textContent = 'Your enquiry text is ready. Copy it below and send it to Ajmal Textile once the business email or WhatsApp number has been added.';
  const preview = document.createElement('textarea');
  preview.readOnly = true;
  preview.rows = 7;
  preview.style.width = '100%';
  preview.style.marginTop = '8px';
  preview.value = message;
  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.className = 'btn';
  copyButton.style.marginTop = '8px';
  copyButton.textContent = 'Copy Enquiry Text';
  copyButton.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(message); copyButton.textContent = 'Copied!'; }
    catch { preview.select(); document.execCommand('copy'); copyButton.textContent = 'Copied!'; }
  });
  status.append(note, preview, copyButton);
});
