import React from 'react'
import PropTypes from 'prop-types'

const Date = (props) => {
  return (
    <div>
      <label htmlFor={props.type}>{props.labelText}</label>
      <input
        type="date"
        id={props.type}
        name={props.type}
        onChange={event=> {props.change(event)}}
        disabled={props.submitStudentSection || !props.isRegistar}
        defaultValue={props.defaultValue}/>
    </div>
  )
}

Date.propTypes = {
  change: PropTypes.func.isRequired,
  submitStudentSection: PropTypes.bool
}

export default Date