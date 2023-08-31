<template>
  <div>
    <el-cascader  v-model="initvalue" :props="props" @expand-change="(val)=>expandchange(val)"  @change="(val)=>handleChange(val)" />
  </div>
</template>

<script lang="ts">
import {sysdicposition_listTop,sysdicposition_listBypkey} from '../request/api'
import { reactive,toRefs, defineExpose} from 'vue'
import type { CascaderProps } from 'element-plus'
export default {
    setup(){
        // const cander = ref()
        const state = reactive({
            initvalue:[],
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
        }
        })
       
        const handleChange = (val)=>{
            console.log('value',val)
           console.log(state.initvalue)
        }
        const expandchange = (val)=>{
            console.log(val)
            // let {initvalue} = state
            let arr = []
           for(let i in val){
            let nVal = val[i].split('_')[0];
           arr.push(nVal)
           }
           console.log(arr)
        }
        defineExpose({
            state
        })
        return{
            ...toRefs(state),
            handleChange,
            expandchange
        }
    },
}
</script>

<style>

</style>,
