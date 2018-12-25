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
      <div className={'Application'}>
        <ApplicationContainer dispatch={this.props.dispatch} />
      </div>
    )
  }
}

export default App
