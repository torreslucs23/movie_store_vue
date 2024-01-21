<template>
  <section>
    <h2>{{ name }}</h2>
    <h3>{{ director }}</h3>
    <p>{{ year }}</p>
    <p v-if="meanRating">Avaliação média: {{ meanRating }}</p>
    <p v-else>Este filme não possui avaliações</p>
    <rating-card :rating="rating" :movieId="id"></rating-card>
  </section>
</template>

<script>
import RatingCard from "./RatingCard.vue";
export default {
  props: ["id", "name", "director", "year", "meanRating"],

  components: {
    RatingCard,
  },
  data() {
    return {
      idReview: null,
      rating: 0,
    };
  },
  methods: {},
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

ul {
  list-style-type: none; /* Remove os marcadores de lista */
  padding: 0;
  margin: 0;
}

li {
  border: 1px solid #ddd; /* Adiciona uma borda ao item da lista */
  margin-bottom: 10px;
  padding: 10px;
}

h2,
h3,
p {
  margin: 0.5rem 0;
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

/* Adicione estilos específicos conforme necessário */
</style>
