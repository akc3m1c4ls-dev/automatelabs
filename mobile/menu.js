(() => {
  const menuButton = document.querySelector('.menu-button');
  const menu = document.querySelector('.mobile-menu');
  if (!menuButton || !menu) return;

  const close = () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  };

  menuButton.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '×' : '☰';
  });

  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) close();
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !menuButton.contains(event.target)) close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) close();
  });
})();
