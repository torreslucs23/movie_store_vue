<template>
  <div>
    <base-dialog v-if="showModal" title="apagar filme" @close="closeModal">
      <template #default>
        <p>Tem certeza que quer excluir esse filme?</p>
      </template>
      <template #actions>
        <button @click="confirmDelete">Sim</button>
        <button @click="closeModal">não</button>
      </template>
    </base-dialog>

    <base-dialog v-if="deletedMovie">
      <template #default>
        <p class="deleted">filme {{ this.name }} deletado com sucesso</p>
      </template>
    </base-dialog>
    <section>
      <h2>{{ name }}</h2>
      <img :src="imgUrl" alt="" />
      <h3>{{ director }}</h3>
      <p>{{ description }}</p>
      <p class="year">{{ year }}</p>
      <p v-if="meanRating">Avaliação média: {{ meanRating.toFixed(1) }}</p>
      <p v-else>Este filme não possui avaliações</p>
      <rating-card :rating="rating" :movieId="id"></rating-card>
      <router-link :to="'/movie/' + this.id" class="button-edit"
        >Editar</router-link
      >
      <button @click="deleteMovie">apagar</button>
    </section>
  </div>
</template>

<script>
import RatingCard from "./RatingCard.vue";
import api from "../../api.js";
export default {
  props: [
    "id",
    "name",
    "director",
    "description",
    "year",
    "meanRating",
    "imgUrl",
  ],

  components: {
    RatingCard,
  },
  emits: ["deleteMovie"],
  data() {
    return {
      idReview: null,
      rating: 0,
      showModal: false,
      deletedMovie: false,
      moviePoster: "",
    };
  },
  methods: {
    deleteMovie() {
      this.showModal = true;
    },
    editMovie() {
      this.$router.push({
        name: "/movie",
        props: {
          id: this.id,
          name: this.name,
          director: this.director,
          year: this.year,
        },
        params: { id: this.id },
      });
    },
    closeModal() {
      this.showModal = false;
    },
    confirmDelete() {
      this.showModal = false;
      api
        .deleteMovie(this.id)
        .then(() => {
          this.deletedMovie = true;
          console.log(this.deletedMovie);
          setTimeout(() => {
            this.deletedMovie = false;
            this.$emit("deleteMovie", this.id);
          }, 1500);
        })
        .catch((error) => {
          console.log("Erro ao deletar", error);
        });
    },
  },
};
</script>

<style scoped>
section {
  margin: 1rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1.5rem;
  border-radius: 12px;
  align-items: center;
}

.deleted {
  color: black;
  font-size: 1.5rem;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 10px;
}

h2,
h3,
p {
  margin: 0.5rem 0;
}

.year {
  font-weight: bold;
}

h2 {
  color: #333;
  font-size: 25px;
  font-weight: bold;
}

h3 {
  color: #555;
  font-size: 16px;
}

p {
  color: #777;
  font-size: 14px;
}

button,
.button-edit {
  display: flex;
  justify-content: center;
  background-color: #ff5252;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 2px;
}

.button-edit {
  max-width: 5rem;
  text-decoration: none;
  background-color: rgb(45, 93, 93);
}

.button-edit:hover {
  background-color: rgb(2, 15, 15);
}

button:hover {
  background-color: #ff0000;
}

.modal-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
}

.confirmation-modal {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

@media (max-width: 768px) {
  section {
    max-width: 80%;
  }

  h2 {
    font-size: 20px;
  }

  h3 {
    font-size: 14px;
  }

  p {
    font-size: 12px;
  }
  img {
    max-width: 80%;
  }
}
</style>
