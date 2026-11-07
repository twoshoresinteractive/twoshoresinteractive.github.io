(() => {
  const sky = document.querySelector('.shore-gulls');
  const gullSource = new URL('shore-gull.svg', document.currentScript.src).href;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const padding = 90;
  let nextFlight;

  function schedule(delay) {
    clearTimeout(nextFlight);
    if (!reducedMotion.matches && !document.hidden) {
      nextFlight = setTimeout(fly, delay);
    }
  }

  function fly() {
    if (reducedMotion.matches || document.hidden) return;

    const width = sky.clientWidth;
    const height = sky.clientHeight;
    const direction = Math.random() < .5 ? 1 : -1;
    const climbs = Math.random() < .35;
    const startX = direction === 1 ? -padding : width + padding;
    const acrossX = direction === 1 ? width + padding : -padding;
    const exitX = climbs ? width * (.2 + Math.random() * .6) : acrossX;
    const startY = height * (.16 + Math.random() * .23);
    const exitY = climbs ? -padding : height * (.14 + Math.random() * .25);
    const count = 2 + Math.floor(Math.random() * 2);
    const duration = 3500 + Math.random() * 950;

    for (let index = 0; index < count; index++) {
      const bird = new Image(23 - index * 3);
      bird.alt = '';
      bird.src = gullSource;
      bird.style.opacity = .78 - index * .12;
      sky.append(bird);

      const trail = index * 27 * direction;
      const heightOffset = index * 6;
      const pose = (x, y, tilt) =>
        `translate(${x - trail}px, ${y + heightOffset}px) scaleX(${direction}) rotate(${tilt}deg)`;
      const flight = bird.animate([
        { transform: pose(startX, startY, -3) },
        {
          offset: .46,
          transform: pose(startX + (exitX - startX) * .46, startY + (exitY - startY) * .37 - 8, -10)
        },
        { transform: pose(exitX, exitY, climbs ? -16 : 4) }
      ], { duration, delay: index * 130, fill: 'both' });
      flight.onfinish = () => bird.remove();
    }

    schedule(duration + 13000 + Math.random() * 16000);
  }

  function resetFlights() {
    sky.replaceChildren();
    schedule(1800 + Math.random() * 2800);
  }

  reducedMotion.addEventListener('change', resetFlights);
  document.addEventListener('visibilitychange', resetFlights);
  resetFlights();
})();
