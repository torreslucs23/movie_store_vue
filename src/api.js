import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const api = {
  getMovies: (substring, page, size) =>
    instance.get("/movies", { params: { page, size, substring } }),

  postReview: (movieId, userId, rating) =>
    instance.post("/reviews", { movieId, userId, rating }),

  putReview: (reviewId, movieId, userId, rating) =>
    instance.put(`/reviews/${reviewId}`, { movieId, userId, rating }),

  getUserReview: (movieId, userId) =>
    instance.get(`/reviews/${movieId}/user/${userId}`),

  deleteMovie: (movieId) => instance.delete(`/movies/${movieId}`),

  searchMovies: (substring, page, size) =>
    instance.get("/movies/byName?", { params: { substring, page, size } }),

  createMovie: (movieData) => instance.post("/movies", movieData),

  loginUser: (userData) => instance.post("/user/login", userData),

  createUser: (userData) => instance.post("/user", userData),

  updateMovie: (movieId, movieData) =>
    instance.put(`/movies/${movieId}`, movieData),

  getMovieDetails: (movieId) => instance.get(`/movies/${movieId}`),
};

export default api;
