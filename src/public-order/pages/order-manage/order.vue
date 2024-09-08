<template>
  <div class="app-container">
    <div class="filter-container-flex">
      <el-input
        class="filter-item"
        style="width: 320px"
        v-model="tb.query.posId"
        clearable
        placeholder="请输入订单ID"
        @input="actions.queryAll({ resetPage: true })">
        <template #prepend>订单ID</template>
      </el-input>
      <el-input
        class="filter-item"
        style="width: 320px"
        v-model="tb.query.userName"
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
    <el-table
      v-loading="tb.listLoading"
      :data="tb.list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      align="center">
      <!-- 订单ID -->
      <el-table-column prop="id" label="订单ID" align="center">
        <template #default="scope: ElTableRow<OrderModel>">
          {{ scope.row.positionId }}
        </template>
      </el-table-column>

      <!-- 发布人ID -->
      <el-table-column prop="id" label="发布人ID" align="center">
        <template #default="scope: ElTableRow<OrderModel>">
          {{ scope.row.userId }}
        </template>
      </el-table-column>

      <!-- 发布人姓名 -->
      <el-table-column prop="id" label="发布人姓名" align="center">
        <template #default="scope: ElTableRow<OrderModel>">
          {{ scope.row.userName }}
        </template>
      </el-table-column>

      <!-- 发布人联系方式 -->
      <el-table-column prop="id" label="发布人联系方式" align="center">
        <template #default="scope: ElTableRow<OrderModel>">
          {{ scope.row.userMobile }}
        </template>
      </el-table-column>

      <!-- 发布人头像 -->
      <el-table-column prop="id" label="发布人头像" align="center">
        <template #default="scope: ElTableRow<OrderModel>">
          <img :src="imgUrl + scope.row.userPhoto" style="width: 50px; height: 50px; border-radius: 50%" v-if="scope.row.userPhoto" />
        </template>
      </el-table-column>

      <!-- 订单状态 -->
      <el-table-column prop="id" label="订单状态" align="center">
        <template #default="scope: ElTableRow<OrderModel>">
          {{ scope.row.posStatus == 2 ? '发布中' : '已完成' }}
        </template>
      </el-table-column>

      <!-- 上/下架 -->
      <el-table-column prop="id" label="上/下架" align="center">
        <template #default="scope: ElTableRow<OrderModel>">
          <el-switch v-model="scope.row.isOnline" @click="updataIsOnline(scope.row)"></el-switch>
        </template>
      </el-table-column>

      <!-- 订单类型 -->
      <el-table-column prop="" label="订单类型" align="center">
        <template #default="scope: ElTableRow<OrderModel>">
          {{ scope.row.workType == 1 ? '全职' : scope.row.workType == 2 ? '兼职' : '全职➕兼职' }}
        </template>
      </el-table-column>

      <!-- 订单来源 -->
      <el-table-column prop="id" label="订单来源" align="center">
        <template #default="scope: ElTableRow<OrderModel>">
          {{ scope.row.isParent ? '家长' : '学校/机构直招' }}
        </template>
      </el-table-column>

      <!-- 求职城市 -->
      <el-table-column prop="id" label="求职城市" align="center">
        <template #default="scope: ElTableRow<OrderModel>">
          {{ scope.row.cityName }}
        </template>
      </el-table-column>

      <!-- 具体工作时间 -->
      <el-table-column prop="id" label="具体工作时间" align="center">
        <template #default="scope: ElTableRow<OrderModel>">{{ scope.row.workDateStart }} -- {{ scope.row.workDateEnd }}</template>
      </el-table-column>

      <!-- 性别 -->
      <el-table-column prop="id" label="性别" align="center">
        <template #default="scope: ElTableRow<OrderModel>">
          {{ scope.row.reqSex == 1 ? '男' : '女' }}
        </template>
      </el-table-column>

      <!-- 操作 -->
      <!-- <el-table-column class-name="status-col" fixed="right" label="操作" align="center">
        <template #default="scope: ElTableRow<OrderModel>">
          <el-button type="primary" size="small" @click="actions.edit(scope.row)">修改</el-button>
        </template>
      </el-table-column> -->
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
  </div>
</template>
<script lang="ts" setup>
import refTable from '@/public/basic-table'
import { Plus } from '@element-plus/icons-vue'
import OrderQuery, { OrderModel, OrderQueryParmas } from '../../api/order'
import http from '@/config/axios'
import { ElMessage } from 'element-plus'
const { request } = http
const imgUrl = 'https://img-teacher.oss-cn-shenzhen.aliyuncs.com/'
/** 创建表格，与表格相关操作 */
const [tb, actions] = refTable<OrderModel, OrderQueryParmas, OrderQuery>(new OrderQuery(), {
  // 默认的搜索值
})
console.log(tb, actions, 'data2')

const updataIsOnline = async (row: OrderModel) => {
  await request({
    url: `api/admin/position/isOnline/${row.positionId}`,
    method: 'put'
  })
  actions.queryAll({ resetPage: true })
  ElMessage.success('操作成功')
}
</script>
