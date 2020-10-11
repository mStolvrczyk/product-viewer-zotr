import appHttpClient from '../libs/appHttpClient'
import { prop } from 'ramda'

export default class ProductsService {
  async getAllProducts (category) {
    return appHttpClient.get(`/${category}`).then(prop('data'))
  }

  async getSubProducts (category, subcategory) {
    return appHttpClient.get(`/${category}/${subcategory}`).then(prop('data'))
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

  async createLaptop () {
    return appHttpClient.post('/laptops', { dupa: 'dupa' })
  }
}
