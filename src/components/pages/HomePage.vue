<template>
  <div>
    <label for="movies-list"> These are all movies </label>
    <movies-list></movies-list>
  </div>
</template>

<script>
import MoviesList from "./MoviesList.vue";
export default {
  components: {
    MoviesList,
  },
};
</script>
