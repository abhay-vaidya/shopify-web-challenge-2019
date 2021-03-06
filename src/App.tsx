import React, { Component } from 'react'
import { connect } from 'react-redux'
import Home from './containers/home/Home'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import { ItemActions } from './redux/actions'
import { initializeSessionStorage } from './utilities/session.utils'
import './App.scss'

library.add(faSearch, faStar)

interface AppProps {
  getAllItems: () => void
}
class App extends Component<AppProps> {
  componentDidMount() {
    initializeSessionStorage()
    this.props.getAllItems()
  }

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllItems: () => dispatch(ItemActions.getAllItems())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
