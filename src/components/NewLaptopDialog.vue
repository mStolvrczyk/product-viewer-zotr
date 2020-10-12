<template>
  <v-dialog
    transition="dialog-bottom-transition"
    persistent
    v-model="newProductDialogVisibility"
     :max-width="informationDialogWidth"
  >
    <div id="new-product-dialog">
      <div id="new-product-header">
        <h3>Dodaj laptop</h3>
      </div>
      <div class="container">
        <div class="row-dialog">
          <v-text-field
            v-model="scrapingTarget"
            label="Zeskrapuj dane laptopa z linku"
            required
          ></v-text-field>
<!--            loading="true"-->
          <v-btn
            style="text-transform: none"
            color="blue-grey"
            class="ma-2 white--text"
            @click="scrapeLaptop"
          >
            Zeskrapuj dane
            <v-icon
              right
              dark
            >
              mdi-robot-industrial
            </v-icon>
          </v-btn>
        </div>
        <div class="row-dialog">
          <v-text-field
            v-model="newLaptop.images.imageOne"
            label="Zdjęcie nr 1"
            required
          ></v-text-field>
          <v-text-field
            v-model="newLaptop.images.imageTwo"
            label="Zdjęcie nr 2"
            required
          ></v-text-field>
          <v-text-field
            v-model="newLaptop.images.imageThree"
            label="Zdjęcie nr 3"
            required
          ></v-text-field>
        </div>
        <div class="second-row">
          <div class="col">
            <v-text-field
              v-model="newLaptop.brand"
              label="Marka"
              required
            ></v-text-field>
            <v-text-field
              v-model="newLaptop.model"
              label="Model"
              required
            ></v-text-field>
            <v-text-field
              v-model="newLaptop.ram"
              label="RAM"
              required
            ></v-text-field>
            <v-text-field
              v-model="newLaptop.cpu"
              label="CPU"
              required
            ></v-text-field>
          </div>
          <div class="col">
            <v-text-field
              v-model="newLaptop.gpu"
              label="GPU"
              required
            ></v-text-field>
            <v-text-field
              v-model="newLaptop.drive"
              label="Dysk"
              required
            ></v-text-field>
            <v-text-field
              v-model="newLaptop.matrix"
              label="Matryca"
              required
            ></v-text-field>
            <v-text-field
              v-model="newLaptop.price"
              label="Cena"
              required
            ></v-text-field>
          </div>
        </div>
        <div class="row-dialog choose-type">
          <v-select
            style="width: 20%"
            :items="laptopTypes"
            label="Typ laptopa"
            v-model="choosenType"
          ></v-select>
        </div>
        <div class="row-dialog">
          <v-textarea
            v-model="newLaptop.description"
            name="input-7-4"
            label="Opis produktu"
          ></v-textarea>
        </div>
<!--        <div class="col-1">-->
<!--          <v-text-field-->
<!--            label="Zeskrapuj laptop z linku"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--          <v-text-field-->
<!--            label="Model"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--          <v-text-field-->
<!--            label="Marka"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--          <v-text-field-->
<!--            label="E-mail"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--        </div>-->
<!--        <div class="col-2">-->
<!--          <v-text-field-->
<!--            label="Zeskrapuj laptop z linku"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--          <v-text-field-->
<!--            label="Model"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--          <v-text-field-->
<!--            label="Marka"-->
<!--            required-->
<!--          ></v-text-field>-->
<!--        </div>-->
      </div>
      <v-dialog
        v-model="scrapeLoadingStatement"
        persistent
        width="300"
      >
        <div class="information-dialog">
          <h4>Skrapowanie</h4>
          <v-progress-linear
            color="#fff"
            indeterminate
          ></v-progress-linear>
        </div>
      </v-dialog>
      <v-dialog
        v-model="newObjectStatement"
        persistent
        width="350"
      >
        <div class="information-dialog">
          <h4>Laptop został dodany do bazy danych</h4>
        </div>
      </v-dialog>
      <v-btn @click="test"></v-btn>
    </div>
  </v-dialog>
</template>

<script>
import ProductsService from '@/services/productsService'
import Laptop from '@/models/Laptop'
import { bus } from '@/main'

export default {
  name: 'NewLaptopDialog',
  data () {
    return {
      laptopTypes: [
        'biurowy',
        'gamingowy'
      ],
      choosenType: null,
      scrapeLoadingStatement: false,
      newObjectStatement: false,
      newLaptop: Laptop,
      scrapingTarget: null,
      productsService: new ProductsService()
    }
  },
  props: {
    newProductDialogVisibility: Boolean
  },
  methods: {
    test () {
      // console.log(this.newLaptop)
      this.productsService.createLaptop(this.newLaptop)
    },
    async scrapeLaptop () {
      if (this.scrapingTarget !== null) {
        this.scrapeLoadingStatement = true
        const productAddress = this.scrapingTarget.replace('https://www.x-kom.pl/p/', '')
        const product = await this.productsService.scrapeLaptop(productAddress)
        this.newLaptop.images.imageOne = product.images.imageOne
        this.newLaptop.images.imageTwo = product.images.imageTwo
        this.newLaptop.images.imageThree = product.images.imageThree
        this.newLaptop.brand = product.details.brand
        this.newLaptop.model = product.details.model
        this.newLaptop.ram = product.details.ram
        this.newLaptop.cpu = product.details.cpu
        this.newLaptop.gpu = product.details.gpu
        this.newLaptop.drive = product.details.drive
        this.newLaptop.matrix = product.details.matrix
        this.newLaptop.type = this.laptopType
        this.newLaptop.description = product.details.description
        this.newLaptop.price = product.details.price
        this.scrapeLoadingStatement = false
        console.log(this.newLaptop)
      }
      // this.firstname = products.details.brand
      // console.log(products)
    },
    closeNewProductDialog () {
      this.$emit('closeNewProductDialog', false)
    }
  },
  computed: {
    informationDialogWidth () {
      if (this.$vuetify.breakpoint.xsOnly) {
        return 70 + '%'
      } else {
        return 95 + '%'
      }
    },
    laptopType () {
      if (this.choosenType === 'biurowy') {
        return 'regularLaptops'
      } else {
        return 'gamingLaptops'
      }
    }
  },
  watch: {
    'laptopType' (value) {
      this.newLaptop.type = value
    }
  },
  beforeMount () {
    bus.$on('newProductMessage', (value) => {
      this.newObjectStatement = value
    })
  }
}
</script>

<style lang="scss">
  .choose-type-container {
    width: 20%;
  }
  .information-dialog {
    color: #fff;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    background-color: #000;
    justify-content: center;
    align-items: center;
  }
  .row-dialog {
    padding: 1rem;
    background-color: #F5F5F5;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    justify-content: center;
    &.choose-type {
      align-items: center;
    }
  }
  .dialog-col {
    padding: 3rem;
  }
  .second-row {
    background-color: #F5F5F5;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  h3 {
    color: #fff;
  }
  #new-product-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    background-color: black;
  }
  #new-product-dialog {
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
  }
  .col-1 {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
  }
  .col-2 {
    width: 100%;
  }
</style>
