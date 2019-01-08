import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-grid-system'
import Banner from '../../components/banner/Banner'
import Search from '../../components/search/Search'
import Item from '../../components/item/Item'
import { State } from '../../redux/reducers'
import { Item as ItemType } from '../../types/item'
import Favourites from '../../containers/favourites/Favourites'
import './Home.scss'

interface HomeProps {
  items: Array<ItemType>
}

interface HomeState {
  displayItemsIndices: Set<number>
}

class Home extends Component<HomeProps, HomeState> {
  state = {
    displayItemsIndices: new Set()
  }

  private onSearch = (value: string) => {
    const { items } = this.props
    let matchedItems = new Set()
    for (let i = 0; i < items.length; i++) {
      if (items[i].keywords.has(value)) {
        matchedItems.add(i)
      }
    }
    this.setState({ displayItemsIndices: matchedItems })
  }

  private getFavourites = () => {
    const { items } = this.props
    let favourites = [] as Array<ItemType>
    for (let i = 0; i < items.length; i++) {
      if (items[i].favourited) {
        favourites.push(items[i])
      }
    }
    return favourites
  }

  private onClear = () => {
    this.setState({ displayItemsIndices: new Set() })
  }

  render() {
    const { displayItemsIndices } = this.state
    const favourites = this.getFavourites()
    return (
      <div className="home">
        <Banner headline="Toronto Waste Lookup" />
        <div className="search-wrapper">
          <Container>
            <Search
              onSearch={this.onSearch}
              onClear={this.onClear}
              placeholder="Search..."
            />
          </Container>
        </div>
        <div className="results-wrapper">
          <Container>
            {this.props.items.map((item, index) => {
              return (
                displayItemsIndices.has(index) && (
                  <Item key={index} item={item} />
                )
              )
            })}
          </Container>
        </div>
        <Favourites favourites={favourites} />
      </div>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    items: state.itemReducers.items
  }
}

export default connect(mapStateToProps)(Home)
