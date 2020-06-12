const path = require('path')

function resolvefile(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    // 项目里要使用的 SCSS 文件
    { src: '@/assets/css/global.scss', lang: 'scss' }, // 指定
    'element-ui/lib/theme-chalk/index.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/svg-icon'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
  ],
  axios: {
    proxy: true, // 表示开启代理
    // prefix: '/api', // 表示给请求url加个前缀 /api
    credentials: false // 表示跨域请求时是否需要使用凭证
  },
  proxy: {
    '/api': {
      target: 'http://jt808.gcszwyc.com:8888', // 目标接口代理域名
      changeOrigin: true, // 表示是否跨域
      pathRewrite: {
        '^/api': '/api', // 把 /api 替换成 /
      }
    }
  },
  styleResources: {
    scss: './assets/css/main.scss'
  },
  env: {
    VUE_APP_BASE_API: "http://localhost:3000" //node服务地址
  },
  router: {
    linkExactActiveClass: 'active-link',
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, context) {
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.exclude = [resolvefile('assets/icons/svg')]

      //添加loader规则
      config.module.rules.push({
        test: /\.svg$/, //匹配.svg
        include: [resolvefile('assets/icons/svg')], //将存放svg的目录加入到loader处理目录
        use: [{ loader: 'svg-sprite-loader', options: { symbolId: 'icon-[name]' } }]
      })
    }
  }
}
