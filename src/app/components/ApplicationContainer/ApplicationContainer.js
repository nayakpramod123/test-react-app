import React from 'react'
import {
  fetchStudentsLists,
  updateActiveSectionId,
  selectedStudentRow,
  submitSectionStudent,
  roleSelected,
  disableNationalityOnAdd,
  submitButtonValue,
  fetchNationalityForStudents,
  fetchFamilyMembersForStudents, addFamilyMemberButton
} from '../../store/actions/action-creators'
import connect from 'react-redux/es/connect/connect'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import Modal from '../Modal/Modal'
import './ApplicationContainer.css'

class ApplicationContainer extends React.Component {
  constructor (props) {
    super(props)
    this.setActiveSection = this.setActiveSection.bind(this)
    this.onRowClick = this.onRowClick.bind(this)
    this.selectChange= this.selectChange.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchStudentsLists())
    this.props.dispatch(submitSectionStudent(true))
  }

  setActiveSection() {
    this.props.dispatch(selectedStudentRow(null))
    this.props.dispatch(submitSectionStudent(false))
    this.props.dispatch(disableNationalityOnAdd(true))
    this.props.dispatch(submitButtonValue('Save Changes'))
    this.props.dispatch(fetchNationalityForStudents(0))
    this.props.dispatch(fetchFamilyMembersForStudents(0))
    this.props.dispatch(addFamilyMemberButton(true))
  }

  onRowClick(row){
    this.props.dispatch(selectedStudentRow(row))
    this.props.dispatch(submitSectionStudent(false))
    this.props.dispatch(disableNationalityOnAdd(false))
    this.props.dispatch(submitButtonValue('Update Changes'))
    this.props.dispatch(fetchNationalityForStudents(row.ID))
    this.props.dispatch(fetchFamilyMembersForStudents(row.ID))
    this.props.dispatch(addFamilyMemberButton(false))
    $('#myModal').modal('show')
  }

  selectChange(event) {
    if (event.target.value === '1') {
      this.props.dispatch(roleSelected(false))
    } else if (event.target.value === '2') {
      this.props.dispatch(roleSelected(true))
    } else  {
      this.props.dispatch(roleSelected(false))
    }
  }

  render () {
   const options = {
      onRowClick: this.props.isRegistar ? this.onRowClick : null
    }

    return (
      <div className={'Application-container'}>
        <a data-toggle="modal" href="#myModal" className="btn btn-primary" onClick={this.setActiveSection} disabled={this.props.isRegistar}>Add Student</a>
        <div className='roleDiv'>
          <label htmlFor="role">Select Role:</label>
          <select id="role" name="role" onChange={this.selectChange} className='ApplicationSelect'>
            <option value="0">-- Select --</option>
            <option value="1">Admin</option>
            <option value="2">Registrar</option>
          </select>
        </div>
        <Modal
          selectedStudentData={this.props.selectedStudentData}
          isRegistar={this.props.isRegistar}/>
        < br />
        <BootstrapTable data={this.props.studentData} options={ options } remote={ true } striped hover version='4'>
          <TableHeaderColumn isKey dataField='ID'>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='firstName'>First Name</TableHeaderColumn>
          <TableHeaderColumn dataField='lastName'>Last Name</TableHeaderColumn>
          <TableHeaderColumn dataField='dateOfBirth'>Date Of Birth</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    studentData: state.students.studentData,
    selectedStudentData: state.students.selectedStudentData,
    isRegistar: state.students.isRegistar
  })
}
export default connect(mapStateToProps)(ApplicationContainer)
