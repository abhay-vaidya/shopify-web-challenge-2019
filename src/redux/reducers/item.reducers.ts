import { itemConstants } from '../constants/index'
import { Item } from '../../types/item'

export interface ItemState {
  items: Array<Item>
  loadingItems: boolean
  loadingItemsError: boolean
}

const initialState: ItemState = {
  items: [],
  loadingItems: false,
  loadingItemsError: false
}

const reducer = (state = initialState, action: { type: string; body: any }) => {
  switch (action.type) {
    case itemConstants.GET_ALL_ITEMS_REQUEST:
      return {
        ...state,
        items: [],
        loadingItems: true,
        loadingItemsError: false
      }
    case itemConstants.GET_ALL_ITEMS_SUCCESS:
      return {
        ...state,
        items: action.body,
        loadingItems: false,
        loadingItemsError: false
      }
    case itemConstants.GET_ALL_ITEMS_ERROR:
      return {
        ...state,
        items: action.body,
        loadingItems: false,
        loadingItemsError: true
      }
    case itemConstants.TOGGLE_FAVOURITE:
      return {
        ...state,
        items: action.body
      }
    default:
      return state
  }
}

export default reducer
