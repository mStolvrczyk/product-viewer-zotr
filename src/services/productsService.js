import appHttpClient from '../libs/appHttpClient'
import { prop } from 'ramda'

export default class StationsService {
  async getAllDrones () {
    return appHttpClient.get('/drones').then(prop('data'))
  }

  async getAllGraphicsCards () {
    return appHttpClient.get('/graphicscards').then(prop('data'))
  }

  async getAllKeyboards () {
    return appHttpClient.get('/keyboards').then(prop('data'))
  }

  // async getStation (id) {
  //   return appHttpClient.get(`/stations/${id}`).then(prop('data'))
  // }
}
