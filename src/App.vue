<template>
  <the-navigation v-if="isAuthenticated"></the-navigation>
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: localStorage.getItem("token"),
    };
  },

  mounted() {
    this.isAuthenticated = localStorage.getItem("token");
  },
  methods: {
    isAuth() {
      this.isAuthenticated = localStorage.getItem("token");
      return;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
