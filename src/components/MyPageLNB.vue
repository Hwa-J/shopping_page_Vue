<template>
  <nav>
    <slot>
    </slot>
  </nav>
</template>

<style lang="scss" scoped>
  nav {
    max-width: 500px;
    min-width: 160px;
    height: 100%;
    padding: 20px;
    box-sizing: content-box;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    position: relative;
  }
</style>
