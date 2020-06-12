<template>
  <div class="page-container">
    <div>
      <ul>
        <li v-for="item in data" :key="item">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import { getAllSims } from "~/api/user";
export default {
  components: {
    Logo
  },
  head() {
    return {
      title: "首页",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Steven的个人网站 | 首页"
        }
      ]
    };
  },
  data() {
    return {
      data: []
    };
  },
  async asyncData({ query }) {
    const { data } = await getAllSims();
    return { data: data };
  }
};
</script>

<style lang="scss">
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
