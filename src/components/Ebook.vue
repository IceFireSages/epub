<template>
  <div class="ebook">
   <!-- 顶部菜单-->
    <title-bar class="title-bar" :ifTileAndMenuShow="ifTileAndMenuShow"></title-bar>
    <!--正文-->
    <div class="read-wrapper">

      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenu()"></div>
        <div class="right" @click="nextPage"></div>
      </div>
    </div>
<!--底部-->
    <menu-bar :fontSizeList="fontSizeList" :ifTileAndMenuShow="ifTileAndMenuShow" ref="menuBar" :defaultFontsize="defaultFontsize" @setFontSisz="setFontSisz"
    :themesList="themesList" :defaultTheme="defaultTheme"
              @setTheme="setTheme" :bookAvailable="bookAvailable" @onProgressChange="onProgressChange"
              :navigation="navigation"
              @jumpTo="jumpTo"
    ></menu-bar>
  </div>
</template>

<script>
  import Epub from 'epubjs'
import TitleBar from '@/components/TitleBar.vue'
  import MenuBar from '@/components/MenuBar.vue'
  const DownLoad_url = '../static/216644.epub';
  global.ePub = Epub;
  export default {
    name: "eBOOK",
    data() {
      return {
        ifTileAndMenuShow: false,// 隐藏 头 底菜单栏,
        fontSizeList:[
          {fontSize:12},
          {fontSize:14},
          {fontSize:16},
          {fontSize:18},
          {fontSize:20},
          {fontSize:22},
          {fontSize:24}
        ]// 所有字大小
        , defaultFontsize:16,
        themesList:[
          {name:'default',
          style:{
            body:{
              'color':'#000',
              'background':'#fff'
            }
          }},
          {name:'eye',
            style:{
            body:{
              'color':'#000',
              'background':'#ceeaba'
            }
            }},
          {name:'night',
            style:{
            body:{
              'color':'#fff',
              'background':'#000'
            }
            }},
          {name:'gold',
            style:{
            body:{
              'color':'#fff',
              'background':'rgb(241,236,226)'
            }
            }},
        ],
        defaultTheme:0,
        bookAvailable:false,//book isor 可读,
        navigation:{},
        stroage:[]
      }
    },
  components:{
    TitleBar,
    MenuBar
  }, mounted() {
      this.showEpub();
    },computed:{

    },watch:{

    },
    methods: {

      //电子书选人和解析
      showEpub() {
        //生成EBook
         this.book = new Epub(DownLoad_url);
        //生成Rendition 通过.renderTo
        this.rendition = this.book.renderTo('read', {
          width: window.innerWidth,
          height: window.innerHeight
        });

        //通过Tendition.display 渲染电子书
        this.rendition.display();
        //获取 thens 对象
        this.themes=this.rendition.themes;
        this.ff=this.rendition.themes;

        //设置默认字体
        this.setFontSisz(this.defaultFontsize);
        //设置主题  this.themes.register(name,style)
        this.registerTheme();
        this.setTheme(this.defaultTheme);
//通过epubjs 钩子函数获取 loactions 对象 做进度条

        this.book.ready.then(()=>{
          //目录结构
          this.navigation=this.book.navigation;
          return this.book.locations.generate()
        }).then((result)=>{
          this.locations=this.book.locations;
          this.bookAvailable=true;
          /*this.onProgressChange(50)*/
        })
      },
      prevPage() {
        if (this.rendition) {
          this.rendition.prev()
        }
      },
      nextPage() {
       /* console.log('next'+this.rendition);*/
        if (this.rendition) {
          this.rendition.next()
        }
      },
      toggleTitleAndMenu() {
        this.ifTileAndMenuShow = !this.ifTileAndMenuShow;
        if( !this.ifTileAndMenuShow){
          this.$refs.menuBar.hideSetting();
        }
      },
      //设置字体大小
      setFontSisz(fs){
        this.defaultFontsize=fs;
        /*console.log(this.themes);*/
        if(this.themes){
          this.themes.fontSize(fs +'px');
        }
      },
      //注册背景色
      registerTheme(){
        this.themesList.forEach(theme=>{
          this.themes.register(theme.name,theme.style)
        });
      },
      //修改背景色
      setTheme(index){
        this.themes.select(this.themesList[index].name);
        this.defaultTheme=index;
      },
      //进度条 0 - 100
      onProgressChange(progress){

        const percentage=progress/100;//百分比
        const location=percentage>0?this.locations.cfiFromPercentage(percentage):0;
        this.rendition.display(location);//定位到指定位置
      },//根据链接跳转位置
      jumpTo(href){
        this.rendition.display(href);
        this.hideTitleAndMenuFun()
      },
      hideTitleAndMenuFun(){
        this.ifTileAndMenuShow=false;
        //hide 菜单栏弹出的设置栏
        this.$refs.menuBar.hideSetting();
        //隐藏目录
        this.$refs.menuBar.hideContent();
      }



    }

  }
</script>

<style lang="scss" scoped>
  @import "../assets/styles/global.scss";

  .ebook {
    position: relative;
    .title-wrapper /deep/ { /*头部*/
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 101;
      height: px2rem(48);
      display: flex;
      background-color: white;
      box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);

      .left { /* 左侧*/
        flex: 0 0 px2rem(60);
        font-size: px2rem(26);
        @include center;
      }
      /*右侧*/
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
     /* 动画  j进入前 进入后 进入过程*/
    }

    /*正文*/
    .read-wrapper {
      position: relative;
      display: flex;
      flex: 1;
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        display: flex;
        width: 100%;
        height: 100%;

        .left {
          flex: 0 0 px2rem(100);

        }

        .center {
          flex: 1;
        }

        .right {
          flex: 0 0 px2rem(100);
        }
      }
    }

    /*底部菜单*/
    /*.menu-wraper {
      z-index: 101;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: px2rem(48);
      display: flex;
      font-size: px2rem(25);
      background-color: white;
      box-shadow: 0 px2rem(-8) rgba(0, 0, 0, .15);

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

    }*/
  }
</style>
