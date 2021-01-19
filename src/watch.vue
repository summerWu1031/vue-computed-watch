<template>
    <div>
        {{this.n}}
        <hr>
        <button @click="add">+1</button>
        <button @click="minus">-1</button>
        <hr>
        <button @click="undo">撤销</button>
        {{this.history}}
    </div>
</template>

<script>
export default {
    data(){
        return{
            n:0,
            history:[]
        }   
    },
    watch:{
        n(newValue,oldValue){
            if(!this.inUndoMode){
                this.history.push({from:oldValue,to:newValue})
            }
        }
    },
    methods:{
        add(){this.n+=1},
        minus(){this.n-=1},
        undo(){
            const last = this.history.pop()
            const old = last.from
            this.inUndoMode=true
            this.n=old //watch是异步的
            this.$nextTick(()=>{ //所以再设置一个异步，那么就会先执行watch的异步，再执行.$nextTick（）的异步
                this.inUndoMode=false
            })
        }
    }
}
</script>