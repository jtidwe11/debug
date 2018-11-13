<template lang='pug'>
  .App
    button(@click='sayHi') Click Me
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({})
export default class App extends Vue {
  sayHi () {
    alert('Hi')
  }
}
</script>