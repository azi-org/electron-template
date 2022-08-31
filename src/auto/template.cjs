module.exports = (name) => {
  return `<template>
  <h1>${name}</h1>
</template>

<script lang='ts'>
  export default {
    name: '${name}'
  }
</script>

<script setup lang='ts'></script>

<style lang='scss' scoped></style>
`
}