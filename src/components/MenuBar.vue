<template>
  <!--底部菜单-->

  <div class="menu-bar">
    <transition name="slide-up">
      <div class="menu-wraper " v-show="ifTileAndMenuShow"
           :class="{'hide-box-shadow':ifSettingShow || !ifTileAndMenuShow}">
        <div class="icon-wrapper">
          <span class="icon-list" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-soundcloud" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper" @click="showSetting(1)">
          <span class="icon-brightness-contrast"></span>
        </div>
        <div class="icon-wrapper" @click="showSetting(0)">
          <span class="icon-section"></span>
        </div>
      </div>
    </transition>
    <transition name="slide-up">
      <div class="setting-wrapper" v-show="ifSettingShow">
        <!--字体大小-->
        <div class="setting-font-size" v-if="showTag===0">
          <div class="preview" :style="{fontSize:fontSizeList[0].fontSize+'px'}">A</div>
          <div class="select"><!--横线部分-->
            <div class="select-wrapper" v-for="(item,index) in fontSizeList" :key="index"
                 @click="setFontSize(item.fontSize)">
              <div class="line"></div>
              <div class="piont-wrapper">
                <div class="point" v-show="defaultFontsize===item.fontSize">
                  <div class="small-point"></div>
                </div>
              </div>
              <div class="line"></div>
            </div>
          </div>

          <div class="preview" :style="{fontSize:fontSizeList[fontSizeList.length-1].fontSize+'px'}">A</div>
        </div>
        <!--设置主题-->
        <div class="setting-theme" v-else-if="showTag===1">
          <div class="setting-theme-item" v-for="(item,index) in themesList" :key="index" @click="setTheme(index)">
            <div class="preview" :style="{background:item.style.body.background}"
                 :class="{'no-border':item.style.body.background=='#fff'}"></div>
            <div class="text" :class="{'selected':index===defaultTheme}">{{item.name}}</div>
          </div>
        </div>   <!--设置进度-->
        <div class="setting-progress" v-else-if="showTag===2">
          <div class="progress-wrapper">

            <input type="range" class="progress"
                   max="100" min="0" step="1" @change="onProgressChange($event.target.value)"
                   @input="onProgressInput($event.target.value)" :value="progress" :disabled="!bookAvailable"
                   ref="progress">

          </div>
          <div class="text-wrapper">
            <span>{{bookAvailable?progress+'%':'加载中...'}}</span>
          </div>
        </div>

      </div>
    </transition>
<Content-view :ifShowContent='ifShowContent'
v-show="ifShowContent" :navigation="navigation" :bookAvailable="bookAvailable" @jumpTo="jumpTo"
></Content-view>
<transition name="fade">
  <div class="content-mask" v-show="ifShowContent"
  @click="hideContent"> </div>
</transition>
  </div>

</template>

