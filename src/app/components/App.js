import React from 'react'
import ApplicationContainer from './ApplicationContainer/ApplicationContainer'
import Login from './Login'
import Otp from './Otp'
import SetUp from './SetUp'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  render () {
    console.log('Props: ', this.props)
    return (
      <div className='card'>
        <Router>
          <div>
            <Route exact path='/' component={props => <Login routeProps={props} dispatch={this.props.dispatch} />} />
            <Route exact path='/setup' component={props => <SetUp routeProps={props} dispatch={this.props.dispatch} />} />
            <Route exact path='/otp' component={props => <Otp routeProps={props} dispatch={this.props.dispatch} />} />
            <Route path='/container' component={props => <ApplicationContainer routeProps={props} dispatch={this.props.dispatch} />} />
          </div>
        </Router>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default App
