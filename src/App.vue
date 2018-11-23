<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <tabs v-model="selectIndex">
      <tab-item v-for="(tabItem, index) in tabList" :key="index"
        :name="tabItem.name" :icon="tabItem.icon">
      </tab-item>
    </tabs>
    
  </div>
</template>
<script>
export default {
  data(){
    return {
      tabList: [
        {name: '电影', icon: 'icon-theater', path: '/movie'},
        {name: '影院', icon: 'icon-yingyuan', path: '/cinema'},
        {name: '我的', icon: 'icon-wode', path: '/mine'}
      ],
      selectIndex: 0
    }
  },
  watch: {
    selectIndex(newVal){
      let path = this.tabList[newVal].path;
      this.$router.push(path);
    },
  },
  created(){
    // console.log(this.$route.fullPath);
    if(this.$route.fullPath.startsWith('/movie')){
      this.selectIndex=0
    }else if(this.$route.fullPath.startsWith('/cinema')){
      this.selectIndex=1
    }else if(this.$route.fullPath.startsWith('/mine')){
      this.selectIndex=2
    }
    // this.$watch(this.$route,(newval,oldval)=>{
    //     if(newval.fullPath.startsWith('/movie')){
    //       this.selectIndex=0
    //     }else if(newval.fullPath.startsWith('/cinema')){
    //       this.selectIndex=1
    //     }else if(newval.fullPath.startsWith('/mine')){
    //       this.selectIndex=2
    //     }
    // },{deep:true})
  }
}
</script>


<style lang="scss">

</style>
