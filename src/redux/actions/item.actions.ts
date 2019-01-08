import { itemConstants } from '../constants/index'
import { itemService } from '../../services'
import he from 'he'

function getAllItems() {
  return async (dispatch) => {
    dispatch({
      type: itemConstants.GET_ALL_ITEMS_REQUEST
    })
    try {
      const response = await itemService.getItems()
      const newResponse = response.data.map((item) => {
        const { body, category, title, keywords } = item
        const decodedBody = he.decode(body)
        const keywordsArray = keywords.split(',')
        const keywordsSet = new Set(keywordsArray)
        return {
          title,
          category,
          body: decodedBody,
          keywordsSet,
          favourited: false
        }
      })
      return dispatch({
        type: itemConstants.GET_ALL_ITEMS_SUCCESS,
        body: newResponse
      })
    } catch (error) {
      return dispatch({
        type: itemConstants.GET_ALL_ITEMS_ERROR
      })
    }
  }
}

export default {
  getAllItems
}
