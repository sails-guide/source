<template>
  <li>
    <div
      :class="{bold: isFolder}"
      @click="toggle">
      <span v-if="false && !openByDefault && isFolder">[{{ isOpen ? '-' : '+' }}]</span>
      {{ item.name }}
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <tree-item
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        @make-folder="$emit('make-folder', $event)"
        @selected="onSelect"
      ></tree-item>
    </ul>
  </li>
</template>

<script>
// define the tree-item component
export default {
  name: 'tree-item',
  props: {
    item: Object,
    openByDefault: Boolean
  },
  data: function () {
    return {
      isOpen: false
    }
  },
  computed: {
    isFolder: function () {
      return this.item.children &&
        this.item.children.length
    }
  },
  mounted () {
    if (this.openByDefault) { this.isOpen = true }
  },
  methods: {
    toggle: function () {
      this.onSelect(this.item)
      if (!this.openByDefault && this.isFolder) {
        this.isOpen = !this.isOpen
      }
    },

    onSelect (item) {
      this.$emit('selected', item)
    }
  }
}
</script>

<style>
.anatomy li {
  list-style-type: none;
}
</style>
