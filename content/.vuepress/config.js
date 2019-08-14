const fs = require('fs')
const path = require('path')

module.exports = {
  title: 'Sails Wiki',
  description: 'Helping you to navigate the 7 seas',
  ga: 'UA-136500374-1',

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
          // '/': getApiSidebar(),
          '/': getDbSidebar(),
        }
      }
    },

    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'vuejs/vuepress',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Contribute!',

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: 'vuejs/vuepress',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!'
  }
}

foo('Databases & ORM', 'database', [['postgresql', 'PostgreSQL']] )
function foo (title, basePath, subPaths) {
  const children = [ `/${basePath}/` ]

  if (subPaths) {
    for (const [dir, name] of subPaths) {
      const contentPath = path.resolve(__dirname, `../${basePath}/${dir}`)
      console.log('Lookin for files in', contentPath)
      const subChildren = fs.readdirSync(contentPath)
          .filter(n => n !== 'README.md' && n.match(/.*[.]md$/))
          .map(n => `/${basePath}/${dir}/` + n.replace(/[.]md$/, ''))
      console.log('Found children', subChildren)
      subChildren.unshift(`/${basePath}/${dir}/`)

      children.push({
        title: name,
        collapsable: true,
        children: subChildren
      })
    }
  }

  const out = {
    title,
    collapsable: true,
    children
  }

  console.log('Built menu', out)
  return out
}

function getDbSidebar () {
  const sidebar = [
    foo('Databases & ORM', 'database', [
      ['postgresql', 'PostgreSQL'],
      ['mongodb', 'MongoDB'],
      ['mysql', 'MySQL'],
    ]),
    foo('Parasails', 'parasails'),
  ]
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
  console.log('Built sidebar', JSON.stringify(sidebar, null, 4))
  console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`)
  return sidebar

/*
  return [
    {
      title: 'Database & ORM',
      collapsable: true,
      children: [
        '/database/',
        {
          title: 'PostgreSQL',
          collabsible: true,
          children: [
            '/database/postgresql/',
            '/database/postgresql/native-postgres-arrays'
          ]
        }
      ]
    }
  ]
*/
}
