<template>
  <div>
    <nf-form
      ref="nfForm"
      :form-schema="formSchema"
      :loading="loading"
      @onSubmit="onSubmit"
    ></nf-form>
  </div>
</template>

<script>
import formSchema from '@/pageConfig/<pageConfig>'
import { Toast } from 'vant'

export default {
  data () {
    return {
      formSchema,
      loading: false,
      id: ''
    }
  },
  methods: {
    // 验证通过后的回调
    async onSubmit (values) {
      this.loading = true

      const result = await this.$http.post('/api/agent-bff/contract-api/distribution/save-and-create-flow', {
        ...values,
        customerCompanyPresaleContractId: this.id
      })

      const { data } = result
      if (data && data.code === 200) {
        // 提交成功后跳转
        // this.$router.push(`/contract/confirm?id=${data.data.customerCompanyPresaleContractIdString}`)
      }

      this.loading = false
    },
    // 获取详情
    async getDetail () {
      const { id } = this
      const { data } = await this.$http.get(`/api/agent-bff/contract-api/distribution/detail?id=${id}`)
      this.detail = data.data || {}

      this.$refs.nfForm.setFieldsValue(this.detail)
    }
  },
  async created () {
    this.id = this.$route.query.id
    if (this.id) {
      this.getDetail()
    }
  }
}
</script>
