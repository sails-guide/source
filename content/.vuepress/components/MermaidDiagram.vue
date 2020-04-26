<template>
  <div class="vuepress_plugin__mermaid__wrapper"
    v-html="currOutput"></div>
</template>

<style>
.vuepress_plugin__mermaid__wrapper svg {
  max-width: 100%;
}
</style>

<script>
export default {
  props: ['id', 'value'],

  data: () => ({
    currOutput: ''
  }),

  watch: {
    value (val) {
    }
  },

  mounted () {
    import("mermaid/dist/mermaid").then(m => {
      m.initialize({
        startOnLoad: true
      })
      m.init()
      m.render(this.id, JSON.parse(this.value), this.insertSvg)
    })
  },

  methods: {
    insertSvg (svgCode, bindFunction) {
      this.currOutput = svgCode
    }
  }
}
</script>
