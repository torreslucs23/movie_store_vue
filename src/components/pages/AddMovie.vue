<template>
  <base-dialog v-if="sucess">
    <template #default>
      <p class="sucess">Filme criado com sucesso!</p>
    </template>
  </base-dialog>
  <the-navigation></the-navigation>

  <form @submit.prevent="submitForm">
    <h2>Adicionar Filme</h2>
    <p v-if="createMovieCheck">Erro ao criar o filme. Tente novamente</p>
    <div class="form-control">
      <float-label-prime>
        <InputText
          id="movie-name"
          type="text"
          name="movie-name"
          v-model.trim="movieName"
        />
        <label for="movie-name">Nome do filme</label>
      </float-label-prime>
    </div>

    <button-prime @click="fetchImage" v-if="hasImage"
      >Gerar imagem</button-prime
    >

    <img v-if="hasImage === 'ok'" :src="showImage" alt="" />

    <h5 v-else-if="hasImage === 'empty'">Sem imagem</h5>

    <h5 v-else>Imagem não encontrada</h5>

    <div class="form-control">
      <float-label-prime v-if="hasImage === 'ok' || hasImage === 'notFound'">
        <InputText
          id="movie-img"
          type="text"
          name="movie-img"
          v-model.trim="urlNewImg"
        />
        <label for="movie-name">digite uma URL</label>
      </float-label-prime>

      <button-prime
        v-if="hasImage === 'ok' || hasImage === 'notFound'"
        @click="changeImg"
        class="url-button"
      >
        Trocar imagem
      </button-prime>
    </div>

    <div class="form-control">
      <float-label-prime>
        <InputText
          id="director"
          name="director"
          type="text"
          v-model.trim="director"
        />
        <label for="director">Diretor</label>
      </float-label-prime>
    </div>

    <div class="form-control">
      <label for="description">Descrição</label>
      <text-area-prime v-model.trim="description" rows="5" cols="20" />
    </div>
    <p v-if="yearCheckError">Data inválida.</p>
    <div class="form-control">
      <label for="year-movie">Ano de lançamento</label>
      <input-number-prime
        inputId="withoutgrouping"
        showButtons
        :min="1900"
        :max="2100"
        :useGrouping="false"
        v-model.trim="yearMovie"
        class="input"
      />
    </div>
    <button @submit="submitForm">Criar</button>
  </form>
</template>

<script>
import api from "../../api.js";
import axios from "axios";
export default {
  data() {
    return {
      movieName: "",
      director: "",
      description: "",
      yearMovie: null,
      yearCheckError: false,
      createMovieCheck: false,
      sucess: false,
      moviePoster: "",
      submit: false,
      showImage: "",
      hasImage: "empty",
      urlNewImg: "",
    };
  },

  methods: {
    changeImg() {
      this.showImage = this.urlNewImg;
      this.moviePoster = this.urlNewImg;
      this.hasImage = "ok";
    },
    async submitForm() {
      if (this.submit === true) {
        return;
      }
      this.submit = true;
      if (this.yearMovie < 1900 || this.yearMovie > 2100) {
        this.yearCheckError = true;
      } else {
        try {
          const movieData = {
            name: this.movieName,
            description: this.description,
            director: this.director,
            year: this.yearMovie,
            imgUrl: this.moviePoster,
          };

          await api.createMovie(movieData);

          this.movieName = "";
          this.director = "";
          this.description = "";
          this.yearMovie = null;
          this.yearCheckError = false;
          this.createMovieCheck = false;
          this.sucess = true;
          setTimeout(() => {
            this.sucess = false;
            this.$router.push("/home");
          }, 2000);
        } catch (error) {
          console.error("Erro durante o processo:", error);
          this.createMovieCheck = true;
        }
      }
    },
    async fetchImage() {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?t=${this.movieName}&apikey=49e3f9e1`
        );
        if (response.data.Poster && response.data.Poster !== "N/A") {
          this.showImage = response.data.Poster;
          this.hasImage = "ok";
          this.urlNewImg = "";
        } else {
          console.log("imagem nao e ncontrada");
          this.hasImage = "notFound";
        }
      } catch (error) {
        console.error(error);
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
.sucess {
  color: black;
  font-size: 1.5rem;
  text-align: center;
}
.url-button {
  margin: 1rem;
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
  max-width: 26rem;
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

.input {
  width: 100%;
  font: inherit;
  margin-top: 0.5rem;
}

img {
  margin: 1rem;
  max-width: 12rem;
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
    max-width: 90%;
  }
}

@media (max-width: 400px) {
  form {
    max-width: 80%;
  }
}
</style>
