<template>
  <div class="products">
    <h2>전체상품 조회</h2>
    <ul class="products-list">
      <li
        v-for="product in products"
        :key="product.id"
        class="product">
        <div class="item-wraper">
          <div class="item-img">
            <img
              class="thumbnail"
              :src="product.thumbnail"
              alt="thumbnail" />
          </div>
          <div class="item-info">
            <div class="item-text">
              <div class="item-title">
                {{ product.title }}
              </div>
              <div class="item-price">
                {{ product.price.toLocaleString('ko-KR') + '원' }}
              </div>
              <div class="item-tags">
                {{ product.tags }}
              </div>
            </div>
            <div class="option-wraper">
              <div
                class="item-isSoldOut"
                :style="product.isSoldOut? {color: 'red'} : {color: 'green'}">
                {{ product.isSoldOut ? '품절': '재고 있음' }}
              </div>
              <RouterLink
                :to="`/admin/product/update/${product.id}`"
                class="btn main-color">
                수정
              </RouterLink>
              <button
                :id="product.id"
                class="btn"
                @click="deleteProduct(product.id)">
                삭제
              </button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {
  data() {
      return {
        
      }
    },
  computed: {
    products() {
      return this.$store.state.admin.products
    }
    // ...mapState('admin', [
    //   'products'
    // ])
  },
  mounted() {
    this.viewAllProducts()
  },
  methods: {
    async viewAllProducts() {
      await this.$store.dispatch('admin/viewAllProducts')
    },
    async deleteProduct(id) {
      await this.$store.dispatch('admin/deleteProduct', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.products {
  padding: 34px 50px;
  &-list {
    padding-top: 30px;
  }
}
.product {
  // margin: 15px 0;
  padding: 14px 0;
  border-top: 1px solid #cfcfd0;
  &:last-child {
    border-bottom: 1px solid #cfcfd0;
  }
}
.item-wraper {
  display: flex;
  flex-wrap: wrap;
}
.item-img {
  width: 124px;
  height: 124px;
  overflow: hidden;
  position: relative;
  flex-grow: 0;
  flex-basis: 110px;
  flex-shrink: 0;
  margin-right: 14px;
  .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.item-info {
  display: flex;
  // justify-content: space-around;
  align-items: center;
  flex-grow: 1;
}
.item-text {
  width: 300px;
}
.option-wraper {
  margin-left: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .item-isSoldOut {
    padding: 10px 16px;
  }
}
  
</style>
