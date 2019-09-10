<template>
  <section class="anatomy">
    <ul>
      <tree-item
        class="item"
        :item="treeData"
        @selected="onSelect"
        :open-by-default="true"
      ></tree-item>
    </ul>
    <div v-if="activeItem">
      <h3 v-text="activeItem.name"></h3>
      <div class="anatomy-desc" v-text="activeItem.description"></div>
    </div>
  </section>
</template>

<script>
// demo data
var treeData = {
  name: 'Sails Application',
  description: `
    Lalala

    You can explore the different parts of a Sails.js project by expanding the menu to the left.
  `.trim().replace(/^( |\t)+/gm, ''),
  children: [
    {
      name: '/api',
      children: [
        { name: '/controllers', description: `Controller or actions2 files for handling requests.` },
        { name: '/models', description: `Models for interacting with the database through Waterline.` },
        { name: '/policies', description: `Policies that can run before controllers or groups of controllers (useful for auth and other stuff).` },
        { name: '/hooks', description: `Project-level hooks for interacting with Sails` },
        { name: '/responses', description: `Custom response handlers` },
      ]
    },
    {
      name: '/assets',
      description: '',
    },
    {
      name: '/config',
      children: [
        {
          name: '/env',
          description: `Environment-specific configuration overrides can be set here.`,
          children: [
            { name: 'production.js' }
          ]
        },
        {
          name: '/locales',
          description: `Store "locale" files for internationalization (ie, translations of your content)`
          // children: [
          //   { name: 'production.js' }
          // ]
        },
        { name: 'connections.js' },
        { name: 'models.js' },
        { name: 'local.js' },
        { name: 'sockets.js' },
      ]
    },
    {
      name: '/test',
      description: '',
    },
    {
      name: '/views',
      description: '',
    },
    {
      name: '/scripts',
      description: `Custom "shell scripts" that can be run using your Sails environment.`
    },
    {
      name: '/tasks',
      description: `Grunt tasks - used for managing and minifying your CSS, front-end JavaScript and other assets.`
    },
    {
      name: '.sailsrc',
      description: `...`
    },
    {
      name: 'app.js',
      description: `...`
    },
  ]
}

// boot up the demo
export default {
  data: () => ({
    treeData,
    activeItem: treeData
  }),

  methods: {
    onSelect: function (item) {
      this.activeItem = item
    }
  }
}
</script>

<style>
.anatomy {
  display: flex;
}
.anatomy > div {
  flex-grow: 1;
}
.anatomy > ul {
  width: 180px;
  flex-shrink: 0;
}
.anatomy .item {
  cursor: pointer;
}
.anatomy .bold {
  font-weight: bold;
}
.anatomy ul {
  padding: 0;
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: none;
}
.anatomy ul:first-child {
  padding: 0;
}
.anatomy .anatomy-desc {
  white-space: pre-wrap;
}
</style>