<script>
  import ContentView from '@/components/Content.vue'
  export default {
    name: "MenuBar",
  components:{
    ContentView
  },
    data() {
      return {
        ifSettingShow: false,
        showTag: 0,
        progress: 0,
        ifShowContent:false
      }
    },
    props: {
      ifTileAndMenuShow: {
        type: Boolean,
        default: false
      },
      fontSizeList: Array,
      defaultFontsize: Number,
      themesList: Array,
      defaultTheme: Number,
      bookAvailable: Boolean,
      navigation:Object
    },mounted() {

    },
    methods: {
      showSetting(tag) {
   /*     this.ifSettingShow = true;
        this.ifTileAndMenuShow = true;*/
        this.showTag = tag;
        if(this.showTag===3){
          this.ifSettingShow=false;
          this.ifShowContent=true;
        }else {
          this.ifSettingShow=true;
        }
      },//隐藏设置栏
      hideSetting() {
        this.ifSettingShow = false
      },
      setFontSize(fs) {
        this.$emit('setFontSisz', fs);
      },
      setTheme(idx) {
        this.$emit('setTheme', idx)
      },//拖动进度条 触发事件
      onProgressInput(progress) {
        this.progress = progress;
        this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
      },//进度条 松开后触发
      onProgressChange(pogress) {
        this.$emit('onProgressChange', pogress)
      },//隐藏目录
      hideContent(){
        this.ifShowContent=false
      },
      jumpTo(target){
        this.$emit('jumpTo',target)
      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/styles/global.scss";

  .menu-bar {
    .menu-wraper {
      z-index: 101;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: px2rem(40);
      display: flex;
      font-size: px2rem(25);
      background-color: white;
      box-shadow: 0 px2rem(-8) rgba(0, 0, 0, .15);

      &.hide-box-shadow {
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
      }

      .icon-wrapper {
        flex: 1;
        @include center;

        .icon-list {
          font-size: px2rem(23)
        }

        .icon-soundcloud {
          font-size: px2rem(30)
        }
      }

    }

    .setting-wrapper {
      position: absolute;
      bottom: px2rem(40);
      left: 0;
      width: 100%;
      z-index: 101;
      height: px2rem(60);
      background-color: white;
      box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
      /*字体大小*/
      .setting-font-size {
        display: flex;
        height: 100%;
        /*小字体*/
        .preview {
          flex: 0 0 px2rem(40);
          @include center;
        }

        /*横线部分*/
        .select {
          display: flex;
          flex: 1;

          .select-wrapper {
            flex: 1;
            display: flex;
            align-items: center;

            &:first-child {
              /*              background: red;*/

              .line {
                &:first-child {
                  border-top: none;
                }
              }
            }

            &:last-child {
              /*              background-color: red;*/

              .line {
                &:last-child {
                  border-top: none;
                  /*height: px2rem(20);*/
                }
              }
            }

            .line {
              flex: 1;
              border-top: px2rem(1) solid #ccc;
              height: 0;
              text-align: center;
            }

            /*小球*/
            .piont-wrapper {
              position: relative;
              flex: 0 0 0;
              width: 0;
              height: px2rem(7);
              border-left: px2rem(1) solid #ccc;

              .point {
                position: absolute;
                top: px2rem(-8);
                left: px2rem(-11);
                width: px2rem(20);
                height: px2rem(20);
                border-radius: 50%;
                border: px2rem(1) solid #bdf;
                box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15);
                @include center;

                .small-point {
                  width: px2rem(5);
                  height: px2rem(5);

                  border-radius: 50%;
                  background-color: #000;

                }
              }

            }

          }
        }
      }

      /*主题*/
      .setting-theme {
        height: 100%;
        display: flex;

        .setting-theme-item {
          padding: px2rem(5);
          box-sizing: border-box;
          display: flex;
          flex: 1;
          flex-direction: column;

          .preview {
            flex: 2;
            box-sizing: border-box;

            &.no-border {
              border: px2rem(1) solid #ccc;
            }
          }

          .text {
            flex: 0 0 px2rem(24);
            font-size: px2rem(12);
            color: #ccc;
            background-color: navajowhite;
            @include center;

            &.selected {
              color: #333;
            }
          }
        }
      }

      .setting-progress {
        position: relative;
        width: 100%;
        height: 100%;
display: flex;
        flex-direction: column;
        .progress-wrapper {
          flex: 2;
          width: 100%;
          height: 100%;
          @include center;
          padding: 0 px2rem(30);
          box-sizing: border-box;

          .progress {
            width: 100%;
            -webkit-appearance: none;
            height: px2rem(2);
            background: -webkit-linear-gradient(#222, #999) no-repeat, #ddd;
            background-size: 0 100%;

            &:focus {
              outline: none;
            }

            &::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: px2rem(20);
              width: px2rem(20);
              border-radius: 50%;
              background: white;
              box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15);
              border: px2rem(1) solid #ddd;
            }
          }
        }
        .text-wrapper{
          flex: 0;
          @include center;
          font-size: px2rem(12);
        }
      }

    }
    .content-mask{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
      display: flex;
      width: 100%;
      height: 100%;
      background: rgba(51,51,51,.8);
    }
  }


</style>
