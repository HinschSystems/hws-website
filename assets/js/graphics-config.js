(() => {
  const KEY = 'hwsGraphicsConfigV1';
  const form = document.getElementById('graphics-form');
  const clear = document.getElementById('clear-graphics');
  const message = document.getElementById('save-message');
  if (!form) return;

  const names = ['workspace','portal','workflow','control','ai','founder'];
  const presets = [...document.querySelectorAll('[data-preset-for]')];

  const read = () => {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; }
    catch (_) { return {}; }
  };

  const validUrl = value => {
    if (!value) return true;
    if (value.startsWith('/assets/img/graphics/')) return true;
    try {
      const url = new URL(value);
      return url.protocol === 'https:' || url.protocol === 'http:';
    } catch (_) {
      return false;
    }
  };

  const populate = () => {
    const config = read();
    names.forEach(name => {
      const input = form.elements[name];
      const value = config[name] || '';
      input.value = value;
      const select = document.querySelector('[data-preset-for="' + name + '"]');
      if (select) {
        select.value = [...select.options].some(option => option.value === value) ? value : '';
      }
    });
  };

  presets.forEach(select => {
    select.addEventListener('change', () => {
      const name = select.dataset.presetFor;
      const input = form.elements[name];
      if (!input) return;
      if (select.value) input.value = select.value;
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const next = {};
    let invalid = false;

    names.forEach(name => {
      const input = form.elements[name];
      const value = input.value.trim();
      const status = document.querySelector('[data-status="' + name + '"]');
      status.textContent = '';

      if (!validUrl(value)) {
        invalid = true;
        input.setAttribute('aria-invalid','true');
        status.textContent = 'Choose a hosted preset or enter a full http:// or https:// image URL.';
      } else {
        input.removeAttribute('aria-invalid');
        if (value) next[name] = value;
      }
    });

    if (invalid) {
      message.textContent = 'Fix the highlighted URL field before saving.';
      return;
    }

    localStorage.setItem(KEY, JSON.stringify(next));
    message.textContent = 'Saved. Opening the homepage with your selected graphics…';
    window.location.href = '/?graphics-preview=' + Date.now();
  });

  clear.addEventListener('click', () => {
    localStorage.removeItem(KEY);
    form.reset();
    names.forEach(name => {
      const status = document.querySelector('[data-status="' + name + '"]');
      if (status) status.textContent = '';
    });
    message.textContent = 'Cleared. Opening the clean placeholder version…';
    window.location.href = '/?graphics-preview=' + Date.now();
  });

  populate();
})();