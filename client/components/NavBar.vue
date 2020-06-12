<template>
  <div class="nav-bar-bg">
    <div id="nav-bar-container">
      <ul class="navlist">
        <li v-for="navItem in navList" :key="navItem.id" class="navlink">
          <nuxt-link :to="navItem.path" class="link">{{navItem.sortName}}</nuxt-link>
          <ul class="subnavs" v-if="navItem.children.length>0">
            <li class="subnav" v-for="subNavItem in navItem.children" :key="subNavItem.id">
              <nuxt-link
                :to="navItem.path+'/:'+subNavItem.sort"
                class="sublink"
              >{{subNavItem.sortName}}</nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
      <div class="search-contain">
        <search />
      </div>
    </div>
  </div>
</template>

<script>
import Search from "./Search";
export default {
  components: {
    Search
  },
  data() {
    return {
      navList: [
        {
          id: 1,
          sortName: "首页",
          children: [],
          path: "/"
        },
        {
          id: 2,
          sortName: "技术杂谈",
          path: "/skill",
          children: [
            {
              id: 2,
              sortName: "javascript",
              sort: 1
            },
            {
              id: 3,
              sortName: "HTML5&CSS3",
              sort: 2
            },
            {
              id: 4,
              sortName: "nodejs",
              sort: 3
            }
          ]
        },
        {
          id: 6,
          sortName: "精彩推荐",
          path: "/reference",
          children: []
        },
        {
          id: 8,
          sortName: "关于博主",
          path: "/about",
          children: []
        },
        {
          id: 9,
          sortName: "赞助作者",
          path: "/sponsor",
          children: []
        },
        {
          id: 7,
          sortName: "给我留言",
          path: "/feedback",
          children: []
        }
      ],
      currentPath: "/"
    };
  }
};
</script>

<style scoped lang="scss">
.nav-bar-bg {
  background-color: rgba(74,74,74,.8);
  color: rgba(255, 255, 255, 0.8);
}
#nav-bar-container {
  height: 60px;
  width: 1000px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .navlist {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 660px;
    .navlink {
      position: relative;
      height: 60px;
      &:hover {
        .link {
          background-color: $themeColor;
        }
        .subnavs {
          visibility: visible;
          .subnav:hover {
            background-color: $themeColor;
          }
        }
      }
      .subnavs {
        position: absolute;
        visibility: hidden;
        text-align: center;
        top: 60px;
        left: 0;
        background-color: rgba(74,74,74,.8);
        .sublink {
          display: block;
          line-height: 60px;
          height: 60px;
          padding: 0 15px;
        }
      }
      .link {
        font-size: 16px;
        padding: 0 15px;
        display: block;
        line-height: 60px;
        height: 60px;
        &.active-link {
          background-color: $themeColor;
        }
      }
    }
  }
  .search-contain {
    width: 300px;
  }
}
</style>