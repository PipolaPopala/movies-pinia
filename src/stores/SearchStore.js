// import { defineStore } from "pinia";
// import { useMovieStore } from "./MovieStore";
// const url =
//   "https:api.themoviedb.org/3/search/movie?api_key=5cbd750a3e912b835275eea63a4c35cb&query=";

// export const useSearchStore = defineStore("searchStore", {
//   state: () => ({
//     loader: false,
//     movies: [],
//   }),
//   actions: {
//     async getMovies(search) {
//       this.loader = true;
//       const res = await fetch(`${url}${search}`);
//       const data = await res.json();
//       this.movies = data.results;
//       this.loader = false;
//     },
//     addToUserMovies(object) {
//       const movieStore = useMovieStore();
//       movieStore.movies.push({ ...object, isWatched: false });
//       movieStore.activeTab = 1;
//     },
//   },
// });

// composition api
import { defineStore } from "pinia";
import { useMovieStore } from "./MovieStore";
import { ref } from "vue";

const url =
  "https:api.themoviedb.org/3/search/movie?api_key=5cbd750a3e912b835275eea63a4c35cb&query=";

export const useSearchStore = defineStore("searchStore", () => {
  const loader = ref(false);
  const movies = ref([]);

  const getMovies = async (search) => {
    loader.value = true;
    const res = await fetch(`${url}${search}`);
    const data = await res.json();
    movies.value = data.results;
    loader.value = false;
  };

  const addToUserMovies = (object) => {
    const movieStore = useMovieStore();
    movieStore.movies.push({ ...object, isWatched: false });
    movieStore.activeTab = 1;
  };

  return {
    loader,
    movies,
    getMovies,
    addToUserMovies,
  };
});