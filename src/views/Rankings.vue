<template>
<div id="rankings">
  <section class="rankings-menu rankings">
    <v-menu
      class="drop-down-cat"
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <div class="rankings-menu-el rankings"
             :class="{ active: $route.path === '/rankings/laptops/gamingLaptops' || $route.path === '/rankings/laptops/regularLaptops'}"
             v-bind="attrs"
             v-on="on"
        >
          <v-icon class="rankings-icon" color="#fff" size="27px">mdi-keyboard-outline</v-icon>
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
    <div :class="{ active: $route.path === '/rankings/smartphones'}" class="rankings-menu-el rankings" @click="switchCategory('smartphones')">
      <v-icon class="rankings-icon" color="#fff" size="27px">mdi-cellphone</v-icon>
      <p class="category rankings">Smartfony</p>
    </div>
    <div :class="{ active: $route.path === '/rankings/graphicsCards'}" class="rankings-menu-el rankings" @click="switchCategory('graphicsCards')">
      <v-icon class="rankings-icon" color="#fff" size="27px">mdi-expansion-card</v-icon>
      <p class="category rankings">Karty graficzne</p>
    </div>
<!--    <div class="rankings-menu-el" @click="switchCategory('keyboards')">-->
<!--      <v-icon class="rankings-icon" color="#D32F2F" size="27px">mdi-keyboard-outline</v-icon>-->
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
<!--          <v-icon class="rankings-icon" color="#D32F2F" size="27px">mdi-keyboard-outline</v-icon>-->
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
<!--      <v-icon class="rankings-icon" color="#D32F2F" size="27px">mdi-headphones</v-icon>-->
<!--      <p class="category rankings">Słuchawki</p>-->
<!--    </div>-->
<!--    <div class="rankings-menu-el" @click="switchCategory('mouses')">-->
<!--      <v-icon class="rankings-icon" color="#D32F2F" size="27px">mdi-mouse</v-icon>-->
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
<!--          <v-icon class="rankings-icon" color="#D32F2F" size="27px">mdi-mouse</v-icon>-->
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
<!--      <v-icon class="rankings-icon" color="#D32F2F" size="27px">mdi-monitor</v-icon>-->
<!--      <p class="category rankings">Monitory</p>-->
<!--    </div>-->
  </section>
  <section v-if="$route.path==='/rankings/smartphones'" class="category-photo smartphone">
    <div class="container">
      <div class="photo-container">
        <div class="photo-content">
          <h1>Telefony</h1>
        </div>
      </div>
    </div>
  </section>
  <section v-else-if="$route.path==='/rankings/graphicsCards'" class="category-photo graphics-card">
    <div class="container">
      <div class="photo-container">
        <div class="photo-content">
          <h1>Karty graficzne</h1>
        </div>
      </div>
    </div>
  </section>
  <section v-else-if="$route.path==='/rankings/laptops/gamingLaptops'" class="category-photo gaming-laptop">
    <div class="container">
      <div class="photo-container">
        <div class="photo-content">
          <h1>Laptopy gamingowe</h1>
        </div>
      </div>
    </div>
  </section>
  <section v-else-if="$route.path==='/rankings/laptops/regularLaptops'" class="category-photo regular-laptop">
    <div class="container">
      <div class="photo-container">
        <div class="photo-content">
          <h1>Laptopy biurowe</h1>
        </div>
      </div>
    </div>
  </section>
  <section id="slider-section">
    <div class="container">
      <p class="section-header">Ustaw przedział cenowy w jakim szukasz urządzenia</p>
      <div id="slider">
        <vue-slider
          v-model="sliderValue"
          :min="200"
          :max="9000"
          :interval="50"
          :tooltip-formatter="val => val+' zł'"
          tooltip="always"
          width="500px"
          dotSize="22"
          height="14px"
        />
      </div>
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
          <div v-for="product in sliderCollection" :key="product.index" class="product-el">
            <v-img class="product-image" :src="getImgUrl(product.imagePath)"/>
            <div class="second-col">
              <h3>{{ product.brand + ' ' + product.model }}</h3>
              <p class="product-specs">RAM: {{ product.ram }} | Chipset: {{ product.chipset
                }} | Taktowanie procesora: {{ product.cpuClockSpeed }}</p>
              <div class="price">
                {{ product.price }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="$route.params.category === 'keyboards'">
          <div v-for="product in sliderCollection" :key="product.index" class="product-el">
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
          <div v-for="product in sliderCollection" :key="product._id" class="product-el">
            <v-img contain class="product-image" :src="getImgUrl(product.imagePath)"/>
            <div class="second-col">
              <h3>{{ product.brand + ' ' + product.model }}</h3>
              <p class="product-specs">RAM: {{ product.ram }} | CPU: {{ product.cpu
                }} | Dysk: {{ product.drive }}</p>
              <div class="price">
                {{ product.price }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="$route.params.category === 'smartphones'">
          <transition-group name="fade">
            <div v-for="product in sliderCollection" :key="product._id" class="product-el">
              <v-img contain class="product-image" :src="getImgUrl(product.imagePath)"/>
              <div class="second-col">
                <h3>{{ product.model }}</h3>
                <p class="product-specs">Ekran: {{ product.screen }} | Bateria: {{ product.battery
                  }} | Pamięć: {{ product.memory }}</p>
                <div class="price">
                  {{ product.price }}
                </div>
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
          color="#D32F2F"
          indeterminate
        ></v-progress-linear>
        <br>
        <v-progress-linear
          color="#202020"
          indeterminate
        ></v-progress-linear>
        <br>
        <v-progress-linear
          color="#D32F2F"
          indeterminate
        ></v-progress-linear>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import ProductsService from '@/services/productsService'
export default {
  name: 'Rankings',
  components: {
    VueSlider
  },
  data () {
    return {
      sliderValue: [3000, 6000],
      sliderCollection: null,
      products: null,
      productsService: new ProductsService(),
      gaming: false,
      returnButtonVisibility: false
    }
  },
  methods: {
    returnButtonAction () {
      document.documentElement.scrollTop = 0
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
      this.products = null
      if (subcategory !== undefined) {
        this.sliderCollection = this.products = await this.productsService.getSubProducts(category, subcategory)
      } else {
        this.sliderCollection = this.products = await this.productsService.getAllProducts(category)
      }
    },
    async switchCategory (category) {
      if (category !== this.$route.path) {
        this.$router.push(`/rankings/${category}`)
      }
    }
  },
  watch: {
    'sliderValue' (value) {
      this.sliderCollection = this.products.filter(({ price }) => value[0] <= parseFloat(price.replace(' ', '')) && parseFloat(price.replace(' ', '')) <= value[1])
    },
    '$route.path' () {
      this.getProducts(this.$route.params.category, this.$route.params.subcategory)
    },
    'sliderCollection.length' () {
      if (document.getElementById('rankings').offsetHeight - window.outerHeight < 200) {
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
  h1 {
    color: #333;
  }
  .popup-enter,
  .popup-leave-to{
    transform: rotateY(50deg);
  }
  .popup-enter-to,
  .popup-leave {
    transform: rotateY(0deg);
  }
  .popup-enter-active,
  .popup-leave-active {
    transition: transform 400ms;
  }
  #filters-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem;
  }
  .v-menu__content {
    border-radius: 0;
  }
  #rankings {
    flex: 1;
  }
  .category-photo {
    background: #fff;
    padding: 2rem;
    position: relative;
    width: 100%;
    margin: 0 auto;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.3;
    }
    &.smartphone:before {
      background: url('../assets/categoriesImages/pexels-jessica-lewis-583848.jpg')no-repeat 60% 40%/cover;
    }
    &.graphics-card:before {
      background: url('../assets/categoriesImages/graphicsCard.jpg')no-repeat center center/cover;
    }
    &.gaming-laptop:before {
      background: url('../assets/categoriesImages/gamingLaptop.png')no-repeat center center/cover;
    }
    &.regular-laptop:before {
      background: url('../assets/categoriesImages/regularLaptop.png')no-repeat center center/cover;
    }
  }
</style>
