<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="https://i.gzn.jp/img/2020/11/05/github-source-code-leak/00_m.png"
    />
    <p>
      Here are some key github repositories, ranked by popularity
      <br />
      Popularity is decided by a number of factors, and it is top secret!!
      <br />Do not look at my github to find the magic formula!!
    </p>
    <br />
    <div v-for="repo in repos" :key="repo.id">
      <h1>
        <a :href="repo.clone_url" alt="" target="_blank">
          {{ repo.name.charAt(0).toUpperCase() + repo.name.slice(1) }}
        </a>
      </h1>
      <p class="description">{{ repo.description }}</p>
      <p>Stars: {{ repo.stargazers_count }}</p>
      <p>Watchers: {{ repo.subscribers_count }}</p>
      <p>Forks: {{ repo.forks }}</p>
    </div>
  </div>
</template>

  <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.description {
  font-size: 12px;
  color: gray;
}
</style>

<script>
import axios from "axios";
export default {
  name: "App",
  components: {},
  data: function () {
    return {
      repos: [],
    };
  },
  created: function () {
    this.getStuff();
  },
  methods: {
    getStuff: function () {
      axios
        .all([
          axios.get("/repos/vuejs/vue"),
          axios.get("/repos/angular/angular.js"),
          axios.get("/repos/emberjs/ember.js"),
          axios.get("/repos/sveltejs/svelte"),
          axios.get("/repos/facebook/react"),
        ])
        .then(
          axios.spread((vue, angular, ember, svelte, react) => {
            console.log(vue, angular, ember, svelte, react);
            this.repos.push(vue.data);
            this.repos.push(angular.data);
            this.repos.push(ember.data);
            this.repos.push(svelte.data);
            this.repos.push(react.data);

            this.repos.forEach((repo) => {
              repo.weight =
                repo.stargazers_count +
                5 * repo.forks +
                3 * repo.subscribers_count;
              if (repo.stargazers_count > 1000) {
                repo.stargazers_count =
                  (Math.round(repo.stargazers_count / 1000) * 1000)
                    .toString()
                    .slice(0, -3) + "k";
              }
              if (repo.subscribers_count > 1000) {
                repo.subscribers_count =
                  (Math.round(repo.subscribers_count / 1000) * 1000)
                    .toString()
                    .slice(0, -3) + "k";
              }
              if (repo.forks > 1000) {
                repo.forks =
                  (Math.round(repo.forks / 1000) * 1000)
                    .toString()
                    .slice(0, -3) + "k";
              }
            });

            this.repos.sort((a, b) =>
              a.weight < b.weight ? 1 : b.weight < a.weight ? -1 : 0
            );
          })
        );
    },
  },
};
</script>


