<template>
  <div>
    <form @submit.prevent="submitForm">
      <p v-if="erroAuth">Erro na autenticação. Insira os dados novamente</p>
      <h1>Entrar</h1>
      <div class="form-control">
        <label for="user-name">Username</label>
        <input
          id="user-name"
          name="user-name"
          type="text"
          v-model.trim="userName"
        />
      </div>

      <div class="form-control">
        <label for="password">Password</label>
        <div class="div-password-container">
          <input
            id="password"
            name="password"
            :type="typePassword"
            v-model.trim="password"
          />
          <img
            @mouseover="showPassword"
            @mouseleave="hidePassword"
            src="../../assets/olho.png"
            alt=""
          />
        </div>
      </div>
      <div>
        <button @submit="submitForm">login</button>
        <button @click="$router.push('/register')" class="register-button">
          Registrar-se
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userName: "",
      password: "",
      erroAuth: false,
      typePassword: "password",
    };
  },
  methods: {
    submitForm() {
      console.log(this.password);
      axios
        .post(
          "http://localhost:8080/user/login",
          {
            username: this.userName,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              //   "Access-Control-Allow-Origin": "*",

              Accept: "*/*",
            },
          }
        )
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("idUser", response.data.id);
          this.erroAuth = false;
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log("Erro na autenticação", error.response);
          this.erroAuth = true;
        });
    },
    showPassword() {
      this.typePassword = "text";
    },
    hidePassword() {
      this.typePassword = "password";
    },
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.$router.push("/home");
    }
  },
};
</script>

<style scoped>
p {
  color: red;
  font-size: 20px;
}
h1 {
  font-weight: bold;
}
form {
  margin: 2rem auto;
  max-width: 20rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 2rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-control {
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
img {
  width: 7%;
  margin: 5px;
}

label {
  font-weight: bold;
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
}

input {
  display: flex;
  width: 7rem;
  font: inherit;
  margin-top: 0.5rem;
  align-self: center;
}

button {
  font: inherit;
  border: 1px solid #0076bb;
  background-color: #0076bb;
  color: white;
  cursor: pointer;
  padding: 0.75rem 2rem;
  border-radius: 30px;
  margin-top: 0.5rem;
  align-self: center;
  width: 100%;
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}

.div-password-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* Garante que a largura seja 100% do container pai */
}

.register-button {
  background-color: rgb(184, 117, 117);
  border: red;
}

.register-button:hover,
.register-button:active {
  border-color: red;
  background-color: red;
}
</style>
