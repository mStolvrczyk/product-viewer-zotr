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
          :max="3500"
          :interval="50"
          :tooltip-formatter="val => val+' zł'"
          tooltip="always"
          width="500px"
          dotSize="22"
          height="14px"
        />
      </div>
      <div v-for="product in sliderCollection" :key="product.index" class="product-el">
        <img class="product-image" src="../assets/iphone.png">
        <div class="second-col">
          <h3>{{ product.name }}</h3>
          <p class="product-specs">LCD: 6'|Bateria: 3000mAh|RAM: 3GB|Pamięć: 128GB </p>
          <div class="price">
            {{ product.price }} zł
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</template>

<script>
import VueSlider from 'vue-slider-component'
export default {
  name: 'Rankings',
  components: {
    VueSlider
  },
  data () {
    return {
      sliderValue: [400, 3000],
      sliderCollection: null,
      smartphones: [
        {
          name: 'iPhone',
          price: 1000
        },
        {
          name: 'iPhone',
          price: 3200
        },
        {
          name: 'iPhone',
          price: 5000
        },
        {
          name: 'iPhone',
          price: 400
        },
        {
          name: 'iPhone',
          price: 34500
        },
        {
          name: 'iPhone',
          price: 4500
        },
        {
          name: 'iPhone',
          price: 3400
        },
        {
          name: 'iPhone',
          price: 2300
        },
        {
          name: 'iPhone',
          price: 400
        },
        {
          name: 'iPhone',
          price: 600
        },
        {
          name: 'iPhone',
          price: 9900
        },
        {
          name: 'iPhone',
          price: 100
        }
      ]
    }
  },
  watch: {
    'sliderValue' (value) {
      this.sliderCollection = this.smartphones.filter(({ price }) => value[0] <= price && price <= value[1])
      console.log(value[0])
      console.log(value[1])
    },
    'sliderCollection' (value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss">
  #rankings {
    flex: 1 0 auto;
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
