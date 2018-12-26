import React from 'react';
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
              </div>
              <div className="modal-body">
                <SectionContainer {...this.props}
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
    nationalities: state.nationalities.nationalities,
    familyRowCount: state.students.familyRowCount,
    nationalityIndicator: state.students.nationalityIndicator,
    submitStudentSection: state.students.submitStudentSection,
    submitButtonValue: state.students.submitButtonValue,
    studentNationality: state.students.studentNationality,
    studentFamilyMember: state.familyMembers.studentFamilyMember,
    addButtonValue: state.students.addButtonValue,
    selectedFamilyRow: state.students.selectedFamilyRow,
    familyNationality: state.familyMembers.familyNationality,
    familyNationalityIndicator: state.familyMembers.familyNationalityIndicator
  })
}
export default connect(mapStateToProps)(Modal)