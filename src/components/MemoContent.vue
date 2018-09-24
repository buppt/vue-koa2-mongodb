<template>
  <div>
    <el-row>
      <el-col :span="8" :offset="8"><div>Welcome {{ username }}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8"><el-input v-model="things" placeholder="请输入备忘事件"></el-input></el-col>
      <el-col :span="2"><el-button class="addButten" type="primary" icon="el-icon-edit" size="medium" @click="addContentFunc">添加</el-button></el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="8">
        <li v-for="(item,index) in items" :key="index+item">
          {{index+1}}. {{item}} <el-button class="finish" type="success" icon="el-icon-check" size="mini" circle @click="finishFunc(index)"></el-button>
        </li>
        <li v-for="(item,index) in itemsFinished" :key="index+item">
          {{index+1}}. <del>{{item}}</del> <el-button class="finish" type="info" icon="el-icon-delete" size="mini" circle @click="delFunc(index)"></el-button>
        </li>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  created(){
    this.username=this.$route.query.username;
  },
  data () {
    return {
      username:"",
      things:"",
      items:["吃饭","wash","watch TV"],
      itemsFinished:["haha"]
    }
  },
  methods: {
    logoutFunc(){
      this.$router.push('/')
    },
    addContentFunc(){
      if(this.things!=""){
        this.items.push(this.things);
      }else{
        this.$message({
          message: '备忘录不能为空哦!',
          type: 'warning'
        });
      }
    },
    finishFunc(index){
      let item=this.items[index];
      this.items.splice(index,1);
      this.itemsFinished.push(item);
    },
    delFunc(index){
      this.itemsFinished.splice(index,1);
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
