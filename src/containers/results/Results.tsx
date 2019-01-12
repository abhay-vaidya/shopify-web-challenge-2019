import React, { Component } from 'react'
import { Container } from 'react-grid-system'
import Item from '../../components/item/Item'
import { Item as ItemType } from '../../types/item'
import './Results.scss'

interface ResultsProps {
  items: Array<ItemType>
  resultIndices: Array<number>
}

class Results extends Component<ResultsProps> {
  render() {
    const { items, resultIndices } = this.props

    return (
      <section className="results-wrapper">
        <Container>
          <div className="results-content">
            {resultIndices.map((index) => (
              <Item key={index} item={items[index]} />
            ))}
          </div>
        </Container>
      </section>
    )
  }
}

export default Results
