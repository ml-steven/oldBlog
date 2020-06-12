<template>
  <div class="page-container">
    111
     <!-- <svg-icon icon-class="job" class="job-icon" /> -->
  </div>
</template>

<script>
export default {
  async asyncData({ params }) {
    console.log(params.sort);
    // const {data} = await getAllSims()
    return {};
  }
};
</script>

<style>
.job-icon{
  color: red;
}
</style>