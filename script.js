const works = [
  '2026马年.png', 'ComfyUI_temp_bucxk_00001_lcitx_1776990490.jpg', 'ComfyUI_temp_pfxnm_00001_hqlgo_1776956152.jpg',
  'Street-梵高.jpg', '五彩街.png', '动作迁移.jpg', '唐风金玉.png', '多肉微距.jpg', '岩彩霓裳.jpg',
  '德文1.jpg', '德文2.jpg', '森林写生.png', '比熊犬.jpg', '洋牡丹微距.jpg', '石刻春秋，花映禅心.jpg',
  '系列4 拷贝.jpg', '纸映隋唐，花开神都.jpg', '街头逻辑猫.jpg', '金郁金香.png', '雪糕漠.jpg'
];

const gallery = document.querySelector('#image-grid');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');

works.forEach((file, index) => {
  const work = document.createElement('button');
  work.className = `work${index === 0 ? ' active' : ''}`;
  work.type = 'button';
  work.setAttribute('aria-label', `查看图片作品 ${index + 1}`);
  work.innerHTML = `<img loading="lazy" src="图片/${file}" alt="AIGC 图片作品 ${index + 1}"><span>+</span><b>${String(index + 1).padStart(2, '0')}</b>`;
  const select = () => gallery.querySelectorAll('.work').forEach(item => item.classList.toggle('active', item === work));
  work.addEventListener('pointerenter', select);
  work.addEventListener('focus', select);
  work.addEventListener('click', () => { select(); lightboxImage.src = `图片/${file}`; lightboxImage.alt = `AIGC 图片作品 ${index + 1}`; lightbox.showModal(); });
  gallery.append(work);
});

lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); } }), { threshold: .16 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

const menu = document.querySelector('.menu-toggle');
const header = document.querySelector('.nav-shell');
menu.addEventListener('click', () => { const isOpen = header.classList.toggle('menu-open'); menu.setAttribute('aria-expanded', String(isOpen)); menu.setAttribute('aria-label', isOpen ? '关闭导航' : '打开导航'); });
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => { header.classList.remove('menu-open'); menu.setAttribute('aria-expanded', 'false'); }));
