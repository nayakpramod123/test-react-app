import React from 'react'
import {
  fetchStudentsLists,
  selectedStudentRow,
  submitSectionStudent,
  roleSelected,
  disableNationalityOnAdd,
  submitButtonValue,
  fetchNationalityForStudents,
  fetchFamilyMembersForStudents, addFamilyMemberButton, isAddButtonClicked
} from '../../store/actions/action-creators'
import connect from 'react-redux/es/connect/connect'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import Modal from '../Modal/Modal'
import '../../styles/entry.css'
import PropTypes from 'prop-types'

class ApplicationContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.setActiveSection = this.setActiveSection.bind(this)
    this.onRowClick = this.onRowClick.bind(this)
    this.selectChange = this.selectChange.bind(this)
    this.onCloseModal = this.onCloseModal.bind(this)
    this.setUp = this.setUp.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  onCloseModal () {
    this.setState({ open: false })
  }

  logOut () {
    this.props.routeProps.history.push('/')
  }

  setUp () {
    this.props.routeProps.history.push('/setup')
  }
  componentDidMount () {
    this.props.dispatch(fetchStudentsLists())
    this.props.dispatch(submitSectionStudent(true))
  }

  setActiveSection () {
    this.setState({ open: true })
    this.props.dispatch(selectedStudentRow(null))
    this.props.dispatch(submitSectionStudent(false))
    this.props.dispatch(disableNationalityOnAdd(true))
    this.props.dispatch(submitButtonValue('Save Changes'))
    this.props.dispatch(fetchNationalityForStudents(0))
    this.props.dispatch(fetchFamilyMembersForStudents(0))
    this.props.dispatch(addFamilyMemberButton(true))
    this.props.dispatch(roleSelected(false))
    this.props.dispatch(isAddButtonClicked(true))
  }

  onRowClick (row) {
    this.props.dispatch(selectedStudentRow(row))
    this.props.dispatch(submitSectionStudent(false))
    this.props.dispatch(disableNationalityOnAdd(false))
    this.props.dispatch(submitButtonValue('Update Changes'))
    this.props.dispatch(fetchNationalityForStudents(row.ID))
    this.props.dispatch(fetchFamilyMembersForStudents(row.ID))
    this.props.dispatch(addFamilyMemberButton(false))
    this.props.dispatch(isAddButtonClicked(false))
    this.setState({ open: true })
  }

  selectChange (event) {
    if (event.target.value === '1') {
      this.props.dispatch(roleSelected(false))
    } else if (event.target.value === '2') {
      this.props.dispatch(roleSelected(true))
      this.props.dispatch(isAddButtonClicked(false))
    } else {
      this.props.dispatch(roleSelected(false))
    }
  }

  render () {
    const options = {
      onRowClick: this.onRowClick
    }
    console.log('Props in container: ', this.props)
    return (
      <div className='Application-container'>
        { (this.props.authentication.isVerified && this.props.authentication.otpVerified)
          ? <div>
            <div>
              <button className='btn btn-primary addButton' onClick={this.setActiveSection} disabled={this.props.isRegistar}>Add Student</button>
              <button className='btn btn-primary addButton' onClick={this.logOut} >Log Out</button>
              <button className='btn btn-primary addButton' onClick={this.setUp} >Go to Set Up</button>
              <div className='roleDiv'>
                <label htmlFor='role'>Select Role:&nbsp;</label>
                <select id='role' name='role' onChange={this.selectChange} className='ApplicationSelect'>
                  <option value='1'>Admin</option>
                  <option value='2'>Registrar</option>
                </select>
              </div>
            </div>
            <Modal
              open={this.state.open}
              onCloseModal={this.onCloseModal}
              selectedStudentData={this.props.selectedStudentData}
              isRegistar={this.props.isRegistar} />
            <br />
            <BootstrapTable data={this.props.studentData} options={options} remote striped hover version='4'>
              <TableHeaderColumn isKey dataField='ID'>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='firstName'>First Name</TableHeaderColumn>
              <TableHeaderColumn dataField='lastName'>Last Name</TableHeaderColumn>
              <TableHeaderColumn dataField='dateOfBirth'>Date Of Birth</TableHeaderColumn>
            </BootstrapTable>
          </div>
          : <div>
            <label>Verification Failed. Login again to verify your authentication</label>
            <button className='btn btn-primary addButton' onClick={this.logOut} >Log Out</button>
          </div>
        }

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
ApplicationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isRegistar: PropTypes.bool,
  selectedStudentData: PropTypes.object,
  studentData: PropTypes.array
}

export default connect(mapStateToProps)(ApplicationContainer)
