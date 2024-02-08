<template>
  <div>
    <base-dialog v-if="createdUser">
      <template #default>
        <p class="sucess">Usuário criado com sucesso!</p>
      </template>
    </base-dialog>
    <form @submit.prevent="submitForm">
      <p v-if="errorRegister">
        Erro ao registrar-se. Use outro nome de usuario ou tente mais tarde.
      </p>
      <h2>Registrar-se</h2>
      <div class="form-control">
        <float-label-prime class="float-input">
          <InputText id="username" type="text" v-model.trim="userName" />
          <label for="username">Nome do usuário</label>
        </float-label-prime>
      </div>
      <p v-if="pass1CheckLength === false">
        Senha deve conter pelo menos 6 caracteres
      </p>
      <p v-if="pass1CheckSpecial === false">
        Deve conter pelo menos um caractere especial
      </p>
      <div class="form-control">
        <float-label-prime class="float-input">
          <InputText
            id="password"
            type="password"
            v-model.trim="password1"
            @blur="checkPassword1Method"
          />
          <label for="password">Digite uma senha</label>
        </float-label-prime>
      </div>

      <p v-if="equalPasswords === false">As senhas estão diferentes</p>

      <div class="form-control">
        <float-label-prime class="float-input">
          <InputText
            id="password2"
            type="password"
            v-model.trim="password2"
            @blur="checkBothPasswords"
          />
          <label for="password2">Digite a senha novamente</label>
        </float-label-prime>
      </div>
      <button>Registrar</button>
      <button class="login-button" @click="this.$router.push('/auth')">
        Ir para login
      </button>
    </form>
  </div>
</template>

<script>
import api from "../../api.js";
export default {
  data() {
    return {
      userName: "",
      password1: "",
      password2: "",
      pass1CheckLength: true,
      pass1CheckSpecial: true,
      equalPasswords: true,
      errorRegister: false,
      createdUser: false,
      submit: false,
    };
  },
  methods: {
    submitForm() {
      if (this.submit) {
        return;
      }
      if (
        this.userName &&
        this.password1 &&
        this.password2 &&
        this.pass1CheckLength &&
        this.pass1CheckSpecial &&
        this.equalPasswords
      ) {
        const userData = {
          username: this.userName,
          password: this.password1,
        };

        api
          .createUser(userData)
          .then(() => {
            this.handleSuccessfulRegistration();
          })
          .catch(() => {
            this.submit = false;
            this.errorRegister = true;
          });
      } else {
        this.submit = false;
        this.errorRegister = true;
      }
    },
    checkLengthPassword() {
      if (this.password1.length < 6 && this.password1 != "") {
        this.pass1CheckLength = false;
      } else {
        this.pass1CheckLength = true;
      }
    },
    checkSpecialPassword() {
      const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(
        this.password1
      );

      if (!hasSpecialChar && this.password1 != "") {
        this.pass1CheckSpecial = false;
      } else {
        this.pass1CheckSpecial = true;
      }
    },
    checkPassword1Method() {
      this.checkLengthPassword();
      this.checkSpecialPassword();
    },

    handleSuccessfulRegistration() {
      this.userName = "";
      this.password1 = "";
      this.password2 = "";
      this.errorRegister = false;
      this.createdUser = true;

      setTimeout(() => {
        this.createdUser = false;
        this.$router.push("/auth");
      }, 1500);
    },
    checkBothPasswords() {
      if (this.password1 != this.password2) {
        this.equalPasswords = false;
      } else {
        this.equalPasswords = true;
      }
    },
  },
};
</script>

<style scoped>
p {
  color: red;
  font-size: 10px;
}
.sucess {
  color: black;
  font-size: 1.5rem;
  text-align: center;
}
h1 {
  font-weight: bold;
}

h2 {
  display: flex;
  justify-content: center;
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
  justify-content: center;
}

input,
.float-input {
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
}

button:hover,
button:active {
  border-color: #002350;
  background-color: #002350;
}
.login-button {
  background-color: rgb(184, 117, 117);
  border: red;
}

.login-button:hover,
.login-button:active {
  border-color: red;
  background-color: red;
}
@media (max-width: 500px) {
  form {
    max-width: 90%;
  }
}
</style>
