import { itemConstants } from '../constants/index'
import { itemService } from '../../services'
import {
  updateSessionFavourite,
  getSessionFavourites
} from '../../utilities/session.utils'
import { Item } from '../../types/item'
import he from 'he'

function transformRawItem(item, index: number) {
  const { body, category, title, keywords } = item

  // Body comes in as encoded HTML, we must decode it to properly render
  const decodedBody = he.decode(body)

  const cleanedKeywords = keywords
    .trim() // Remove leading or trailing whitespace
    .replace(/,$/, '') // Remove trailing commas
    .toLowerCase()

  return {
    id: index,
    title,
    category,
    body: decodedBody,
    keywords: cleanedKeywords,
    favourited: false
  }
}

function populateFavourites(itemArray: Array<Item>) {
  const sessionFavourites = getSessionFavourites() as Set<number>

  sessionFavourites.forEach((index) => {
    itemArray[index].favourited = true
  })
}

function getAllItems() {
  return async (dispatch) => {
    dispatch({
      type: itemConstants.GET_ALL_ITEMS_REQUEST
    })
    try {
      const rawArray = await itemService.getItems()
      const itemArray = rawArray.map((item, index) => {
        return transformRawItem(item, index)
      })

      populateFavourites(itemArray)

      return dispatch({
        type: itemConstants.GET_ALL_ITEMS_SUCCESS,
        body: itemArray
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

      // Otherwise update the session and toggle the favourited status
      updateSessionFavourite(index, item.favourited)

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
  populateFavourites,
  transformRawItem,
  getAllItems,
  toggleFavourite
}
