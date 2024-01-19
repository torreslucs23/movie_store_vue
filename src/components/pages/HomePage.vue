<template>
  <section>
    <label for="movies-list"> These are all movies </label>
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
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
