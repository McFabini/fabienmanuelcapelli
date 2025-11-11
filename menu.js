document.addEventListener('DOMContentLoaded', () => {
  const menuBox = document.querySelector('.menu-box');
  let lastScroll = 0;

  if (menuBox) {
    // scroll handler to slightly hide menu on scroll down
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll && currentScroll > 50) {
        // scrolling down → move menu up a bit
        menuBox.style.transform = 'translateY(-70%)';
      } else if (currentScroll < lastScroll) {
        // scrolling up → restore
        menuBox.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    });

    // Hamburger toggle for mobile
    const toggle = menuBox.querySelector('.menu-toggle');
    const menuList = menuBox.querySelector('.menu-list');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuBox.classList.toggle('show');
      });
    }

    // Close the mobile menu when a link is clicked
    if (menuList) {
      menuList.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.tagName === 'A') {
          menuBox.classList.remove('show');
        }
      });
    }
  }

  // Show a small panel with links to MIDI and Orchestral compositions when
  // the Pricing "Learn More" (.button-12) is clicked. Clicking outside or the
  // close button hides the panel.
  const learnMoreBtn = document.querySelector('.button-12');
  if (!learnMoreBtn) return;

  let panel = null;

  function createPanel() {
    const p = document.createElement('div');
    p.className = 'pricing-panel';
    p.innerHTML = `
      <div class="pricing-panel__content" role="dialog" aria-modal="true" aria-label="Pricing options">
        <button class="pricing-panel__close" aria-label="Close">✕</button>
        <h4>Pricing options</h4>
        <p>Choose a composition type to see pricing and examples.</p>
        <ul>
          <li><a href="/pages/midi-compositions.html">MIDI Compositions</a></li>
          <li><a href="/pages/orchestral-compositions.html">Orchestral Compositions</a></li>
        </ul>
      </div>
    `;
    // close button
    p.querySelector('.pricing-panel__close').addEventListener('click', (e) => {
      e.stopPropagation();
      closePanel();
    });
    return p;
  }

  function openPanel() {
    if (panel) return;
    panel = createPanel();
    document.body.appendChild(panel);
    // allow CSS transition
    requestAnimationFrame(() => panel.classList.add('visible'));
    // close when clicking outside
    setTimeout(() => document.addEventListener('click', onDocClick), 0);
  }

  function closePanel() {
    if (!panel) return;
    panel.classList.remove('visible');
    panel.addEventListener('transitionend', () => {
      if (panel && panel.parentNode) panel.parentNode.removeChild(panel);
      panel = null;
    }, { once: true });
    document.removeEventListener('click', onDocClick);
  }

  function onDocClick(e) {
    if (!panel) return;
    if (panel.contains(e.target) || e.target === learnMoreBtn) return;
    closePanel();
  }

  learnMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (panel) closePanel();
    else openPanel();
  });
});

