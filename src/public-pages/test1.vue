<template>
  <div class="appcontainer">
    <el-dropdown ref="dropdownref" trigger="click">
      <div class="label">解决el-select收起时,el-dropdown同时收起的问题</div>
      <template #dropdown>
        <el-dropdown-menu class="menu">
          <el-select class="sel" v-model="value" @visible-change="change">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
const value = ref('')
const dropdownref = ref<any>(null)

let options = [
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 },
  { label: '选项3', value: 3 },
  { label: '选项4', value: 4 },
  { label: '选项5', value: 5 }
]

//开启el-dorpdown下拉框
const open = () => {
  dropdownref.value.handleOpen()
}

const change = () => {
  open()
}
</script>

<style lang="less" scoped>
.appcontainer {
  display: flex;
  justify-content: center;
}
.menu {
  width: 600px;
  background-color: pink;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  height: 2000px;
}

.sel {
  width: 200px;
  margin: 20px;
}
</style>
