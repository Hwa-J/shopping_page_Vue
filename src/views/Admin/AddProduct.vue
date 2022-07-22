<template>
  <section class="addProduct">
    <h2>상품 추가</h2>
    <form
      class="addProduct"
      @submit.prevent>
      <div class="input-wraper">
        <div class="input-title">
          대표사진
        </div>
        <img
          :src="thumbnailBase64"
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
          :src="photoBase64"
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
          v-model="title"
          class="title input"
          type="text"
          required />
      </div>
    
      <div class="input-wraper">
        <div class="input-title">
          가격
        </div>
        <input
          v-model.number="price"
          class="price input"
          type="text"
          required />
      </div>
    
      <div class="input-wraper">
        <div class="input-title">
          상품설명
        </div>
        <input
          v-model="description"
          class="description input"
          type="text" />
      </div>
    
      <div class="input-wraper">
        <div class="input-title ">
          태그
        </div>
        <input
          v-model="tags"
          class="tags input"
          type="text" />
      </div>
      <input
        type="submit"
        value="등록"
        class="btn"
        @click="addProduct" />
    </form>
  </section>
</template>

<script>
export default {
    data() {
    return {
      title: '',
      price: '',
      description: '',
      tags: '',
      thumbnailBase64: '',
      photoBase64: ''
    }
  },
  methods: {
    async addProduct() {
      await this.$store.dispatch('admin/addProduct', this.$data)
    },
    selectThumbnai(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          this.thumbnailBase64 = e.target.result
        })
      }
    },
    selectPhoto(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          this.photoBase64 = e.target.result
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addProduct {
  padding: 34px 50px;
}
.input-wraper {
  display: flex;
  flex-direction: column;
}
.detailPhoto {
  height: 200px;
  object-fit:contain;
}
</style>
