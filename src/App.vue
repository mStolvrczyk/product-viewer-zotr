<template>
  <div id="app" data-app>
    <nav id="main-nav">
      <div class="container">
        <img @click="changeRoute('/home')" src="./assets/logo.png" alt="Logo" class="logo">
        <ul>
          <li :class="{ active: $route.path === '/home' }" @click="changeRoute('/home')">Strona główna</li>
          <li :class="{ active: $route.path.substring(0, 9) === '/rankings' }" @click="changeRoute('/rankings/smartphones')">Rankingi
          </li>
          <li>Blog</li>
          <li>Kontakt</li>
        </ul>
      </div>
    </nav>
    <router-view/>
    <footer id="main-footer">
      <div class="container footer-container">
        <div class="footer-col">
          <p><span @click="changeRoute('/home')">Zotr.pl</span> | <span>Kontakt</span> | <span>Blog</span></p>
        </div>
        <div class="footer-col">
          <v-icon color="#202020" class="social-media-icon">mdi-facebook</v-icon>
          <v-icon color="#202020" class="social-media-icon">mdi-instagram</v-icon>
        </div>
        <div class="footer-col">
          <img @click="changeRoute('/home')" src="./assets/logo2.png" alt="Logo" class="logo footer">
        </div>
      </div>
    </footer>
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
