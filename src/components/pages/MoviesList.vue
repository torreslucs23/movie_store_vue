<template>
  <section>
    <p v-if="isLoading === 'carregando'">carregando...</p>
    <div>
      <ul>
        <movie-card
          @deleteMovie="deleteMovie"
          v-for="movie in movies"
          :key="movie.id"
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
  methods: {
    deleteMovie(value) {
      const resIndex = this.movies.findIndex((res) => res.id === value);
      this.movies.splice(resIndex, 1);
    },
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
        console.log(this.movies);
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
