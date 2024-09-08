import Queryable, { BasicQueryParams } from '@/public/queryable'
import http from '@/config/axios'
const { request } = http

/** 模型 */
export interface TeacherModel {
  resId: number;             // 教师的唯一标识符
  userName: string;          // 教师姓名
  userPhoto?: string;        // 教师头像的URL
  isTeacherCert: boolean;    // 是否有教师资格证
  degreeName: string;        // 最高学历名称
  userSchoolName: string;    // 毕业院校名称
  isParent: boolean;         // 是否为家长直招（true: 家长直招, false: 学校/机构招聘）
  settleStyle: number;       // 薪资结算方式（3: 月薪, 4: 时薪）
  latestSalary: number;      // 最低薪资
  highestSalary: number;     // 最高薪资
  cityName: string;          // 求职地点名称
  isOnline: boolean;         // 上/下架
  status:string;           //checking 审核中 fail 审核失败 success 审核成功
  userMobile: string;        // 手机号
}

/** 搜索条件 */
export interface TeacherQueryParmas extends BasicQueryParams {
  resId?: number;             // 教师的唯一标识符
  name?: string;          // 教师姓名
  mobile?: string;         // 教师头像的URL
}

/** 数据源，增删查改等请求 */
export default class TeacherQuery extends Queryable<TeacherModel, TeacherQueryParmas> {
  // 可设置父ID，例如查询用户下的全部文章
  // constructor(id) {
  //     super();
  //     this.id = id;
  // }

  /** 对象名称 */
  get objectName(): string {
    return '教师库'
  }

  // 默认的内容
  get defaultObject():  Partial<TeacherModel> {
    return {}
  }

  // 读取正在输入的数据，用于表单校验
  _valueGetter: () => Partial<TeacherModel> = () => ({})

  // 已输入的数据的Getter
  get currentEditRow(): Partial<TeacherModel> {
    return this._valueGetter()
  }

  // 表单规则
  get rules() {
    return {}
  }

  // 查询全部
  async all(params: TeacherQueryParmas) {
    let res = await request({
      url: `api/admin/resume/select/page`,
      method: 'get',
      params: {
        pageNum: params.pageNum,
        pageSize: params.pageSize,
        resId: params.resId || null,
        name: params.name || null,
        mobile: params.mobile || null,
      }
    })
    if (res.data.count == undefined) return res.data
    return {
      data: res.data.rows,
      total: res.data.count
    }
  }

  // // 上传修改
  // async edit(obj: TeacherModel) {
  //   console.log("修改", obj);
  //   obj = Object.assign({}, obj);
  //   let id = obj.id;
  //   delete obj.id;
  //   return request({
  //     url: `/api/hospital/Teacher/${id}`,
  //     method: "put",
  //     data: obj,
  //   });
  // }

  // // 添加
  // async add(obj: TeacherModel) {
  //   delete obj.id;
  //   return request({
  //     url: "/api/hospital/Teacher",
  //     method: "post",
  //     data: obj,
  //   });
  // }

  // // 通过id删除
  // async deleteObj(obj: TeacherModel) {
  //   return request({
  //     url: `/api/hospital/Teacher/${obj.id}`,
  //     method: "delete",
  //   });
  // }
}
