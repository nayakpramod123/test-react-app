import React from 'react'
import './SectionContainer.css'
import FamilySection from '../Family/FamilySection'
import StudentSection from '../Student/StudentSection'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import {
  addButtonValue,
  deleteFamilyMembers,
  disableNationalityOnAdd,
  disableNationalityOnAddForFamily,
  fetchNationalityForFamilyMembers,
  selectedFamilyRow
} from '../../store/actions/action-creators'

class SectionContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state={
      showResults: false
    }
    this.showResults = this.showResults.bind(this)
    this.hideResults = this.hideResults.bind(this)
    this.onRowFamilyClick = this.onRowFamilyClick.bind(this)
    this.deleteRow = this.deleteRow.bind(this)
  }
  showResults () {
    this.setState({ showResults: true });
    this.props.dispatch(addButtonValue('Save Changes'))
    this.props.dispatch(fetchNationalityForFamilyMembers(0))
    this.props.dispatch(disableNationalityOnAddForFamily(true))
  }
  hideResults () {
    this.setState({ showResults: false });
  }

  deleteRow(next, dropRowKeys) {
    console.log('Delete Row: ', dropRowKeys[0])
    this.props.dispatch(deleteFamilyMembers(dropRowKeys[0]))
  }

  onRowFamilyClick(row) {
    this.showResults()
    this.props.dispatch(selectedFamilyRow(row))
    this.props.dispatch(addButtonValue('Update Changes'))
    this.props.dispatch(fetchNationalityForFamilyMembers(row.ID))
    this.props.dispatch(disableNationalityOnAddForFamily(false))
  }
  
  renderSection() {
    const options = {
      onRowClick: this.onRowFamilyClick,
      handleConfirmDeleteRow: this.deleteRow
    }
    const selectRowProp = {
      mode: 'radio'
    }
    const section =
      <React.Fragment>
        <div>
          <h3>Basic Information:</h3>
          <br />
          <StudentSection {...this.props}
            dispatch={this.props.dispatch}
            optionState={this.props.studentNationality ? this.props.studentNationality.nationality ? this.props.studentNationality.nationality.ID : '0' : '0'}
          />
        </div>
        <div>
          <h3>Family Information:</h3>
          <br />
          <div className='addFamilyButton'>
            <a className="btn btn-primary" onClick={this.showResults}>Add Family Member</a>
          </div>
          { this.state.showResults ? <FamilySection {...this.props}
            dispatch={this.props.dispatch}
            hideResults = {this.hideResults}
            optionState={this.props.familyNationality ? this.props.familyNationality.ID ? this.props.familyNationality.ID : '0' : '0'}
          /> : null }
          <BootstrapTable data={this.props.studentFamilyMember} deleteRow={ true } selectRow={ selectRowProp } options={ options } remote={ true } striped hover version='4'>
            <TableHeaderColumn isKey dataField='ID'>ID</TableHeaderColumn>
            <TableHeaderColumn dataField='firstName'>First Name</TableHeaderColumn>
            <TableHeaderColumn dataField='lastName'>Last Name</TableHeaderColumn>
            <TableHeaderColumn dataField='dateOfBirth'>Date Of Birth</TableHeaderColumn>
            <TableHeaderColumn dataField='relationship'>Relation</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </React.Fragment>
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
