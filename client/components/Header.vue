<template>
  <div id="header">
    <header>
      <span class="bloger">Steven</span>
      <span class="des">的个人站点</span>
    </header>
  </div>
</template>
<script>

export default {
};
</script>
<style lang="scss">
#header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: $themeColor;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  .bloger {
    font-size: 30px;
  }
}
</style>