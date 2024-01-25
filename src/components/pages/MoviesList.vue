<template>
  <section>
    <p v-if="isLoading === 'carregando'">carregando...</p>
    <p v-if="notFound">Nenhum filme encontrado</p>
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
  props: ["searchedMovies"],
  data() {
    return {
      movies: [],
      isLoading: "carregando",
      notFound: false,
    };
  },
  watch: {
    searchedMovies() {
      if (
        this.searchedMovies.movies.length === 0 &&
        this.searchedMovies.isEmpty === true
      ) {
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
            this.notFound = false;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        if (this.searchedMovies.movies.length === 0) {
          this.notFound = true;
          this.movies = [];
        } else {
          this.movies = this.searchedMovies.movies;
          this.notFound = false;
        }
      }
    },
  },
  methods: {
    deleteMovie(value) {
      const resIndex = this.movies.findIndex((res) => res.id === value);
      this.movies.splice(resIndex, 1);
    },
  },

  created() {
    if (this.searchedMovies.movies.length === 0) {
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
          this.notFound = false;
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.movies = this.searchedMovies.movies;
    }
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
