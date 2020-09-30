<template>
  <div id="admin-panel">
    <section class="rankings-menu admin-panel">
      <v-menu
        class="drop-down-cat"
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <div class="rankings-menu-el admin-panel"
               :class="{ active: $route.path === '/adminpanel/laptops/gamingLaptops' || $route.path === '/adminpanel/laptops/regularLaptops'}"
               v-bind="attrs"
               v-on="on"
          >
            <p class="category rankings">Laptopy</p>
          </div>
        </template>
        <v-list>
          <v-list-item
            color="#fff"
            @click="switchCategory('laptops/gamingLaptops')"
          >
            <v-list-item-title>gamingowe</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="switchCategory('laptops/regularLaptops')"
          >
            <v-list-item-title>biurowe</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <div :class="{ active: $route.path === '/adminpanel/smartphones'}" class="rankings-menu-el admin-panel" @click="switchCategory('smartphones')">
        <p class="category rankings">Smartfony</p>
      </div>
      <div :class="{ active: $route.path === '/adminpanel/graphicsCards'}" class="rankings-menu-el admin-panel" @click="switchCategory('graphicsCards')">
        <p class="category rankings">Karty graficzne</p>
      </div>
      <v-menu
        class="drop-down-cat"
        transition="slide-y-transition"
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            x-large
            color="rgb(223, 57, 104)"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>
              mdi-plus-circle
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Laptop</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Smartfon</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Karta graficzna</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <!--    <div class="rankings-menu-el" @click="switchCategory('keyboards')">-->
      <!--      <v-icon class="rankings-icon" color="#df3968" size="27px">mdi-keyboard-outline</v-icon>-->
      <!--      <p class="category rankings">Klawiatury</p>-->
      <!--    </div>-->
      <!--    <v-menu-->
      <!--      class="drop-down-cat"-->
      <!--      transition="slide-y-transition"-->
      <!--      bottom-->
      <!--    >-->
      <!--      <template v-slot:activator="{ on, attrs }">-->
      <!--        <div class="rankings-menu-el"-->
      <!--           v-bind="attrs"-->
      <!--           v-on="on"-->
      <!--        >-->
      <!--          <v-icon class="rankings-icon" color="#df3968" size="27px">mdi-keyboard-outline</v-icon>-->
      <!--          <p class="category rankings">Klawiatury</p>-->
      <!--        </div>-->
      <!--      </template>-->
      <!--      <v-list>-->
      <!--        <v-list-item-->
      <!--          color="#fff"-->
      <!--          @click="switchCategory('keyboards/true')"-->
      <!--        >-->
      <!--          <v-list-item-title>gamingowe</v-list-item-title>-->
      <!--        </v-list-item>-->
      <!--        <v-list-item-->
      <!--          @click="switchCategory('keyboards/false')"-->
      <!--        >-->
      <!--          <v-list-item-title>biurowe</v-list-item-title>-->
      <!--        </v-list-item>-->
      <!--      </v-list>-->
      <!--    </v-menu>-->
      <!--    <div class="rankings-menu-el" @click="switchCategory('wirelessheadphones')">-->
      <!--      <v-icon class="rankings-icon" color="#df3968" size="27px">mdi-headphones</v-icon>-->
      <!--      <p class="category rankings">Słuchawki</p>-->
      <!--    </div>-->
      <!--    <div class="rankings-menu-el" @click="switchCategory('mouses')">-->
      <!--      <v-icon class="rankings-icon" color="#df3968" size="27px">mdi-mouse</v-icon>-->
      <!--      <p class="category rankings">Myszki</p>-->
      <!--    </div>-->
      <!--    <v-menu-->
      <!--      class="drop-down-cat"-->
      <!--      transition="slide-y-transition"-->
      <!--      bottom-->
      <!--    >-->
      <!--      <template v-slot:activator="{ on, attrs }">-->
      <!--        <div class="rankings-menu-el"-->
      <!--          v-bind="attrs"-->
      <!--          v-on="on"-->
      <!--        >-->
      <!--          <v-icon class="rankings-icon" color="#df3968" size="27px">mdi-mouse</v-icon>-->
      <!--          <p class="category rankings">Myszki</p>-->
      <!--        </div>-->
      <!--      </template>-->
      <!--      <v-list>-->
      <!--        <v-list-item-->
      <!--          color="#fff"-->
      <!--          @click="switchCategory('mouses/true')"-->
      <!--        >-->
      <!--          <v-list-item-title>gamingowe</v-list-item-title>-->
      <!--        </v-list-item>-->
      <!--        <v-list-item-->
      <!--          @click="switchCategory('mouses/false')"-->
      <!--        >-->
      <!--          <v-list-item-title>biurowe</v-list-item-title>-->
      <!--        </v-list-item>-->
      <!--      </v-list>-->
      <!--    </v-menu>-->
      <!--    <div class="rankings-menu-el" @click="switchCategory('monitors')">-->
      <!--      <v-icon class="rankings-icon" color="#df3968" size="27px">mdi-monitor</v-icon>-->
      <!--      <p class="category rankings">Monitory</p>-->
      <!--    </div>-->
    </section>
    <section>
