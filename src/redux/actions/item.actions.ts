import { itemConstants } from '../constants/index'
import { itemService } from '../../services'
import he from 'he'

function transformRawItem(item, index) {
  const { body, category, title, keywords } = item

  // Body comes in as encoded HTML, we must decode it to properly render
  const decodedBody = he.decode(body)

  // Split keywords by comma and remove any leading or trailing whitespace
  const keywordsArray = keywords.split(',').map((keyword) => {
    return keyword.trim().toLowerCase()
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
}

function getAllItems() {
  return async (dispatch) => {
    dispatch({
      type: itemConstants.GET_ALL_ITEMS_REQUEST
    })
    try {
      const rawArray = await itemService.getItems()
      const newResponse = rawArray.map((item, index) => {
        return transformRawItem(item, index)
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

function toggleFavourite(id: number) {
  return async (dispatch, getState) => {
    const { items } = getState().itemReducers

    const newItems = items.map((item, index) => {
      // If this is not the item we want to toggle, just return it
      if (index !== id) {
        return item
      }

      // Otherwise toggle the favourited status
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
