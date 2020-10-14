<template>
  <v-dialog
    v-model="informationDialogVisibility"
    persistent
    width="350"
  >
    <div class="information-dialog" v-if="informationDialogType === 'scraping'">
      <h4 style="margin-bottom: 1rem">Skrapowanie</h4>
      <v-progress-linear
        color="#fff"
        indeterminate
      ></v-progress-linear>
    </div>
    <div class="information-dialog" v-else-if="informationDialogType === 'loading'">
      <h4>Laptop został dodany do bazy danych</h4>
    </div>
    <div class="information-dialog" v-else-if="informationDialogType === 'scraping finished'">
      <h4>Skrapowanie zakończone</h4>
    </div>
    <div class="information-dialog" v-else-if="informationDialogType === 'target is not defined'">
      <h4>Link do produktu nie został dodany</h4>
    </div>
  </v-dialog>
</template>

<script>
export default {
  name: 'InformationDialog',
  props: {
    informationDialogVisibility: Boolean,
    informationDialogType: String
  }
}
</script>

<style lang="scss">

</style>
