import React from 'react'
import '../Sections/SectionContainer.css'
import { addFamilyRow } from '../../store/actions/action-creators'

class FamilySection extends React.Component {
  constructor (props) {
    super(props)
    this.addFamilyRow = this.addFamilyRow.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(addFamilyRow())
  }
  addFamilyRow() {

  }
  render () {
    return (
      <div >
        <label htmlFor="fName">First Name</label>
        <input type="text" id="fName" name="firstName" placeholder="Your first name.." />

        <label htmlFor="lName">Last Name</label>
        <input type="text" id="lName" name="lName" placeholder="Your last name.." />

        <label htmlFor="relation">Relation</label>
        <select id="relation" name="relation">
          <option value="0">-- Select --</option>
          <option value="1">Parent</option>
          <option value="2">Sibling</option>
          <option value="3">Spouse</option>
        </select>

        <label htmlFor="nationality">Nationality</label>
        <select id="nationality" name="nationality">
          <option value="0">-- Select --</option>
          {this.props.nationalities.map(nationality => {
            return <option value={nationality.ID}>{nationality.Title}</option>
          })}
        </select>
        <br />
        <div className='addFamilyButton'>
          <a className="btn btn-primary">Add Family Member</a>
        </div>
        {this.props.activeSectionId === 2 ?
          <div className="modal-footer familyFooter">
            <a href="#" data-dismiss="modal" className="btn">Close</a>
            <button className="btn btn-primary">Save changes</button>
          </div> : <span />}
      </div>
    )
  }
}

export default FamilySection
