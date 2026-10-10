const menu=document.querySelector('.menu-toggle');menu?.addEventListener('click',()=>{const open=document.querySelector('nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
const box=document.querySelector('#lightbox');document.querySelectorAll('.project').forEach(p=>p.addEventListener('click',()=>{box.querySelector('img').src=p.dataset.image;box.querySelector('img').alt=p.getAttribute('aria-label').replace('View ','');box.showModal()}));box?.querySelector('button').addEventListener('click',()=>box.close());box?.addEventListener('click',e=>{if(e.target===box)box.close()});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('[data-category]').forEach(p=>p.hidden=b.dataset.filter!=='All'&&p.dataset.category!==b.dataset.filter)}));
document.querySelector('#estimate-form')?.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.target);const body='Free estimate request — Coast to Coast Construction Group\n\n'+Array.from(data,([k,v])=>k+': '+v).join('\n');document.querySelector('#request-text').value=body;document.querySelector('#send-text').href='sms:+17279227630?body='+encodeURIComponent(body);document.querySelector('#request-summary').hidden=false;document.querySelector('#form-status').textContent='Your request is prepared. Send it by text below, or call the team.';document.querySelector('#request-summary').scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});

// Parallax scroll effect for hero sections
(() => {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const heroes = document.querySelectorAll('.hero');
  if (!heroes.length) return;

  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
    heroes.forEach(hero => {
      const rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const bgY = Math.round(scrollY * 0.35);
        const contentY = Math.round(scrollY * 0.12);
        hero.style.setProperty('--parallax-y', `${bgY}px`);
        hero.style.setProperty('--content-parallax-y', `${contentY}px`);
      }
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });

  updateParallax();
})();

// Free Estimate Contact Form Modal
const ensureEstimateModal = () => {
  let modal = document.getElementById('estimate-modal');
  if (modal) return modal;

  modal = document.createElement('dialog');
  modal.id = 'estimate-modal';
  modal.setAttribute('aria-labelledby', 'estimate-modal-title');
  modal.innerHTML = `
    <div class="modal-header">
      <p class="eyebrow">NO OBLIGATION · FAST RESPONSE</p>
      <h2 id="estimate-modal-title">Request a Free Estimate</h2>
      <p>Tell us about your project in Clearwater & Tampa Bay. We'll be in touch with a personalized quote.</p>
      <button class="close-modal" type="button" aria-label="Close estimate form">×</button>
    </div>
    <div class="modal-body">
      <form id="modal-estimate-form" class="modal-form">
        <div class="form-grid">
          <label>Full Name *
            <input name="Name" required autocomplete="name" placeholder="Your name">
          </label>
          <label>Phone Number *
            <input name="Phone" required type="tel" autocomplete="tel" placeholder="(727) 922-7630">
          </label>
          <label>Email Address *
            <input name="Email" required type="email" autocomplete="email" placeholder="your@email.com">
          </label>
          <label>Service Needed *
            <select name="Service" required>
              <option value="">Select a service</option>
              <option value="Residential Remodeling">Residential Remodeling</option>
              <option value="Kitchen Remodeling">Kitchen Remodeling</option>
              <option value="Bathroom Remodeling">Bathroom Remodeling</option>
              <option value="Custom Pool Construction">Custom Pool Construction</option>
              <option value="Roofing (Repair & Install)">Roofing (Repair & Install)</option>
              <option value="Decks & Additions">Decks & Additions</option>
              <option value="Commercial Construction">Commercial Construction</option>
              <option value="New Construction">New Construction</option>
              <option value="Storm Drainage">Storm Drainage</option><option value="Other">Other Construction Work</option>
            </select>
          </label>
          <label class="wide">Preferred Contact Method
            <select name="Contact preference">
              <option value="Phone call">Phone Call</option>
              <option value="Text message">Text Message</option>
              <option value="Email">Email</option>
            </select>
          </label>
          <label class="wide">Project Details & Location *
            <textarea name="Project" rows="4" required placeholder="Tell us about your project scope, location in the Tampa Bay area, timeline, or any specific questions..."></textarea>
          </label>
        </div>
        <div class="modal-actions">
          <span class="modal-security">✓ 100% Family-Owned &bull; Licensed &amp; Insured in Florida</span>
          <button class="button" type="submit">Submit Estimate Request <span>↗</span></button>
        </div>
      </form>
      <div id="modal-success" class="estimate-success" hidden>
        <div class="success-badge">✓</div>
        <h3>Estimate Request Received!</h3>
        <p id="modal-success-message">Thank you! Our Clearwater team will review your project details and reach out shortly.</p>
        <div class="success-actions">
          <a id="modal-sms-btn" class="button" href="#">Send as Text Message (SMS) <span>↗</span></a>
          <a class="button outline" href="tel:+17279227630" style="color:var(--green);border-color:var(--green)">Call (727) 922-7630</a>
          <button type="button" class="button close-success" style="background:#eae4d6;color:var(--green);border-color:#eae4d6">Done</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const closeBtn = modal.querySelector('.close-modal');
  closeBtn?.addEventListener('click', () => modal.close());

  const doneBtn = modal.querySelector('.close-success');
  doneBtn?.addEventListener('click', () => modal.close());

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

  const form = modal.querySelector('#modal-estimate-form');
  const successBox = modal.querySelector('#modal-success');
  const successMsg = modal.querySelector('#modal-success-message');
  const smsBtn = modal.querySelector('#modal-sms-btn');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('Name') || 'there';
    const service = data.get('Service') || 'your project';
    const pref = data.get('Contact preference') || 'Phone';
    const phone = data.get('Phone') || '';
    const email = data.get('Email') || '';
    const project = data.get('Project') || '';

    const summaryText = `Free estimate request — Coast to Coast Construction Group\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nPreference: ${pref}\nDetails: ${project}`;

    if (smsBtn) {
      smsBtn.href = `sms:+17279227630?body=${encodeURIComponent(summaryText)}`;
    }

    if (successMsg) {
      successMsg.textContent = `Thank you, ${name}! We have received your request for ${service}. Our Clearwater team will review it and contact you via ${pref.toLowerCase()} shortly.`;
    }

    form.hidden = true;
    successBox.hidden = false;
  });

  return modal;
};

const openEstimateModal = (initialService = '') => {
  const modal = ensureEstimateModal();
  const form = modal.querySelector('#modal-estimate-form');
  const successBox = modal.querySelector('#modal-success');

  if (successBox && !successBox.hidden) {
    form?.reset();
    form.hidden = false;
    successBox.hidden = true;
  }

  if (initialService && form) {
    const serviceSelect = form.querySelector('select[name="Service"]');
    if (serviceSelect) {
      for (const opt of serviceSelect.options) {
        if (opt.value.toLowerCase().includes(initialService.toLowerCase())) {
          serviceSelect.value = opt.value;
          break;
        }
      }
    }
  }

  modal.showModal();
};

// Handle clicks on any Free Estimate buttons/links across all pages
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('a[href*="/free-estimate/"], a[href="/free-estimate"], a[href="free-estimate/"], button.open-estimate');
  if (trigger) {
    e.preventDefault();
    const text = (trigger.textContent || '').toLowerCase();
    let serviceHint = '';
    if (text.includes('pool')) serviceHint = 'Pool';
    else if (text.includes('kitchen')) serviceHint = 'Kitchen';
    else if (text.includes('bath')) serviceHint = 'Bathroom';
    else if (text.includes('roof')) serviceHint = 'Roofing';
    else if (text.includes('drain')) serviceHint = 'Storm Drainage';
    openEstimateModal(serviceHint);
  }
});

