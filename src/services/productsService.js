import appHttpClient from '../libs/appHttpClient'
import { prop } from 'ramda'
import { bus } from '@/main'

export default class ProductsService {
  async getAllProducts (category) {
    return await appHttpClient.get(`/${category}`).then(prop('data'))
  }

  async getSubProducts (category, subcategory) {
    return appHttpClient.get(`/${category}/${subcategory}`).then(prop('data'))
  }

  async getCountOfProducts (category) {
    return await appHttpClient.get(`/${category}/count`).then(prop('data'))
  }

  async scrapeGraphicsCard (target) {
    return appHttpClient.get(`/graphicsCard/${target}`).then(prop('data'))
  }

  async scrapeSmartphone (target) {
    return appHttpClient.get(`/smartphone/${target}`).then(prop('data'))
  }

  async scrapeLaptop (target) {
    return appHttpClient.get(`/laptop/${target}`).then(prop('data'))
  }

  // async createLaptop (data) {
  //   return appHttpClient.post('/laptops', data).catch(function (error) {
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.log(error.response.data)
  //       console.log(error.response.status)
  //       console.log(error.response.headers)
  //       bus.$emit('informationDialogMessage', { informationDialogVisibility: true, informationDialogType: 'connection error' })
  //       setTimeout(function () {
  //         bus.$emit('informationDialogMessage', { informationDialogVisibility: false, informationDialogType: null })
  //       }
  //       , 2000)
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //       // http.ClientRequest in node.js
  //       console.log(error.request)
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.log('Error', error.message)
  //     }
  //     console.log(error.config)
  //   }).then( data => {
  //     bus.$emit('informationDialogMessage', { informationDialogVisibility: true, informationDialogType: 'loading' })
  //     setTimeout(function () {
  //     bus.$emit('informationDialogMessage', { informationDialogVisibility: false, informationDialogType: null })
  //     }
  //     , 2000)
  //   })
  //   // })
  // }
  async createLaptop (data) {
    return await appHttpClient.post('/laptops', data)
      .then(response => {
        response = this.getCountOfProducts('laptops').then(response => {
          bus.$emit('countOfProducts', response)
        })
      })
  }
}
