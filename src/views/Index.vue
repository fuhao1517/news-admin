<template>
  <el-container class="container">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <h3>黑马头条</h3>

      <!-- default-active：当前高亮选中的菜单 -->
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <!-- index是一标识，给default-actives使用的 -->
        <el-submenu index="1">
          <!-- slot="title"必须要保留 -->
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>文章管理</span>
          </template>

          <router-link to="/post_list">
            <el-menu-item index="1-1">文章列表</el-menu-item>
          </router-link>

          <router-link to="/post_add">
            <el-menu-item index="1-2">发布文章</el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 右侧内容部分 -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <img :src="$axios.defaults.baseURL+user.user.head_img" alt />
        <span>{{user.user.nickname}}</span>
        <i @click="handleLogout" style="cursor:pointer">退出</i>
      </el-header>
      <!-- 子页面显示的内容 -->
      <el-main>
        <div>{{breaks}}</div>
        <!-- 显示子路由匹配的页面 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user") || `{}`)
    };
  },
  /* 监听url地址栏的变化，watch页面一加载时候不会执行，只有等到url变化时候才会执行 */
  computed: {
    breaks() {
      const { matched } = this.$route;
      const arr = [];

      matched.forEach(v => {
        arr.push(v.meta);
      });

      return arr.join("/");
    }
  },
  methods: {
    handleLogout() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        localStorage.removeItem("user");
        this.$router.replace("/login");
      });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.el-header {
  background-color: #333333;
  color: #cccccc;
  line-height: 60px;
  font-size: 14px;
  text-align: right;
  * {
    vertical-align: middle;
  }
  img {
    width: 28px;
    height: 28px;
    border-radius: 50px;
  }
  span {
    margin: 0 10px;
  }
}

.el-aside {
  width: 200px;
  h3 {
    height: 60px;
    width: 200px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    color: #eee;
  }
  background-color: #000000;
  color: #333;
}

.el-main {
  background-color: #f2f2f2;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>