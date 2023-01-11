import axios from 'axios'
import { API_HEADERS, END_POINT } from '~/api/api'

export default {
  namespaced: true,
  state() {
    return {
      products: []
    }
  },
  mutations: {
    // state 데이터 수정 (payload는 객체 데이터를 인수로 받음)
    setStates(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    },
    setProducts(state, payload) {
      state.products = payload
    },
  },
  actions: {
    // 모든제품 조회
    async searchProducts({ commit }, payload = null) {
      try {
        const { data } = await axios({
          url: `${END_POINT}/products/search`,
          method: 'POST',
          headers: API_HEADERS,
          data: {
            payload
          }
        })
        console.log(data)
        commit('setProducts', data)
      }catch(error) {
        console.log(error)
      }
    },
  }
}
