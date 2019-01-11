import {
  initializeSessionStorage,
  updateSessionFavourite,
  getSessionFavourites
} from './session.utils'

test('initialize session storage', () => {
  initializeSessionStorage()
  const result = sessionStorage.getItem('favourites')
  expect(result).toBe('[]')
})

test('add favourite', () => {
  initializeSessionStorage()
  updateSessionFavourite(3, false)
  const result = sessionStorage.getItem('favourites')
  expect(result).toBe('[3]')
})

test('remove favourite', () => {
  initializeSessionStorage()
  updateSessionFavourite(3, false)
  updateSessionFavourite(3, true)
  const result = sessionStorage.getItem('favourites')
  expect(result).toBe('[]')
})

test('get favourites', () => {
  initializeSessionStorage()
  updateSessionFavourite(3, false)
  updateSessionFavourite(5, false)
  updateSessionFavourite(7, false)
  updateSessionFavourite(7, true)
  const result = getSessionFavourites()
  const expected = new Set([3, 5])
  expect(result).toEqual(expected)
})
