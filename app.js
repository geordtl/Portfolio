// Seletores principais
const intro = document.querySelector('.intro');
const header = document.getElementById('header');
const logoHeader = document.querySelector('.logo-header');
const logoSpans = document.querySelectorAll('.logo');
const bodyChildren = document.querySelectorAll('body > *:not(.intro)');
const sendMailBtn = document.getElementById('sendmail');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

gsap.registerPlugin(SplitText, TextPlugin, ScrollTrigger);

class TimelineAnimation {
  constructor() {
    this.timeline = document.getElementById("timeline")
    this.timelineFill = document.getElementById("timelineFill")
    this.timelineItems = document.querySelectorAll(".timeline-item")
    this.timelineDots = document.querySelectorAll(".timeline-dot")
    this.visibleItems = new Set()

    this.init()
  }

  init() {
    this.setupIntersectionObserver()
  }

  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: "-100px 0px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.startTimelineAnimation()
          observer.unobserve(entry.target)
        }
      })
    }, options)

    observer.observe(this.timeline)
  }

  startTimelineAnimation() {
    // Animar a linha crescendo
    this.timelineFill.style.height = "100%"

    // Animar cada item sequencialmente
    this.timelineItems.forEach((item, index) => {
      const delay = (index + 1) * 800

      setTimeout(() => {
        this.animateTimelineItem(item, index)
      }, delay)
    })
  }

  animateTimelineItem(item, index) {
    // Animar o conteúdo
    item.classList.add("visible")

    // Animar o ponto após um pequeno delay
    setTimeout(() => {
      const dot = item.querySelector(".timeline-dot")
      dot.classList.add("visible")

      // Adicionar efeito de "pop" extra
      this.addPopEffect(dot)
    }, 200)

    this.visibleItems.add(index)
  }

  addPopEffect(dot) {
    dot.style.transform = "translate(-50%, -50%) scale(1.3)"

    setTimeout(() => {
      dot.style.transform = "translate(-50%, -50%) scale(1)"
    }, 150)
  }

  // Método para adicionar novos itens dinamicamente
  addTimelineItem(itemData) {
    const newItem = this.createTimelineItem(itemData)
    this.timeline.appendChild(newItem)

    // Re-observar para animações
    setTimeout(() => {
      this.animateTimelineItem(newItem, this.timelineItems.length)
    }, 100)
  }

  createTimelineItem(data) {
    const item = document.createElement("div")
    item.className = `timeline-item ${data.side}`
    item.innerHTML = `
            <div class="timeline-content">
                <div class="duration">${data.duration}</div>
                <h3 class="job-title">${data.title}</h3>
                ${data.period ? `<div class="period">${data.period}</div>` : ""}
                <div class="descriptions">
                    ${data.descriptions.map((desc) => `<p>${desc}</p>`).join("")}
                </div>
            </div>
            <div class="timeline-dot">
                <div class="dot-inner"></div>
            </div>
        `
    return item
  }
}

// Função para animação de intro
function playIntroAnimation() {
  // Esconde tudo exceto intro
  bodyChildren.forEach(el => el.style.display = 'none');

  setTimeout(() => {
    logoSpans.forEach((span, idx) => {
      setTimeout(() => span.classList.add('active'), (idx + 1) * 400);
    });

    setTimeout(() => {
      logoSpans.forEach(span => {
        span.classList.remove('active');
        span.classList.add('fade');
      });
    }, 2000);

    setTimeout(() => {
      intro.style.top = '-100vh';
      bodyChildren.forEach(el => el.style.display = '');
      logoSpans.forEach(span => span.classList.add('hidden'));
      if (window.ScrollTrigger) ScrollTrigger.refresh();
      animateCards();
      new TimelineAnimation(); 

      if (header) {
        setTimeout(() => {
          header.classList.remove('opacity-0', 'pointer-events-none');
        }, 500);
      }
    }, 1000);

  });
}

// Função para animação de textos
function animateTexts() {
  document.fonts.ready.then(() => {
    gsap.set(".textos", { opacity: 1 });
    let split = SplitText.create(".animate-me", { type: "words", aria: "hidden" });
    gsap.from(split.words, {
      opacity: 0,
      duration: 2,
      ease: "sine.out",
      stagger: 0.1,
    });
  });
}

// Função para animação dos cards
function animateCards() {
  gsap.utils.toArray(".box-left").forEach(box => {
    gsap.to(box, {
      scrollTrigger: {
        trigger: box,
        start: "top 100%",
        toggleActions: "play none none none",
      },
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power2.out"
    });
  });

  gsap.utils.toArray(".box-right").forEach(box => {
    gsap.to(box, {
      scrollTrigger: {
        trigger: box,
        start: "top 100%",
        toggleActions: "play none none none"
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out"
    });
  });
}

// Função para navegação ativa
function setupNavHighlightOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active-section'));
        const id = entry.target.id;
        const activeLink = document.querySelector(`nav a[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active-section');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => observer.observe(section));
}

// Função para botão de e-mail
function setupSendMail() {
  if (sendMailBtn) {
    sendMailBtn.addEventListener('click', function(event){
      event.preventDefault();
      window.location = "mailto:geogeovannarn@gmail.com";
    });
  }
}

// Inicialização geral
document.addEventListener("DOMContentLoaded", () => {
  playIntroAnimation();
  animateTexts();
  setupNavHighlightOnScroll();
  setupSendMail();
});