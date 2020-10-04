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
          <v-btn
            large
            color="rgb(223, 57, 104)"
             @click="changeRoute('/adminpanel/smartphones')"
            icon
          >
            <v-icon>
              mdi-account-cog
            </v-icon>
          </v-btn>
        </ul>
      </div>
    </nav>
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view
        v-on:outerHeightAlert="outerHeightAlert"
      />
    </transition>
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
          <img  @click="changeRoute('/home')" src="./assets/logo.png" alt="Logo" class="logo footer">
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
  data () {
    return {
      scrolled: false,
      prevScrollPos: window.pageYOffset
    }
  },
  methods: {
    outerHeightAlert (value) {
      if (value === true) {
        const navbar = document.getElementById('main-nav')
        navbar.style.position = 'relative'
        navbar.style.transform = 'translateY(0)'
      }
    },
    changeRoute (route) {
      if (route !== this.$route.path) {
        this.$router.push(route)
      }
    },
    navbarAction () {
      const currScrollPos = window.pageYOffset
      const navbar = document.getElementById('main-nav')
      if (window.pageYOffset > 100 && (this.prevScrollPos > currScrollPos)) {
        navbar.style.position = 'sticky'
        navbar.style.transform = 'translateY(0)'
      } else if (window.pageYOffset > 100 && (this.prevScrollPos < currScrollPos)) {
        navbar.style.transform = 'translateY(-110px)'
      } else if (window.pageYOffset === 0) {
        navbar.style.position = 'relative'
      }
      this.prevScrollPos = currScrollPos
    }
  },
  created () {
    window.onscroll = this.navbarAction
  }
}
</script>
<style lang="scss">
  @import "style";
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>
