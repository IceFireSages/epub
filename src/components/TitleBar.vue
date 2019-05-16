<template>
  <transition name="slide-down">
    <div class="title-wrapper " v-show='ifTileAndMenuShow'>
      <div class="left">
        <span class="icon-arrow-left2 icon"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-cart icon"> </span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-user icon"> </span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-upload icon "> </span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "TitleBar",
    data() {
      return {}
    },
    props: {
      ifTileAndMenuShow: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*  @import "../assets/styles/global.scss";
  .title-wrapper { !*头部*!
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 101;
    height: px2rem(48);
    display: flex;
    background-color: white;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);

  .left { !* 左侧*!
    flex: 0 0 px2rem(60);
    font-size: px2rem(26);
  @include center;
  }

  !*右侧*!
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;

  .icon-wrapper {
    flex: 0 0 px2rem(50);
    font-size: px2rem(25);
  @include center;

  .icon-cart {
    font-size: px2rem(24);
  }

  }
  }
  !* 动画  j进入前 进入后 进入过程*!

  }*/
</style>
