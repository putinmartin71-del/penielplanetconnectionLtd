

document.addEventListener('DOMContentLoaded', function() {
  // ============================================
  // CARD ANIMATIONS & INTERACTIONS
  // ============================================
  
  // Add entrance animation to cards
  const cards = document.querySelectorAll('.card, .video-card, .gallery-item');
  cards.forEach((card, index) => {
    card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s both`;
  });

  // ============================================
  // GALLERY LIGHTBOX (for Interior page)
  // ============================================
  
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (galleryItems.length > 0) {
    // Create modal element
    const modal = createLightboxModal();
    document.body.appendChild(modal);
    
    galleryItems.forEach((item) => {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const img = this.querySelector('img');
        const title = this.querySelector('h3') ? this.querySelector('h3').textContent : 'Gallery Image';
        openLightbox(modal, img.src, title);
      });
    });
  }

  // ============================================
  // VIDEO CARD HOVER EFFECTS
  // ============================================
  
  const videoCards = document.querySelectorAll('.video-card');
  videoCards.forEach((card) => {
    card.addEventListener('mouseenter', function() {
      const play = this.querySelector('.video-play');
      if (play) {
        play.style.animation = 'pulse 0.6s ease-out';
      }
    });
  });

  // ============================================
  // SECTION OBSERVER FOR SCROLL ANIMATIONS
  // ============================================
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.grid, .video-grid, .gallery').forEach((section) => {
    observer.observe(section);
  });

  // ============================================
  // SMOOTH SCROLL FOR NAVIGATION
  // ============================================
  
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ============================================
  // BADGE ANIMATION RESET
  // ============================================
  
  const badges = document.querySelectorAll('.badge');
  badges.forEach((badge) => {
    badge.addEventListener('mouseenter', function() {
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = 'badgePulse 2.5s ease-in-out infinite';
      }, 10);
    });
  });

  // ============================================
  // BUTTON RIPPLE EFFECT
  // ============================================
  
  document.querySelectorAll('.btn, .btn-outline').forEach((button) => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: ripple-spread 0.6s ease-out;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ============================================
  // FORM VALIDATION (for contact forms)
  // ============================================
  
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      if (!this.checkValidity()) {
        e.preventDefault();
        this.classList.add('was-validated');
      }
    });
  }

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        siteHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      } else {
        siteHeader.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
      }
      
      lastScrollTop = scrollTop;
    });
  }
});

/**
 * Create lightbox modal for gallery
 */
function createLightboxModal() {
  const modal = document.createElement('div');
  modal.id = 'lightbox-modal';
  modal.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close">&times;</button>
      <img id="lightbox-image" src="" alt="Gallery Image" />
      <div class="lightbox-title" id="lightbox-title"></div>
    </div>
  `;
  
  modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    justify-content: center;
    align-items: center;
    padding: 20px;
  `;
  
  const content = modal.querySelector('.lightbox-content');
  content.style.cssText = `
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  
  const img = modal.querySelector('#lightbox-image');
  img.style.cssText = `
    max-width: 100%;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 8px;
    animation: zoomIn 0.3s ease-out;
  `;
  
  const title = modal.querySelector('#lightbox-title');
  title.style.cssText = `
    color: white;
    margin-top: 20px;
    font-size: 1.1rem;
    font-weight: 600;
  `;
  
  const closeBtn = modal.querySelector('.lightbox-close');
  closeBtn.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1001;
    transition: transform 0.3s ease;
  `;
  
  closeBtn.addEventListener('mouseover', () => closeBtn.style.transform = 'scale(1.1)');
  closeBtn.addEventListener('mouseout', () => closeBtn.style.transform = 'scale(1)');
  closeBtn.addEventListener('click', () => closeLightbox(modal));
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox(modal);
  });
  
  return modal;
}

/**
 * Open lightbox modal
 */
function openLightbox(modal, imageSrc, title) {
  modal.querySelector('#lightbox-image').src = imageSrc;
  modal.querySelector('#lightbox-title').textContent = title;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

/**
 * Close lightbox modal
 */
function closeLightbox(modal) {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

/**
 * Add CSS animations
 */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
  
  @keyframes ripple-spread {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes badgePulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
`;

document.head.appendChild(style);
