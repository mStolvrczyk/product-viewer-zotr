<template>
  <v-dialog
    transition="dialog-bottom-transition"
    persistent
    v-model="newLaptopDialogVisibility"
     :max-width="informationDialogWidth"
  >
    <div id="new-product-header">
      <h3>Dodaj laptop</h3>
    </div>
    <div id="new-product-dialog">
      <div class="container">
        <div class="row-dialog">
          <v-text-field
            v-model="scrapingTarget"
            label="Zeskrapuj dane laptopa z linku"
          ></v-text-field>
          <v-btn
            :disabled="scrapingStatement"
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
            :rules="rules.laptopDetails"
            required
          ></v-text-field>
          <v-text-field
            v-model="newLaptop.images.imageTwo"
            label="Zdjęcie nr 2"
            :rules="rules.laptopDetails"
            required
          ></v-text-field>
          <v-text-field
            v-model="newLaptop.images.imageThree"
            label="Zdjęcie nr 3"
            :rules="rules.laptopDetails"
            required
          ></v-text-field>
        </div>
        <div class="second-row">
          <div class="col">
            <v-text-field
              v-model="newLaptop.brand"
              label="Marka"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newLaptop.model"
              label="Model"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newLaptop.ram"
              label="RAM"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newLaptop.cpu"
              label="CPU"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
          </div>
          <div class="col">
            <v-text-field
              v-model="newLaptop.gpu"
              label="GPU"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newLaptop.drive"
              label="Dysk"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newLaptop.matrix"
              label="Matryca"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newLaptop.price"
              label="Cena"
              :rules="rules.laptopDetails"
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
            :rules="rules.laptopDetails"
            required
          ></v-select>
        </div>
        <div class="row-dialog">
          <v-textarea
            v-model="newLaptop.description"
            name="input-7-4"
            label="Opis produktu"
            :rules="rules.laptopDetails"
            required
          ></v-textarea>
        </div>
        <div class="button-row">
          <div class="col-test">
            <div class="dialog-button short">
              <v-btn
                style="text-transform: none"
                color="blue-grey"
                class="ma-2 white--text"
                @click="returnToAdminPanel"
              >
                Wróć
                <v-icon
                  right
                  dark
                >
                  mdi-arrow-left
                </v-icon>
              </v-btn>
            </div>
          </div>
          <div class="col-test">
            <div class="dialog-button">
              <v-btn
                style="text-transform: none; color: white"
                color="#df3968"
                class="my-2"
                @click="saveLaptop"
              >
                Dodaj Produkt do bazy danych
                <v-icon
                  right
                  dark
                >
                  mdi-upload
                </v-icon>
              </v-btn>
            </div>
            <div class="dialog-button">
              <v-btn
                style="text-transform: none"
                color="blue-grey"
                class="ma-2 white--text"
                @click="clearCells"
              >
                Wyczyść pola
                <v-icon
                  right
                  dark
                >
                  mdi-eraser
                </v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </div>
      <InformationDialog
        :informationDialogVisibility.sync="informationDialogVisibility"
        :informationDialogType.sync="informationDialogType"
        v-on:closeInformationDialog="closeInformationDialog"
      />
    </div>
  </v-dialog>
</template>

<script>
import ProductsService from '@/services/productsService'
import Laptop from '@/models/Laptop'
import { bus } from '@/main'
import InformationDialog from '@/components/InformationDialog'

export default {
  name: 'NewLaptopDialog',
  components: { InformationDialog },
  data () {
    return {
      rules: {
        laptopDetails: [val => (val || '').length > 0 || 'To pole jest wymagane']
      },
      informationDialogVisibility: false,
      informationDialogType: null,
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
    currentProductsNumber: Number,
    productsCategory: String
  },
  methods: {
    closeInformationDialog (value) {
      this.informationDialogVisibility = value
      this.informationDialogType = null
    },
    returnToAdminPanel () {
      this.closeNewLaptopDialog()
      this.clearCells()
    },
    saveLaptop () {
      this.productsService.createLaptop(this.newLaptop)
    },
    clearCells () {
      this.newLaptop.images.imageOne = null
      this.newLaptop.images.imageTwo = null
      this.newLaptop.images.imageThree = null
      this.newLaptop.brand = null
      this.newLaptop.model = null
      this.newLaptop.ram = null
      this.newLaptop.cpu = null
      this.newLaptop.gpu = null
      this.newLaptop.drive = null
      this.newLaptop.matrix = null
      this.newLaptop.type = null
      this.newLaptop.description = null
      this.newLaptop.price = null
    },
    async scrapeLaptop () {
      if (this.scrapingTarget !== null) {
        this.informationDialogType = 'scraping'
        this.informationDialogVisibility = true
        const productAddress = this.scrapingTarget.replace('https://www.x-kom.pl/p/', '')
        await this.productsService.scrapeLaptop(productAddress).then(product => {
          if (product.details.brand === '' && product.details.cpu === '' && product.details.description === '' && product.details.drive === '' && product.details.gpu === '' && product.details.matrix === '' && product.details.model === '' && product.details.price === '' && product.details.ram === '') {
            this.informationDialogType = null
            this.informationDialogVisibility = false
            setTimeout(function () {
              this.informationDialogType = 'scraping failed'
              this.informationDialogVisibility = true
            }
              .bind(this),
            500)
          } else {
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
            this.informationDialogType = null
            this.informationDialogVisibility = false
            setTimeout(function () {
              this.informationDialogType = 'scraping finished'
              this.informationDialogVisibility = true
            }
              .bind(this),
            500)
            setTimeout(function () {
              this.informationDialogType = null
              this.informationDialogVisibility = false
            }
              .bind(this),
            1500)
          }
        })
      } else {
        this.informationDialogType = 'target is not defined'
        this.informationDialogVisibility = true
        setTimeout(function () {
          this.informationDialogVisibility = false
          this.informationDialogType = null
        }
          .bind(this),
        2000)
      }
    },
    closeNewLaptopDialog () {
      this.$emit('closeNewLaptopDialog', false)
    }
  },
  computed: {
    scrapingStatement () {
      return this.scrapingTarget === null || this.scrapingTarget === ''
    },
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
    },
    newLaptopDialogVisibility () {
      return this.productsCategory === 'laptops'
    }
  },
  watch: {
    'laptopType' (value) {
      this.newLaptop.type = value
    }
  },
  beforeMount () {
    bus.$on('countOfProducts', (value) => {
      if (value > this.currentProductsNumber) {
        this.informationDialogVisibility = true
        this.informationDialogType = 'uploading succesful'
        setTimeout(function () {
          this.informationDialogVisibility = false
          this.informationDialogType = null
        }
          .bind(this),
        2000)
      } else {
        this.informationDialogType = 'uploading failed'
        this.informationDialogVisibility = true
      }
    })
  }
}
</script>

<style lang="scss">
  .col-test {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .button-row {
    justify-content: right;
    padding: 1rem;
    display: grid;
    grid-template-columns: 3fr 1fr;
  }
  .v-dialog {
    overflow-y: hidden;
  }
  .choose-type-container {
    width: 20%;
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
    height: 470px;
    overflow-y: auto;
    background-color: #fff;
  }
  .dialog-button {
    margin: 0.4rem;
    justify-content: center;
    display: flex;
    flex-direction: column;
    width: 300px;
    &.short {
      margin: 0.5rem;
      width: 150px;
      display: flex;
      justify-content: right;
    }
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
