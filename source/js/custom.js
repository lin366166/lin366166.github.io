/* 当前所在页面的导航项高亮：给匹配的菜单链接加 .current（样式见 /css/custom.css） */
(function () {
  function normalize (url) {
    if (!url || url.charAt(0) !== '/') return null;
    var out = url.replace(/index\.html$/, '');
    if (out.length > 1 && out.charAt(out.length - 1) !== '/') out += '/';
    return out;
  }

  function markCurrentNav () {
    var path = normalize(location.pathname);
    if (!path) return;

    var links = document.querySelectorAll(
      '#nav .menus_items .menus_item > a.site-page[href], #menu .menus_items .menus_item > a.site-page[href]'
    );
    if (!links.length) return;

    var best = null;
    var bestLen = -1;
    Array.prototype.forEach.call(links, function (a) {
      a.classList.remove('current');
      var href = normalize(a.getAttribute('href'));
      if (!href) return;
      var matched = href === '/' ? path === '/' : path.indexOf(href) === 0;
      if (matched && href.length > bestLen) {
        best = a;
        bestLen = href.length;
      }
    });
    if (best) best.classList.add('current');
  }

  window.markCurrentNav = markCurrentNav;
  markCurrentNav();

  /* 兼容将来开启 pjax 时的无刷新切换，且只注册一次 */
  if (!window.__navPjaxBound) {
    window.__navPjaxBound = true;
    document.addEventListener('pjax:complete', function () {
      window.markCurrentNav();
    });
  }
})();
