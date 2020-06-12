<template>
  <div class="search-box">
    <el-input
      style="width:100%"
      v-model="searchVal"
      type="text"
      placeholder="请输入关键字"
      @keyup.enter.native="handleIconClick"
    >
      <i
        class="el-icon-circle-close el-input__icon"
        slot="suffix"
        @click="clearVal"
        style="cursor: pointer;"
      ></i>
      <span slot="append" style="cursor: pointer;" @click="handleIconClick">搜索</span>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: ""
    };
  },
  methods: {
    clearVal() {
        this.searchVal = ""
    },
    handleIconClick() {
        console.log(111)
    }
  }
};
</script>

<style>
</style>