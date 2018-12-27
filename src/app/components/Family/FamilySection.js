import React from 'react'
import '../../styles/entry.css'
import {
  updateFamilyMembers, updateFamilyMembersForStudents, updateNationalityForFamilyMembers
} from '../../store/actions/action-creators'
import TextBox from '../Simple/TextBox'
import Date from '../Simple/Date'

class FamilySection extends React.Component {
  constructor (props) {
    super(props)
    this.state ={
      newFamilyData: this.props.selectedFamilyRow ? this.props.selectedFamilyRow : {}
    }
    this.addFamilyChange = this.addFamilyChange.bind(this)
    this.saveData = this.saveData.bind(this)
    this.onFamilyNationalityChange = this.onFamilyNationalityChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedFamilyRow !== this.props.selectedFamilyRow) {
      this.setState({ newFamilyData: nextProps.newFamilyData });
    }
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
    const validationCheck = this.state.newFamilyData ? this.state.newFamilyData.firstName && this.state.newFamilyData.lastName && this.state.newFamilyData.dateOfBirth : true
    return (
      <div >
        <TextBox {...this.props}
          change={this.addFamilyChange}
          labelText='First Name'
          type='firstName'
          placeHolder='Your first name..'
          defaultValue={this.state.newFamilyData ? this.state.newFamilyData.firstName : ''}
        />
        <TextBox {...this.props}
          change={this.addFamilyChange}
          labelText='Last Name'
          type='lastName'
          placeHolder='Your last name..'
          defaultValue={this.state.newFamilyData ? this.state.newFamilyData.lastName : ''}
        />
        <Date {...this.props}
          change={this.addFamilyChange}
          labelText='Date Of Birth'
          type='dateOfBirth'
          defaultValue={this.state.newFamilyData ? this.state.newFamilyData.dateOfBirth : ''}
        />

        <label htmlFor="relationship">Relation</label>
        <select id="relationship" name="relationship" onChange={this.addFamilyChange}>
          <option value="0">-- Select --</option>
          {relationShips.map(relation => {
            return <option value={relation.value} selected={this.state.newFamilyData.relationship === relation.value}>{relation.text}</option>
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
             disabled={this.props.submitStudentSection || !this.props.isRegistar || !validationCheck}
          onClick={this.saveData}>{this.props.addButtonValue}</a>
        </div>
      </div>
    )
  }
}

export default FamilySection
