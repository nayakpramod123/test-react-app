import React from 'react';
import SectionContainer from '../Sections/SectionContainer'
import connect from 'react-redux/es/connect/connect'
import { fetchAllNationalities, updateActiveSectionId } from '../../store/actions/action-creators'
import Modal from 'react-responsive-modal'

class ModalComponent extends React.Component {
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
    return (
      <div>
        <Modal open={this.props.open} onClose={this.props.onCloseModal} center>
          <SectionContainer {...this.props}
            dispatch={this.props.dispatch}/>
        </Modal>
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
    familyNationalityIndicator: state.familyMembers.familyNationalityIndicator,
    addButtonTask: state.familyMembers.addButtonTask,
    isAddButtonClicked: state.students.isAddButtonClicked
  })
}
export default connect(mapStateToProps)(ModalComponent)