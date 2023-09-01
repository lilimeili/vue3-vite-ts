import service from './index'
//对data确定类型

interface loginData {
    parentId: string,
    typeName:string,
}
interface pageData {
    page: Number,
    pageSize: Number
    total:Number
}
interface pageData1 {
    page: Number,
    pageSize: Number
    total:Number
}
interface pkey {
   pkey:String,
}
interface pkeys {
    pkeys:String,
 }
 interface id {
    id:Number,
 }
 interface formType {
    name:String,
        // sex:String,
        cardType:String,
        // marry:String,
        // birthday:String,
        cardId:String,
        mobile:String,
        creditCode:String,
        registCapi:String,
        operName:String,
        managerId:Number,
        managerName:String,
 }
export function catesave(params:loginData) {
    return service({
        url: '/contract/basecontracttype/add',
        method: 'post',
        data:params
    })
}
export function getlist(params:pageData) {
    return service({                            //合同分类 -- 查询所有一级分类
      url: '/contract/basecontracttype/findFirstList',
      method: 'post',
      data:params
    })
} 
export function gettablelist(params:pageData1) {
    return service({                            //列表
      url: '/contract/basecontracttype/list?page='+params.page+'&pageSize='+params.pageSize+'&total='+params.total+'&businessType=Factoring',
      method: 'post',
      data:params
    })
}
export function sysdicposition_listTop() {
    return service({                                    //职位数据字典-查询顶级list
      url:'/dic/sysdicposition/listTop',
      method:'get',
    //   data:params
    })
  }
  
  export function sysdicposition_listBypkey(params:pkey) {
    return service({                                    //职位数据字典-根据pkey查询
      url:'/dic/sysdicposition/listBypkey?pkey='+params,
      method:'get',
      data:params
    })
  }
  export function dictionary_config_olist(params:pkeys) {
    return service({
      //数据字典---多pkey查询
      url: "/config/newappdic/findMapList?pkeys="+params,
      method: "get",
      data: params
    });
  }
  export function culoanperson_add(data:formType) {
    return service({
      url: '/manage/enterprise/addEnterprise',     //个人正式客户列表 -添加
      method: 'post',
      data
    })
  }
  export function contractlist_del(params:id) {
    return service({                            //合同分类 -- 删除
      url: '/contract/basecontracttype/remove/'+params,
      method: 'post',
      data:params
    })
  }
  