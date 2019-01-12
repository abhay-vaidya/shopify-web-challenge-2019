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

  private handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      event.stopPropagation()
      this.onSubmit()
    }
  }

  onSubmit = () => {
    this.props.onSearch(this.state.value)
  }

  render() {
    return (
      <div className="search-bar-wrapper">
        <input
          onKeyDown={this.handleKeyDown}
          onChange={this.handleChange}
          className="search-bar"
          type="search"
          placeholder={this.props.placeholder}
        />
        <button onClick={this.onSubmit} className="search-button">
          <FontAwesomeIcon
            icon="search"
            color="white"
            flip="horizontal"
            size="2x"
          />
        </button>
      </div>
    )
  }
}

export default Search
