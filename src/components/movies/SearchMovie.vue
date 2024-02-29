<template>
  <div>
    <input
      v-model="input"
      @input="search"
      type="text"
      placeholder="Busque um filme"
    />
  </div>
</template>

<script>
import api from "../../api.js";
export default {
  emits: ["searchMovies"],
  props: ["actualPage"],
  data() {
    return {
      input: "",
      isEmpty: true,
      controller: "",
    };
  },
  methods: {
    async search() {
      try {
        await this.$nextTick();
        if (this.input === "") {
          this.isEmpty = true;
          this.$emit("searchMovies", {
            movies: [],
            isEmpty: true,
            inputSearch: "",
          });
          return;
        } else {
          this.isEmpty = false;
        }
        if (this.controller) {
          this.controller.abort();
        }

        this.controller = new AbortController();
        const signal = this.controller.signal;

        const response = await api.getMovies(this.input, 0, 4, signal);
        this.$emit("searchMovies", {
          movies: response.data.content,
          isEmpty: this.isEmpty,
          total: response.data.totalElements,
          inputSearch: this.input,
        });
      } catch (error) {
        console.log(error);
        this.$emit("searchMovies", {
          movies: [],
          isEmpty: this.isEmpty,
          total: 0,
          inputSearch: this.input,
        });
      }
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2em;
}
input {
  border-block-end-style: groove;
  display: flex;
  justify-self: center;
  border-radius: 8px;
  border: 3px solid;
  flex-wrap: wrap;
  width: 10rem;
  height: 2.5em;
  font-size: 1em;
  font-style: italic;
  box-shadow: 5px 10px 8px #888888;
  text-align: center;
  background-color: aliceblue;
}

input:hover {
  background-color: rgb(201, 201, 223);
}
</style>
