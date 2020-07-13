<template>
<div id="rankings">
  <section id="rankings-menu">
    <div class="rankings-menu-el">
      <v-icon class="rankings-icon" color="#fff" large>mdi-cellphone</v-icon>
      <p class="category rankings">Smartfony</p>
    </div>
    <div class="rankings-menu-el">
      <v-icon class="rankings-icon" color="#fff" large>mdi-laptop</v-icon>
      <p class="category rankings">Laptopy</p>
    </div>
    <div class="rankings-menu-el">
      <v-icon class="rankings-icon" color="#fff" large>mdi-expansion-card</v-icon>
      <p class="category rankings">Karty graficzne</p>
    </div>
    <div class="rankings-menu-el">
      <v-icon class="rankings-icon" color="#fff" large>mdi-keyboard-outline</v-icon>
      <p class="category rankings">Klawiatury</p>
    </div>
    <div class="rankings-menu-el">
      <v-icon class="rankings-icon" color="#fff" large>mdi-headphones</v-icon>
      <p class="category rankings">Słuchawki</p>
    </div>
    <div class="rankings-menu-el">
      <v-icon class="rankings-icon" color="#fff" large>mdi-mouse</v-icon>
      <p class="category rankings">Myszki</p>
    </div>
  </section>
  <section id="category-photo">
    <div id="container">
      <div id="photo-container">
        <div id="photo-content">
          <h1>Telefony</h1>
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
          :max="10000"
          :interval="50"
          :tooltip-formatter="val => val+' zł'"
          tooltip="always"
          width="500px"
          dotSize="22"
          height="14px"
        />
      </div>
      <div v-if="products !== null">
        <div v-if="$route.params.category === 'drones'">
          <div v-for="product in sliderCollection" :key="product.index" class="product-el">
            <v-img class="product-image" :src="getImgUrl(product.imagePath)"/>
            <div class="second-col">
              <h3>{{ product.brand + ' ' + product.model }}</h3>
              <p class="product-specs">Kamera: {{ product.camera }} | Maksymalny czas działania: {{
                product.batteryWorkTime
                }} | Kontroler: {{ product.controller }}</p>
              <div class="price">
                {{ product.price }}
              </div>
            </div>
          </div>
        </div>
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
            <v-img class="product-image" :src="getImgUrl(product.imagePath)"/>
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
          <div v-for="product in sliderCollection" :key="product.index" class="product-el">
            <v-img class="product-image" :src="getImgUrl(product.imagePath)"/>
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
        <div v-if="$route.params.category === 'monitors'">
          <div v-for="product in sliderCollection" :key="product.index" class="product-el">
            <v-img class="product-image" :src="getImgUrl(product.imagePath)"/>
            <div class="second-col">
              <h3>{{ product.brand + ' ' + product.model }}</h3>
              <p class="product-specs">Rozdzielczość: {{ product.resolution }} | Przekątna ekranu: {{
                product.displaySize
                }} | Matryca: {{ product.matrixType }}</p>
              <div class="price">
                {{ product.price }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="$route.params.category === 'mouses'">
          <div v-for="product in sliderCollection" :key="product.index" class="product-el">
            <v-img class="product-image" :src="getImgUrl(product.imagePath)"/>
            <div class="second-col">
              <h3>{{ product.brand + ' ' + product.model }}</h3>
              <p class="product-specs">DPI: {{ product.dpi }} | Liczba przycisków: {{ product.numberOfButtons
                }} | Łączność: {{ product.connection }}</p>
              <div class="price">
                {{ product.price }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="$route.params.category === 'smartphones'">
          <div v-for="product in sliderCollection" :key="product.index" class="product-el">
            <v-img class="product-image" :src="getImgUrl(product.imagePath)"/>
            <div class="second-col">
              <h3>{{ product.brand + ' ' + product.model }}</h3>
              <p class="product-specs">Ekran: {{ product.screen }} | Bateria: {{ product.battery
                }} | Pamięć: {{ product.memory }}</p>
              <div class="price">
                {{ product.price }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="$route.params.category === 'wirelessheadphones'">
          <div v-for="product in sliderCollection" :key="product.index" class="product-el">
            <v-img class="product-image" :src="getImgUrl(product.imagePath)"/>
            <div class="second-col">
              <h3>{{ product.brand + ' ' + product.model }}</h3>
              <p class="product-specs">Typ: {{ product.type }} | Maksymalny czas pracy: {{
                product.batteryWorkTime
                }} | Zasięg: {{ product.reach }}</p>
              <div class="price">
                {{ product.price }}
              </div>
            </div>
          </div>
        </div>
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
import VueSlider from 'vue-slider-component'
import ProductsService from '@/services/productsService'
export default {
  name: 'Rankings',
  components: {
    VueSlider
  },
  data () {
    return {
      sliderValue: [400, 3000],
      sliderCollection: null,
      products: null,
      productsService: new ProductsService()
    }
  },
  methods: {
    getImgUrl (imagePath) {
      return require('../assets/productImages' + imagePath)
    },
    async getProducts (category) {
      this.sliderCollection = this.products = await this.productsService.getAllProducts(category)
    }
  },
  watch: {
    'sliderValue' (value) {
      this.sliderCollection = this.products.filter(({ price }) => value[0] <= parseFloat(price.replace(' ', '')) && parseFloat(price.replace(' ', '')) <= value[1])
      console.log(parseFloat('2248,00 zł'))
      // console.log(value[1])
      // console.log(this.sliderCollection)
    }
  },
  mounted () {
    this.getProducts(this.$route.params.category)
  }
}
</script>

<style lang="scss">
  #rankings {
    flex: 1;
  }
  #category-photo {
    /*color: #333;*/
    background: #333;
    padding: 2rem;
    position: relative;
    width: 70%;
    margin: 0 auto;
    &:before {
      content: '';
      position: absolute;
      background: url('../assets/smartphone.jpg')no-repeat center center/cover;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.4;
    }
  }
</style>
