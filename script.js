const works = [
  '2026马年.png', 'ComfyUI_temp_bucxk_00001_lcitx_1776990490.jpg', 'ComfyUI_temp_pfxnm_00001_hqlgo_1776956152.jpg',
  'Street-梵高.jpg', '五彩街.png', '动作迁移.jpg', '唐风金玉.png', '多肉微距.jpg', '岩彩霓裳.jpg',
  '德文1.jpg', '德文2.jpg', '森林写生.png', '比熊犬.jpg', '洋牡丹微距.jpg', '石刻春秋，花映禅心.jpg',
  '系列4 拷贝.jpg', '纸映隋唐，花开神都.jpg', '街头逻辑猫.jpg', '金郁金香.png', '雪糕漠.jpg'
];
const grid = document.querySelector('#image-grid');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');
works.forEach((file, index) => {
  const button = document.createElement('button');
  button.className = 'image-item';
  button.type = 'button';
  button.innerHTML = `<img loading="lazy" src="图片/${file}" alt="AIGC 图片作品 ${index + 1}"><span>${String(index + 1).padStart(2, '0')}</span>`;
  button.addEventListener('click', () => { lightboxImage.src = `图片/${file}`; lightboxImage.alt = `AIGC 图片作品 ${index + 1}`; lightbox.showModal(); });
  grid.append(button);
});
lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
const sections = [...document.querySelectorAll('main section')];
const navLinks = [...document.querySelectorAll('nav a')];
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)); }), { threshold: .35 });
sections.forEach(section => observer.observe(section));
