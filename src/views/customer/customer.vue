<template>
    <div class="about">
        <el-button type="primary" @click="handleadd">新增</el-button>
        <el-button type="primary">修改</el-button>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="父级分类名称" />
            <el-table-column prop="name" label="合同分类名称" />
        </el-table>
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
//    import { ELInput,ELForm,ELFormItem } from 'element-plus'
import {catesave,getlist,gettablelist} from '@/request/api.ts'
  import { reactive, ref, onMounted,toRefs  } from 'vue'
  import addEdit from './addEdit.vue'
  export default {
    setup() {
    // let dialogFormVisible = ref(false)
       
       
      const addedit = ref()

      const state = reactive({
        
        tableData:[],
        type:''
          // typelist:[]
      })
     onMounted(() => {
        // getList()
        tablelist()
       
      })
    const handleadd = () =>{
      console.log(addedit)
      state.type = 'add'
      addedit.value.title = '新增'
      addedit.value.dialogFormVisible = true
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
        let result = await gettablelist(data1)
        // state.tableData = state.tableData.concat(obj)
       }
     
        return {
          ...toRefs(state),
          // getList,
          // bindadd,
          handleadd,
           addedit,
           close,
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
  </style>