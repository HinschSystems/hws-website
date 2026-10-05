(function () {
  'use strict';

  // Enables JS-dependent styles (mobile menu button).
  document.documentElement.classList.add('js');

  var button = document.querySelector('.menu-button');
  var menu = document.getElementById('mobile-menu');
  if (!button || !menu) return;

  var desktopQuery = window.matchMedia('(min-width: 1121px)');

  function setOpen(open) {
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Close' : 'Menu';
    menu.hidden = !open;
  }

  button.addEventListener('click', function () {
    setOpen(button.getAttribute('aria-expanded') !== 'true');
  });

  // Close after choosing a link.
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  // Close on Escape and return focus to the button.
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });

  // Reset when the viewport grows back to the desktop layout.
  var onChange = function (e) { if (e.matches) setOpen(false); };
  if (desktopQuery.addEventListener) desktopQuery.addEventListener('change', onChange);
  else if (desktopQuery.addListener) desktopQuery.addListener(onChange);
})();
