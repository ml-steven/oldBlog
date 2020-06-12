<template>
  <div class="lists">
    <el-card shadow="hover" v-for="item in list" :key="item.id">
      <slot :singeitem="item"></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
</style>