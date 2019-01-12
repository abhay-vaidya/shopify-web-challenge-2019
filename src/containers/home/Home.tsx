import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-grid-system'
import Banner from '../../components/banner/Banner'
import Search from '../../components/search/Search'
import Loading from '../../components/loading/Loading'
import { State } from '../../redux/reducers'
import { getFavourites, getResultIndices } from '../../utilities/item.utils'
import { Item as ItemType } from '../../types/item'
import Favourites from '../../containers/favourites/Favourites'
import Results from '../../containers/results/Results'

import './Home.scss'

interface HomeProps {
  items: Array<ItemType>
  loadingItems: boolean
}

interface HomeState {
  resultIndices: Array<number>
}

// Define minimum # of characters user must enter to perform a search
// Avoids unecessary calls for queries with few characters
const MIN_SEARCH_LENGTH = 2

class Home extends Component<HomeProps, HomeState> {
  state = {
    resultIndices: []
  }

  private onSearch = (value: string) => {
    if (value.length >= MIN_SEARCH_LENGTH) {
      const resultIndices = getResultIndices(this.props.items, value)
      this.setState({ resultIndices })
    }
  }

  private onClear = () => {
    this.setState({ resultIndices: [] })
  }

  render() {
    const { resultIndices } = this.state
    const { items, loadingItems } = this.props

    if (loadingItems) {
      return <Loading />
    }

    const favourites = getFavourites(items)

    return (
      <main className="home">
        <section>
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
        </section>
        <Results resultIndices={resultIndices} items={items} />
        <Favourites favourites={favourites} />
      </main>
    )
  }
}

const mapStateToProps = (state: State) => {
  return {
    items: state.itemReducers.items,
    loadingItems: state.itemReducers.loadingItems
  }
}

export default connect(mapStateToProps)(Home)
