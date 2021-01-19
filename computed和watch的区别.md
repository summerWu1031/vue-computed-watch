## computed 和 watch 的区别
## computed
* computed是计算属性，是用来计算一个值的，这个值调用的时候不需要括号，可以直接当属性去用
* computed的值在getter执行后是会缓存的，如果依赖不变，则computed不会重新计算
* 
```js
  <template>
  <div class="hello">
      {{fullName}}
  </div>
</template>

<script>
export default {
    data() {
        return {
            firstName: '傅',
            lastName: "英俊"
        }
    },
    computed: {
        fullName() {
            return this.firstName + ' ' + this.lastName
        }
    }
}
</script>
```

## watch
* 是一个对象，键是需要监听的数据，值是对应的回调函数
```js
data:{
        n:0,
        history:[]
    },
    watch:{
        n(newValue,oldValue){//会默认回传两个参数，第一个是改变后的值，第二个是改变前的值
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
```
* watch里面的deep
```js  
// 该回调会在任何被侦听的对象里面的属性改变时被调用，不论其被嵌套多深
var vm = new Vue({
  data: {
    obj{
        a:1,
        b:2
    }
  watch: {
    obj{
        handler(){
            console.log('obj变了')
        },
        deep:true
    }
  }
  obj.a=3 //obj变了
```
* watch里面的immediate,该回调将会在监听开始之后被立即调用
```js
var vm = new Vue({
  data: {
    obj{
        a:1,
        b:2
    },
  },
    watch: {
        'obj.a':{
            handler(){console.log("'obj.a'log的这个函数已经被调用了")},
            immediate: true
        }
      
    },
})
```
* $watch的用法
```js
var vm = new Vue({
  data: {
    obj{
        a:1,
        b:2
    },
    n:0
  },
  created(){
      this.$watch('n',function(){
          console.log('n被监听了')
      }),
      immediate: true
  }
    watch: {
        'obj.a':{
            handler(){console.log("'obj.a'log的这个函数已经被调用了")},
            immediate: true
        }
      
    },
})
//$watch第二种使用方法，和上面的一致
vm.$watch('n',function(){
          console.log('n被监听了')
      }),
      immediate: true
  }
```
