import React from 'react'
import {fetchStudentsLists} from '../../store/actions/action-creators'
import connect from 'react-redux/es/connect/connect'

class ApplicationContainer extends React.Component {
  constructor (props) {
    super(props)

    this.updateApplicationContent = this.updateApplicationContent.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(fetchStudentsLists())
  }

  updateApplicationContent (applicationContent) {

  }

  renderApplicationContent () {

  }

  render () {
    console.log('Props: ', this.props)
    return (
      <div className={'Application-container'}>
        <div>Application Container Loaded</div>
        {this.renderApplicationContent()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    studentData: state.students.studentData
  })
}
export default connect(mapStateToProps)(ApplicationContainer)
