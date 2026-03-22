/* ============================================
   GAGAN CHAUHAN — PORTFOLIO JAVASCRIPT
   Typing, chatbot, filters, animations, theme
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ===== Typing Animation =====
  const typingEl = document.getElementById('heroTyping');
  const phrases = [
    "I build intelligent systems and scalable web apps.",
    "AI-Powered Full Stack Developer & Problem Solver.",
    "Data Science • Machine Learning • Web Development.",
    "250+ coding problems solved and counting."
  ];
  let phraseIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 500);
        return;
      }
      setTimeout(typeLoop, 30);
    } else {
      typingEl.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        isDeleting = true;
        setTimeout(typeLoop, 2000);
        return;
      }
      setTimeout(typeLoop, 60);
    }
  }
  typeLoop();

  // ===== Mouse-Follow Glow =====
  const heroGlow = document.getElementById('heroGlow');
  const heroSection = document.getElementById('hero');

  heroSection.addEventListener('mousemove', (e) => {
    heroGlow.style.opacity = '1';
    heroGlow.style.left = e.clientX - 200 + 'px';
    heroGlow.style.top = e.clientY - 200 + 'px';
  });

  heroSection.addEventListener('mouseleave', () => {
    heroGlow.style.opacity = '0';
  });

  // ===== Hero Particles =====
  const particlesContainer = document.getElementById('heroParticles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = (4 + Math.random() * 4) + 's';
    const colors = ['#4f8cff', '#a855f7', '#34d399'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    particlesContainer.appendChild(p);
  }

  // ===== Scroll Progress =====
  const scrollProgressEl = document.getElementById('scrollProgress');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgressEl.style.width = progress + '%';

    // Navbar scrolled state
    navbar.classList.toggle('scrolled', scrollTop > 50);

    // Parallax for hero bg
    if (heroSection) {
      const elements = heroSection.querySelectorAll('.hero-content');
      elements.forEach(el => {
        el.style.transform = `translateY(${scrollTop * 0.15}px)`;
      });
    }
  });

  // ===== Active Nav Link =====
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => navObserver.observe(s));

  // ===== Mobile Nav Toggle =====
  const hamburger = document.getElementById('navHamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
  });

  // Close mobile nav on link click
  navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('active');
    });
  });

  // ===== Reveal on Scroll =====
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ===== Animated Counter =====
  const statNumbers = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(n => counterObserver.observe(n));

  function animateCounter(el, target) {
    let count = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      count += increment;
      if (count >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(count);
      }
    }, 25);
  }

  // ===== Skill Bar Animation =====
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillBars.forEach(bar => skillObserver.observe(bar));

  // ===== Card Tilt Effect =====
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // ===== Project Filters =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // ===== Project Modals =====
  const projectModal = document.getElementById('projectModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  const projectData = {
    blackfriday: {
      title: 'Black Friday EDA',
      subtitle: 'Retail Data Analytics — March 2025',
      problem: 'Retailers struggle to understand complex purchasing patterns across diverse customer demographics during high-volume sales events like Black Friday, making it difficult to craft data-driven marketing strategies.',
      approach: 'Performed end-to-end exploratory data analysis on the Kaggle Black Friday retail dataset. Cleaned data, handled missing values, and transformed categorical features. Applied groupby operations, statistical summaries, and advanced visualization techniques to uncover hidden patterns in customer behavior.',
      tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Kaggle'],
      results: [
        'Identified key customer demographics driving purchase volume',
        'Uncovered product-category performance trends across age groups and gender',
        'Generated actionable business insights for marketing and sales strategy',
        'Demonstrated strong data wrangling and visualization skills'
      ]
    },
    disease: {
      title: 'Multiple Disease Prediction',
      subtitle: 'Healthcare AI System — November 2024',
      problem: 'Early diagnosis of multiple health conditions is often inconsistent and delayed in resource-constrained settings, leading to poor patient outcomes.',
      approach: 'Built a multi-disease prediction system by training and evaluating machine learning models for several health conditions. Developed an interactive Streamlit web application that enables users to input clinical parameters and receive real-time predictions through a clean, user-friendly interface.',
      tech: ['Python', 'Scikit-learn', 'Streamlit', 'Pandas', 'NumPy'],
      results: [
        'Improved diagnostic consistency through end-to-end ML pipeline',
        'Practical decision-support prototype for healthcare professionals',
        'Full-stack ML deployment with real-time prediction capability',
        'Clean, intuitive interface for non-technical users'
      ]
    },
    loan: {
      title: 'Loan Eligibility Model',
      subtitle: 'FinTech ML + BI Dashboard',
      problem: 'Manual loan approval processes are slow, subjective, and prone to bias. Stakeholders need transparent, data-driven tools to make consistent lending decisions.',
      approach: 'Developed a loan approval prediction system by preprocessing applicant data, engineering key financial indicators (income-to-loan ratio, total assets), and training a Random Forest classifier. Conducted comprehensive EDA to identify approval drivers. Built an interactive Power BI dashboard to visualize approval trends and applicant segmentation.',
      tech: ['Python', 'Scikit-learn', 'Power BI', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      results: [
        'Accurate classification of loan approval outcomes using Random Forest',
        'Identified key approval drivers: credit score, income level, education',
        'Interactive BI dashboard for stakeholder decision support',
        'End-to-end ML pipeline from data cleaning to deployment'
      ]
    }
  };

  document.querySelectorAll('.project-details-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = projectData[key];
      if (!data) return;

      modalBody.innerHTML = `
        <h2>${data.title}</h2>
        <p class="modal-subtitle">${data.subtitle}</p>
        <div class="modal-section">
          <h3>🔍 Problem</h3>
          <p>${data.problem}</p>
        </div>
        <div class="modal-section">
          <h3>💡 Approach</h3>
          <p>${data.approach}</p>
        </div>
        <div class="modal-section">
          <h3>🛠 Tech Stack</h3>
          <div class="modal-tech-stack">
            ${data.tech.map(t => `<span>${t}</span>`).join('')}
          </div>
        </div>
        <div class="modal-section">
          <h3>📊 Results & Impact</h3>
          <ul>
            ${data.results.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>
      `;
      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  modalClose.addEventListener('click', closeModal);
  projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeModal();
  });

  function closeModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // ===== Dark / Light Mode Toggle =====
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ===== Contact Form Validation =====
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const message = document.getElementById('contactMessage');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    // Reset
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';

    if (name.value.trim().length < 2) {
      nameError.textContent = 'Please enter your name';
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      emailError.textContent = 'Please enter a valid email';
      valid = false;
    }

    if (message.value.trim().length < 10) {
      messageError.textContent = 'Message must be at least 10 characters';
      valid = false;
    }

    if (valid) {
      submitBtn.innerHTML = '✓ Message Sent!';
      submitBtn.classList.add('success');
      submitBtn.disabled = true;
      setTimeout(() => {
        submitBtn.innerHTML = `Send Message <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
        submitBtn.classList.remove('success');
        submitBtn.disabled = false;
        contactForm.reset();
      }, 3000);
    }
  });

  // ===== Chatbot =====
  const chatToggle = document.getElementById('chatbotToggle');
  const chatWrapper = document.getElementById('chatbotWrapper');
  const chatMessages = document.getElementById('chatbotMessages');
  const chatInput = document.getElementById('chatbotInput');
  const chatSend = document.getElementById('chatbotSend');

  chatToggle.addEventListener('click', () => {
    chatWrapper.classList.toggle('active');
    if (chatWrapper.classList.contains('active')) {
      chatInput.focus();
    }
  });

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('chat-message', sender);
    msg.innerHTML = `<p>${text}</p>`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotReply(question) {
    const q = question.toLowerCase();

    if (q.includes('skill') || q.includes('tech') || q.includes('know')) {
      return "Gagan's key skills include:<br>• <strong>Languages:</strong> Python, Java, C++, C, JavaScript, SQL<br>• <strong>Data Science:</strong> Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, Power BI<br>• <strong>Web:</strong> HTML, CSS, Spring Boot<br>• <strong>Tools:</strong> Git, Docker, VS Code, IntelliJ IDEA<br>• <strong>Core:</strong> DSA, JDBC, AI Integration, DevOps";
    }

    if (q.includes('project') || q.includes('work') || q.includes('built')) {
      return "Gagan has built 3 notable projects:<br>1. 📊 <strong>Black Friday EDA</strong> — Retail data analytics with Python<br>2. 🏥 <strong>Multiple Disease Prediction</strong> — ML system with Streamlit UI<br>3. 💰 <strong>Loan Eligibility Model</strong> — Random Forest + Power BI dashboard<br><br>Click on any project card above to see the full case study!";
    }

    if (q.includes('education') || q.includes('study') || q.includes('college') || q.includes('university') || q.includes('degree')) {
      return "🎓 <strong>B.Tech in CSE</strong> at Lovely Professional University, Phagwara (since August 2023)<br>📜 Intermediate from DAV Public School, Bhiwani — 72%<br>📜 Matriculation from DAV Public School, Bhiwani — 78%";
    }

    if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('connect') || q.includes('hire')) {
      return "You can reach Gagan via:<br>📧 <strong>Email:</strong> chauhangagan2675@gmail.com<br>🔗 <strong>LinkedIn:</strong> linkedin.com/in/gaganChauhan<br>🐙 <strong>GitHub:</strong> github.com/GaganChauhan905<br>📱 <strong>Phone:</strong> +91-9053800378";
    }

    if (q.includes('certification') || q.includes('certificate') || q.includes('cert')) {
      return "Gagan holds 3 certifications:<br>1. 🏆 DSA — iamneo Platform (Aug 2024)<br>2. 🤖 ChatGPT-4 Prompt Engineering — Infosys (Aug 2025)<br>3. 🧠 Master Generative AI & Tools — Udemy (Aug 2025)";
    }

    if (q.includes('achievement') || q.includes('leetcode') || q.includes('gfg') || q.includes('geeksforgeeks') || q.includes('competitive')) {
      return "🏅 100+ problems solved on GeeksforGeeks<br>🏅 150+ challenges completed on LeetCode<br>Strong fundamentals in data structures, algorithms, and analytical problem-solving!";
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('howdy')) {
      return "Hey there! 👋 Welcome to Gagan's portfolio. Feel free to ask me about his skills, projects, education, or how to get in touch!";
    }

    if (q.includes('experience') || q.includes('intern')) {
      return "Gagan is currently a B.Tech student focused on building real-world projects. He's developed ML prediction systems, data analytics pipelines, and full-stack applications. He's actively looking for opportunities to contribute to impactful projects!";
    }

    if (q.includes('resume') || q.includes('cv')) {
      return "You can download Gagan's resume using the 'Resume' button in the navigation bar at the top of the page! 📄";
    }

    return "That's a great question! I'm Gagan's portfolio assistant and I can help with questions about his:<br>• 💻 Skills & technologies<br>• 🚀 Projects<br>• 🎓 Education<br>• 📜 Certifications<br>• 📧 Contact info<br><br>Try asking about any of these!";
  }

  function handleChat() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';

    setTimeout(() => {
      const reply = getBotReply(text);
      addMessage(reply, 'bot');
    }, 600);
  }

  chatSend.addEventListener('click', handleChat);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleChat();
  });

  // Suggestion buttons
  document.querySelectorAll('.suggestion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const question = btn.getAttribute('data-question');
      addMessage(question, 'user');
      setTimeout(() => {
        const reply = getBotReply(question);
        addMessage(reply, 'bot');
      }, 600);
    });
  });

  // ===== Smooth Scroll for CTA =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== Fade-in animation keyframe (added dynamically) =====
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
});
