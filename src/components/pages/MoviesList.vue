<template>
  <section>
    <p v-if="isLoading === 'carregando'">carregando...</p>
    <p v-if="notFound">Nenhum filme encontrado</p>
    <div>
      <ul>
        <transition-group name="user-list">
          <movie-card
            @deleteMovie="deleteMovie"
            v-for="movie in movies"
            :key="movie.id"
            :id="movie.id"
            :name="movie.name"
            :director="movie.director"
            :year="movie.year"
            :meanRating="movie.meanRating"
            :description="movie.description"
          ></movie-card>
        </transition-group>
      </ul>
    </div>
  </section>
</template>

<script>
import MovieCard from "../movies/MovieCard.vue";
import api from "../../api.js";
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
    async searchedMovies() {
      if (
        this.searchedMovies.movies.length === 0 &&
        this.searchedMovies.isEmpty === true
      ) {
        try {
          const response = await api.getAllMovies();
          this.handleMoviesResponse(response.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        this.handleMoviesResponse(this.searchedMovies.movies);
      }
    },
    movies() {
      this.movies = this.movies.reverse();
    },
  },
  methods: {
    deleteMovie(value) {
      const resIndex = this.movies.findIndex((res) => res.id === value);
      this.movies.splice(resIndex, 1);
    },
    async fetchMovies() {
      try {
        const response = await api.getAllMovies();
        this.movies = response.data;
        this.isLoading = "ok";
        this.notFound = false;
      } catch (error) {
        console.error(error);
      }
    },
    handleMoviesResponse(data) {
      if (data.length === 0) {
        this.notFound = true;
        this.movies = [];
      } else {
        this.movies = data;
        this.notFound = false;
      }

      this.isLoading = "ok";
    },
  },

  created() {
    this.fetchMovies();
  },
};
</script>

<style scoped>
p {
  display: flex;
  justify-content: center;
  font-size: 2rem;
}

.user-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.user-list-enter-active {
  transition: all 0.5s ease-out;
}

.user-list-enter-to,
.user-list-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.user-list-leave-active {
  transition: all 0.5s ease-in;
  position: absolute;
}

.user-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.user-list-move {
  transition: transform 0.5s ease-in-out;
}
</style>
