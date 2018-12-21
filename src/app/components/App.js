import React from 'react'
import { connect } from 'react-redux'
import { fetchInitialState } from '../store/actions/action-creators'
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
        <ApplicationContainer />
      </div>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return Object.assign({}, {})
}
export default connect(mapStateToProps)(App)
