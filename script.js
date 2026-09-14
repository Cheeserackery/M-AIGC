const galleryImages = [
  '雪糕漠.jpg', '金郁金香.png', '纸映隋唐，花开神都.jpg', '系列4 拷贝.jpg', '石刻春秋，花映禅心.jpg', '比熊犬.jpg', '森林写生.png', '德文2.jpg', '德文1.jpg', '底图.jpg', '工作流封面2.jpg', '工作流封面.jpg', '岩彩霓裳.jpg', '封面.jpg', '封面-真2.jpg', '学习 更多的学习.jpg', '图生图-正午-稳定.jpg', '唐风金玉.png', '参考图.jpg', '五彩街.png', 'Street-梵高.jpg', 'MJ封面.jpg', 'FINAL3.jpg', 'FINAL3-15 拷贝.jpg', 'ComfyUI_temp_pfxnm_00006_zfnpp_1776957034.jpg', 'ComfyUI_temp_pfxnm_00005_jttth_1776956944.jpg', 'ComfyUI_temp_pfxnm_00001_hqlgo_1776956152.jpg', 'ComfyUI_temp_jtedy_00009_ccgvn_1783868492.jpg', 'ComfyUI_temp_jtedy_00003_hsfey_1783864244.jpg', 'ComfyUI_temp_hgqgk_00001_uofqe_1787717211.jpg', 'ComfyUI_temp_bucxk_00001_lcitx_1776990490.jpg', '7.漫画.jpg', '7.8 拷贝.jpg', '555.jpg', '5.1jpg.jpg', '3 拷贝.jpg', '265.jpg', '2321.png', '22.jpg', '2026马年.png', '2.78 拷贝.jpg', '11.jpg'
];

const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');

const carousel = document.querySelector('#round-carousel');
const ring = document.querySelector('#round-carousel-ring');
const carouselIndex = document.querySelector('#carousel-index');
const carouselTitle = document.querySelector('#carousel-title');
const carouselCount = document.querySelector('#carousel-count');
const imageUrl = file => encodeURI(`图片/${file}`);
const readableTitle = file => file.replace(/\.[^.]+$/, '').replace(/[_+]+/g, ' ').trim();

let carouselState = { rotation: 0, velocity: 0, active: 0, lastTime: 0, dragging: false, pointerX: 0, width: 260, height: 330, radius: 0 };
const angle = 360 / galleryImages.length;
carouselCount.textContent = `${String(galleryImages.length).padStart(2, '0')} WORKS`;
carouselTitle.textContent = readableTitle(galleryImages[0]);

galleryImages.forEach((file, index) => {
  const card = document.createElement('button');
  card.className = 'round-carousel-card';
  card.type = 'button';
  card.setAttribute('aria-label', `查看图片 ${index + 1}: ${readableTitle(file)}`);
  const source = imageUrl(file);
  card.innerHTML = `<img loading="lazy" src="${source}" alt="${readableTitle(file)}"><span>${String(index + 1).padStart(2, '0')}</span>`;
  card.addEventListener('click', () => {
    lightboxImage.src = source;
    lightboxImage.alt = readableTitle(file);
    lightbox.showModal();
  });
  ring.append(card);
});

function updateCarouselSize() {
  const width = carousel.clientWidth;
  carouselState.width = Math.min(320, Math.max(150, width * (width < 600 ? .48 : .26)));
  carouselState.height = carouselState.width * 1.18;
  carouselState.radius = (carouselState.width * 1.03) / (2 * Math.tan(Math.PI / galleryImages.length));
  ring.style.width = `${carouselState.width}px`;
  ring.style.height = `${carouselState.height}px`;
  ring.style.marginLeft = `${-carouselState.width / 2}px`;
  ring.style.marginTop = `${-carouselState.height / 2}px`;
  ring.querySelectorAll('.round-carousel-card').forEach((card, index) => {
    card.style.width = `${carouselState.width}px`;
    card.style.height = `${carouselState.height}px`;
    card.style.transform = `rotateY(${index * angle}deg) translateZ(${carouselState.radius}px)`;
  });
  applyRotation();
}

function applyRotation() {
  ring.style.transform = `translateZ(${-carouselState.radius}px) rotateY(${carouselState.rotation}deg)`;
  const front = ((Math.round(-carouselState.rotation / angle) % galleryImages.length) + galleryImages.length) % galleryImages.length;
  if (front !== carouselState.active) {
    carouselState.active = front;
    carouselIndex.textContent = String(front + 1).padStart(2, '0');
    carouselTitle.textContent = readableTitle(galleryImages[front]);
  }
}

function tick(now) {
  const dt = carouselState.lastTime ? Math.min((now - carouselState.lastTime) / 1000, .1) : 0;
  carouselState.lastTime = now;
  if (!carouselState.dragging) {
    if (Math.abs(carouselState.velocity) > .01) {
      carouselState.rotation += carouselState.velocity * dt;
      carouselState.velocity *= .94;
    } else if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) carouselState.rotation += 4.2 * dt;
    applyRotation();
  }
  requestAnimationFrame(tick);
}

carousel.addEventListener('pointerdown', event => {
  if (event.target.closest('.carousel-arrow')) return;
  carousel.setPointerCapture?.(event.pointerId);
  carouselState.dragging = true;
  carouselState.pointerX = event.clientX;
  carouselState.velocity = 0;
  carousel.classList.add('is-dragging');
});
carousel.addEventListener('pointermove', event => {
  if (!carouselState.dragging) return;
  const dx = event.clientX - carouselState.pointerX;
  carouselState.pointerX = event.clientX;
  carouselState.rotation += dx * .28;
  carouselState.velocity = dx * .28 * 60;
  applyRotation();
});
const endDrag = event => { carousel.releasePointerCapture?.(event.pointerId); carouselState.dragging = false; carousel.classList.remove('is-dragging'); };
carousel.addEventListener('pointerup', endDrag);
carousel.addEventListener('pointercancel', endDrag);
document.querySelector('.carousel-prev').addEventListener('click', () => { carouselState.velocity = 0; carouselState.rotation += angle; applyRotation(); });
document.querySelector('.carousel-next').addEventListener('click', () => { carouselState.velocity = 0; carouselState.rotation -= angle; applyRotation(); });
window.addEventListener('resize', updateCarouselSize);
updateCarouselSize();
requestAnimationFrame(tick);

lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('in-view');
    revealObserver.unobserve(entry.target);
  }
}), { threshold: .16 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const menu = document.querySelector('.menu-toggle');
const header = document.querySelector('.nav-shell');
menu.addEventListener('click', () => {
  const isOpen = header.classList.toggle('menu-open');
  menu.setAttribute('aria-expanded', String(isOpen));
  menu.setAttribute('aria-label', isOpen ? '关闭导航' : '打开导航');
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('menu-open');
  menu.setAttribute('aria-expanded', 'false');
}));
