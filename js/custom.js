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

/* 友链页：申请卡片置顶 + 复制本站信息 */
(function () {
  var toastTimer;

  function showToast (msg) {
    var el = document.querySelector('.link-apply-toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'link-apply-toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2400);
  }

  /* Clipboard API 只在安全上下文可用，本地 http 预览需降级 */
  function legacyCopy (text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function setupLinkApply () {
    var card = document.querySelector('.link-apply');
    if (!card) return;

    /* 主题模板把正文追加在友链列表之后，这里把申请模块移到最前 */
    var wrap = card.closest ? card.closest('.flink') : null;
    if (wrap && wrap.firstElementChild !== card) {
      wrap.insertBefore(card, wrap.firstElementChild);
    }

    var btn = document.getElementById('copySiteInfo');
    if (!btn || btn.getAttribute('data-clip-bound')) return;
    btn.setAttribute('data-clip-bound', '1');

    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-clip') || '';
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text)
          .then(function () { showToast('本站信息已复制，去留言板粘贴吧'); })
          .catch(function () {
            showToast(legacyCopy(text) ? '本站信息已复制，去留言板粘贴吧' : '复制失败，请手动选择文本');
          });
      } else {
        showToast(legacyCopy(text) ? '本站信息已复制，去留言板粘贴吧' : '复制失败，请手动选择文本');
      }
    });
  }

  setupLinkApply();
  if (!window.__linkPjaxBound) {
    window.__linkPjaxBound = true;
    document.addEventListener('pjax:complete', setupLinkApply);
  }
})();
