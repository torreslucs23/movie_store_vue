<template>
  <search-movie @searchMovies="handleSearch" :actualPage="page"></search-movie>
  <section>
    <p v-if="isLoading === 'loading'">carregando...</p>
    <p v-if="notFound">Nenhum filme encontrado</p>

    <div v-if="isLoading === 'loading'">
      <ul>
        <div
          v-for="index in 4"
          :key="index"
          class="border-round border-1 surface-border p-4 surface-card loading"
        >
          <div class="flex mb-10" margin="2rem">
            <div>
              <skeleton-prime width="10rem" class="mb-5"></skeleton-prime>
            </div>
          </div>
          <skeleton-prime width="8rem" height="12rem"></skeleton-prime>
          <div class="flex justify-content-between mt-3">
            <skeleton-prime width="10rem" class="mb-5"></skeleton-prime>
            <skeleton-prime width="10rem" class="mb-5"></skeleton-prime>
            <skeleton-prime width="10rem" class="mb-5"></skeleton-prime>

            <div class="d-flex flex-row">
              <skeleton-prime width="4rem" height="2rem"></skeleton-prime>
              <skeleton-prime width="4rem" height="2rem"></skeleton-prime>
            </div>
          </div>
        </div>
      </ul>
    </div>
    <div v-else>
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
            :imgUrl="movie.imgUrl"
            class="cards"
          ></movie-card>
        </transition-group>
      </ul>
    </div>
  </section>
  <paginator-prime
    v-model:first="page"
    :rows="4"
    :totalRecords="totalElements"
    :alwaysShow="false"
    @page="pageHandle"
  ></paginator-prime>
</template>

<script>
import MovieCard from "../movies/MovieCard.vue";
import api from "../../api.js";
import SearchMovie from "../movies/SearchMovie.vue";
export default {
  components: {
    MovieCard,
    SearchMovie,
  },

  data() {
    return {
      movies: [],
      isLoading: "loading",
      notFound: false,
      page: 0,
      totalElements: 0,
      searchedMovies: { movies: [], isEmpty: true, total: 0, inputSearch: "" },
    };
  },
  watch: {
    async searchedMovies() {
      this.isLoading = "loading";
      if (
        this.searchedMovies.movies.length === 0 &&
        this.searchedMovies.isEmpty === true
      ) {
        try {
          this.page = 0;
          const response = await api.getMovies(0, 4);
          this.totalElements = response.data.totalElements;
          this.handleMoviesResponse(response.data.content);
        } catch (error) {
          console.error(error);
        }
      } else {
        this.page = 0;
        this.totalElements = this.searchedMovies.total;
        this.handleMoviesResponse(this.searchedMovies.movies);
      }
    },
  },
  methods: {
    handleSearch(value) {
      this.searchedMovies = value;
    },
    deleteMovie(value) {
      const resIndex = this.movies.findIndex((res) => res.id === value);
      this.movies.splice(resIndex, 1);
    },
    async fetchMovies(page) {
      this.isLoading = "loading";
      try {
        const response = await api.getMovies(page, 4);
        this.page = page * 4;
        this.movies = response.data.content;
        this.totalElements = parseInt(response.data.totalElements);
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
    async pageHandle(paginator) {
      this.isLoading = "loading";
      if (this.searchedMovies.inputSearch === "") {
        this.fetchMovies(paginator.page);
      } else {
        try {
          const response = await api.searchMovies(
            this.searchedMovies.inputSearch,
            paginator.page,
            4
          );
          const data = response.data.content;
          this.page = paginator.page * 4;
          this.handleMoviesResponse(data);
        } catch (error) {
          console.error("erro aqui", error);
        }
      }
    },
  },

  mounted() {
    this.fetchMovies(0);
  },
};
</script>

<style scoped>
p {
  display: flex;
  justify-content: center;
  font-size: 2rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
}
.cards li {
  width: 100%;
}

.loading {
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  height: 30rem;
  width: 20rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1.5rem;
  border-radius: 12px;
  align-items: center;
}

ul {
  display: flex;
  flex-direction: row;
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
