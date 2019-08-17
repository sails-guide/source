<template>
  <div class="theme-container" :class="{'sidebar-open': isSidebarOpen}">
    <Navbar
        @toggle-sidebar="toggleSidebar"
    />

    <div
        class="sidebar-mask"
        @click="toggleSidebar(false)"
    ></div>

    <Sidebar
        :items="sidebarItems"
        @toggle-sidebar="toggleSidebar"
    >
      <slot
          name="sidebar-top"
          slot="top"
      />
      <slot
          name="sidebar-bottom"
          slot="bottom"
      />
    </Sidebar>

    <div class="page">
      <div class="theme-default-content">
        <div class="page-404">
          <img style="max-width: 250px" alt="" src="../../../.vuepress/public/images/pirate.svg" />
          <h1>404</h1>
          <p>{{ getMsg() }}</p>
          <router-link to="/">Take me home.</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@theme/components/Sidebar.vue'
import Navbar from '@theme/components/Navbar.vue'
import { resolveSidebarItems } from '../util'

const msgs = [
  `The winds they are blowing.`,
  `How did we get here?`,
  `That's a Four-Oh-Four, Cap'n.`,
  `Arr, ye appear to be off course.`
]

export default {
  components: { Sidebar, Navbar },

  computed: {
    sidebarItems () {
      return resolveSidebarItems(
          this.$page,
          '/', //this.$page.regularPath,
          this.$site,
          this.$localePath
      )
    }
  },

  data: () => ({
    isSidebarOpen: false
  }),

  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    },

    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>

<style lang="stylus">
.theme-default-content
  .page-404
    text-align center
    img
      width 100%
      max-width 250px
    p
      color #aaa
      font-style italic
</style>