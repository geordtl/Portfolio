let intro = document.querySelector('.intro');
let logo = document.querySelector('.logo-header');
let logoSpan = document.querySelectorAll('.logo');
gsap.registerPlugin(SplitText,TextPlugin)

window.addEventListener('DOMContentLoaded', () => {

    // setTimeout(() => {
    //     logoSpan.forEach((span, idx) => {
    //         setTimeout(() => {
    //             span.classList.add('active');
    //         }, (idx + 1) * 400);
    //     });

    //     setTimeout(() => {
    //         logoSpan.forEach((span, idx) => {
    //             span.classList.remove('active');
    //             span.classList.add('fade');
    //         });
    //     }, 2000);

    //     setTimeout(() => {
    //         intro.style.top = '-100vh';
    //         logoSpan.classList.add('hidden');
    //     }, 2300);
    });
// })

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