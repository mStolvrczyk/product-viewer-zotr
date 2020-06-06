<template>
  <div id="app" data-app>
    <nav id="main-nav">
      <div class="container">
        <img @click="changeRoute('/home')" src="./assets/logo.png" alt="Logo" class="logo">
        <ul>
          <li :class="{ active: $route.path === '/home' }" @click="changeRoute('/home')">Strona główna</li>
          <li :class="{ active: $route.path === '/rankings' }" @click="changeRoute('/rankings')">Rankingi</li>
          <li>Blog</li>
          <li>Kontakt</li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',

  components: {
  },
  data: () => ({
  }),
  methods: {
    changeRoute (route) {
      if (route !== this.$route.path) {
        this.$router.push(route)
      }
    }
  }
}
</script>
<style lang="scss">
  @import "style";
</style>
