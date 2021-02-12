<template>
  <div id="home">
    <header id="showcase">
      <div class="container">
        <div class="showcase-container">
          <div class="showcase-content">
            <h1>Znajdź najlepsze<br> urządzenie</h1>
            <v-autocomplete
              id="autocomplete-input"
              background-color="rgba(255,255,255, 0.8)"
              :items="categories"
              v-model="selectedCategory"
              search="searchValue"
              hide-no-data
              item-value="id"
              item-text="name"
              label="Wybierz kategorię urządzeń"
              solo
              hide-details
              search-input.sync="search"
              cache-items
              return-object
            >
              <template v-slot:no-data>
                <v-list-item>
                  <v-list-item-title>
                    Brak wybranej kateogrii
                  </v-list-item-title>
                </v-list-item>
              </template>
            </v-autocomplete>
          </div>
        </div>
      </div>
    </header>
    <section id="most-popular-categories" class="py-1">
      <div class="container">
        <p class="section-header">Popularne kategorie</p>
        <div class="categories-container">
          <article class="card" @click="sendCategory('smartphones')">
            <v-icon color="#D32F2F" class="py-2" x-large>mdi-cellphone</v-icon>
            <p class="category">Smartfony</p>
          </article>
          <article class="card" @click="sendCategory('laptops')">
            <v-icon color="#D32F2F" class="py-2" x-large>mdi-laptop</v-icon>
            <p class="category">Laptopy biurowe</p>
          </article>
          <article class="card" @click="sendCategory('graphicsCards')">
            <v-icon color="#D32F2F" class="py-2" x-large>mdi-expansion-card</v-icon>
            <p class="category">Karty graficzne</p>
          </article>
<!--          <article class="card" @click="sendCategory('mouses')">-->
<!--            <v-icon color="#D32F2F" class="py-2" x-large>mdi-mouse</v-icon>-->
<!--            <p class="category">Myszki</p>-->
<!--          </article>-->
        </div>
      </div>
    </section>
    <section id="last-blog-post">
      <div class="container">
        <div class="blog-container">
          <p class="section-header">Aktualności</p>
          <div class="post-content">
            <img class="post-image" src="../assets/blog-image.jpeg">
            <div class="post-text">
              <h4>Nowy iPhone - bez złącza ładowania?</h4>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      search: null,
      categories: [
        {
          name: 'Smartfony',
          route: '/smartphones'
        },
        {
          name: 'Laptopy gamingowe',
          route: '/laptops/gamingLaptops'
        },
        {
          name: 'Laptopy biurowe',
          route: '/laptops/regularLaptops'
        },
        {
          name: 'Karty graficzne',
          route: '/graphicsCards'
        }
        // {
        //   name: 'Klawiatury gamingowe',
        //   route: '/keyboards'
        // },
        // {
        //   name: 'Słuchawki bezprzewodowe',
        //   route: '/wirelessHeadphones'
        // },
        // {
        //   name: 'Myszki biurowe',
        //   route: '/mouses'
        // },
        // {
        //   name: 'Myszki gamingowe',
        //   route: '/mouses'
        // },
        // {
        //   name: 'Monitory',
        //   route: '/monitors'
        // }
      ],
      selectedCategory: null
    }
  },
  methods: {
    sendCategory (category) {
      this.$router.push(`/rankings/${category}`)
    }
  },
  watch: {
    'selectedCategory' (value) {
      this.$router.push(`/rankings${value.route}`)
    }
  }
}
</script>

<style lang="scss">
  #home {
    flex: 1;
  }
  #showcase .theme--light.v-icon {
    color: #D32F2F !important;
  }
  #showcase {
    color: #333;
    background: #fff;
    padding: 2rem;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      background: url('../assets/header-image.jpg')no-repeat center center/cover;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
    }
    .showcase-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 35vh;
    }
  }
</style>
