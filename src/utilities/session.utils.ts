function initializeSessionStorage() {
  if (sessionStorage.getItem('favourites') === null) {
    sessionStorage.setItem('favourites', '[]')
  }
}

function updateSessionFavourite(index: number, isCurrentlyFavourited: boolean) {
  const favouritesString = sessionStorage.getItem('favourites')
  if (favouritesString !== null) {
    let favourites = new Set(JSON.parse(favouritesString))
    isCurrentlyFavourited ? favourites.delete(index) : favourites.add(index)
    sessionStorage.setItem('favourites', JSON.stringify(Array.from(favourites)))
  }
}

function getSessionFavourites() {
  const favouritesString = sessionStorage.getItem('favourites')
  if (favouritesString !== null) {
    return new Set(JSON.parse(favouritesString))
  }
}

export {
  initializeSessionStorage,
  updateSessionFavourite,
  getSessionFavourites
}
