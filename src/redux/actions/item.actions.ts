import { itemConstants } from '../constants/index'
import { itemService } from '../../services'
import store from '../store'
import he from 'he'

function getAllItems() {
  return async (dispatch) => {
    dispatch({
      type: itemConstants.GET_ALL_ITEMS_REQUEST
    })
    try {
      const rawArray = await itemService.getItems()
      const newResponse = rawArray.map((item, index) => {
        const { body, category, title, keywords } = item
        const decodedBody = he.decode(body)
        const keywordsArray = keywords.split(',').map((keyword) => {
          return keyword.trim()
        })
        const keywordsSet = new Set(keywordsArray)
        return {
          id: index,
          title,
          category,
          body: decodedBody,
          keywords: keywordsSet,
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

function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.item
    }
  })
}

function toggleFavourite(id: number) {
  return async (dispatch, getState) => {
    const { items } = getState().itemReducers

    const newItems = items.map((item, index) => {
      if (index !== id) {
        return item
      }

      return {
        ...item,
        favourited: !item.favourited
      }
    })

    return dispatch({
      type: itemConstants.TOGGLE_FAVOURITE,
      body: newItems
    })
  }
}

export default {
  getAllItems,
  toggleFavourite
}
