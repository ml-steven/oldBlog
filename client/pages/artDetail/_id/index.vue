<template>
  <div class="page-container"></div>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello World!",
      content: "helllo"
    };
  },
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.content
        }
      ]
    };
  },
  asyncData({ params }) {
    return { title: "Hello World!", content: "gegee" };
  }
};
</script>

<style>
</style>