/* 顶部导航站点名追加英文名。
 * 主题 nav.pug 直接输出 config.title，浏览器标题 / 首页大字 / og / atom 都共用它。
 * 这里在渲染后的 HTML 上做精确替换，只影响 #blog-info 里的 .nav-site-title，
 * 不改 config.title，也不影响文章页 .nav-page-title 显示的文章标题。
 */
hexo.extend.filter.register('after_render:html', function (html) {
  if (typeof html !== 'string') return html;

  return html.replace(
    /(<a class="nav-site-title"[^>]*><span class="site-name">)([^<]*)(<\/span>)/g,
    function (match, before, name, after) {
      return before + name +
        '<span class="site-name-en"> | Hua Laoshi\'s Blog</span>' + after;
    }
  );
});
