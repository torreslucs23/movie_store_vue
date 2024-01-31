<template>
  <base-dialog v-if="isLogout">
    <template #default>
      <p class="logout">Você deslogou</p>
    </template>
  </base-dialog>
  <header>
    <nav>
      <ul>
        <li>
          <p>{{ username }}</p>
        </li>
        <li>
          <router-link to="/home">Home</router-link>
        </li>
        <li>
          <router-link to="/movie">Add Movie</router-link>
        </li>
        <button @click="logout">Logout</button>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem("username"),
      isLogout: false,
    };
  },
  methods: {
    logout() {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("idUser");
        this.isLogout = true;
        setTimeout(() => {
          this.logout = false;
          this.$router.push("/auth");
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
p {
  color: white;
}
.logout {
  text-align: center;
  font-size: 1.5rem;
  color: black;
}
header {
  width: 100%;
  height: 5rem;
  background-color: #11005c;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 2rem;
}

a,
button {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active,
a.router-link-active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}
</style>
