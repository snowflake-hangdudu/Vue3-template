<script setup lang="ts">
import { useI18n } from '@/hooks/web/useI18n'
import { useForm } from '@/hooks/web/useForm'
import { ElButton, ElInput, ElMessage } from 'element-plus'
import { useValidator } from '@/hooks/web/useValidator'
import { delayDuration } from '@/utils/async'
import http from '@/config/axios'
import { computed, reactive, ref, unref, watch, onMounted } from 'vue'
import { useCache } from '@/hooks/web/useCache'
import { useAppStore } from '@/store/modules/app'
import { usePermissionStore } from '@/store/modules/permission'
import { useRouter } from 'vue-router'
import type { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'

const { request } = http
const emit = defineEmits(['to-login'])
const { currentRoute, addRoute, push } = useRouter()
const { t } = useI18n()
const { required } = useValidator()
const ruleFormRef = ref<FormInstance>() // 表单实例
const rules: FormRules = {
  account: [required()], //账号
  tel: [required()], //电话
  name: [required()], //姓名
  password: [required()], //密码
  telCode: [required()], //验证码
  type: [required()]
}
//切换到登录页面
const toLogin = () => {
  emit('to-login')
}
const loading = ref(false)
const formSize = ref('large')
const countdown = ref(0)
const sendLoading = ref(false)

const loginRegister = async () => {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        loading.value = true
        //通过校验

        await submit()
      } finally {
        loading.value = false
      }
    }
  })
}

async function sendCode() {
  if (formData.value.tel.length < 11) {
    ElMessage({
      message: '请输入11位手机号',
      type: 'warning'
    })
    return
  }
  try {
    sendLoading.value = true
    // let res = await request({
    //   url: `/pc/user/verifyCode/${formData.tel}`,
    //   method: 'get'
    // })
    // ElMessage.success('验证码已发送')
    if (import.meta.env.VITE_USER_NODE_ENV !== 'production') formData.value.telCode = '1234'
  } finally {
    sendLoading.value = false
  }
  for (let i = 0; i < 30; i++) {
    countdown.value = 30 - i - 1
    await delayDuration(1000)
  }
}
const redirect = ref<string>('')
watch(
  () => currentRoute.value,
  (route: RouteLocationNormalizedLoaded) => {
    redirect.value = route?.query?.redirect as string
  },
  {
    immediate: true
  }
)

watch(
  () => countdown.value,
  (val) => {
    if (val === 0) {
      countdown.value = 0
    }
  }
)

interface formData {
  account: string
  name: string
  password: string
  check_password: string
  tel: string
  telCode: string
  email: string
}

const formData = ref<formData>({
  name: 'hangdudu',
  account: 'hangdudu',
  password: '123456',
  check_password: '123456',
  tel: '13812345678',
  telCode: '',
  email: '123456@qq.com'
})

async function submit() {
  if (formData.value.password !== formData.value.check_password) {
    ElMessage({
      message: '重复密码与密码不同',
      type: 'warning'
    })
    return
  }
  //发起注册请求的逻辑，这里只是模拟

  ElMessage({
    message: '注册成功,账号待审核',
    type: 'success'
  })
  try {
    toLogin()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <el-form
    ref="ruleFormRef"
    style="width: 100%"
    :model="formData"
    :rules="rules"
    label-width="auto"
    label-position="left"
    :size="formSize"
    status-icon>
    <div>
      <h2 class="text-2xl font-bold text-center w-[100%]" style="margin: 0 0 30px 0">{{ t('login.register') }}</h2>
    </div>
    <el-form-item label="账号" prop="account">
      <el-input v-model="formData.account" />
    </el-form-item>

    <el-form-item label="姓名" prop="name">
      <el-input v-model="formData.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formData.password" type="password" placeholder="请输入密码" show-password />
    </el-form-item>
    <el-form-item label="确认密码" prop="check_password">
      <el-input v-model="formData.check_password" type="password" placeholder="请输入密码" show-password />
    </el-form-item>
    <el-form-item label="手机号" prop="tel">
      <el-input v-model="formData.tel" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="formData.email" />
    </el-form-item>
    <div class="w-[100%] flex">
      <el-form-item label="验证码" prop="telCode" style="flex: 1; display: flex">
        <el-input v-model="formData.telCode" placeholder="请输入验证码" />
      </el-form-item>
      <div style="display: flex; justify-content: flex-end">
        <el-button style="margin-left: 8px" @click="sendCode" :loading="sendLoading" :disabled="!!countdown">
          {{ countdown == 0 ? '获取' : `${countdown}s` }}
        </el-button>
      </div>
    </div>
    <!-- <el-form-item label="下拉框" prop="region">
      <el-select v-model="formData.region" placeholder="请选择">
        <el-option label="选择1" value="shanghai" />
        <el-option label="选择2" value="beijing" />
      </el-select>
    </el-form-item> -->
    <!-- <el-form-item label="是否开启" prop="delivery">
      <el-switch v-model="formData.delivery" />
    </el-form-item> -->
    <!-- <el-form-item label="性别" prop="resource">
      <el-radio-group v-model="formData.resource">
        <el-radio value="Sponsorship">男</el-radio>
        <el-radio value="Venue">女</el-radio>
      </el-radio-group>
    </el-form-item> -->

    <div class="w-[100%]">
      <ElButton type="primary" class="w-[100%]" :loading="loading" @click="loginRegister">
        {{ t('login.register') }}
      </ElButton>
    </div>
    <div class="w-[100%] mt-15px">
      <ElButton class="w-[100%]" @click="toLogin">
        {{ t('login.hasUser') }}
      </ElButton>
    </div>
  </el-form>
</template>

<style lang="less">
.form {
  overflow: auto;
}
</style>
