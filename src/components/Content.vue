<template>
    <transition name="slide-right">
      <div class="content">
        <div class="content-wrapper" v-if="bookAvailable">
          <div class="content-item" v-for="(item,index) in navigation.toc" :key="index" @click="jumpTo(item.href)">
            <span class="text">{{item.label}}</span>
          </div>
        </div>
        <div class="empty" v-else><span>加载中...</span></div>
      </div>
    </transition>
</template>

<script>
    export default {
        name: "Content",
      props:{
          ifShowContent:Boolean,
          navigation:Object,
          bookAvailable:Boolean
      },methods:{
          jumpTo(target){
            this.$emit('jumpTo',target)
          }
      },mounted() {

      },
      computed:{
        nav:function () {
          return  navigation();
        }

      },
watch:{ }

    }
</script>

<style lang="scss" scoped>
  @import "../assets/styles/global";
.content{
  position:absolute;
  left: 0;
  top:0;
  display: flex;
  z-index: 102;
  width: 80%;
  height: 100%;
  background-color: aquamarine;
  /*章节目录*/
  .content-wrapper{
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    overflow: auto;
    .content-item{
      padding: px2rem(1) px2rem(10);
      flex: 1;
      background-color: wheat;
      .text{color: blueviolet;
      font-size: px2rem(14)};
      border-bottom: px2rem(5) solid #ccc;
    }

  }/*加载*/
  .empty{
    align-self: center;
    color: deeppink;
    span{
    position: relative;
      left: 50%;
    }
  }
}
</style>
