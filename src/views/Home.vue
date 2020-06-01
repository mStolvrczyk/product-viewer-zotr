<template>
  <header id="showcase">
    <div class="container">
      <div class="showcase-container">
        <div class="showcase-content">
          <h1>Znajdź najlepsze<br> urządzenie</h1>
<!--            v-model="selectedStation"-->
<!--            :items="allStationsState"-->
          <v-autocomplete
            background-color="white"
            flat
            search="searchValue"
            hide-no-data
            item-value="id"
            item-text="stationName"
            label="Wybierz kategorię urządzeń"
            solo
            return-object
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-title>
                  Brak stacji
                </v-list-item-title>
              </v-list-item>
            </template>
          </v-autocomplete>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss">
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
      display: grid;
      grid-template-columns: 1fr;
      justify-content: center;
      align-items: center;
      height: 50vh;
    }
  }
</style>
