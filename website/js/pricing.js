(() => {
  const config = window.FATASHBOT_PRICING;
  if (!config) return;
  const grid = document.querySelector('[data-pricing-grid]');
  if (!grid) return;

  const money = value => new Intl.NumberFormat('en-US', {
    style: 'currency', currency: config.currency, minimumFractionDigits: 2
  }).format(value);

  grid.innerHTML = config.tiers.map(tier => `
    <article class="price-card reveal ${tier.featured ? 'featured' : ''} ${tier.premium ? 'premium' : ''}">
      <div class="price-card-top">
        <span class="price-badge">${tier.badge}</span>
        <span class="tier-status">${tier.status} status</span>
      </div>
      <h2>${tier.name}</h2>
      <p class="tier-kicker">${tier.kicker}</p>
      <div class="price-line"><strong>${money(tier.price)}</strong><span>${tier.suffix}</span></div>
      <a class="button button-primary tier-buy" href="#purchase" data-tier="${tier.id}">Buy ${tier.name}</a>
      <div class="perk-divider"></div>
      <p class="included-label">INCLUDED</p>
      <ul class="perk-list">${tier.perks.map(perk => `<li><span>✓</span>${perk}</li>`).join('')}</ul>
    </article>
  `).join('');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .06 });
  grid.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const panel = document.querySelector('[data-purchase-panel]');
  const selectedName = document.querySelector('[data-selected-tier]');
  const selectedDetail = document.querySelector('[data-selected-detail]');
  const contact = document.querySelector('[data-contact-purchase]');
  const closeButtons = document.querySelectorAll('[data-close-purchase]');

  function chooseTier(id) {
    const tier = config.tiers.find(item => item.id === id);
    if (!tier || !panel) return;
    selectedName.textContent = `${tier.name} · ${tier.status}`;
    selectedDetail.textContent = `${money(tier.price)} ${tier.suffix}. Purchasing is currently handled directly by Astroolean while checkout integration is being finalized.`;
    contact.href = config.contactUrl;
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add('open'));
    panel.querySelector('.purchase-dialog')?.focus();
  }

  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-tier]');
    if (!button) return;
    event.preventDefault();
    chooseTier(button.dataset.tier);
  });

  function dismiss() {
    if (!panel) return;
    panel.classList.remove('open');
    setTimeout(() => { panel.hidden = true; }, 180);
  }
  closeButtons.forEach(button => button.addEventListener('click', dismiss));
  panel?.addEventListener('click', e => { if (e.target === panel) dismiss(); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && panel && !panel.hidden) dismiss(); });
})();
