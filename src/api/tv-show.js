import axios from "axios"
import { API_KEY_PARAM, BASE_URL } from "../config"


export class TVShowApi {
  static async fetchPopulars() {
    const response = await axios.get(BASE_URL + "/tv/popular" + API_KEY_PARAM)
    return response.data.results
  }
}