<template>
  <the-navigation></the-navigation>
  <base-dialog v-if="sucess">
    <template #default>
      <p class="sucess">Filme editado com sucesso!</p>
    </template>
  </base-dialog>

  <div v-if="isLoading === 'loading'" class="spinner-div">
    <sppiner-prime class="p spinner"></sppiner-prime>
  </div>

  <form @submit.prevent="submitForm">
    <h1>Editar Filme</h1>

    <h2>{{ movie }}</h2>

    <p v-if="checkDirector">Campo diretor vazio não é válido</p>

    <div class="form-control">
      <float-label-prime class="input">
        <InputText
          id="director"
          name="director"
          type="text"
          v-model.trim="director"
        />
        <label for="director">Diretor</label>
      </float-label-prime>
    </div>

    <!-- <p v-if="errorImg === true">imagem não encontrada</p> -->

    <img :src="showImg" class="alt-image" alt="imagem não encontrada" />

    <div class="form-control">
      <float-label-prime>
        <InputText
          id="movie-img"
          type="text"
          name="movie-img"
          v-model.trim="urlNewImg"
        />
        <label for="movie-name">digite uma URL</label>
      </float-label-prime>

      <button-prime @click="changeImg" class="url-button">
        Trocar imagem
      </button-prime>
    </div>

    <p v-if="checkDescription">Campo descrição vazio não é válido</p>
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
        v-model.trim="year"
        class="input"
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
      checkMovieName: false,
      director: "",
      checkDirector: false,
      description: "",
      checkDescription: false,
      imgUrl: "",
      year: null,
      yearCheckError: false,
      sucess: false,
      showImg: "",
      urlNewImg: "",
      errorImg: false,
      submit: false,
      isLoading: "empty",
    };
  },

  methods: {
    errorImgLoad() {
      this.errorImg = true;
    },
    changeImg() {
      this.errorImg = false;
      if (this.urlNewImg === "") {
        this.showImg = this.imgUrl;
      } else {
        this.showImg = this.urlNewImg;
      }
    },
    submitForm() {
      if (this.submit === true) {
        return;
      }
      this.checkInput();
      if (
        this.checkDescription === true ||
        this.checkDirector === true ||
        this.checkMovieName === true
      ) {
        return null;
      }
      this.isLoading = "loading";
      this.submit = true;
      if (this.year < 1900 || this.year > 2100) {
        this.yearCheckError = true;
      } else {
        const movieData = {
          id: this.$route.params.id,
          name: this.movie,
          director: this.director,
          description: this.description,
          year: this.year,
          imgUrl: this.showImg,
        };

        api
          .updateMovie(this.$route.params.id, movieData)
          .then(() => {
            this.sucess = true;
            setTimeout(() => {
              this.sucess = false;
              this.submit = false;
              this.isLoading = "empty";
              this.$router.push("/home");
            }, 2000);
          })
          .catch((error) => {
            console.log("Erro na atualização do filme", error);
            this.isLoading = "empty";
          });
      }
    },
    checkInput() {
      this.checkMovieName = this.movie === "";
      this.checkDirector = this.director === "";
      this.checkDescription = this.description === "";
    },
    async fetchMovieDetails() {
      try {
        const response = await api.getMovieDetails(this.$route.params.id);
        this.movie = response.data.name;
        this.year = response.data.year;
        this.director = response.data.director;
        this.description = response.data.description;
        this.imgUrl = response.data.imgUrl;
        this.showImg = response.data.imgUrl;
        this.urlNewImg = response.data.imgUrl;
        this.changeImg();
      } catch (error) {
        console.log("Erro ao obter detalhes do filme", error);
      }
    },
  },
  mounted() {
    this.fetchMovieDetails();
  },
};
</script>

<style scoped>
p {
  color: red;
  font-size: 20px;
}

.alt-image {
  font-size: 1em;
  color: black;
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

.spinner-div {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 10;
}

.p {
  display: flex;
  justify-content: center;
  font-size: 2rem;
}
.spinner {
  position: fixed;
  top: 20vh;
  left: 10%;
  width: 80%;
  z-index: 100;
  border-radius: 12px;
  border: none;
  padding: 0;
  margin: 0;
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
