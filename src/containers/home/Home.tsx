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

class Home extends Component<HomeProps> {
  private onSearch = (value: string) => {
    console.log(value)
  }

  private onClear = () => {
    console.log('CLEARED')
  }

  render() {
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
          {this.props.items.map((item) => {
            return <Item key={item.title} item={item} />
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
