<template>
  <div>
    <el-dialog v-model="dialogFormVisible" :title="title" v-if="dialogFormVisible">
    <el-form :model="form" :disabled="type == 'see'">
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
        <el-button type="primary" @click="bindadd" v-if="type != 'see'">
          提交
        </el-button>
      </span>
    </template>
  </el-dialog>
  </div>
</template>

<script lang="ts">
import {getlist,catesave} from '@/request/api.ts'
import { reactive, ref,onMounted,toRefs,defineExpose,watch, } from 'vue'

import { useRouter } from 'vue-router'

export default {
    emits: ['close'],
    props:{
        type:String,
    },
  setup(props,ctx){
    console.log(props)
    const router = useRouter()
    let formLabelWidth = '140px'
    let dialogFormVisible = ref(false)
    // const prop = defineProps({
    //     type: {
    //     type: String,
    // },
    // })
    const state = reactive({
        typelist:[],
        form: {
            parentId:'',
              typeName:''
        },
        title:''
    })
    onMounted(()=>{
        getList()
    })
    watch(()=>props.type,()=>{
        console.log('监听type')
    })
    const getList = async() => {
        let data2 = {
            page: 1,
            pageSize: 10,
          total:0
        }
       let result = await getlist(data2)
       let {obj} = result
          state.typelist = state.typelist.concat(obj)
      }
      const bindadd = async() => {
        if(props.type == 'add'){
            let {success} = await catesave(state.form)
            if(success){
            dialogFormVisible.value = false
                // ctx.emit('close')
                router.push({path:'about'})
            }
        }else if(props.type == 'edit'){

        }
        
      }
      defineExpose({  //把组件内数据暴露出去，子组件能获取到
        dialogFormVisible,
        state,
    })
    return{
        ...toRefs(state),
        getList,
        dialogFormVisible,
        bindadd,
        formLabelWidth,
    }
  }
}
</script>

<style>

</style>