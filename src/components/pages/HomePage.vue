<template>
  <the-navigation></the-navigation>
  <search-movie @searchMovies="handleSearch"></search-movie>

  <div>
    <movies-list :searchedMovies="searchedMovies"></movies-list>
  </div>
</template>

<script>
import MoviesList from "./MoviesList.vue";
import SearchMovie from "../movies/SearchMovie.vue";
export default {
  components: {
    MoviesList,
    SearchMovie,
  },
  data() {
    return {
      searchedMovies: { movies: [], isEmpty: true },
    };
  },
};
</script>
