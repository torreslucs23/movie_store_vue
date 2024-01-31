<template>
  <the-navigation></the-navigation>
  <h1>Edit movie</h1>
  <form @submit.prevent="submitForm">
    <p v-if="createMovieCheck">Erro ao criar o filme. Tente novamente</p>

    <h2>{{ movie.name }}</h2>

    <div class="form-control">
      <label for="director">Diretor</label>
      <input
        id="director"
        name="director"
        type="text"
        v-model.trim="movie.director"
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
        v-model.trim="movie.year"
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
      movie: {},
    };
  },
  mounted() {
    const idMovie = this.$route.params.id;
    axios
      .get("http://localhost:8080/movies/" + idMovie, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.movie = response.data;
      });
  },
};
</script>

<style scoped>
p {
  color: red;
  font-size: 20px;
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
