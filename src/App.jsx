import { useEffect, useState } from 'react';
import RoundCarousel from './components/RoundCarousel';
import { assetPath, galleryImages } from './data';

const videos = [
  { title: '郁金香钻戒', type: 'PRODUCT FILM', file: '郁金香钻戒.mp4' },
  { title: '蜂蜜产品广告', type: 'PRODUCT FILM', file: '蜂蜜产品广告.mp4' }
];

function Reveal({ children, className = '' }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.14 });
    const node = document.getElementById(`reveal-${className}`);
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, [className]);
  return <div id={`reveal-${className}`} className={`reveal ${visible ? 'in-view' : ''} ${className}`}>{children}</div>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return <>
    <header className="nav-shell" id="top">
      <a className="brand" href="#home" aria-label="返回首页">M<span>-</span>AIGC</a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? '关闭导航' : '打开导航'} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}><i></i><i></i></button>
      <nav className={menuOpen ? 'is-open' : ''} aria-label="主导航">
        <a href="#skills" onClick={closeMenu}>能力</a><a href="#gallery" onClick={closeMenu}>图片</a><a href="#motion" onClick={closeMenu}>视频</a><a href="#runninghub" onClick={closeMenu}>RH主页</a>
      </nav>
      <a className="nav-contact" href="#contact">联系我 <b>↗</b></a>
    </header>

    <main>
      <section className="hero" id="home">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata" src={assetPath('视频/郁金香钻戒.mp4')}></video>
        <div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div><div className="hero-orbit orbit-three"></div>
        <Reveal className="hero-kicker">梁振轩的 AIGC 创作展示页 / 2026</Reveal>
        <div className="hero-wordmark" aria-hidden="true"><span>M</span><i></i><span>AIGC</span></div>
        <Reveal className="hero-bottom"><h1>梁振轩<br /><em>AIGC 探索者</em></h1><p>以模型、工具与视觉实验<br />扩展创作的边界。</p></Reveal>
        <a className="scroll-cue" href="#skills">向下探索 <span>↓</span></a>
      </section>

      <section className="capabilities section-pad" id="skills">
        <Reveal className="section-intro"><p>01 / CAPABILITIES</p><h2>让工具成为<br />创作直觉。</h2><span>模型与工具，是每一次尝试的起点。</span></Reveal>
        <div className="skill-stack">
          <article className="skill-card skill-card-models"><video autoPlay muted loop playsInline preload="metadata" src={assetPath('视频/男孩-棱镜-彩虹.mp4')}></video><div><p>01 / MODELS</p><h3>熟悉的<br />AI 模型</h3></div><img className="skill-visual" src={assetPath('MODELS.png')} alt="AI 模型图标" /></article>
          <article className="skill-card skill-card-tools"><div><p>02 / TOOLS</p><h3>掌握的<br />创作<br />工具</h3></div><img className="skill-visual" src={assetPath('TOOLS.png')} alt="创作工具图标" /></article>
        </div>
      </section>

      <section className="gallery section-pad" id="gallery">
        <Reveal className="gallery-heading"><p>02 / IMAGE ARCHIVE</p><h2>图像是<br />正在发生的想象。</h2><span>拖拽图片，浏览作品。</span></Reveal>
        <RoundCarousel images={galleryImages} />
      </section>

      <section className="motion section-pad" id="motion">
        <video className="motion-background" autoPlay muted loop playsInline preload="metadata" src={assetPath('视频/跑酷猫—.mp4')}></video>
        <Reveal className="motion-heading"><p>03 / MOTION STUDIES</p><h2>让静止<br />继续生长。</h2></Reveal>
        <div className="video-list">{videos.map((video, index) => <article className="film" key={video.file}><div className="film-meta"><span>{String(index + 1).padStart(2, '0')}</span><h3>{video.title}</h3><span>{video.type}</span></div><video autoPlay muted loop playsInline preload="metadata" src={assetPath(`视频/${video.file}`)}></video></article>)}</div>
        <p className="motion-note">因页面有限，选取部分作品展示</p>
      </section>

      <section className="runninghub section-pad" id="runninghub">
        <p className="section-label">04 / A PLACE TO BUILD</p>
        <a className="hub-link" href="https://www.runninghub.cn/user-center/1966438189181353985/userPost?inviteCode=s00retpj" target="_blank" rel="noreferrer"><span>RunningHub</span><i>↗</i></a>
        <div className="hub-layout"><div className="hub-preview"><img src={assetPath('RH主页/主页.png')} alt="梁振轩的 RunningHub 创作主页" /></div><div className="hub-copy"><p className="hub-kicker">PROFILE / 2026</p><h3>我的 RunningHub<br />创作主页</h3><p>持续归档工作流、模型实验与视觉项目。</p><a href="https://www.runninghub.cn/user-center/1966438189181353985/userPost?inviteCode=s00retpj" target="_blank" rel="noreferrer">访问主页 <span>↗</span></a></div></div>
      </section>
    </main>

    <footer id="contact"><p className="footer-index">05 / CONTACT</p><p className="footer-title">LET&apos;S<br />CONNECT<span>.</span></p><div className="contact-grid"><a href="tel:18244900062"><small>PHONE</small>18244900062</a><a href="mailto:www.shinku@hotmail.com"><small>EMAIL</small>www.shinku@hotmail.com</a><span><small>WECHAT</small>LiangsMerchant</span><a href="#home"><small>PORTFOLIO</small>返回顶部 ↑</a></div></footer>
  </>;
}
