(() => {
  const KEY = 'hwsGraphicsConfigV1';
  const slots = {
    workspace: { alt: 'Operating workspace interface concept' },
    portal: { alt: 'Customer and client portal interface concept' },
    workflow: { alt: 'Queue and workflow interface concept' },
    control: { alt: 'Management and control interface concept' },
    ai: { alt: 'Governed AI interface concept' },
    founder: { alt: 'HWS founder and point-of-view visual' }
  };

  let config = {};
  try {
    config = JSON.parse(localStorage.getItem(KEY) || '{}') || {};
  } catch (_) {
    return;
  }

  const allowedUrl = value => {
    if (!value) return false;
    if (value.startsWith('/assets/img/graphics/')) return true;
    return /^https?:\/\//i.test(value);
  };

  Object.entries(slots).forEach(([name, meta]) => {
    const url = typeof config[name] === 'string' ? config[name].trim() : '';
    if (!allowedUrl(url)) return;

    const frame = document.querySelector('[data-graphic-slot="' + name + '"]');
    if (!frame) return;

    const img = document.createElement('img');
    img.alt = meta.alt;
    img.loading = 'lazy';
    img.decoding = 'async';

    img.addEventListener('load', () => {
      frame.replaceChildren(img);
      frame.classList.add('has-configured-image');
      frame.removeAttribute('aria-hidden');
    }, { once: true });

    img.addEventListener('error', () => {
      console.warn('HWS graphic failed to load:', name, url);
    }, { once: true });

    img.src = url;
  });
})();