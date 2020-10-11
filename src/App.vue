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
    <div class="floating-button">
      <v-fab-transition>
        <v-btn
          @click="scrape('485405-karta-graficzna-nvidia-gigabyte-geforce-rtx-2060-oc-6gb-gddr6.html?gclid=Cj0KCQjw5eX7BRDQARIsAMhYLP8mCdMBsNbDT7vbos8VE5QfY8bRGJlhkfOAvcTm6A_Qq7OJSS1kD18aAsCGEALw_wcB')"
          v-show="returnButtonVisibility"
          :color="returnButtonColor"
          absolute
          top
          right
          fab
        >
          <v-icon style="color: white; font-size: 30px">mdi-arrow-up</v-icon>
        </v-btn>
      </v-fab-transition>
    </div>
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
      returnButtonVisibility: false,
      scrolled: false,
      prevScrollPos: window.pageYOffset
    }
  },
  methods: {
    returnButtonAction () {
      document.documentElement.scrollTop = 0
    },
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
      if (window.pageYOffset > 100) {
        this.returnButtonVisibility = true
      } else {
        this.returnButtonVisibility = false
      }
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
  computed: {
    returnButtonColor () {
      if (this.$route.path === '/home' || this.$route.path === `/rankings/${this.$route.params.category}`) {
        return '#df3968'
      } else {
        return '#000'
      }
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
