<template>
  <v-dialog
    transition="dialog-bottom-transition"
    persistent
    v-model="newSmartphoneDialogVisibility"
     :max-width="informationDialogWidth"
  >
    <div id="new-product-header">
      <h3>Dodaj smartfon</h3>
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
            v-model="newSmartphone.images.imageOne"
            label="Zdjęcie nr 1"
            :rules="rules.laptopDetails"
            required
          ></v-text-field>
          <v-text-field
            v-model="newSmartphone.images.imageTwo"
            label="Zdjęcie nr 2"
            :rules="rules.laptopDetails"
            required
          ></v-text-field>
          <v-text-field
            v-model="newSmartphone.images.imageThree"
            label="Zdjęcie nr 3"
            :rules="rules.laptopDetails"
            required
          ></v-text-field>
        </div>
        <div class="second-row">
          <div class="col">
            <v-text-field
              v-model="newSmartphone.brand"
              label="Marka"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newSmartphone.model"
              label="Model"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newSmartphone.ram"
              label="RAM"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newSmartphone.cpu"
              label="CPU"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
          </div>
          <div class="col">
            <v-text-field
              v-model="newSmartphone.gpu"
              label="GPU"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newSmartphone.drive"
              label="Dysk"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newSmartphone.matrix"
              label="Matryca"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newSmartphone.price"
              label="Cena"
              :rules="rules.laptopDetails"
              required
            ></v-text-field>
          </div>
        </div>
        <div class="row-dialog">
          <v-textarea
            v-model="newSmartphone.description"
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
import Smartphone from '@/models/Smartphone'
import { bus } from '@/main'
import InformationDialog from '@/components/InformationDialog'

export default {
  name: 'newSmartphoneDialog',
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
      newSmartphone: Smartphone,
      scrapingTarget: null,
      productsService: new ProductsService()
    }
  },
  props: {
    newProductDialogVisibility: Boolean,
    currentProductsNumber: Number
  },
  methods: {
    closeInformationDialog (value) {
      this.informationDialogVisibility = value
      this.informationDialogType = null
    },
    returnToAdminPanel () {
      this.closeNewProductDialog()
      this.clearCells()
    },
    saveLaptop () {
      this.productsService.createLaptop(this.newSmartphone)
    },
    clearCells () {
      this.newSmartphone.images.imageOne = null
      this.newSmartphone.images.imageTwo = null
      this.newSmartphone.images.imageThree = null
      this.newSmartphone.brand = null
      this.newSmartphone.model = null
      this.newSmartphone.ram = null
      this.newSmartphone.cpu = null
      this.newSmartphone.gpu = null
      this.newSmartphone.drive = null
      this.newSmartphone.matrix = null
      this.newSmartphone.type = null
      this.newSmartphone.description = null
      this.newSmartphone.price = null
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
            this.newSmartphone.images.imageOne = product.images.imageOne
            this.newSmartphone.images.imageTwo = product.images.imageTwo
            this.newSmartphone.images.imageThree = product.images.imageThree
            this.newSmartphone.brand = product.details.brand
            this.newSmartphone.model = product.details.model
            this.newSmartphone.ram = product.details.ram
            this.newSmartphone.cpu = product.details.cpu
            this.newSmartphone.gpu = product.details.gpu
            this.newSmartphone.drive = product.details.drive
            this.newSmartphone.matrix = product.details.matrix
            this.newSmartphone.type = this.laptopType
            this.newSmartphone.description = product.details.description
            this.newSmartphone.price = product.details.price
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
    closeNewProductDialog () {
      this.$emit('closeNewProductDialog', false)
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
    newSmartphoneDialogVisibility () {
      return this.productsCategory === 'smartphones'
    }
  },
  watch: {
    'laptopType' (value) {
      this.newSmartphone.type = value
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
