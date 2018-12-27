import React from 'react'
import ApplicationContainer from './ApplicationContainer/ApplicationContainer'
import PropTypes from 'prop-types'

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
  }

  render () {
    return (
      <div className='card'>
        <div className='card-body'>
          <ApplicationContainer dispatch={this.props.dispatch} />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default App
