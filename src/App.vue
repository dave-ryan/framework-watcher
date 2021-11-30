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
          {{ repo.name }}
        </a>
      </h1>
      <p class="description">{{ repo.description }}</p>
      <p>Stars: {{ repo.stargazers_count }}</p>
      <p>Watchers: {{ repo.subscribers_count }}</p>
      <p>Forks: {{ repo.forks }}</p>
      <p>Weight: {{ repo.weight }}</p>
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
      repos: {
        vue: {},
        angular: {},
        ember: {},
        svelte: {},
        react: {},
      },
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
            this.repos.vue = vue.data;
            this.repos.angular = angular.data;
            this.repos.ember = ember.data;
            this.repos.svelte = svelte.data;
            this.repos.react = react.data;

            for (var key in this.repos) {
              this.repos[key].weight =
                2 * this.repos[key].stargazers_count +
                this.repos[key].forks +
                3 * this.repos[key].subscribers_count;
              if (this.repos[key].stargazers_count > 1000) {
                this.repos[key].stargazers_count =
                  (Math.round(this.repos[key].stargazers_count / 1000) * 1000)
                    .toString()
                    .slice(0, -3) + "k";
              }
              if (this.repos[key].subscribers_count > 1000) {
                this.repos[key].subscribers_count =
                  (Math.round(this.repos[key].subscribers_count / 1000) * 1000)
                    .toString()
                    .slice(0, -3) + "k";
              }
              if (this.repos[key].forks > 1000) {
                this.repos[key].forks =
                  (Math.round(this.repos[key].forks / 1000) * 1000)
                    .toString()
                    .slice(0, -3) + "k";
              }
            }
          })
        );
    },
  },
};
</script>


