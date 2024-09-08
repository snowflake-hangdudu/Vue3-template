import Queryable, { BasicQueryParams } from '@/public/queryable'
import http from '@/config/axios'
import { B } from 'mockjs'
const { request } = http

/** 模型 */
export interface OrderModel {
  positionId: number //订单ID
  workType: number //订单类型
  isParent: boolean //是否为家长/机构
  reqSex: number //需求性别
  cityName: string //求职城市
  workDateStart: string //工作开始时间
  workDateEnd: string //工作结束时间
  isOnline: boolean //上/下架
  userId: number //用户ID
  userName: string //用户名
  userMobile: string //用户手机号
  userPhoto: string //用户头像
  posStatus: number //订单状态
}

/** 搜索条件 */
export interface OrderQueryParmas extends BasicQueryParams {
  posId?: number //订单ID
  mobile?: number //手机号
  userName?: string //用户名
}

/** 数据源，增删查改等请求 */
export default class OrderQuery extends Queryable<OrderModel, OrderQueryParmas> {
  // 可设置父ID，例如查询用户下的全部文章
  // constructor(id) {
  //     super();
  //     this.id = id;
  // }

  /** 对象名称 */
  get objectName(): string {
    return '订单'
  }

  // 默认的内容
  get defaultObject(): Partial<OrderModel> {
    return {
      positionId: 0
    }
  }

  // 读取正在输入的数据，用于表单校验
  _valueGetter: () => Partial<OrderModel> = () => ({})

  // 已输入的数据的Getter
  get currentEditRow(): Partial<OrderModel> {
    return this._valueGetter()
  }

  // 表单规则
  get rules() {
    return {}
  }

  // 查询全部
  async all(params: OrderQueryParmas) {
    let res = await request({
      url: `api/admin/position/select/page`,
      method: 'get',
      params: {
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        posId: params.posId || null,
        mobile: params.mobile || null,
        userName: params.userName || null
      }
    })
    if (res.data.count == undefined) return res.data
    return {
      data: res.data.rows,
      total: res.data.count
    }
  }

  // 上下架
  // async edit(obj: OrderModel) {
  //   let id = obj.resId
  //   return request({
  //     url: `api/admin/position/isOnline/${id}`,
  //     method: 'put'
  //   })
  // }

  // // 添加
  // async add(obj: OrderModel) {
  //   delete obj.id;
  //   return request({
  //     url: "/api/hospital/Order",
  //     method: "post",
  //     data: obj,
  //   });
  // }

  // // 通过id删除
  // async deleteObj(obj: OrderModel) {
  //   return request({
  //     url: `/api/hospital/Order/${obj.id}`,
  //     method: "delete",
  //   });
  // }
}
