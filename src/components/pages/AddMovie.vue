<template>
  <the-navigation></the-navigation>
  <h2>Adicione um novo filme</h2>

  <form @submit.prevent="submitForm">
    <p v-if="createMovieCheck">Erro ao criar o filme. Tente novamente</p>
    <div class="form-control">
      <label for="movie-name">Nome do filme</label>
      <input
        id="movie-name"
        name="movie-name"
        type="text"
        v-model.trim="movieName"
      />
    </div>

    <div class="form-control">
      <label for="director">Diretor</label>
      <input
        id="director"
        name="director"
        type="text"
        v-model.trim="director"
      />
    </div>
    <p v-if="yearCheckError">Data inválida.</p>
    <div class="form-control">
      <label for="year-movie">Ano de lançamento</label>
      <input
        id="year-movie"
        name="year-movie"
        type="number"
        min="1900"
        max="2100"
        v-model.trim="yearMovie"
      />
    </div>
    <button @submit="submitForm">Criar</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      movieName: "",
      director: "",
      yearMovie: null,
      yearCheckError: false,
      createMovieCheck: false,
    };
  },

  methods: {
    submitForm() {
      if (this.yearMovie < 1900 || this.yearMovie > 2100) {
        this.yearCheckError = true;
      } else {
        axios
          .post(
            "http://localhost:8080/movies",
            {
              name: this.movieName,
              director: this.director,
              year: this.yearMovie,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          )
          .then(() => {
            this.movieName = "";
            this.director = "";
            this.year = null;
            this.yearCheckError = false;
            this.createMovieCheck = false;
            this.$router.push("/home");
          })
          .catch(() => {
            this.createMovieCheck = true;
          });
      }
    },
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
