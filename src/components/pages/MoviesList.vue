<template>
  <section>
    <p v-if="isLoading === 'carregando'">carregando...</p>
    <div>
      <ul>
        <movie-card
          v-for="movie in movies"
          :key="movie"
          :id="movie.id"
          :name="movie.name"
          :director="movie.director"
          :year="movie.year"
          :meanRating="movie.meanRating"
        ></movie-card>
      </ul>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import MovieCard from "../movies/MovieCard.vue";
export default {
  components: {
    MovieCard,
  },
  data() {
    return {
      movies: [],
      isLoading: "carregando",
    };
  },

  created() {
    axios
      .get("http://localhost:8080/movies", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.movies = response.data;
        this.isLoading = "ok";
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>

<style scoped>
p {
  display: flex;
  justify-content: center;
  font-size: 2rem;
}
</style>
