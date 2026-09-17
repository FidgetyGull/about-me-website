(() => {
  const header = document.querySelector('.portfolio-home .site-header');
  if (!header) return;

  let previousY = Math.max(0, window.scrollY);
  let distance = 0;

  window.addEventListener('scroll', () => {
    // Clamp overscroll so bouncing at the page edges does not toggle the bar.
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const currentY = Math.min(maxY, Math.max(0, window.scrollY));
    const delta = currentY - previousY;
    previousY = currentY;

    if (currentY <= header.offsetHeight) {
      header.classList.remove('is-hidden');
      distance = 0;
      return;
    }

    if (delta === 0) return;
    distance = Math.sign(delta) === Math.sign(distance) ? distance + delta : delta;

    // Ignore tiny movements, but respond quickly when scrolling changes direction.
    if (Math.abs(distance) >= 8) {
      header.classList.toggle('is-hidden', distance > 0);
      distance = 0;
    }
  }, { passive: true });
})();
