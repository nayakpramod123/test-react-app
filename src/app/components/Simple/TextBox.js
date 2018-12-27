import React from 'react'
import PropTypes from 'prop-types'

const TextBox = (props) => {
  return (
    <div>
      <label htmlFor={props.type}>{props.labelText}</label>
      <input
        type="text"
        id={props.type}
        name={props.type}
        placeholder={props.placeHolder}
        onChange={props.change}
        disabled={props.submitStudentSection || (!props.isRegistar && !props.isAddButtonClicked)}
        value={props.defaultValue}/>
    </div>
  )
}

TextBox.propTypes = {
  change: PropTypes.func.isRequired,
  submitStudentSection: PropTypes.bool
}

export default TextBox