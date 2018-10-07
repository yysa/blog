<template>
  <div id="app">
    <Header></Header>
    <Menu></Menu>
      <router-view class="view"/>
  </div>
</template>

<script>
import Header from './components/Header'; 
import Menu from './components/Menu'; 
export default {
  name: 'App',
  components:{
    Header,
    Menu
  }
}
</script>

<style lang="scss" scoped>
#app{
  height: 100%;
  
}
.view{
  width: 100%; 
  height: 100%;
  box-sizing: border-box;
  padding:65px 5px 5px 205px;
  background: #f6f6f6;
  overflow: auto;
}
</style>
