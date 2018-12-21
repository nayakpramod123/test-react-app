import React from 'react'

class ApplicationContainer extends React.Component {
  constructor (props) {
    super(props)

    this.updateApplicationContent = this.updateApplicationContent.bind(this)
  }

  updateApplicationContent (applicationContent) {

  }

  renderApplicationContent () {

  }

  render () {
    return (
      <div className={'Application-container'}>
        {this.renderApplicationContent()}
      </div>
    )
  }
}

export default ApplicationContainer
