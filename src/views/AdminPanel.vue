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
            v-bind="attrs"
            v-on="on"
            color="#df3968"
            x-small
            fab
          >
            <v-icon style="color: #fff">
              mdi-plus-thick
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="openProductDialog('laptops')">
            <v-list-item-title>Laptop</v-list-item-title>
          </v-list-item>
          <v-list-item @click="openProductDialog('smartphones')">
            <v-list-item-title>Smartfon</v-list-item-title>
          </v-list-item>
          <v-list-item @click="openProductDialog('graphicsCards')">
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
      <div class="container">
        <v-autocomplete
          v-model="selectedProduct"
          :items="allProducts"
          id="autocomplete-input"
          style="padding: 2rem 0"
          background-color="rgba(255,255,255, 0.8)"
          search="searchValue"
          hide-no-data
          item-value="id"
          item-text="model"
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
        <!--      <div id="filters">-->
        <!--        <div class="container filters">-->
        <!--          <div id="filters-container">-->
        <!--            <v-switch v-model="gaming" :label="'biurowe'"></v-switch>-->
        <!--            <v-switch v-model="gaming" :label="'gamingowe'"></v-switch>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->
        <div id="products" v-if="currentProductsNumber !== 0">
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
            <transition-group name="fade">
              <div v-for="product in products" :key="product._id" class="product-el">
                <v-img class="product-image" :src="product.images.imageOne"/>
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
                  >
                    <v-icon>
                      mdi-pencil-outline
                    </v-icon>
                  </v-btn>
                  <v-btn
                    x-large
                    color="rgb(223, 57, 104)"
                    icon
                  >
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </transition-group>
          </div>
<!--          <div v-if="$route.params.category === 'keyboards'">-->
<!--            <div v-for="product in products" :key="product.index" class="product-el">-->
<!--              <v-img contain class="product-image" :src="getImgUrl(product.imagePath)"/>-->
<!--              <div class="second-col">-->
<!--                <h3>{{ product.brand + ' ' + product.model }}</h3>-->
<!--                <p class="product-specs">Typ: {{ product.keyboardType }} | Łączność: {{ product.connection-->
<!--                  }} | Interfejs: {{ product.interface }}</p>-->
<!--                <div class="price">-->
<!--                  {{ product.price }}-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
          <div v-if="$route.params.category === 'laptops'">
            <transition-group name="fade">
              <div v-for="product in products" :key="product._id" class="product-el">
                <v-img contain class="product-image" :src="product.images.imageOne"/>
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
                  >
                    <v-icon>
                      mdi-pencil-outline
                    </v-icon>
                  </v-btn>
                  <v-btn
                    x-large
                    color="rgb(223, 57, 104)"
                    icon
                  >
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </div>
              </div>
            </transition-group>
          </div>
          <div v-if="$route.params.category === 'smartphones'">
            <transition-group name="fade">
              <div v-for="product in products" :key="product._id" class="product-el">
                <v-img contain class="product-image" :src="product.images.imageOne"/>
                <div class="second-col">
                  <h3>{{ product.model }}</h3>
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
                  >
                    <v-icon>
                      mdi-pencil-outline
                    </v-icon>
                  </v-btn>
                  <v-btn
                    x-large
                    color="rgb(223, 57, 104)"
                    icon
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
        <div v-if="currentProductsNumber === 0">
          BRAK PRODUKTÓW DO WYŚWIETLENIA
        </div>
        <div v-if="currentProductsNumber === null">
          <transition-group name="fade">
            <v-progress-linear
              :key="1"
              color="#202020"
              indeterminate
            ></v-progress-linear>
            <br
              :key="2"
            >
            <v-progress-linear
              :key="3"
              color="#df3968"
              indeterminate
            ></v-progress-linear>
            <br
              :key="4"
            >
            <v-progress-linear
              :key="5"
              color="#202020"
              indeterminate
            ></v-progress-linear>
            <br
              :key="6"
            >
            <v-progress-linear
              :key="7"
              color="#df3968"
              indeterminate
            ></v-progress-linear>
          </transition-group>
        </div>
        <transition name="fade">
          <v-btn
            style="margin-top: 0.7rem"
            v-if="arrowVisibility === true"
            @click="clearFilters"
            color="rgb(223, 57, 104)"
            top
            small
            right
            fab
          >
            <v-icon style="color: #fff; font-size: 24px">
              mdi-arrow-left-bold
            </v-icon>
          </v-btn>
        </transition>
      </div>
    </section>
    <NewLaptopDialog
      :currentProductsNumber="currentProductsNumber"
      :productsCategory="productsCategory"
      v-on:closeProductDialog="closeProductDialog"
    />
    <NewSmartphoneDialog
      :currentProductsNumber="currentProductsNumber"
      :productsCategory="productsCategory"
      v-on:closeProductDialog="closeProductDialog"
    />
    <NewGraphicsCardDialog
      :currentProductsNumber="currentProductsNumber"
      :productsCategory="productsCategory"
      v-on:closeProductDialog="closeProductDialog"
    />
  </div>
</template>

<script>
import ProductsService from '@/services/productsService'
import NewLaptopDialog from '@/components/CRUD/Laptop/NewLaptopDialog'
import NewGraphicsCardDialog from '@/components/CRUD/GraphicsCard/NewGraphicsCardDialog'
import NewSmartphoneDialog from '@/components/CRUD/Smartphone/NewSmartphoneDialog'
export default {
  name: 'AdminPanel',
  components: { NewLaptopDialog, NewGraphicsCardDialog, NewSmartphoneDialog },
  data () {
    return {
      currentProductsNumber: null,
      productsService: new ProductsService(),
      allProducts: [],
      products: [],
      selectedProduct: null,
      arrowVisibility: false,
      productsCategory: null
    }
  },
  methods: {
    async openProductDialog (category) {
      this.productsCategory = category
      this.currentProductsNumber = await this.productsService.getCountOfProducts(category)
      console.log(this.currentProductsNumber)
    },
    closeProductDialog (value) {
      this.productsCategory = value
    },
    returnButtonAppearance () {
      if (window.pageYOffset > 100) {
        this.returnButtonVisibility = true
      } else {
        this.returnButtonVisibility = false
      }
    },
    getImgUrl (imagePath) {
      return require('../assets/productImages' + imagePath)
    },
    async getProducts (category, subcategory) {
      this.currentProductsNumber = null
      if (subcategory !== undefined) {
        this.products = []
        this.allProducts = this.products = await this.productsService.getSubProducts(category, subcategory)
        this.currentProductsNumber = await this.productsService.getCountByCategory(category, subcategory)
      } else {
        this.products = []
        this.allProducts = this.products = await this.productsService.getAllProducts(category)
        this.currentProductsNumber = await this.productsService.getCountOfProducts(category)
      }
    },
    async switchCategory (category) {
      if (`/adminpanel/${category}` !== this.$route.path) {
        this.$router.push(`/adminpanel/${category}`)
      }
    },
    clearFilters () {
      this.products = this.allProducts
      this.arrowVisibility = false
    }
  },
  watch: {
    '$route.path' () {
      this.getProducts(this.$route.params.category, this.$route.params.subcategory)
    },
    'selectedProduct' (value) {
      this.products = null
      setTimeout(function () {
        this.products = this.allProducts.filter(({ model }) => model.includes(value.model))
        this.arrowVisibility = true
      }
        .bind(this),
      600)
    },
    'products.length' () {
      if (document.getElementById('admin-panel').offsetHeight - window.outerHeight < 100) {
        this.$emit('outerHeightAlert', true)
      }
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
