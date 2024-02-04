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
          <router-link to="/addMovie">Add Movie</router-link>
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
  height: auto; /* Mudança: Altura automática para se ajustar ao conteúdo */
  background-color: #11005c;
  padding: 1rem; /* Mudança: Adicionado preenchimento para melhor aparência */
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
  margin: 0 1rem; /* Mudança: Reduzi a margem para melhor aparência em tamanhos menores */
}

a,
button {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1rem; /* Mudança: Reduzi o preenchimento para melhor aparência em tamanhos menores */
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
