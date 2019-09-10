const fs = require('fs')
const path = require('path')

module.exports = {
  title: 'Sails Guide',
  description: 'Helping you to navigate the 7 seas',

  plugins: [
    'vuepress-plugin-element-tabs',
    require('./plugins/vuepress-plugin-mermaid/lib/index.js'),
    [
      '@vuepress/google-analytics', {
        ga: 'UA-136500374-1'
      }
    ],
    [
      'sitemap', { hostname: 'https://www.sailsguide.com' }
    ]
  ],

  themeConfig: {
    logo: '/images/captain.svg',

    displayAllHeaders: true,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page',
        lastUpdated: 'Last updated',
        nav: require('./nav/en'),
        sidebar: {
          '/': getSidebar(),
        }
      }
    },
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'sails-guide/source',
    repoLabel: 'Wanna help?',
    // if your docs are in a different repo from your main project:
    // docsRepo: 'sails-wiki/source',
    // if your docs are not at the root of the repo:
    docsDir: 'content',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true
  }
}

function getSidebarMenu (title, basePath, subPaths) {
  const children = [ `/${basePath}/` ]

  if (subPaths) {
    for (const [dir, name] of subPaths) {
      const contentPath = path.resolve(__dirname, `../${basePath}/${dir}`)
      const subChildren = fs.readdirSync(contentPath)
          .filter(n => n !== 'README.md' && n.match(/^[^_].*[.]md$/))
          .map(n => `/${basePath}/${dir}/` + n.replace(/[.]md$/, ''))
      subChildren.unshift(`/${basePath}/${dir}/`)
      children.push({
        title: name,
        collapsable: true,
        children: subChildren
      })
    }
  } else {
    const contentPath = path.resolve(__dirname, `../${basePath}`)
    children.push(...
        fs.readdirSync(contentPath)
        .filter(n => n !== 'README.md' && n.match(/^[^_].*[.]md$/))
        .map(n => `/${basePath}/` + n.replace(/[.]md$/, ''))
    )
  }

  const out = {
    title,
    collapsable: true,
    children
  }

  return out
}

function getSidebar () {
  return [
    ['/', 'Home'],
    getSidebarMenu('Getting Started', 'getting-started'),
    getSidebarMenu('Development', 'development'),
    getSidebarMenu('Databases & ORM', 'database', [
      ['postgresql', 'PostgreSQL'],
      // ['mongodb', 'MongoDB'],
      // ['mysql', 'MySQL'],
    ]),
    // getSidebarMenu('Parasails', 'parasails'),
    // getSidebarMenu('Deployment', 'deployment'),
    'faq',
    ['https://sailsjs.com/documentation', 'Offical Docs'],
    ['https://gitter.im/balderdashy/sails', 'Gitter Chat'],
  ]
}
