import { itemConstants } from '../constants/index'
import { itemService } from '../../services'

function getAllItems() {
  return async (dispatch) => {
    dispatch({
      type: itemConstants.GET_ALL_ITEMS_REQUEST
    })
    try {
      const response = await itemService.getItems()
      return dispatch({
        type: itemConstants.GET_ALL_ITEMS_SUCCESS,
        body: response.data
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
