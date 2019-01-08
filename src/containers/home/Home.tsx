import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'react-grid-system'
import Banner from '../../components/banner/Banner'
import Search from '../../components/search/Search'
import Item from '../../components/item/Item'
import { State } from '../../redux/reducers'
import { Item as ItemType } from '../../types/item'
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

  private onClear = () => {
    this.setState({ displayItemsIndices: new Set() })
  }

  render() {
    const { displayItemsIndices } = this.state
    return (
      <div className="home">
        <Banner headline="Toronto Waste Lookup" />
        <Container>
          <div className="search-wrapper">
            <Search
              onSearch={this.onSearch}
              onClear={this.onClear}
              placeholder="Search..."
            />
          </div>
          {this.props.items.map((item, index) => {
            return (
              displayItemsIndices.has(index) && <Item key={index} item={item} />
            )
          })}
        </Container>
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
