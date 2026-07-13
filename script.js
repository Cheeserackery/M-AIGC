const imagePages = [
  [
    { title: '创意生成', code: '01 / CREATIVE GENERATION', folder: '1.创意生成', files: ['Street-梵高.jpg', '五彩街.png', '学习 更多的学习.jpg', '德文1.jpg', '德文2.jpg', '森林写生.png', '比熊犬.jpg', '街头逻辑猫.jpg', '金郁金香.png', '雪糕漠.jpg'] },
    { title: '产品宣传', code: '02 / PRODUCT CAMPAIGNS', folder: '2.产品宣传', files: ['ComfyUI_temp_bucxk_00001_lcitx_1776990490.jpg', 'ComfyUI_temp_jtedy_00003_hsfey_1783864244.jpg', 'ComfyUI_temp_jtedy_00009_ccgvn_1783868492.jpg', 'ComfyUI_temp_mdodm_00001_ziysk_1783845597.jpg', 'ComfyUI_temp_pfxnm_00001_hqlgo_1776956152.jpg', '系列4 拷贝.jpg'] }
  ],
  [
    { title: '参赛作品', code: '03 / COMPETITION WORKS', folder: '3.参赛作品', files: ['唐风金玉.png', '岩彩霓裳.jpg', '石刻春秋，花映禅心.jpg', '神都墨韵.jpg', '纸映隋唐，花开神都.jpg'] },
    { title: '一些其他', code: '04 / OTHER EXPLORATIONS', folder: '4.一些其他', files: ['2026端午.jpg', '2026马年.png', 'Pots_Two_Months_Growth++ .jpg', '多肉微距.jpg', '手表+.jpg', '洋牡丹微距.jpg'] }
  ]
];

const gallery = document.querySelector('#image-grid');
const lightbox = document.querySelector('#lightbox');
const lightboxImage = lightbox.querySelector('img');

function imageUrl(folder, file) {
  return encodeURI(`图片/${folder}/${file}`);
}

imagePages.forEach((page, pageIndex) => {
  const spread = document.createElement('section');
  spread.className = 'image-spread';
  page.forEach(category => {
    const categoryCard = document.createElement('article');
    categoryCard.className = 'category-accordion';
    categoryCard.innerHTML = `<header><p>${category.code}</p><h3>${category.title}</h3><span>${String(category.files.length).padStart(2, '0')} WORKS</span></header><div class="category-accordion-images"></div>`;
    const accordion = categoryCard.querySelector('.category-accordion-images');
    category.files.forEach((file, index) => {
      const button = document.createElement('button');
      button.className = `accordion-work${index === 0 ? ' active' : ''}`;
      button.type = 'button';
      button.setAttribute('aria-label', `查看${category.title}作品 ${index + 1}`);
      const source = imageUrl(category.folder, file);
      button.innerHTML = `<img loading="lazy" src="${source}" alt="${category.title}作品 ${index + 1}"><span>${String(index + 1).padStart(2, '0')}</span>`;
      const activate = () => accordion.querySelectorAll('.accordion-work').forEach(item => item.classList.toggle('active', item === button));
      button.addEventListener('pointerenter', activate);
      button.addEventListener('focus', activate);
      button.addEventListener('click', () => {
        activate();
        lightboxImage.src = source;
        lightboxImage.alt = `${category.title}作品 ${index + 1}`;
        lightbox.showModal();
      });
      accordion.append(button);
    });
    spread.append(categoryCard);
  });
  spread.insertAdjacentHTML('beforeend', '<p class="image-spread-note">因页面有限，选取部分作品展示</p>');
  gallery.append(spread);
});

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
