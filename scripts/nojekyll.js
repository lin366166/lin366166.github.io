/* 生成 .nojekyll，让 GitHub Pages 跳过 Jekyll 构建，直接发布 public/ 里的静态文件。
 * source/ 下以 . 开头的文件会被 Hexo 忽略，所以改用 generator 直接产出。
 */
hexo.extend.generator.register('nojekyll', function () {
  return {
    path: '.nojekyll',
    data: ''
  };
});
