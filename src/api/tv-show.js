import axios from "axios"
import { API_KEY_PARAM, BASE_URL } from "../config"


export class TVShowApi {
  static async fetchPopulars() {
    const response = await axios.get(
      BASE_URL + "/tv/popular" + API_KEY_PARAM
    )
    return response.data.results
  }

  static async fetchRecommendations(tvShowId) {
    const response = await axios.get(
      BASE_URL + "/tv/" + tvShowId + "/recommendations" + API_KEY_PARAM
    )
    return response.data.results
  }

  static async fetchSearchByTitle(title) {
    const response = await axios.get(
      `${BASE_URL}/search/tv${API_KEY_PARAM}&query=${title}`
    )
    return response.data.results
  }
}