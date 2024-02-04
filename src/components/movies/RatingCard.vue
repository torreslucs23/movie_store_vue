<template>
  <!-- Add icon library -->
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />

  <span
    @click="submitStar(1)"
    class="fa fa-star"
    :class="star >= 1 ? 'checked' : 'none'"
  ></span>
  <span
    @click="submitStar(2)"
    class="fa fa-star"
    :class="star >= 2 ? 'checked' : 'none'"
  ></span>
  <span
    @click="submitStar(3)"
    class="fa fa-star"
    :class="star >= 3 ? 'checked' : 'none'"
  ></span>
  <span
    @click="submitStar(4)"
    class="fa fa-star"
    :class="star >= 4 ? 'checked' : 'none'"
  ></span>
  <span
    @click="submitStar(5)"
    class="fa fa-star"
    :class="star >= 5 ? 'checked' : 'none'"
  ></span>
</template>

<script>
import api from "../../api.js";
export default {
  data() {
    return {
      star: parseInt(this.rating, 10) || 0,
      idReview: null,
    };
  },
  props: ["rating", "movieId"],

  methods: {
    submitStar(value) {
      console.log(this.star);
      if (value === this.star) {
        this.star = 0;
        // this.$emit("send-rating", this.star);
      } else {
        this.star = value;
        // this.$emit("send-rating", this.star);
      }

      api
        .postReview(this.movieId, localStorage.getItem("idUser"), this.star)
        .then(() => {})
        .catch(() => {
          api
            .putReview(
              this.idReview,
              this.movieId,
              localStorage.getItem("idUser"),
              this.star
            )
            .then(() => {});
        });
    },
  },
  created() {
    api
      .getUserReview(this.movieId, localStorage.getItem("idUser"))
      .then((response) => {
        this.idReview = response.data.id;
        this.star = parseInt(response.data.rating, 10);
      })
      .catch(() => {
        this.idReview = null;
        this.star = 0;
      });
  },
};
</script>

<style scoped>
.checked {
  color: orange;
}
span:hover {
  cursor: pointer;
}
</style>
