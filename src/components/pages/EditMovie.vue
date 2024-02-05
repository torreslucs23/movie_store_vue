<template>
  <the-navigation></the-navigation>
  <base-dialog v-if="sucess">
    <template #default>
      <p class="sucess">Filme editado com sucesso!</p>
    </template>
  </base-dialog>

  <form @submit.prevent="submitForm">
    <h1>Editar Filme</h1>

    <h2>{{ movie }}</h2>

    <div class="form-control">
      <label for="director">Diretor</label>
      <input
        id="director"
        name="director"
        type="text"
        v-model.trim="director"
      />
    </div>
    <div class="form-control">
      <label for="description">Descrição</label>
      <textarea
        id="description"
        name="description"
        type="textarea"
        v-model.trim="description"
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
        v-model.trim="year"
      />
    </div>
    <button @submit="submitForm">Editar</button>
  </form>
</template>

<script>
import api from "../../api.js";
export default {
  data() {
    return {
      movie: "",
      director: "",
      description: "",
      year: null,
      yearCheckError: false,
      sucess: false,
    };
  },
  methods: {
    submitForm() {
      if (this.year < 1900 || this.year > 2100) {
        this.yearCheckError = true;
      } else {
        const movieData = {
          id: this.$route.params.id,
          name: this.movie,
          director: this.director,
          description: this.description,
          year: this.year,
        };

        api
          .updateMovie(this.$route.params.id, movieData)
          .then(() => {
            this.success = true;
            setTimeout(() => {
              this.success = false;
              this.$router.push("/home");
            }, 2000);
          })
          .catch((error) => {
            console.log("Erro na atualização do filme", error);
          });
      }
    },
    async fetchMovieDetails() {
      try {
        const response = await api.getMovieDetails(this.$route.params.id);
        this.movie = response.data.name;
        this.year = response.data.year;
        this.director = response.data.director;
        this.description = response.data.description;
      } catch (error) {
        console.log("Erro ao obter detalhes do filme", error);
      }
    },
  },
  created() {
    this.fetchMovieDetails();
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
  justify-content: center;
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

@media (max-width: 768px) {
  form {
    width: 90%;
  }

  input {
    width: 100%;
  }
}
</style>
