import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const dateFormat = (date) => {
  let dateValue = moment(date).toDate()
  return (dateValue.getFullYear() + '-' + (dateValue.getMonth() + 1) + '-' + dateValue.getDate() )
}

const Date = (props) => {
  let dateFormatValue = props.defaultValue ? dateFormat(props.defaultValue) : ''
  console.log(dateFormatValue)
  return (
    <div>
      <label htmlFor={props.type}>{props.labelText}</label>
      <input
        type="date"
        id={props.type}
        name={props.type}
        onChange={props.change}
        disabled={props.submitStudentSection || (!props.isRegistar && !props.isAddButtonClicked)}
        value={dateFormatValue}/>
    </div>
  )
}

Date.propTypes = {
  change: PropTypes.func.isRequired,
  submitStudentSection: PropTypes.bool
}

export default Date