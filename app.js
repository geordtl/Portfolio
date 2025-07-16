let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');
gsap.registerPlugin(SplitText,TextPlugin, ScrollTrigger)

window.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        logoSpan.forEach((span, idx) => {
            setTimeout(() => {
                span.classList.add('active');
            }, (idx + 1) * 400);
        });

        setTimeout(() => {
            logoSpan.forEach((span, idx) => {
                span.classList.remove('active');
                span.classList.add('fade');
            });
        }, 2000);

        setTimeout(() => {
            intro.style.top = '-100vh';
            logoSpan.classList.add('hidden');
        }, 500);
    });
})

document.fonts.ready.then(() => {
  gsap.set("#textos", { opacity: 1 });
  let split = SplitText.create(".animate-me", { type: "words", aria: "hidden" });

  gsap.from(split.words, {
    opacity: 0,
    duration: 2,
    ease: "sine.out",
    stagger: 0.1,
  });
});


    gsap.utils.toArray(".box-left").forEach(box => {
      gsap.to(box, {
        scrollTrigger: {
          trigger: box,
          start: "top 100%", // quando o topo da div chegar a 80% da tela
          toggleActions: "play none none none",
        },
        x: 0,        // move de volta para o centro
        opacity: 1,  // fade in
        duration: 1.2,
        ease: "power2.out"
      })
    });

    gsap.utils.toArray(".box-right").forEach((el) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: "top 100%",
      toggleActions: "play none none none"
    },
    x: 0,
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  }); 
});

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
    this.animateTitle()
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

  animateTitle() {
    const title = document.querySelector(".title")
    setTimeout(() => {
      title.style.opacity = "1"
      title.style.transform = "translateY(0)"
    }, 200)
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

// Inicializar quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new TimelineAnimation()
})

// Adicionar alguns efeitos extras de interação
document.addEventListener("DOMContentLoaded", () => {
  const timelineItems = document.querySelectorAll(".timeline-content")

  timelineItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    })
  })


})

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

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

    
      