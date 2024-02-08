<template>
  <the-navigation></the-navigation>

  <div>
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
