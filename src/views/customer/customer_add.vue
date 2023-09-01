<template>
  <div>
    <h>基本信息</h>
    <el-form :model="form" label-width="120px" style="display:flex;flex-wrap: wrap;">
        <el-form-item label="企业名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="性别">
            <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1">男</el-option>
                <el-option label="女" :value="2">女</el-option>
            </el-select>
        </el-form-item> -->
        <el-form-item label="行业类别">
            <largeDic></largeDic>
        </el-form-item>
        <el-form-item label="社会信用代码">
            <el-input v-model="form.creditCode"></el-input>
        </el-form-item>
        <el-form-item label="工商注册资本金">
            <el-input v-model="form.registCapi"></el-input>
        </el-form-item>
        <!-- <el-form-item label="婚姻状况">
            <el-select v-model="form.marry" placeholder="请选择">
                      <el-option label="未婚" :value="String(1)">未婚</el-option>
                      <el-option label="已婚" :value="String(2)">已婚</el-option>
                  </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="出生日期">
            <el-date-picker
                    v-model="form.birthday"
                    type="date"
                    placement="bottom-start"
                    placeholder="选择日期">
            </el-date-picker>
        </el-form-item> -->
    </el-form>
    <h>法人信息</h>
    <el-form :model="form" label-width="120px" style="display:flex;flex-wrap: wrap;">
        <el-form-item label="证件号码">
            <el-input v-model="form.cardId"></el-input>
        </el-form-item>
        <el-form-item label="证件类型">
            <el-select v-model="form.cardType" placeholder="请选择" size="small" class="inputWidth">
                <el-option
                  v-for="item in cardtype"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                >
                  {{ item.name }}
                </el-option>
              </el-select>
        </el-form-item>
        <el-form-item label="法人姓名">
            <el-input v-model="form.operName"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
            <el-input v-model="form.mobile"></el-input>
        </el-form-item>
    </el-form>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script lang="ts">
import { dictionary_config_olist,culoanperson_add } from '../../request/api.ts';
import { reactive,toRefs,onMounted } from 'vue';
import largeDic from '../../components/largeDic.vue'
export default {
  components:{largeDic},
  setup(){
    const state = reactive({
      form:{
        name:'',
        // sex:'',
        cardType:'',
        // marry:'',
        // birthday:'',
        cardId:'',
        mobile:'',
        creditCode:'',
        registCapi:'',
        operName:'',
        managerId: 171,
managerName: '贾璐',
      },
      cardtype:[]
    })
    const getcardtypedata = async()=>{
        let pkeys = 'cardtype'
        let {cardtype} = await dictionary_config_olist(pkeys) //解构赋值
         state.cardtype = state.cardtype.concat(cardtype) //获取模板数据
        // console.log(result)
        // state.cardtype = result
    }
    onMounted(()=>{
        getcardtypedata() //初次函数调用
    })
    const submit = async() => {
       let {success} = await culoanperson_add(state.form)
    }
    return{
        ...toRefs(state),
        getcardtypedata,
        submit
    }
  }
}
</script>

<style>

</style>