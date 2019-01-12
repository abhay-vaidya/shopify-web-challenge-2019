import React, { Component, SyntheticEvent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Search.scss'

interface SearchProps {
  placeholder: string
  onSearch: (value: string) => void
  onClear: () => void
}

interface SearchState {
  value: string
}
class Search extends Component<SearchProps, SearchState> {
  state = {
    value: ''
  }

  private handleChange = (event) => {
    this.setState({ value: event.target.value }, () => {
      if (this.state.value === '') {
        this.props.onClear()
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.onSearch(this.state.value)
    event.currentTarget.blur()
  }

  render() {
    return (
      <form action="#" onSubmit={this.handleSubmit} className="search-bar-wrapper">
        <input
          onChange={this.handleChange}
          className="search-bar"
          type="search"
          placeholder={this.props.placeholder}
        />
        <button className="search-button">
          <FontAwesomeIcon
            icon="search"
            color="white"
            flip="horizontal"
            size="2x"
          />
        </button>
      </form>
    )
  }
}

export default Search
