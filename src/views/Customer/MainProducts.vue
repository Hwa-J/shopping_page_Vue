<template>
  <h2>전체 상품</h2>
  <ul class="all-products-list">
    <li
      v-for="product in products"
      :key="product.id"
      class="product">
      <RouterLink :to="`/product/${product.id}`">
        <img
          width="200"
          :src="product.thumbnail"
          alt="thumbnail" />
        {{ product.title }}
        {{ product.price.toLocaleString('ko-KR') + '원' }}
      </RouterLink>
    </li>
  </ul>
</template>

<script>

export default {
  computed: {
    products() {
      return this.$store.state.customer.products
    }
  },
  created() {
    this.searchProducts()
    console.log(this.products)
  },
  methods: {
    async searchProducts(payload) {
      await this.$store.dispatch('customer/searchProducts', payload)
    },
    
  }
}
</script>
