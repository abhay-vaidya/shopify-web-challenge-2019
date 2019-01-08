import React, { Component } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import Banner from '../../components/banner/Banner'
import Search from '../../components/search/Search'
import './Home.scss'

class Home extends Component {
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
          <Search
            onSearch={this.onSearch}
            onClear={this.onClear}
            placeholder="Search..."
          />
        </Container>
      </div>
    )
  }
}

export default Home
