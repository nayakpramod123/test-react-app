import React from 'react'
import './SectionContainer.css'
import FamilySection from '../Family/FamilySection'
import StudentSection from '../Student/StudentSection'

class SectionContainer extends React.Component {
  constructor (props) {
    super(props)
  }
  
  renderSection() {
    const section = this.props.activeSectionId === 1 ?
      (<div>
        <StudentSection
          nationalities={this.props.nationalities}
          activeSectionId={this.props.activeSectionId}
          dispatch={this.props.dispatch}
          submitStudentSection={this.props.submitStudentSection}
          isRegistar={this.props.isRegistar}
          selectedStudentData={this.props.selectedStudentData}
        />
      </div>): this.props.activeSectionId === 2 ?
        (<div>
        <FamilySection
          familyRowCount={this.props.familyRowCount}
          nationalities={this.props.nationalities}
          activeSectionId={this.props.activeSectionId}
          dispatch={this.props.dispatch}
        />
      </div>): <span />
    return section
  }

  render () {
    return (
      <div>
        {this.renderSection()}
      </div>
    )
  }
}

export default SectionContainer
