<template>
  <div>
    <form @submit.prevent="submitForm">
      <p v-if="erroAuth">Erro na autenticação. Insira os dados novamente</p>
      <h1>Entrar</h1>
      <div class="form-control">
        <float-label-prime>
          <InputText id="username" type="text" v-model.trim="userName" />
          <label for="username">Nome do usuário</label>
        </float-label-prime>
      </div>

      <div class="password-container">
        <div class="form-control">
          <div class="div-password-container">
            <float-label-prime>
              <InputText
                id="password"
                :type="typePassword"
                v-model.trim="password"
              />
              <label for="password">Senha</label>
            </float-label-prime>
            <i
              @mouseover="showPassword"
              @mouseleave="hidePassword"
              class="pi pi-eye app-eye"
            />
          </div>
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
import api from "../../api.js";
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
      const userData = {
        username: this.userName,
        password: this.password,
      };

      api
        .loginUser(userData)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("idUser", response.data.id);
          this.authError = false;
          this.$router.push("/home");
        })
        .catch((error) => {
          console.log("Erro na autenticação", error.response);
          this.authError = true;
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
  font-size: 15px;
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
  justify-content: center;
}

input {
  display: flex;
  width: 100%;
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
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.app-eye {
  position: absolute;
  right: 1px;
  cursor: pointer;
  width: 1rem;
}

.password-container {
  position: relative;
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

@media (max-width: 768px) {
  form {
    max-width: 90%;
  }

  input {
    width: 100%;
  }
}
</style>
