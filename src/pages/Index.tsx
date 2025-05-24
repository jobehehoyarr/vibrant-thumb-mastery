import React, { useEffect, useRef } from 'react';

const Index = () => {
  const titleIndex = useRef(0);
  const titles = ['Thumbnail Designer', 'Thumbnail Artist', 'Attention Expert', 'Thumbnail Pro'];

  useEffect(() => {
    // Navigation scroll effect
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    };

    // Hero title animation
    const animateTitle = () => {
      const titleElements = document.querySelectorAll('.animated-title');
      
      if (titleElements.length === 0) return;
      
      titleElements.forEach(title => title.classList.remove('active'));
      titleIndex.current = (titleIndex.current + 1) % titles.length;
      titleElements[titleIndex.current].classList.add('active');
    };

    // FAQ accordion functionality
    const handleFAQClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('faq-question')) {
        const item = target.closest('.faq-item');
        const isActive = item?.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(faqItem => {
          faqItem.classList.remove('active');
        });
        
        if (!isActive && item) {
          item.classList.add('active');
        }
      }
    };

    // Process step switching
    const handleStepClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('step-btn') || target.closest('.step-btn')) {
        const btn = target.classList.contains('step-btn') ? target : target.closest('.step-btn') as HTMLElement;
        const stepIndex = btn.getAttribute('data-step');
        
        document.querySelectorAll('.step-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.process-step').forEach(s => s.classList.remove('active'));
        
        btn.classList.add('active');
        const targetStep = document.querySelector(`.process-step[data-step="${stepIndex}"]`);
        if (targetStep) {
          targetStep.classList.add('active');
        }
      }
    };

    // Contact form submission
    const handleFormSubmit = (e: Event) => {
      e.preventDefault();
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      console.log('Form submitted:', data);
      alert('Thank you for your message! I\'ll get back to you within 24 hours.');
      form.reset();
    };

    // Duplicate content for seamless scrolling
    const duplicateContent = () => {
      // Duplicate thumbnail rows content
      document.querySelectorAll('.thumbnail-row-content').forEach(content => {
        const children = Array.from(content.children);
        // Add multiple duplicates for seamless loop
        for (let i = 0; i < 3; i++) {
          children.forEach(child => {
            const clone = child.cloneNode(true);
            content.appendChild(clone);
          });
        }
      });

      // Duplicate testimonials content
      const testimonialsContent = document.querySelector('.testimonials-content');
      if (testimonialsContent) {
        const children = Array.from(testimonialsContent.children);
        // Add multiple duplicates for seamless loop
        for (let i = 0; i < 3; i++) {
          children.forEach(child => {
            const clone = child.cloneNode(true);
            testimonialsContent.appendChild(clone);
          });
        }
      }

      // Duplicate clients content
      const clientsContent = document.querySelector('.clients-content');
      if (clientsContent) {
        const children = Array.from(clientsContent.children);
        children.forEach(child => {
          const clone = child.cloneNode(true);
          clientsContent.appendChild(clone);
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleFAQClick);
    document.addEventListener('click', handleStepClick);
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);
    }

    const titleInterval = setInterval(animateTitle, 3000);

    // Set initial active states and duplicate content
    setTimeout(() => {
      const firstTitle = document.querySelector('.animated-title');
      if (firstTitle) {
        firstTitle.classList.add('active');
      }
      
      const firstStepBtn = document.querySelector('.step-btn');
      if (firstStepBtn) {
        firstStepBtn.classList.add('active');
      }
      
      const firstProcessStep = document.querySelector('.process-step');
      if (firstProcessStep) {
        firstProcessStep.classList.add('active');
      }

      // Duplicate content for seamless scrolling
      duplicateContent();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleFAQClick);
      document.removeEventListener('click', handleStepClick);
      clearInterval(titleInterval);
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav id="navbar" className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <img src="/api/placeholder/40/40" alt="Hasnaat" className="nav-avatar" />
          </div>
          <div className="nav-links">
            <a href="#process" className="nav-link">Process</a>
            <a href="#gallery" className="nav-link">Portfolio</a>
            <a href="#testimonials" className="nav-link">Reviews</a>
            <a href="#faq" className="nav-link">FAQs</a>
          </div>
          <button className="btn-get-in-touch" onClick={scrollToContact}>Get In Touch</button>
          <button className="mobile-menu-btn">
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Hey, Hasnaat is a<br />
            <div className="title-container">
              <span className="animated-title">Thumbnail Designer</span>
              <span className="animated-title">Thumbnail Artist</span>
              <span className="animated-title">Attention Expert</span>
              <span className="animated-title">Thumbnail Pro</span>
            </div>
          </h1>
          <p className="hero-description">
            Hasnaat designs YouTube thumbnails that captivate<br />
            audiences by leveraging viewer psychology and dynamic,<br />
            eye-catching visuals.
          </p>
          <button className="btn btn-primary" onClick={scrollToContact}>Start a project</button>
        </div>

        <div className="clients-scroll">
          <div className="clients-content">
            <div className="client-item">
              <img src="/api/placeholder/60/60" alt="Lamb Studio" className="client-avatar" />
              <div className="client-info">
                <span className="client-name">Lamb Studio</span>
              </div>
            </div>
            <div className="client-item">
              <img src="/api/placeholder/60/60" alt="Tori Trades" className="client-avatar" />
              <div className="client-info">
                <span className="client-name">Tori Trades</span>
                <span className="client-subs">25K subscribers</span>
              </div>
            </div>
            <div className="client-item">
              <img src="/api/placeholder/60/60" alt="400Ft" className="client-avatar" />
              <div className="client-info">
                <span className="client-name">400Ft</span>
                <span className="client-subs">1.4M subscribers</span>
              </div>
            </div>
            <div className="client-item">
              <img src="/api/placeholder/60/60" alt="Adam Couser" className="client-avatar" />
              <div className="client-info">
                <span className="client-name">Adam Couser</span>
                <span className="client-subs">358K subscribers</span>
              </div>
            </div>
            <div className="client-item">
              <img src="/api/placeholder/60/60" alt="Bailed In" className="client-avatar" />
              <div className="client-info">
                <span className="client-name">Bailed In</span>
                <span className="client-subs">702K subscribers</span>
              </div>
            </div>
            <div className="client-item">
              <img src="/api/placeholder/60/60" alt="BradyYourTutor" className="client-avatar" />
              <div className="client-info">
                <span className="client-name">BradyYourTutor</span>
                <span className="client-subs">1.8M subscribers</span>
              </div>
            </div>
            <div className="client-item">
              <img src="/api/placeholder/60/60" alt="Fama Millonaria" className="client-avatar" />
              <div className="client-info">
                <span className="client-name">Fama Millonaria</span>
                <span className="client-subs">1.5K subscribers</span>
              </div>
            </div>
            <div className="client-item">
              <img src="/api/placeholder/60/60" alt="Bret Maverick" className="client-avatar" />
              <div className="client-info">
                <span className="client-name">Bret Maverick</span>
                <span className="client-subs">1.8M subscribers</span>
              </div>
            </div>
            <div className="client-item">
              <img src="/api/placeholder/60/60" alt="Felon_s Footprints" className="client-avatar" />
              <div className="client-info">
                <span className="client-name">Felon's Footprints</span>
                <span className="client-subs">297K subscribers</span>
              </div>
            </div>
            <div className="client-item">
              <img src="/api/placeholder/60/60" alt="Leo Moore" className="client-avatar" />
              <div className="client-info">
                <span className="client-name">Leo Moore</span>
                <span className="client-subs">4K subscribers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="process">
        <div className="container">
          <h2 className="section-title">How I make my Thumbnails</h2>
          <div className="process-steps">
            <button className="step-btn active" data-step="0">
              <span className="step-dot"></span>
              Details
            </button>
            <button className="step-btn" data-step="1">
              <span className="step-dot"></span>
              Concept
            </button>
            <button className="step-btn" data-step="2">
              <span className="step-dot"></span>
              Design
            </button>
            <button className="step-btn" data-step="3">
              <span className="step-dot"></span>
              Finalized
            </button>
          </div>
          <div className="process-content">
            <div className="process-step active" data-step="0">
              <div className="step-visual">
                <img src="/api/placeholder/400/250" alt="Details step illustration" className="step-image" />
              </div>
              <div className="step-info">
                <div className="step-label">Step 1</div>
                <h3>Details about project</h3>
                <p>You provide the key details for your thumbnail, and we finalize the agreement.</p>
              </div>
            </div>
            <div className="process-step" data-step="1">
              <div className="step-visual">
                <img src="/api/placeholder/400/250" alt="Concept step illustration" className="step-image" />
              </div>
              <div className="step-info">
                <div className="step-label">Step 2</div>
                <h3>Concept</h3>
                <p>I will begin researching effective thumbnail concepts for you and provide initial sketches for review.</p>
              </div>
            </div>
            <div className="process-step" data-step="2">
              <div className="step-visual">
                <img src="/api/placeholder/400/250" alt="Design step illustration" className="step-image" />
              </div>
              <div className="step-info">
                <div className="step-label">Step 3</div>
                <h3>Design</h3>
                <p>I dedicate myself fully to crafting your thumbnail, ensuring it captures attention and stands out effectively.</p>
              </div>
            </div>
            <div className="process-step" data-step="3">
              <div className="step-visual">
                <img src="/api/placeholder/400/250" alt="Finalized step illustration" className="step-image" />
              </div>
              <div className="step-info">
                <div className="step-label">Step 4</div>
                <h3>Finalized</h3>
                <p>After completing feedback rounds, I deliver the polished, captivating final thumbnail.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Updated with three rows */}
      <section id="gallery" className="gallery">
        <div className="gallery-container">
          <h2 className="gallery-title">Thumbnail Portfolio</h2>
          <div className="gallery-box">
            {/* First Row - Moving Left */}
            <div className="thumbnail-row left-scroll">
              <div className="thumbnail-row-content">
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=280&h=157&fit=crop" alt="Thumbnail 1" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=280&h=157&fit=crop" alt="Thumbnail 2" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=280&h=157&fit=crop" alt="Thumbnail 3" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=280&h=157&fit=crop" alt="Thumbnail 4" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=280&h=157&fit=crop" alt="Thumbnail 5" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=280&h=157&fit=crop" alt="Thumbnail 6" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=280&h=157&fit=crop" alt="Thumbnail 7" />
                </div>
              </div>
            </div>

            {/* Second Row - Moving Right */}
            <div className="thumbnail-row right-scroll">
              <div className="thumbnail-row-content">
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=280&h=157&fit=crop" alt="Thumbnail 8" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=280&h=157&fit=crop" alt="Thumbnail 9" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=280&h=157&fit=crop" alt="Thumbnail 10" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=280&h=157&fit=crop" alt="Thumbnail 11" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=280&h=157&fit=crop" alt="Thumbnail 12" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=280&h=157&fit=crop" alt="Thumbnail 13" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=280&h=157&fit=crop" alt="Thumbnail 14" />
                </div>
              </div>
            </div>

            {/* Third Row - Moving Left */}
            <div className="thumbnail-row left-scroll">
              <div className="thumbnail-row-content">
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=280&h=157&fit=crop" alt="Thumbnail 15" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=280&h=157&fit=crop" alt="Thumbnail 16" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=280&h=157&fit=crop" alt="Thumbnail 17" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=280&h=157&fit=crop" alt="Thumbnail 18" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=280&h=157&fit=crop" alt="Thumbnail 19" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=280&h=157&fit=crop" alt="Thumbnail 20" />
                </div>
                <div className="thumbnail-item">
                  <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=280&h=157&fit=crop" alt="Thumbnail 21" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Updated to match design */}
      <section id="testimonials" className="testimonials">
        <h2 className="testimonials-title">Testimonials</h2>
        <div className="testimonials-marquee">
          <div className="testimonials-content">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src="/api/placeholder/50/50" alt="Shondie Andretti" className="testimonial-avatar" />
                <div className="testimonial-author">
                  <h4>Shondie Andretti</h4>
                  <span>Youtube Content Creator</span>
                </div>
              </div>
              <p>"I was impressed by Hasnaat's creativity and attention to detail. He's a fellow youtuber and made the design process enjoyable!"</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src="/api/placeholder/50/50" alt="Corey Trades" className="testimonial-avatar" />
                <div className="testimonial-author">
                  <h4>Corey Trades</h4>
                  <span>Marketing agency and content creator</span>
                </div>
              </div>
              <p>"Hasnaat is a true master of his craft! As a marketing agency and content creator with over 700K followers, I've worked with countless designers, but Hasnaat's eye-catching thumbnails are truly a cut above the rest."</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src="/api/placeholder/50/50" alt="Abdullah" className="testimonial-avatar" />
                <div className="testimonial-author">
                  <h4>Abdullah</h4>
                  <span>Agency Owner</span>
                </div>
              </div>
              <p>"Even though I am not one of Hasnaat's clients, his work is still very impressive to me as a fellow designer, he makes very unique thumbnails and his quality and focus to his craft is incredible."</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src="/api/placeholder/50/50" alt="Georgejustdidit" className="testimonial-avatar" />
                <div className="testimonial-author">
                  <h4>Georgejustdidit</h4>
                  <span>Youtube Content Creator</span>
                </div>
              </div>
              <p>"Elite Thumbnail Maker! Worth every dime. You don't want to be in the Trenches for 10 Hours, I promise you!!!"</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src="/api/placeholder/50/50" alt="Felon's Footprint" className="testimonial-avatar" />
                <div className="testimonial-author">
                  <h4>Felon's Footprint</h4>
                  <span>Youtube Content Creator</span>
                </div>
              </div>
              <p>"Working with Hasnaat has been an absolute pleasure. He's a dedicated thumbnail artist with a great eye for design, consistently delivering thumbnails that stand out and fit my content perfectly."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="contact-title">Get in touch with me</h2>
          <p className="contact-subtitle">Fill out this form to start creating thumbnails that grab attention and boost your channel's growth!</p>
          
          <form className="contact-form" id="contactForm">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="i.e. Hasnaat" required />
            </div>
            <div className="form-group">
              <label htmlFor="contactMethod">How should I contact you</label>
              <select id="contactMethod" name="contactMethod" required>
                <option value="">Select...</option>
                <option value="email">Email</option>
                <option value="discord">Discord</option>
                <option value="twitter">Twitter/X</option>
                <option value="instagram">Instagram</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="contact">Social Media/Email</label>
              <input type="text" id="contact" name="contact" placeholder="i.e. Hasnaat@gmail.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="projectDescription">Project Description</label>
              <textarea id="projectDescription" name="projectDescription" rows={6} placeholder="Hey there, I am Hasnaat" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-full">Submit</button>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">Get quick answers to the most common questions about my Service.</p>
          
          <div className="faq-items">
            <div className="faq-item">
              <button className="faq-question">
                What range of services do you provide as a professional thumbnail artist?
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                I provide comprehensive thumbnail design services including custom YouTube thumbnails, A/B testing variations, brand-consistent designs, and quick turnaround options for urgent projects.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                What specific information and resources does Hasnaat need to create a highly effective thumbnail?
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                I need your video title, target audience information, brand colors/style guide, any specific elements you want included, and examples of thumbnails that inspire you or perform well in your niche.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                What is the pricing for a custom-designed thumbnail?
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                Pricing varies based on complexity and turnaround time. Standard thumbnails start at $25, with rush orders and complex designs priced accordingly. Contact me for a detailed quote.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                What is the estimated timeframe for creating a thumbnail?
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                Standard delivery is 2-3 business days. Rush orders can be completed within 24 hours for an additional fee. I always communicate expected delivery times upfront.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-question">
                Am I able to request revisions?
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer">
                Yes! I include 2 rounds of revisions with every project. Additional revisions can be accommodated if needed to ensure you're completely satisfied with the final result.
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h2 className="cta-title">Let's get to work!</h2>
            <button className="btn btn-primary" onClick={scrollToContact}>Let's Do this</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
