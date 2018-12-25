import React from 'react';
import SectionList from '../Sections/SectionList'
import SectionContainer from '../Sections/SectionContainer'
import connect from 'react-redux/es/connect/connect'
import { fetchAllNationalities, updateActiveSectionId } from '../../store/actions/action-creators'

class Modal extends React.Component {
  constructor (props) {
    super(props)
    this.updateActiveSection = this.updateActiveSection.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(fetchAllNationalities())
  }
  updateActiveSection (selectedId) {
    this.props.dispatch(updateActiveSectionId(selectedId))
  }

  render() {
    const filteredSections =[
      {
        id: 1,
        displayName:'Basic Information'
      },
      {
        id: 2,
        displayName: 'Family Information'
      }
    ]
    return (
      <div>
        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                <SectionList
                  filteredSections={filteredSections}
                  activeSectionId={this.props.activeSectionId}
                  updateActive={this.updateActiveSection}/>
              </div>
              <div className="modal-body">
                <SectionContainer
                  activeSectionId={this.props.activeSectionId}
                  nationalities={this.props.nationalities}
                  familyrowCount={this.props.familyRowCount}
                  submitStudentSection={this.props.submitStudentSection}
                  selectedStudentData={this.props.selectedStudentData}
                  isRegistar={this.props.isRegistar}
                  dispatch={this.props.dispatch}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return Object.assign({}, {
    activeSectionId : state.students.activeSectionId,
    nationalities: state.nationalities.nationalities,
    familyRowCount: state.students.familyRowCount,
    submitStudentSection: state.students.submitStudentSection
  })
}
export default connect(mapStateToProps)(Modal)