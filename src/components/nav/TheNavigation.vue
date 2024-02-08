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
          <router-link to="/home">Principal</router-link>
        </li>
        <li>
          <router-link to="/addMovie">Add Filme</router-link>
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
  height: auto;
  background: rgb(64, 70, 10);
  background: linear-gradient(
    90deg,
    rgba(64, 70, 10, 1) 2%,
    rgba(42, 52, 69, 1) 9%,
    rgba(17, 56, 92, 1) 63%,
    rgba(92, 91, 26, 1) 100%
  );
  padding: 1rem;
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
  margin: 0 1rem;
}

a,
button {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active,
a.router-link-active {
  color: #fac758;
  border-color: #56400f;
  background-color: #0a0f1f;
}

@media (max-width: 768px) {
  header {
    padding: 0.5rem;
  }

  li {
    margin: 0 0.5rem;
  }

  a,
  button {
    padding: 0.25rem 0.75rem;
  }
}
@media (max-width: 310px) {
  header {
    padding: 0.1rem;
  }

  li {
    margin: 0 0.1rem;
  }

  a,
  button {
    padding: 0.125rem 0.5rem;
  }
}
</style>
