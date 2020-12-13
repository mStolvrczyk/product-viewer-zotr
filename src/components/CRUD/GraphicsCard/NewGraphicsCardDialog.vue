<template>
  <v-dialog
    transition="dialog-bottom-transition"
    persistent
    v-model="newGraphicsCardDialogVisibility"
     :max-width="informationDialogWidth"
  >
    <div id="new-product-header">
      <h3>Dodaj kartę graficzną</h3>
    </div>
    <div id="new-product-dialog">
      <div class="container">
        <div class="row-dialog">
          <v-text-field
            v-model="scrapingTarget"
            label="Zeskrapuj dane karty graficznej z linku"
          ></v-text-field>
          <v-btn
            :disabled="scrapingStatement"
            style="text-transform: none"
            color="blue-grey"
            class="ma-2 white--text"
            @click="scrapeGraphicsCard"
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
            v-model="newGraphicsCard.images.imageOne"
            label="Zdjęcie nr 1"
            :rules="rules.graphicsCardDetails"
            required
          ></v-text-field>
          <v-text-field
            v-model="newGraphicsCard.images.imageTwo"
            label="Zdjęcie nr 2"
            :rules="rules.graphicsCardDetails"
            required
          ></v-text-field>
          <v-text-field
            v-model="newGraphicsCard.images.imageThree"
            label="Zdjęcie nr 3"
            :rules="rules.graphicsCardDetails"
            required
          ></v-text-field>
        </div>
        <div class="second-row">
          <div class="col">
            <v-text-field
              v-model="newGraphicsCard.brand"
              label="Marka"
              :rules="rules.graphicsCardDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newGraphicsCard.model"
              label="Model"
              :rules="rules.graphicsCardDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newGraphicsCard.ram"
              label="RAM"
              :rules="rules.graphicsCardDetails"
              required
            ></v-text-field>
          </div>
          <div class="col">
            <v-text-field
              v-model="newGraphicsCard.cpuClockSpeed"
              label="Taktowanie procesora"
              :rules="rules.graphicsCardDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newGraphicsCard.ports"
              label="Porty"
              :rules="rules.graphicsCardDetails"
              required
            ></v-text-field>
            <v-text-field
              v-model="newGraphicsCard.price"
              label="Cena"
              :rules="rules.graphicsCardDetails"
              required
            ></v-text-field>
          </div>
        </div>
        <div class="row-dialog">
          <v-textarea
            v-model="newGraphicsCard.description"
            name="input-7-4"
            label="Opis produktu"
            :rules="rules.graphicsCardDetails"
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
                @click="saveGraphicsCard"
              >
                Dodaj produkt do bazy danych
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
import GraphicsCard from '@/models/GraphicsCard'
import { bus } from '@/main'
import InformationDialog from '@/components/InformationDialog'

export default {
  name: 'newGraphicsCardDialog',
  components: { InformationDialog },
  data () {
    return {
      rules: {
        graphicsCardDetails: [val => (val || '').length > 0 || 'To pole jest wymagane']
      },
      informationDialogVisibility: false,
      informationDialogType: null,
      scrapeLoadingStatement: false,
      newObjectStatement: false,
      newGraphicsCard: GraphicsCard,
      scrapingTarget: null,
      productsService: new ProductsService()
    }
  },
  props: {
    productsCategory: String,
    currentProductsNumber: Number
  },
  methods: {
    closeInformationDialog (value) {
      this.informationDialogVisibility = value
      this.informationDialogType = null
    },
    returnToAdminPanel () {
      this.$emit('closeProductDialog', null)
      this.clearCells()
    },
    saveGraphicsCard () {
      this.productsService.createGraphicsCard(this.newGraphicsCard)
    },
    clearCells () {
      this.newGraphicsCard.images.imageOne = null
      this.newGraphicsCard.images.imageTwo = null
      this.newGraphicsCard.images.imageThree = null
      this.newGraphicsCard.brand = null
      this.newGraphicsCard.model = null
      this.newGraphicsCard.ram = null
      this.newGraphicsCard.cpu = null
      this.newGraphicsCard.gpu = null
      this.newGraphicsCard.drive = null
      this.newGraphicsCard.matrix = null
      this.newGraphicsCard.type = null
      this.newGraphicsCard.description = null
      this.newGraphicsCard.price = null
    },
    async scrapeGraphicsCard () {
      if (this.scrapingTarget !== null) {
        this.informationDialogType = 'scraping'
        this.informationDialogVisibility = true
        const productAddress = this.scrapingTarget.replace('https://www.x-kom.pl/p/', '')
        await this.productsService.scrapeGraphicsCard(productAddress).then(product => {
          if (product.details.brand === '' && product.details.model === '' && product.details.ram === '' && product.details.cpu === '' && product.details.gpu === '' && product.details.drive === '' && product.details.matrix === '' && product.details.description === '' && product.details.price === '') {
            this.informationDialogType = null
            this.informationDialogVisibility = false
            setTimeout(function () {
              this.informationDialogType = 'scraping failed'
              this.informationDialogVisibility = true
            }
              .bind(this),
            500)
          } else {
            console.log(product)
            this.newGraphicsCard.images.imageOne = product.images.imageOne
            this.newGraphicsCard.images.imageTwo = product.images.imageTwo
            this.newGraphicsCard.images.imageThree = product.images.imageThree
            this.newGraphicsCard.brand = product.details.brand
            this.newGraphicsCard.model = product.details.model
            this.newGraphicsCard.ram = product.details.ram
            this.newGraphicsCard.cpuClockSpeed = product.details.cpuClockSpeed
            this.newGraphicsCard.ports = product.details.ports
            this.newGraphicsCard.description = product.details.description
            this.newGraphicsCard.price = product.details.price
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
    newGraphicsCardDialogVisibility () {
      return this.productsCategory === 'graphicsCards'
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
        setTimeout(function () {
          this.returnToAdminPanel()
        }
          .bind(this),
        200)
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
