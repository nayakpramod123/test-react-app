import React from 'react'
import '../Sections/SectionContainer.css'
import {
  saveStudentList,
  submitSectionStudent,
  updateFamilyMembers, updateFamilyMembersForStudents, updateNationalityForFamilyMembers,
  updateStudentData
} from '../../store/actions/action-creators'
import TextBox from '../Simple/TextBox'
import Date from '../Simple/Date'

class FamilySection extends React.Component {
  constructor (props) {
    super(props)
    this.state ={
      newFamilyData: {}
    }
    this.addFamilyChange = this.addFamilyChange.bind(this)
    this.saveData = this.saveData.bind(this)
    this.onFamilyNationalityChange = this.onFamilyNationalityChange.bind(this)
  }
  onFamilyNationalityChange(event) {
    this.props.dispatch(updateNationalityForFamilyMembers(this.props.selectedFamilyRow ? this.props.selectedFamilyRow.ID : '', event.target.value))
  }
  addFamilyChange(event) {
    let newData = this.state.newFamilyData
    newData[event.target.name] = event.target.value
    this.setState({newFamilyData: newData})
  }
  saveData() {
    if (event.target.name === 'Save Changes') {
      this.props.dispatch(updateFamilyMembers(this.state.newFamilyData, this.props.selectedStudentData ? this.props.selectedStudentData.ID : ''))
      this.props.hideResults()
    } else if (event.target.name === 'Update Changes') {
      this.props.dispatch(updateFamilyMembersForStudents(this.state.newFamilyData, this.props.selectedFamilyRow ? this.props.selectedFamilyRow.ID : ''))
      this.props.hideResults()
    }
  }
  render () {
    const relationShips = [
      {
        value: 'Parent',
        text: 'Parent'
      },
      {
        value: 'Sibling',
        text: 'Sibling'
      },
      {
        value: 'Spouse',
        text: 'Spouse'
      }
    ]
    return (
      <div >
        <TextBox
          change={this.addFamilyChange}
          labelText='First Name'
          type='firstName'
          placeHolder='Your first name..'
          submitStudentSection={this.props.submitStudentSection}
          isRegistar={this.props.isRegistar}
          defaultValue={this.props.selectedFamilyRow ? this.props.selectedFamilyRow.firstName : ''}
        />
        <TextBox
          change={this.addFamilyChange}
          labelText='Last Name'
          type='lastName'
          placeHolder='Your last name..'
          submitStudentSection={this.props.submitStudentSection}
          isRegistar={this.props.isRegistar}
          defaultValue={this.props.selectedFamilyRow ? this.props.selectedFamilyRow.lastName : ''}
        />
        <Date
          change={this.addFamilyChange}
          labelText='Date Of Birth'
          type='dateOfBirth'
          submitStudentSection={this.props.submitStudentSection}
          isRegistar={this.props.isRegistar}
          defaultValue={this.props.selectedFamilyRow ? this.props.selectedFamilyRow.dateOfBirth : ''}
        />

        <label htmlFor="relationship">Relation</label>
        <select id="relationship" name="relationship" onChange={this.addFamilyChange}>
          <option value="0">-- Select --</option>
          {relationShips.map(relation => {
            return <option value={relation.value} selected={this.props.selectedFamilyRow ? this.props.selectedFamilyRow.relationship === relation.value : false}>{relation.text}</option>
          })}
        </select>

        <label htmlFor="nationality">Nationality</label>
        <select
          id="nationality"
          name="nationality"
          disabled={!this.props.isRegistar || this.props.familyNationalityIndicator}
          onChange={this.onFamilyNationalityChange}>
          <option value="0">-- Select --</option>
          {this.props.nationalities.map(nationality => {
            return <option value={nationality.ID} selected={this.props.optionState === nationality.ID}>{nationality.Title}</option>
          })}
        </select>
        <br />
        <div className="modal-footer familyFooter">
          <a href="#" onClick={this.props.hideResults} className="btn">Close</a>
          <a className="btn btn-primary"
             name={this.props.addButtonValue}
             disabled={this.props.submitStudentSection || !this.props.isRegistar}
          onClick={this.saveData}>{this.props.addButtonValue}</a>
        </div>
      </div>
    )
  }
}

export default FamilySection
