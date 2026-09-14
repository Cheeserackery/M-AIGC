export const galleryImages = [
  '雪糕漠.jpg', '金郁金香.png', '纸映隋唐，花开神都.jpg', '系列4 拷贝.jpg', '石刻春秋，花映禅心.jpg', '比熊犬.jpg', '森林写生.png', '德文2.jpg', '德文1.jpg', '底图.jpg', '工作流封面2.jpg', '工作流封面.jpg', '岩彩霓裳.jpg', '封面.jpg', '封面-真2.jpg', '学习 更多的学习.jpg', '图生图-正午-稳定.jpg', '唐风金玉.png', '参考图.jpg', '五彩街.png', 'Street-梵高.jpg', 'MJ封面.jpg', 'FINAL3.jpg', 'FINAL3-15 拷贝.jpg', 'ComfyUI_temp_pfxnm_00006_zfnpp_1776957034.jpg', 'ComfyUI_temp_pfxnm_00005_jttth_1776956944.jpg', 'ComfyUI_temp_pfxnm_00001_hqlgo_1776956152.jpg', 'ComfyUI_temp_jtedy_00009_ccgvn_1783868492.jpg', 'ComfyUI_temp_jtedy_00003_hsfey_1783864244.jpg', 'ComfyUI_temp_hgqgk_00001_uofqe_1787717211.jpg', 'ComfyUI_temp_bucxk_00001_lcitx_1776990490.jpg', '7.漫画.jpg', '7.8 拷贝.jpg', '555.jpg', '5.1jpg.jpg', '3 拷贝.jpg', '265.jpg', '2321.png', '22.jpg', '2026马年.png', '2.78 拷贝.jpg', '11.jpg'
];

export const imagePath = file => `/图片/${encodeURIComponent(file)}`;
export const imageTitle = file => file.replace(/\.[^.]+$/, '').replace(/[_+]+/g, ' ').trim();
