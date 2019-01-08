import React, { Component } from 'react'
import { Item as ItemType } from '../../types/item'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col } from 'react-grid-system'
import './Item.scss'

interface ItemProps {
  item: ItemType
}

class Item extends Component<ItemProps> {
  private toggleFavourite = () => {
    console.log('TOGGLING')
  }

  render() {
    const { item } = this.props
    return (
      <Row className="item-wrapper">
        <Col sm={5}>
          <div className="title-wrapper">
            <div
              className="favourite-button"
              role="button"
              onClick={this.toggleFavourite}
            >
              <FontAwesomeIcon
                icon="star"
                color={item.favourited ? `#159957` : '#aaa'}
                size="sm"
              />
            </div>
            {item.title}
          </div>
        </Col>
        <Col sm={7}>
          <div
            className="description-wrapper"
            dangerouslySetInnerHTML={{
              __html: item.body
            }}
          />
        </Col>
      </Row>
    )
  }
}

export default Item
