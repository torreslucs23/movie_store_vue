<template>
  <form @submit.prevent="submitForm">
    <h1>Login Authentication</h1>
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
      <input
        id="password"
        name="password"
        type="password"
        v-model.trim="password"
      />
    </div>
    <div>
      <button>Login</button>
    </div>
  </form>

  <button @click="getMovie">movie</button>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userName: "",
      password: "",
      responseData: null,
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
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Erro na autenticação", error.response);
        });
    },
  },
};
</script>

<style scoped>
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

label {
  font-weight: bold;
  display: flex;
  justify-content: center; /* Centraliza horizontalmente */
}

input {
  display: flex;
  width: 60%;
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
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
</style>
