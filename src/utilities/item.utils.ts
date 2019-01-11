import { Item } from '../types/item'

function getFavourites(items: Array<Item>) {
  let favourites = [] as Array<Item>
  for (let i = 0; i < items.length; i++) {
    if (items[i].favourited) {
      favourites.push(items[i])
    }
  }
  return favourites
}

function getResultIndices(items: Array<Item>, query: string) {
  let matchedIndices = [] as Array<number>
  for (let i = 0; i < items.length; i++) {
    if (items[i].keywords.includes(query.toLowerCase())) {
      matchedIndices.push(i)
    }
  }
  return matchedIndices
}

export { getFavourites, getResultIndices }
