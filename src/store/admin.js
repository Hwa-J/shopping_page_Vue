import axios from 'axios'
import router from '~/routes'
import { API_HEADERS, END_POINT } from '~/api/api'

export default {
  namespaced: true,
  state() {
    return {
      products: []
    }
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    // state 데이터 수정 (payload는 객체 데이터를 인수로 받음)
    setStates(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    }
  },
  actions: {
    // 모든제품 조회
    async viewAllProducts({ commit }) {
      try {
        const { data } = await axios({
          url: `${END_POINT}/products`,
          method: 'GET',
          headers: {...API_HEADERS, masterKey: true},
        })
        commit('setProducts', data)
      }catch(error) {
        console.log(error)
      }
    },
    // 단일 제품 조회
    async viewProduct() {
      const id = router.currentRoute._value.params.id
      try {
        const { data } = await axios({
          url: `${END_POINT}/products/${id}`,
          method: 'GET',
          headers: API_HEADERS
        })
        return data

      }catch(error) {
        console.log(error)
      }
    },
    // 제품 추가
    async addProduct(context, payload) {
      console.log(payload)
      try {
        await axios({
          url: `${END_POINT}/products`,
          method: 'POST',
          headers: {...API_HEADERS, masterKey: true},
          data: payload
        })
        router.push('/admin/products')
      }catch(error) {
        console.log(error)
      }
    },
    // 제품 삭제
    async deleteProduct(context, id) {
      try {
        await axios({
          url: `${END_POINT}/products/${id}`,
          method: 'DELETE',
          headers: {...API_HEADERS, masterKey: true}
        })
        router.push('/admin/products')
      }catch(error) {
        console.log(error)
      }
    },
    // 제품 수정
    async updateProduct(context, payload) {
      const { title, price, description, tags, isSoldOut  } = payload
      let { thumbnail, photo } = payload
      thumbnail.includes('https://')? thumbnail='' : thumbnail
      photo.includes('https://')? photo='' : photo
      
      const id = router.currentRoute._value.params.id
      try {
        await axios({
          url: `${END_POINT}/products/${id}`,
          method: 'PUT',
          headers: {...API_HEADERS, masterKey: true},
          data: {
            title,
            price,
            description,
            tags,
            thumbnailBase64: thumbnail,
            photoBase64: photo,
            isSoldOut
          }
        })
        router.push('/admin/products')
      }catch(error) {
        console.log(error)
      }
    }
  }
}
