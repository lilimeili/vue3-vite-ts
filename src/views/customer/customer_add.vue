<template>
  <div>
    <h>基本信息</h>
    <el-form :model="form" label-width="120px" style="display:flex;flex-wrap: wrap;">
        <el-form-item label="客户名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="客户性别">
            <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1">男</el-option>
                <el-option label="女" :value="2">女</el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="行业类别">
            <largeDic></largeDic>
        </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { reactive } from 'vue';
import largeDic from '../../components/largeDic.vue'
export default {
  components:{largeDic},
  setup(){
    const form = reactive({
        name:'',
        sex:''
    })
    return{
        form,
    }
  }
}
</script>

<style>

</style>