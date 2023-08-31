<template>
  <div>
    <el-cascader :key="propsKey" v-model="initvalue" :props="props" 
     @expand-change="(val)=>expandchange(val)" @change="handleChange"/>
  </div>
</template>

<script lang="ts">
import {sysdicposition_listTop,sysdicposition_listBypkey} from '../request/api'
import { reactive,toRefs, defineExpose,ref,watch, onMounted} from 'vue'
import type { CascaderProps } from 'element-plus'
export default {
    setup(){
        const cander = ref()
        const state = reactive({
            initvalue:[],
            propsKey:0
        })
        const props = reactive({
            // initvalue:[],
             props: {
            lazy: true,
            async lazyLoad(node, resolve) {
                console.log(node)
                const { level } = node;
                if (level == 0) {
                    let res = await sysdicposition_listTop()
                    const nodes = res.map((item, index) => ({
                        ...item,
                        levelValue: `${item.mkey}_${level}`
                    }));
                    resolve(nodes);
                }else{
                    const pkey = node.data.mkey;
                    let res = await  sysdicposition_listBypkey(pkey)
                    const nodes = res.map((item, index) => ({
                        ...item,
                        levelValue: `${item.mkey}_${level}`
                    }));
                    resolve(nodes);
                }
            },
             value:'levelValue',
            // value:'mkey',
            label:'name',
            children:'children',
            leaf: "",
            expandTrigger: "click",
            emitPath: true,
            checkStrictly:true, //加入这个配置之后，输入框的值正常显示
        }
        })
       
        const handleChange = (val)=>{
            state.propsKey++
        }
        const expandchange = (val)=>{
            console.log(val)
            // let {initvalue} = state
            let arr = []
           for(let i in val){
            let nVal = val[i].split('_')[0];
           arr.push(nVal)
           }
           state.initvalue = arr 
           console.log('state.initvalue',state.initvalue)
        }
        onMounted(()=>{
           
        })
        // watch(state.initvalue,(newVal,oldVal)=>{
        //     state.initvalue = newVal
        // })
        return{
             ...toRefs(props), //暴露出去之后，模板读的是这个对象里边的数据
            ...toRefs(state),
            // num, //如果是这种方式暴露，模板读取的是这个变量，比上边少一层
            handleChange,
            expandchange,
        }
    },
}
</script>

<style>

</style>,
