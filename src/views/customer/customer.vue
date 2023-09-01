<template>
    <div class="about">
        <div class="marbot">
          <el-button type="primary" @click="handleadd">新增</el-button>
          <el-button type="primary" @click="handedit">修改</el-button>
          <el-button type="primary" @click="handsee">查看</el-button>
          <el-button type="primary" @click="handdel">删除</el-button>
        </div>
       
        <el-table ref="table" :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
            <el-table-column prop="parentTypeName" label="父级分类名称" />
            <el-table-column prop="typeName" label="合同分类名称" />
        </el-table>
        <div class="martop">
          <el-pagination background layout="prev, pager, next" :total="query.total" @current-change="currentChange"/>
        </div>
        
        <addEdit ref="addedit" @close="close" :type="type"></addEdit>

        <!-- <el-dialog v-model="dialogFormVisible" title="新增">
          <el-form :model="form">
            <el-form-item label="级别" :label-width="formLabelWidth">
              <el-select v-model="form.parentId" placeholder="Please select a zone">
                <el-option v-for="item in typelist" :key="item.value" :label="item.typeName" :value="item.id">
                            {{ item.typeName }}
                          </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.typeName"></el-input>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取消</el-button>
              <el-button type="primary" @click="bindadd">
                提交
              </el-button>
            </span>
          </template>
        </el-dialog> -->
    </div>
  </template>
  <script lang="ts">
  import {catesave,getlist,gettablelist,contractlist_del} from '@/request/api.ts'
  import { reactive, ref, onMounted,toRefs  } from 'vue'
  import addEdit from './addEdit.vue'
  export default {
    setup() {
       
      const addedit = ref()
      const table = ref()
      let  tableData = ref([])
      let  multipleSelection = ref([]) //这中数据会改变不要用const，使用let
      const state = reactive({
        
        // tableData:[],
        type:'',
        total:0,
        query:{
          page:1,
          pageSize:10,
          total:0,
        }

        // multipleSelection :[]
          // typelist:[]
      })
     onMounted(() => {
        // getList()
        tablelist()
       
      })
    const handleadd = () =>{
      // console.log(addedit)
      state.type = 'add'
      addedit.value.title = '新增'
      addedit.value.dialogFormVisible = true
    }
    const handedit = () =>{
      state.type = 'edit'
      addedit.value.title = '修改'
      addedit.value.form = multipleSelection[0]
      addedit.value.dialogFormVisible = true
    }
    const handsee = () => {
        state.type = 'see'
        addedit.value.title = '查看'
        addedit.value.form = multipleSelection[0]
        addedit.value.dialogFormVisible = true
     }
     const handdel = async() => {
      let id = multipleSelection[0].id
      let {success} = await contractlist_del(id)
      if(success){
        tablelist()
      }
     
     }
    const close = () =>{
      tablelist()
    }
       
    const tablelist = async() => {
    let data1 = {
        page: 1,
        pageSize: 10,
      total:0
    }
    let {rows,total} = await gettablelist(data1) // 显著的用的是aysnc 和 await ,而且要结构赋值，通过obj.age 这种形式拿不到值，
    tableData.value = rows  //使用ref暴露出去的数据，取值的时候需要赋值到.value 上面
    console.log('tableData',tableData)
    state.query.total = total
    console.log(state.query.total)
    }
    const handleSelectionChange = (val) => {
    if(val.length > 1){
      table.value.clearSelection()
    }
    multipleSelection = val
    }
    const currentChange = async(val) => {
      state.query.page = val

      let {rows,total} = await gettablelist(state.query)
      
      tableData.value = rows
      
       state.query.total = total
    }
     
        return {
          ...toRefs(state),
          // getList,
          // bindadd,
          handleadd,
          handedit,
          handsee,
          handdel,
          handleSelectionChange,
          currentChange,
           addedit,
           table,// 组件实例也要暴露出去，不然方法获取不到
           close,
           tableData,
           multipleSelection,//如果是对象或者数组需要实时最新，需要用ref，单独暴露
          // dialogFormVisible,
          //  typelist:[],
          // formLabelWidth
        }
     },
     components:{addEdit}
  }


  
</script>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  .marbot{
    margin-bottom:10px;
  }
  .martop{
    margin-top:10px;
    display: flex;
    justify-content: flex-end;
  }
  </style>