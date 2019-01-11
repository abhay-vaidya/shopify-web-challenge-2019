import { getFavourites, getResultIndices } from './item.utils'

const mockItems = [
  {
    body:
      '<ul> \n <li>Place item in the <strong>Garbage Bin.</strong></li> \n</ul>',
    category: 'Garbage',
    favourited: false,
    id: 0,
    keywords: 'plastic, trash, garbage, common',
    title: 'Garbage (wrapping and tying)'
  },
  {
    body:
      '<ul> \n <li>Place item in the <strong>Green Bin.</strong></li> \n</ul>',
    category: 'Compost',
    favourited: true,
    id: 52,
    keywords: 'food, compost, green, common',
    title: 'Banana Peel'
  }
]

test('get single favourite', () => {
  const favourites = getFavourites(mockItems)
  expect(favourites.length).toBe(1)
  expect(favourites[0].id).toBe(52)
})

test('get result indices', () => {
  const resultIndices = getResultIndices(mockItems, 'common')
  expect(resultIndices.length).toBe(2)
})
