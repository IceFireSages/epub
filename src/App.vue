<template>
  <div id="app">
   <!-- <span class="icon-arrow-left2"></span>-->

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
document.addEventListener('DOMContentLoaded',()=>{
  const html=document.querySelector('html');
  let fontSize=window.innerWidth/10 > 50?50:window.innerWidth/10;
  html.style.fontSize=fontSize+'px'
})
</script>

<style>

</style>
