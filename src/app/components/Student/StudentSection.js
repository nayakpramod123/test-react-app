import React from 'react'
import '../../styles/entry.css'
import TextBox from '../Simple/TextBox'
import Date from '../Simple/Date'
import {
  saveStudentList,
  submitSectionStudent,
  updateNationalityForStudents,
  updateStudentData
} from '../../store/actions/action-creators'

class StudentSection extends React.Component {
  constructor (props) {
    super(props)
    this.state ={
      newStudentData: this.props.selectedStudentData ? this.props.selectedStudentData : {}
    }
    this.change = this.change.bind(this)
    this.saveData = this.saveData.bind(this)
    this.onNationalityChange = this.onNationalityChange.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedStudentData !== this.props.selectedStudentData) {
      this.setState({ newStudentData: nextProps.selectedStudentData });
    }
  }
  change(event) {
    this.props.dispatch(submitSectionStudent(false))
    let newData = this.state.newStudentData ? this.state.newStudentData : {}
    newData[event.target.name] = event.target.value
    this.setState({newStudentData: newData})
  }
  onNationalityChange(event){
    this.props.dispatch(updateNationalityForStudents(this.props.selectedStudentData ? this.props.selectedStudentData.ID : '', event.target.value))
    // console.log(event.target.value)
  }
  saveData(event) {
    if (event.target.name === 'Save Changes') {
      this.props.dispatch(saveStudentList(this.state.newStudentData))
      this.props.dispatch(submitSectionStudent(true))
    } else if (event.target.name === 'Update Changes') {
      this.props.dispatch(updateStudentData(this.state.newStudentData, this.props.selectedStudentData ? this.props.selectedStudentData.ID : ''))
      $('#myModal').modal('hide')
    }
  }
  render () {
    const validationCheck = this.state.newStudentData ? this.state.newStudentData.firstName && this.state.newStudentData.lastName && this.state.newStudentData.dateOfBirth : true
    return (
      <div >
        <TextBox {...this.props}
          change={this.change}
          labelText='First Name'
          type='firstName'
          placeHolder='Your first name..'
          defaultValue={this.state.newStudentData ? this.state.newStudentData.firstName : ''}
        />
        <TextBox {...this.props}
          change={this.change}
          labelText='Last Name'
          type='lastName'
          placeHolder='Your last name..'
          defaultValue={this.state.newStudentData ?this.state.newStudentData.lastName : ''}
        />

        <Date {...this.props}
          change={this.change}
          labelText='Date Of Birth'
          type='dateOfBirth'
          defaultValue={this.state.newStudentData ?this.state.newStudentData.dateOfBirth : ''}
        />

        <label htmlFor="nationality">Nationality</label>
        <select
          id="nationality"
          name="nationality"
          disabled={this.props.submitStudentSection || !this.props.isRegistar || this.props.nationalityIndicator}
          onChange={this.onNationalityChange}>
          <option value="0">-- Select --</option>
          {this.props.nationalities.map(nationality => {
            return <option key={nationality.ID} value={nationality.ID} selected={this.props.optionState === nationality.ID}>{nationality.Title}</option>
          })}
        </select>
        <div className="modal-footer studentFooter">
          <a href="#" data-dismiss="modal" className="btn btn-primary">Cancel</a>
          <a href="#" className="btn btn-primary" name={this.props.submitButtonValue} onClick={this.saveData} disabled={this.props.submitStudentSection || (!this.props.isRegistar && !this.props.isAddButtonClicked) || !validationCheck}>{this.props.submitButtonValue}</a>
        </div>
      </div>
    )
  }
}

export default StudentSection
