const terminal = document.getElementById('terminal');
const glitchAudio = document.getElementById('glitch-audio');
const big404 = document.getElementById('big-404');
['click', 'keydown', 'mousemove'].forEach(event =>
  document.addEventListener(event, () => {
    glitchAudio.play().catch(() => {});
  }, { once: true })
);

// Texte pirate à afficher
const lines = [
  '>> INITIATING SYSTEM BREACH...',
  '>> CONNECTING TO REMOTE SHELL...',
  '>> ACCESS GRANTED',
  '>> DOWNLOADING INDEX FILE...',
  '!! ERROR: 404 FILE NOT FOUND',
  '>> STARTING SYSTEM CORRUPTION',
  '>> INJECTING MALICIOUS PAYLOAD',
  '>> ██████████████████████████████',
  '>> OVERRIDING SECURITY PROTOCOL',
  '>> SYSTEM FAILURE DETECTED',
  '',
  '404 — The page you’re looking for has been TERMINATED.',
  'REDIRECTING TO SAFE ZONE: /index.html'
];

let index = 0;

function typeLine() {
  if (index < lines.length) {
    const line = document.createElement('div');
    line.textContent = '';
    terminal.appendChild(line);

    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < lines[index].length) {
        line.textContent += lines[index][charIndex];
        charIndex++;
      } else {
        clearInterval(interval);
        index++;
        setTimeout(typeLine, 150);
      }
    }, 25);
  } else {
    glitchAudio.play();
    destroyEverything();
  }
}

function destroyEverything() {
  // Explosion du 404
  big404.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
  const x = (Math.random() - 0.5) * 800;
  const y = window.innerHeight + 200;
  const rot = (Math.random() - 0.5) * 1440;
  big404.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg) scale(1.2)`;
  big404.style.opacity = 0;

  // Explosion du terminal
  const allText = terminal.querySelectorAll('div');
  let allLetters = [];

  allText.forEach(line => {
    const chars = [...line.textContent];
    line.textContent = '';
    chars.forEach(char => {
      const span = document.createElement('span');
      span.classList.add('char');
      span.textContent = char;
      line.appendChild(span);
      allLetters.push(span);
    });
  });

  const shuffled = allLetters.sort(() => Math.random() - 0.5);

  shuffled.forEach((letter, i) => {
    setTimeout(() => {
      const rot = (Math.random() - 0.5) * 1440;
      const x = (Math.random() - 0.5) * 800;
      const y = window.innerHeight + Math.random() * 300;
      letter.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
      letter.style.opacity = 0;
    }, i * 5);
  });

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 5000);
}

typeLine();
