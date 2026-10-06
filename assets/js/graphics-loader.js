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

  Object.entries(slots).forEach(([name, meta]) => {
    const url = typeof config[name] === 'string' ? config[name].trim() : '';
    if (!/^https?:\/\//i.test(url)) return;

    const frame = document.querySelector('[data-graphic-slot="' + name + '"]');
    if (!frame) return;

    const img = document.createElement('img');
    img.src = url;
    img.alt = meta.alt;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.addEventListener('error', () => {
      window.location.reload();
    }, { once: true });

    frame.replaceChildren(img);
    frame.classList.add('has-configured-image');
    frame.removeAttribute('aria-hidden');
  });
})();