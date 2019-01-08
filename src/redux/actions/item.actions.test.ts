import ItemActions from './item.actions'

const mockRawItem = {
  body:
    '&lt;ul&gt;\n&lt;li&gt;Place item in the &lt;strong&gt;Garbage Bin.&lt;/strong&gt;&lt;/li&gt;\n&lt;/ul&gt;',
  category: 'Garbage',
  keywords: 'Bread bag tag, Milk bag tag, elastic band',
  title: 'Garbage (wrapping and tying)'
}

test('transform raw item', () => {
  const transformedItem = ItemActions.transformRawItem(mockRawItem, 0)
  const expectedResult = {
    body: `<ul>\n<li>Place item in the <strong>Garbage Bin.</strong></li>\n</ul>`,
    category: 'Garbage',
    keywords: new Set(['bread bag tag', 'milk bag tag', 'elastic band']),
    title: 'Garbage (wrapping and tying)',
    favourited: false,
    id: 0
  }
  expect(transformedItem).toEqual(expectedResult)
})
