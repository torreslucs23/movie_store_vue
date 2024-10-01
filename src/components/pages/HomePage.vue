<template>
  <the-navigation></the-navigation>
  <toast-prime />
  <div>
    <movies-list></movies-list>
  </div>
</template>

<script>
import MoviesList from "./MoviesList.vue";
import { setupWebSocket, disconnectWebSocket } from "./../../notification";
export default {
  components: {
    MoviesList,
  },
  methods: {
    handleMessage(message) {
      const msg = JSON.parse(message);
      if (msg.type === "new-movie") {
        this.$toast.add({
          severity: "info",
          summary: `${msg.movie} foi adicionado`,
          detail: "Disponível no catálogo",
          life: 15000,
        });
      }
    },
  },

  created() {
    setupWebSocket(this.handleMessage);
  },
  beforeUnmount() {
    disconnectWebSocket();
  },
};
</script>
