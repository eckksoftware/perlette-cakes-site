// Lightweight scroll motion, no dependency.
// - [data-reveal]        -> fades/rises in once, on enter
// - [data-parallax="n"]  -> sets --parallax on scroll for a gentle image drift
// Fully skipped when the user prefers reduced motion (elements are visible by default in CSS).

function init(): void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );
  revealEls.forEach((el) => io.observe(el));

  const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  if (parallaxEls.length === 0) return;

  let ticking = false;
  const update = (): void => {
    const viewportCenter = window.innerHeight / 2;
    for (const el of parallaxEls) {
      const rect = el.getBoundingClientRect();
      const speed = Number(el.dataset.parallax) || 0.12;
      const offset = (rect.top + rect.height / 2 - viewportCenter) * -speed;
      el.style.setProperty('--parallax', `${offset.toFixed(1)}px`);
    }
    ticking = false;
  };
  const onScroll = (): void => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}

if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init);
