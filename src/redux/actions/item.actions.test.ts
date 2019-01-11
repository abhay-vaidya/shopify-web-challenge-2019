import ItemActions from './item.actions'
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
    favourited: false,
    id: 52,
    keywords: 'food, compost, green, common',
    title: 'Banana Peel'
  }
]

const mockRawItem = {
  body:
    '&lt;ul&gt;\n&lt;li&gt;Place item in the &lt;strong&gt;Garbage Bin.&lt;/strong&gt;&lt;/li&gt;\n&lt;/ul&gt;',
  category: 'Garbage',
  keywords: ' Bread bag tag, Milk bag tag, elastic band, ',
  title: 'Garbage (wrapping and tying)'
}

test('transform raw item', () => {
  const transformedItem = ItemActions.transformRawItem(mockRawItem, 0)
  const expectedResult = {
    body: `<ul>\n<li>Place item in the <strong>Garbage Bin.</strong></li>\n</ul>`,
    category: 'Garbage',
    keywords: 'bread bag tag, milk bag tag, elastic band',
    title: 'Garbage (wrapping and tying)',
    favourited: false,
    id: 0
  }
  expect(transformedItem).toEqual(expectedResult)
})

test('populate favourites', () => {
  sessionStorage.setItem('favourites', '[0]')
  ItemActions.populateFavourites(mockItems)
  expect(mockItems[0].favourited).toBe(true)
  expect(mockItems[1].favourited).toBe(false)
})
