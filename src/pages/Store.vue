<template>
  <h1>{{ fooStore.foo }}</h1>
</template>

<script setup async>
import { defineStore } from 'pinia'


const useFooStore = defineStore('foo-store', {
  state: () => ({
    foo: 'bar',
  }),
})
const fooStore = useFooStore()
</script>

<style scoped>
h1 {
  color: red;
}
</style>
