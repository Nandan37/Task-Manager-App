
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/task-manager/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/task-manager"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23792, hash: '46131ed1ffc26a20b28b7c1c64f2e3519ae108f02a5be4cbe855472a00cc9bf8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17367, hash: '9f367433d76485d07a4349eb68ea1e1fdee58b3b928bc93719fcd12e3fe7eed5', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 30745, hash: '508b3abb01868ef8be335f658a79daddaccfed7cc7029648283d4bff0a7ce88a', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-36AW6TKX.css': {size: 6979, hash: 'vY6tjD/ce7M', text: () => import('./assets-chunks/styles-36AW6TKX_css.mjs').then(m => m.default)}
  },
};
