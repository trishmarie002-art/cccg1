const menu=document.querySelector('.menu-toggle');menu?.addEventListener('click',()=>{const open=document.querySelector('nav').classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
const box=document.querySelector('#lightbox');document.querySelectorAll('.project').forEach(p=>p.addEventListener('click',()=>{box.querySelector('img').src=p.dataset.image;box.querySelector('img').alt=p.getAttribute('aria-label').replace('View ','');box.showModal()}));document.querySelectorAll('.review-screenshot a, .review-screenshot img').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();const src=el.getAttribute('href')||el.getAttribute('src');if(box&&src){box.querySelector('img').src=src;box.querySelector('img').alt=el.getAttribute('alt')||'Customer Google Review';box.showModal()}}));box?.querySelector('button').addEventListener('click',()=>box.close());box?.addEventListener('click',e=>{if(e.target===box)box.close()});
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

// Ensure hero background video autoplay and optimized playback speed
(() => {
  const video = document.querySelector('.hero-video');
  if (!video) return;
  video.muted = true;
  const SPEED = 1.35;
  video.defaultPlaybackRate = SPEED;
  video.playbackRate = SPEED;

  const enforceSpeed = () => {
    try {
      video.playbackRate = SPEED;
    } catch (_) {}
  };

  video.addEventListener('loadedmetadata', enforceSpeed);
  video.addEventListener('canplay', enforceSpeed);
  video.addEventListener('play', enforceSpeed);

  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.then(enforceSpeed).catch(() => {
      const playOnInteract = () => {
        enforceSpeed();
        video.play().then(enforceSpeed).catch(() => {});
        window.removeEventListener('touchstart', playOnInteract);
        window.removeEventListener('click', playOnInteract);
        window.removeEventListener('scroll', playOnInteract);
      };
      window.addEventListener('touchstart', playOnInteract, { passive: true });
      window.addEventListener('click', playOnInteract);
      window.addEventListener('scroll', playOnInteract, { passive: true });
    });
  }
})();

// Magic golden particle stardust effect for hero
(() => {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.querySelector('.hero-magic-canvas');
  const hero = document.querySelector('.home-hero');
  if (!canvas || !hero) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = hero.offsetWidth);
  let height = (canvas.height = hero.offsetHeight);

  const resize = () => {
    if (!hero) return;
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  };
  window.addEventListener('resize', resize, { passive: true });

  const colors = [
    'rgba(217, 166, 46, ',
    'rgba(255, 230, 140, ',
    'rgba(255, 255, 255, ',
    'rgba(230, 193, 107, '
  ];

  class MagicParticle {
    constructor(x, y, isBurst = false) {
      this.reset(x, y, isBurst);
    }
    reset(x, y, isBurst = false) {
      this.x = x !== undefined ? x : Math.random() * width;
      this.y = y !== undefined ? y : Math.random() * height;
      this.size = Math.random() * 2.2 + 0.8;
      this.isSparkle = Math.random() < 0.3;
      this.speedY = isBurst ? (Math.random() * -1.8 - 0.4) : (Math.random() * -0.6 - 0.25);
      this.speedX = isBurst ? ((Math.random() - 0.5) * 1.6) : ((Math.random() - 0.5) * 0.4);
      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = isBurst ? 1 : Math.random() * 0.7 + 0.2;
      this.fadeSpeed = isBurst ? (Math.random() * 0.02 + 0.015) : (Math.random() * 0.005 + 0.002);
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.04 + 0.02;
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.pulse) * 0.2;
      this.pulse += this.pulseSpeed;
      this.alpha -= this.fadeSpeed;
      if (this.alpha <= 0 || this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset(Math.random() * width, height + 10, false);
      }
    }
    draw() {
      if (this.alpha <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
      ctx.fillStyle = this.colorBase + this.alpha + ')';
      ctx.shadowColor = '#d9a62e';
      ctx.shadowBlur = this.isSparkle ? 10 : 4;

      if (this.isSparkle) {
        const r = this.size * 2.4;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - r);
        ctx.quadraticCurveTo(this.x, this.y, this.x + r, this.y);
        ctx.quadraticCurveTo(this.x, this.y, this.x, this.y + r);
        ctx.quadraticCurveTo(this.x, this.y, this.x - r, this.y);
        ctx.quadraticCurveTo(this.x, this.y, this.x, this.y - r);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  const particleCount = 40;
  const particles = Array.from({ length: particleCount }, () => new MagicParticle());

  let lastSpawn = 0;
  const handlePointer = (e) => {
    const now = performance.now();
    if (now - lastSpawn < 35) return;
    lastSpawn = now;
    const rect = hero.getBoundingClientRect();
    const px = (e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0]?.clientX)) - rect.left;
    const py = (e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0]?.clientY)) - rect.top;
    if (px >= 0 && px <= width && py >= 0 && py <= height) {
      for (let i = 0; i < 3; i++) {
        particles.push(new MagicParticle(px + (Math.random() - 0.5) * 16, py + (Math.random() - 0.5) * 16, true));
      }
      if (particles.length > 70) particles.splice(0, particles.length - 70);
    }
  };

  hero.addEventListener('mousemove', handlePointer, { passive: true });
  hero.addEventListener('touchmove', handlePointer, { passive: true });

  let isVisible = true;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(hero);
  }

  const animate = () => {
    if (isVisible) {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
    }
    requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
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


/* Site-wide mobile contact bar and progressive scroll reveals */
(() => {
  const bar = document.createElement('div');
  bar.className = 'mobile-contact-bar';
  bar.setAttribute('role', 'group');
  bar.setAttribute('aria-label', 'Contact Coast to Coast');
  bar.innerHTML = '<a class="contact-call" href="tel:+17279227630" aria-label="Call Coast to Coast at (727) 922-7630"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z"/></svg>Call Us</a><a class="contact-text" href="sms:+17279227630" aria-label="Text Coast to Coast at (727) 922-7630"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v12H9l-5 4V4Z"/><path d="M8 8h8M8 12h5"/></svg>Text Us</a>';
  document.body.appendChild(bar);
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;
  const elements = document.querySelectorAll('main .section-head, main .three > article, main .split, main .mission, main .project-grid > .project, main .review-screenshot, main .faq-list, main .area, main .home-contact-grid > *, main .cta');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0, rootMargin: '0px 0px -24px 0px'});
  elements.forEach(element => {
    if (element.getBoundingClientRect().top < window.innerHeight) return;
    element.classList.add('scroll-reveal');
    observer.observe(element);
    element.addEventListener('focusin', () => {
      element.classList.add('is-visible');
      observer.unobserve(element);
    });
  });
  motion.addEventListener('change', event => {
    if (event.matches) {
      elements.forEach(element => element.classList.add('is-visible'));
      observer.disconnect();
    }
  });
})();
