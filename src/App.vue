<template>
  <div id="app">
    <nav id="main-nav">
      <div class="container">
        <img @click="$router.push('/home')" src="./assets/logo.png" alt="Logo" class="logo">
        <ul>
          <li>Kontakt</li>
          <li>Blog</li>
          <li @click="$router.push('/rankings')">Rankingi</li>
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
    //
  })
}
</script>
<style lang="scss">
  @import "style";
</style>
