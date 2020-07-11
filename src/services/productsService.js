import appHttpClient from '../libs/appHttpClient'
import { prop } from 'ramda'

export default class ProductsService {
  async getAllProducts (category) {
    return appHttpClient.get(`/${category}`).then(prop('data'))
  }
}
