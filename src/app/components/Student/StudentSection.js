import React from 'react'
import '../Sections/SectionContainer.css'
import TextBox from '../Simple/TextBox'
import Date from '../Simple/Date'
import { saveStudentList, submitSectionStudent } from '../../store/actions/action-creators'

class StudentSection extends React.Component {
  constructor (props) {
    super(props)
    this.state ={
      newStudentData: {}
    }
    this.change = this.change.bind(this)
    this.saveData = this.saveData.bind(this)
  }
  componentDidMount() {
  }
  change(event) {
    let newData = this.state.newStudentData
    newData[event.target.name] = event.target.value
    this.setState({newStudentData: newData})
  }
  saveData() {
    // console.log('Save Data')
    this.props.dispatch(saveStudentList(this.state.newStudentData))
    this.props.dispatch(submitSectionStudent(true))
  }
  render () {
    return (
      <div >
        <TextBox
          change={event => {this.change(event)}}
          labelText='First Name'
          type='firstName'
          placeHolder='Your first name..'
          submitStudentSection={this.props.submitStudentSection}
          isRegistar={this.props.isRegistar}
          defaultValue={this.props.selectedStudentData ? this.props.selectedStudentData.firstName : ''}
        />
        <TextBox
          change={event => {this.change(event)}}
          labelText='Last Name'
          type='lastName'
          placeHolder='Your last name..'
          submitStudentSection={this.props.submitStudentSection}
          isRegistar={this.props.isRegistar}
          defaultValue={this.props.selectedStudentData ? this.props.selectedStudentData.lastName : ''}
        />

        <Date
          change={event => {this.change(event)}}
          labelText='Date Of Birth'
          type='dateOfBirth'
          submitStudentSection={this.props.submitStudentSection}
          isRegistar={this.props.isRegistar}
          defaultValue={this.props.selectedStudentData ? this.props.selectedStudentData.dateOfBirth : ''}
        />

        <label htmlFor="nationality">Nationality</label>
        <select id="nationality" name="nationality" disabled={this.props.submitStudentSection || !this.props.isRegistar}>
          <option value="0">-- Select --</option>
          {this.props.nationalities.map(nationality => {
            return <option value={nationality.ID} >{nationality.Title}</option>
          })}
        </select>
        {this.props.activeSectionId === 1 ?
          <div className="modal-footer studentFooter">
            <a href="#" data-dismiss="modal" className="btn">Close</a>
            <a href="#" className="btn btn-primary" onClick={this.saveData} disabled={this.props.submitStudentSection || !this.props.isRegistar}>Save changes</a>
          </div> : <span />}
      </div>
    )
  }
}

export default StudentSection
