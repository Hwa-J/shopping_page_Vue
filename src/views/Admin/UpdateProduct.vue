<template>
  <section class="updateProduct">
    <h2>상품 수정</h2>
    <form
      class="addProduct"
      @submit.prevent>
      <div class="input-wraper">
        <div class="input-title">
          대표사진
        </div>
        <img
          :src="product.thumbnail"
          alt="thumbnail"
          width="100" />
        <input
          class="thumbnail"
          type="file"
          @change="selectThumbnai" />
      </div>
    
      <div class="input-wraper">
        <div class="input-title">
          상세사진
        </div>
        <img
          class="detailPhoto"
          :src="product.photo"
          alt="photo"
          width="100" />
        <input
          class="detail"
          type="file"
          @change="selectPhoto" />
      </div>
    
      <div class="input-wraper">
        <div class="input-title">
          상품명
        </div>
        <input
          v-model="product.title"
          class="title input"
          type="text"
          required />
      </div>
    
      <div class="input-wraper">
        <div class="input-title">
          가격
        </div>
        <input
          v-model.number="product.price"
          class="price input"
          type="text"
          required />
      </div>
    
      <div class="input-wraper">
        <div class="input-title">
          상품설명
        </div>
        <input
          v-model="product.description"
          class="description input"
          type="text"
          required />
      </div>
    
      <div class="input-wraper">
        <div class="input-title">
          태그
        </div>
        <input
          v-model="product.tags"
          class="tags input"
          type="text" />
      </div>

      <div class="input-wraper">
        <div class="input-title">
          품절여부
        </div>
        <input
          v-model="product.isSoldOut"
          class="isSoldOut"
          type="checkbox" />
      </div>

      <input
        type="submit"
        value="수정"
        class="btn"
        @click="updateProduct" />
      <button
        class="btn"
        @click="goToBack">
        취소
      </button>
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      product: {}
    }
  },
  mounted() {
    this.viewProduct()
    
  },
  methods: {
    async viewProduct() {
      this.product = await this.$store.dispatch('admin/viewProduct')
      console.log(this.product)
    },
    async updateProduct() {
      this.product = await this.$store.dispatch('admin/updateProduct', this.product)
    },
    selectThumbnai(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          this.product.thumbnail = e.target.result
        })
      }
    },
    selectPhoto(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          this.product.photo = e.target.result
        })
      }
    },
    goToBack() {
      this.$router.back()
    }
  }

}
</script>

<style lang="scss" scoped>
.updateProduct {
  padding: 34px 50px;
}
// .input-wraper {
//   display: flex;
//   flex-direction: column;
// }
.detailPhoto {
  height: 200px;
  object-fit:contain;
}
</style>
