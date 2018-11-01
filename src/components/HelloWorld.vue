<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-row>
      <el-col :span="8" :offset="8"><el-input v-model="things" placeholder="请输入备忘事件"></el-input></el-col>
      <el-col :span="2"><el-button class="addButten" type="primary" icon="el-icon-edit" size="medium" @click="addContentFunc">添加</el-button></el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8">
        <li v-for="(item,index) in items" :key="index+item">
          {{index+1}}. {{item.content}} 
		  <el-button v-if="item.finish==0" class="finish" type="success" icon="el-icon-check" size="mini" circle @click="finishFunc(index)"></el-button>
		  <el-button v-else class="finish" type="info" icon="el-icon-delete" size="mini" circle @click="delFunc(index)"></el-button>
        </li>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  created(){
    this.$http.get('/api/getMemo')
    .then((res) => {
      if (res.status === 200) {
        this.items = res.data;
      } else {
        this.$message.error('获取列表失败！')
      }
    }, (err) => {
      this.$message.error('连接数据库失败！')
      console.log(err)
    })
  },
  data () {
    return {
      msg: 'Welcome to Your Memo',
      things:"",
      items:["吃饭","watch TV"],
      itemsFinished:["sleep"]
    }
  },
  methods: {
    addContentFunc(){
      let thing = this.things;
      let that = this;
      if(thing==""){
        this.$message({
          message: '备忘录不能为空哦!',
          type: 'warning'
        });
        return ;
      }
      if(this.items.indexOf(thing)!=-1){
        this.$message({
          message: '任务已存在!',
          type: 'warning'
        });
        return ;
      }
      this.$http.post('/api/addMemo', {content:thing})
      .then(function (response) {
        if(response.data == "success"){
          that.items.unshift({"content":thing,"finish":0});
          that.$message({
            message: '添加成功～',
            type: 'success'
          });
        }else{
          that.$message({
            message: '添加失败，请重新添加！',
            type: 'warning'
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    finishFunc(index){
      let that = this;
      let item=this.items[index];
      this.$http.put('/api/updateMemo', item)
      .then(function (response) {
        if(response.data == "success"){
          that.items[index].finish = 1;
          that.items.sort(that.compare("finish"))
          that.$message({
            message: '操作成功～',
            type: 'success'
          });
        }else{
          that.$message({
            message: '操作失败，请重新操作！',
            type: 'warning'
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    delFunc(index){
      let that = this;
      let item=this.items[index];
      this.$http.delete('/api/delMemo/'+encodeURI(item.content))
      .then(function (response) {
        if(response.data == "success"){
          that.items.splice(index,1);
          that.$message({
            message: '操作成功～',
            type: 'success'
          });
        }else{
          that.$message({
            message: '操作失败，请重新操作！',
            type: 'warning'
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    compare(property){
      return function(obj1,obj2){
        let val1 = obj1[property];
        let val2 = obj2[property];
        return val1-val2;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.el-row{
  position: relative;
  margin-bottom: 15px;
}
.el-button{
  bottom: 0;
}
.addButten{
  margin-left: 3px;
  margin-top: 1px;
}
.el-table{
  text-align: left;
}
ul{
  border: 1px;

}
li{
  text-align: left;
  list-style-type: none;
  position: relative;
  margin: 10px;
}
li .finish{
  position: absolute;
  right: 0;

}
</style>
