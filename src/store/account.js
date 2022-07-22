import axios from 'axios'
// import router from '~/routes'
import { API_HEADERS, END_POINT } from '~/api/api'

export default {
  namespaced: true,
  state() {
    return {
      selectableBanks: [],
      connectedAccounts: {}
    }
  },
  mutations: {
    setState(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
      console.log(state)
    },
    setSelectableBanks(state, payload) {
      state.selectableBanks = payload
    },
    setConnectedAccounts(state, payload) {
      state.connectedAccounts = payload
    },
  },
  actions: {
    // 선택 가능한 은행 목록 조회
    async viewSelectableBanks({ commit }) {
      const accessToken = window.localStorage.getItem('accessToken')
      try {
        let { data } = await axios({
          url: `${END_POINT}/account/banks`,
          method: 'GET',
          headers: {...API_HEADERS, Authorization: `Bearer ${accessToken}`}
        })
        data = data.filter(bank => !bank.disabled)
        commit('setSelectableBanks', data)
      }catch(error) {
        console.log(error)
      }
    },
    // 연결된 계좌 목록 조회
    async viewConnectedAccounts({ state, commit }) {
      const accessToken = window.localStorage.getItem('accessToken')
      try {
        const { data } = await axios({
          url: `${END_POINT}/account`,
          method: 'GET',
          headers: {...API_HEADERS, Authorization: `Bearer ${accessToken}`}
        })
        commit('setConnectedAccounts', data)
        console.log(data)
        console.log(state.connectedAccounts)
      }catch(error) {
        console.log(error)
      }
    },
    // 계좌 연결
    async connectAccount(context, payload) {
      const accessToken = window.localStorage.getItem('accessToken')
      const { bankCode, accountNumber, phoneNumber, signature  } = payload
      try {
        await axios({
          url: `${END_POINT}/account`,
          method: 'POST',
          headers: {...API_HEADERS, Authorization: `Bearer ${accessToken}`},
          data: {
            bankCode, 
            accountNumber, 
            phoneNumber, 
            signature
          }
        })
        console.log('등록 완료')
        window.location.reload()
        // router.push('/my-page/account')
      }catch(error) {
        console.log(error)
      }
    },
    // 계좌 해지
    async disconnectAccount(context, payload) {
      const accessToken = window.localStorage.getItem('accessToken')
      try {
        await axios({
          url: `${END_POINT}/account`,
          method: 'DELETE',
          headers: {...API_HEADERS, Authorization: `Bearer ${accessToken}`},
          data: payload
        })
        window.location.reload()
      }catch(error) {
        console.log(error)
      }
    }
  },
}
