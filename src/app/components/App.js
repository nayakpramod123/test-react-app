import React from 'react'
import ApplicationContainer from './ApplicationContainer/ApplicationContainer'

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

export default App
