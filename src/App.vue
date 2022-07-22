<template>
  <TheHeader />
  <section class="container inner">
    <RouterView />
  </section>
  <TheFooter />
</template>

<script>
import TheHeader from '~/components/TheHeader'
import TheFooter from '~/components/TheFooter'

export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>
<style lang="scss">
@import'../src/scss/common';
</style>
