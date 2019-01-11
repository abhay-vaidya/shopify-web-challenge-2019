import React, { Component } from 'react'
import { Container, Row } from 'react-grid-system'
import Item from '../../components/item/Item'
import { Item as ItemType } from '../../types/item'
import './Favourites.scss'

interface FavouritesProps {
  favourites: Array<ItemType>
}

const MIN_FAVOURITES_REQUIRED = 2

class Favourites extends Component<FavouritesProps> {
  render() {
    const { favourites } = this.props

    if (favourites.length < MIN_FAVOURITES_REQUIRED) return null

    return (
      <div className="favourites-wrapper">
        <Container>
          <h1>Favourites</h1>
          <div className="favourites-content">
            {favourites.map((item, index) => {
              return <Item key={index} item={item} />
            })}
          </div>
        </Container>
      </div>
    )
  }
}

export default Favourites
