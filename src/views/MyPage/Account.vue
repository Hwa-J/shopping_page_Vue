<template>
  <h2>계좌 관리</h2>
  <div class="connected-accounts">
    <template v-if="connectedAccounts.totalBalance !== 0">
      <h3>총 잔액</h3>
      <div class="totalBalance">
        {{ Number(connectedAccounts.totalBalance).toLocaleString('ko-KR') + '원' }}
      </div>
      <ul class="accounts">
        <h3>연결계좌 목록</h3>
        <li
          v-for="account in connectedAccounts.accounts"
          :key="account.id">
          {{ account.bankName }}
          {{ account.accountNumber }}
          {{ Number(account.balance).toLocaleString('ko-KR') + '원' }}
          <button
            :id="account.id"
            class="btn"
            @click="disconnectAccount({ accountId: account.id, signature: true })">
            해지
          </button>
        </li>
      </ul>
    </template>
    <template v-else>
      {{ '연결된 계좌가 없습니다.' }}
    </template>
  </div>
  <h3>계좌 추가</h3>
  <form @submit.prevent>
    <div class="input-wraper">
      <div class="input-title">
        은행명
      </div>
      <select
        id="selectableBanks"
        v-model="selected"
        @change="selectbank()">
        <option
          v-for="bank in selectableBanks"
          :key="bank.code"
          :value="bank">
          <!-- {{ bank }} -->
          {{ `${bank.code}:: ` + bank.name }}
        </option>
      </select>
      <div>
        {{ selected.name? selected.name : '은행을 선택하세요.' }}
      </div>
    </div>
  
    <!-- <div class="input-wraper">
      <div class="input-title">
        은행명
      </div>
      <input
        v-model="bankCode"
        class="title input"
        type="text"
        required />
    </div> -->

    <div class="input-wraper">
      <div class="input-title">
        계좌번호
      </div>
      <input
        v-model="accountNumber"
        class="title input"
        type="text"
        :maxlength="accountNumberLength"
        :minlength="accountNumberLength"
        required />
    </div>

    <div class="input-wraper">
      <div class="input-title">
        전화번호
      </div>
      <input
        v-model="phoneNumber"
        class="title input"
        type="text"
        required />
    </div>

    <div class="input-wraper">
      <div class="input-title">
        사용자 서명
      </div>
      <span>계좌정보 저장에 동의합니다.</span>
      <input
        v-model="signature"
        class="checkbox"
        type="checkbox"
        required />
    </div>

    <input
      type="submit"
      value="추가"
      class="btn"
      @click="connectAccount($data)" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      selected: '',
      bankCode: '',
      accountNumber: '',
      phoneNumber: '01012345678',
      signature: false,
      accountNumberLength: ''
    }
  },
  computed: {
    connectedAccounts() {
      return this.$store.state.account.connectedAccounts
    },
    selectableBanks() {
      return this.$store.state.account.selectableBanks
    }
  },
  mounted() {
    this.viewConnectedAccounts()
    this.viewSelectableBanks()
  },
  methods: {
    selectbank() {
      this.bankCode = this.selected.code
      this.accountNumberLength = this.selected.digits.reduce((p,c) => p + c)
      // this.accountNumberLength = bank.digits.reduce((p,c) => p + c)
      console.log(this.selected)
      console.log(this.bankCode)
      console.log(this.accountNumberLength)
    },
    async viewConnectedAccounts() {
      await this.$store.dispatch('account/viewConnectedAccounts')
    },
    async viewSelectableBanks() {
      await this.$store.dispatch('account/viewSelectableBanks')
    },
    async connectAccount(payload) {
      await this.$store.dispatch('account/connectAccount', payload)
    },
    async disconnectAccount(payload) {
      await this.$store.dispatch('account/disconnectAccount', payload)
    }
  }
}
</script>
