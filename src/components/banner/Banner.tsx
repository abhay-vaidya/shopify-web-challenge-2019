import React, { Component } from 'react'
import { Container } from 'react-grid-system'
import './Banner.scss'

interface BannerProps {
  headline: string
}

class Banner extends Component<BannerProps> {
  render() {
    const { headline } = this.props
    return (
      <div className="banner-wrapper">
        <Container>
          <h1 className="banner-headline">{headline}</h1>
        </Container>
      </div>
    )
  }
}

export default Banner