<!--        :items="categories"-->
<!--        v-model="selectedCategory"-->
      <v-autocomplete
        id="autocomplete-input"
        background-color="rgba(255,255,255, 0.8)"
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
      <div class="container">
        <!--      <div id="filters">-->
        <!--        <div class="container filters">-->
        <!--          <div id="filters-container">-->
        <!--            <v-switch v-model="gaming" :label="'biurowe'"></v-switch>-->
        <!--            <v-switch v-model="gaming" :label="'gamingowe'"></v-switch>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->
        <div id="products" v-if="products !== null">
          <!--        <div v-if="$route.params.category === 'drones'">-->
          <!--          <div v-for="product in sliderCollection" :key="product.index" class="product-el">-->
          <!--            <v-img class="product-image" :src="getImgUrl(product.imagePath)"/>-->
          <!--            <div class="second-col">-->
          <!--              <h3>{{ product.brand + ' ' + product.model }}</h3>-->
          <!--              <p class="product-specs">Kamera: {{ product.camera }} | Maksymalny czas działania: {{-->
          <!--                product.batteryWorkTime-->
          <!--                }} | Kontroler: {{ product.controller }}</p>-->
          <!--              <div class="price">-->
          <!--                {{ product.price }}-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--        </div>-->
          <div v-if="$route.params.category === 'graphicsCards'">
            <div v-for="product in products" :key="product.index" class="product-el">
              <v-img class="product-image" :src="getImgUrl(product.imagePath)"/>
              <div class="second-col">
                <h3>{{ product.brand + ' ' + product.model }}</h3>
                <p class="product-specs">RAM: {{ product.ram }} | Chipset: {{ product.chipset
                  }} | Taktowanie procesora: {{ product.cpuClockSpeed }}</p>
                <div class="price">
                  {{ product.price }}
                </div>
              </div>
              <div class="third-col">
                <v-btn
                  x-large
                  color="rgb(223, 57, 104)"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-pencil-outline
                  </v-icon>
                </v-btn>
                <v-btn
                  x-large
                  color="rgb(223, 57, 104)"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          <div v-if="$route.params.category === 'keyboards'">
            <div v-for="product in products" :key="product.index" class="product-el">
              <v-img contain class="product-image" :src="getImgUrl(product.imagePath)"/>
              <div class="second-col">
                <h3>{{ product.brand + ' ' + product.model }}</h3>
                <p class="product-specs">Typ: {{ product.keyboardType }} | Łączność: {{ product.connection
                  }} | Interfejs: {{ product.interface }}</p>
                <div class="price">
                  {{ product.price }}
                </div>
              </div>
            </div>
          </div>
          <div v-if="$route.params.category === 'laptops'">
            <div v-for="product in products" :key="product._id" class="product-el">
              <v-img contain class="product-image" :src="getImgUrl(product.imagePath)"/>
              <div class="second-col">
                <h3>{{ product.brand + ' ' + product.model }}</h3>
                <p class="product-specs">RAM: {{ product.ram }} | CPU: {{ product.cpu
                  }} | Dysk: {{ product.drive }}</p>
                <div class="price">
                  {{ product.price }}
                </div>
              </div>
              <div class="third-col">
                <v-btn
                  x-large
                  color="rgb(223, 57, 104)"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-pencil-outline
                  </v-icon>
                </v-btn>
                <v-btn
                  x-large
                  color="rgb(223, 57, 104)"
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          <div v-if="$route.params.category === 'smartphones'">
            <transition-group name="fade">
              <div v-for="product in products" :key="product._id" class="product-el">
                <v-img contain class="product-image" :src="getImgUrl(product.imagePath)"/>
                <div class="second-col">
                  <h3>{{ product.brand + ' ' + product.model }}</h3>
                  <p class="product-specs">Ekran: {{ product.screen }} | Bateria: {{ product.battery
                    }} | Pamięć: {{ product.memory }}</p>
                  <div class="price">
                    {{ product.price }}
                  </div>
                </div>
                <div class="third-col">
                  <v-btn
                    x-large
                    color="rgb(223, 57, 104)"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      mdi-pencil-outline
                    </v-icon>
                  </v-btn>
                  <v-btn
                    x-large
                    color="rgb(223, 57, 104)"
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </transition-group>
          </div>
          <!--        <div v-if="$route.params.category === 'monitors'">-->
          <!--          <div v-for="product in sliderCollection" :key="product.index" class="product-el">-->
          <!--            <v-img class="product-image" :src="getImgUrl(product.imagePath)"/>-->
          <!--            <div class="second-col">-->
          <!--              <h3>{{ product.brand + ' ' + product.model }}</h3>-->
          <!--              <p class="product-specs">Rozdzielczość: {{ product.resolution }} | Przekątna ekranu: {{-->
          <!--                product.displaySize-->
          <!--                }} | Matryca: {{ product.matrixType }}</p>-->
          <!--              <div class="price">-->
          <!--                {{ product.price }}-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--        </div>-->
          <!--        <div v-if="$route.params.category === 'mouses'">-->
          <!--          <div v-for="product in sliderCollection" :key="product.index" class="product-el">-->
          <!--            <v-img class="product-image" :src="getImgUrl(product.imagePath)"/>-->
          <!--            <div class="second-col">-->
          <!--              <h3>{{ product.brand + ' ' + product.model }}</h3>-->
          <!--              <p class="product-specs">DPI: {{ product.dpi }} | Liczba przycisków: {{ product.numberOfButtons-->
          <!--                }} | Łączność: {{ product.connection }}</p>-->
          <!--              <div class="price">-->
          <!--                {{ product.price }}-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--        </div>-->
          <!--        <div v-if="$route.params.category === 'wirelessheadphones'">-->
          <!--          <div v-for="product in sliderCollection" :key="product.index" class="product-el">-->
          <!--            <v-img class="product-image" :src="getImgUrl(product.imagePath)"/>-->
          <!--            <div class="second-col">-->
          <!--              <h3>{{ product.brand + ' ' + product.model }}</h3>-->
          <!--              <p class="product-specs">Typ: {{ product.type }} | Maksymalny czas pracy: {{-->
          <!--                product.batteryWorkTime-->
          <!--                }} | Zasięg: {{ product.reach }}</p>-->
          <!--              <div class="price">-->
          <!--                {{ product.price }}-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>
        <div v-else>
          <v-progress-linear
            color="#202020"
            indeterminate
          ></v-progress-linear>
          <br>
          <v-progress-linear
            color="#df3968"
            indeterminate
          ></v-progress-linear>
          <br>
          <v-progress-linear
            color="#202020"
            indeterminate
          ></v-progress-linear>
          <br>
          <v-progress-linear
            color="#df3968"
            indeterminate
          ></v-progress-linear>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductsService from '@/services/productsService'
export default {
  name: 'AdminPanel',
  data () {
    return {
      firstname: 'dupa',
      productsService: new ProductsService(),
      products: null
    }
  },
  methods: {
    async scrape () {
      const products = await this.productsService.getScrapedProduct()
      this.firstname = products.details.brand
      // console.log(products.details.brand)
    },
    getImgUrl (imagePath) {
      return require('../assets/productImages' + imagePath)
    },
    async getProducts (category, subcategory) {
      this.products = null
      if (subcategory !== undefined) {
        this.products = await this.productsService.getSubProducts(category, subcategory)
      } else {
        this.products = await this.productsService.getAllProducts(category)
      }
    },
    async switchCategory (category) {
      this.$router.push(`/adminpanel/${category}`)
    }
  },
  watch: {
    '$route.path' () {
      this.getProducts(this.$route.params.category, this.$route.params.subcategory)
    }
  },
  mounted () {
    this.getProducts(this.$route.params.category, this.$route.params.subcategory)
  }
}
</script>

<style lang="scss">
.middle-el {
  display: flex;
  justify-content: center;
}
#admin-panel {
  flex: 1;
}
</style>
