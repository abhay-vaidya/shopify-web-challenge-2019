import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-grid-system'
import Banner from '../../components/banner/Banner'
import Search from '../../components/search/Search'
import Item from '../../components/item/Item'
import { State } from '../../redux/reducers'
import { getFavourites, getResultIndices } from '../../utilities/item.utils'
import { Item as ItemType } from '../../types/item'
import Favourites from '../../containers/favourites/Favourites'
import './Home.scss'

interface HomeProps {
  items: Array<ItemType>
}

interface HomeState {
  resultIndices: Array<number>
}

class Home extends Component<HomeProps, HomeState> {
  state = {
    resultIndices: []
  }

  private onSearch = (value: string) => {
    const resultIndices = getResultIndices(this.props.items, value)
    this.setState({ resultIndices })
  }

  private onClear = () => {
    this.setState({ resultIndices: [] })
  }

  render() {
    const { resultIndices } = this.state
    const { items } = this.props
    const results = resultIndices.map((index) => (
      <Item key={index} item={items[index]} />
    ))
    const favourites = getFavourites(items)
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
          <Container>{results}</Container>
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
