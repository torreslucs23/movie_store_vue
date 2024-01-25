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
import axios from "axios";
export default {
  emits: ["searchMovies"],
  data() {
    return {
      input: "",
      isEmpty: true,
    };
  },
  methods: {
    async search() {
      try {
        await this.$nextTick();
        if (this.input === "") {
          this.isEmpty = true;
        } else {
          this.isEmpty = false;
        }

        const response = await axios.get(
          "http://localhost:8080/movies/byName?",
          {
            params: {
              substring: this.input,
            },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.$emit("searchMovies", {
          movies: response.data,
          isEmpty: this.isEmpty,
        });
      } catch (error) {
        console.log(error);
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
  width: 15%;
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
