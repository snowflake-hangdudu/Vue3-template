<template>
  <div class="app-container">
    <div class="filter-container-flex">
      <el-input
        class="filter-item"
        style="width: 320px"
        v-model="tb.query.resId"
        clearable
        placeholder="请输入ID"
        @input="actions.queryAll({ resetPage: true })">
        <template #prepend>ID</template>
      </el-input>
      <el-input
        class="filter-item"
        style="width: 320px"
        v-model="tb.query.name"
        clearable
        placeholder="请输入发布人姓名"
        @input="actions.queryAll({ resetPage: true })">
        <template #prepend>发布人姓名</template>
      </el-input>
      <el-input
        class="filter-item"
        style="width: 320px"
        v-model="tb.query.mobile"
        clearable
        placeholder="请输入发布人手机号"
        @input="actions.queryAll({ resetPage: true })">
        <template #prepend>发布人手机号</template>
      </el-input>
    </div>
    <el-table v-loading="tb.listLoading" :data="tb.list" element-loading-text="Loading" bTeacher fit highlight-current-row border align="center">
  <!-- 内容 -->
  <el-table-column prop="id" label="ID" align="center">
    <template #default="scope: ElTableRow<TeacherModel>">
      {{ scope.row.resId }}
    </template>
  </el-table-column>
  <el-table-column prop="id" label="姓名" align="center">
    <template #default="scope: ElTableRow<TeacherModel>">
      {{ scope.row.userName }}
    </template>
  </el-table-column>

  <el-table-column prop="id" label="头像" align="center">
    <template #default="scope: ElTableRow<TeacherModel>">
      <img :src="imgUrl + scope.row.userPhoto" style="width: 50px; height: 50px; border-radius: 50%" v-if="scope.row.userPhoto" />
    </template>
  </el-table-column>

  <el-table-column prop="id" label="联系信息" align="center" width="120">
    <template #default="scope: ElTableRow<TeacherModel>">
      {{ scope.row.userMobile }}
    </template>
  </el-table-column>

  <el-table-column prop="id" label="教师资格证" align="center">
    <template #default="scope: ElTableRow<TeacherModel>">
      {{ scope.row.isTeacherCert ? '是' :'否' }}
    </template>
  </el-table-column>

  <el-table-column prop="id" label="最高学历" align="center">
    <template #default="scope: ElTableRow<TeacherModel>">
      {{ scope.row.degreeName }}
    </template>
  </el-table-column>

  <el-table-column prop="id" label="毕业院校" align="center">
    <template #default="scope: ElTableRow<TeacherModel>">
      {{ scope.row.userSchoolName }}
    </template>
  </el-table-column>

  <!-- <el-table-column prop="id" label="个人风采" align="center">
    <template #default="scope: ElTableRow<TeacherModel>"></template>
  </el-table-column> -->
  
  <el-table-column prop="id" label="求职类型" align="center" width="120">
    <template #default="scope: ElTableRow<TeacherModel>">
      {{ scope.row.isParent ? '家长直招' :'学校/机构招聘' }}
    </template>
  </el-table-column>
  
  <el-table-column prop="id" label="薪资范围" align="center">
    <template #default="scope: ElTableRow<TeacherModel>">
      <span v-if="scope.row.settleStyle">
        {{ scope.row.settleStyle == 4 ? '时薪' : scope.row.settleStyle == 3 ? '月薪' : '' }} : {{ scope.row.latestSalary }} - {{ scope.row.highestSalary }}
      </span>
    </template>
  </el-table-column>
  
  <el-table-column prop="id" label="求职地点" align="center">
    <template #default="scope: ElTableRow<TeacherModel>">
      {{ scope.row.cityName }}
    </template>
  </el-table-column>
  
  <el-table-column prop="id" label="上/下架" align="center">
    <template #default="scope: ElTableRow<TeacherModel>">
      <el-switch v-model="scope.row.isOnline" @click="updataIsOnline(scope.row)"></el-switch>
    </template>
  </el-table-column>
  
  <el-table-column prop="id" label="审核状态" align="center">
    <template #default="scope: ElTableRow<TeacherModel>">
      {{ scope.row.status == "checking" ? '审核中' : scope.row.status == "success" ? '审核通过' : '审核失败' }}
    </template>
  </el-table-column>

  <!-- 操作 -->
  <el-table-column class-name="status-col" fixed="right" label="操作" align="center">
    <template #default="scope: ElTableRow<TeacherModel>">
      <el-button type="primary" size="small" @click="() =>{
        tb.addDialogVisible = true,resId = scope.row.resId,row = scope.row
      }">审核</el-button>
    </template>
  </el-table-column>
</el-table>

    <!-- 翻页 -->
    <div class="pagination-container" v-if="tb.total">
      <el-pagination
        v-model:current-page="tb.query.pageNum"
        :page-sizes="[5, 20, 30, 50, 100, 200]"
        v-model:page-size="tb.query.pageSize"
        :total="tb.total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="(v: number) => actions.sizeChange(v)"
        @current-change="(v: number) => actions.pageChange(v)" />
    </div>
    <!-- 添加/删除数据的弹窗 -->
    <el-dialog v-model="tb.addDialogVisible" title="审核教师简历" width="620px" @closed="tb.isNew = false">
      <div>审核教师: {{ row?.userName }}</div>
      
      <template #footer class="dialog-footer">
        <el-button type="primary"  @click="actionsResId(false)">审核失败</el-button>
        <el-button type="primary"  @click="actionsResId(true)">审核成功</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import refTable from '@/public/basic-table'
import {ref} from 'vue'
import { Plus } from '@element-plus/icons-vue'
import TeacherQuery, { TeacherModel, TeacherQueryParmas } from '../../api/teacher'
import http from '@/config/axios'
import { ElMessage } from 'element-plus'
const { request } = http
const imgUrl = 'https://img-teacher.oss-cn-shenzhen.aliyuncs.com/'

/** 创建表格，与表格相关操作 */
const [tb, actions] = refTable<TeacherModel, TeacherQueryParmas, TeacherQuery>(new TeacherQuery(), {

})
const resId = ref(0)
const row= ref<TeacherModel>()

console.log(tb, actions, 'data')
const updataIsOnline = async (row: TeacherModel) => {
  await request({
    url: `api/admin/resume/isOnline/${row.resId}`,
    method: 'put'
  })
  actions.queryAll({ resetPage: true })
  ElMessage.success('操作成功')
}

//审核简历
const actionsResId = async (check: boolean) => {
  await request({
    url: `api/admin/resume/check/${resId.value}`,
    method: 'put',
    params:{
      check
    }
  })
  actions.queryAll({ resetPage: true })
  ElMessage.success('操作成功') 
  tb.addDialogVisible = false

}
</script>
