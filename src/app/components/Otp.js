import React from 'react'
import {
  saveOtp,
  verifyOtp
} from '../store/actions/action-creators'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'

class Otp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      otp: ''
    }
    this.otpChange = this.otpChange.bind(this)
    this.verifyOtp = this.verifyOtp.bind(this)
  }

  otpChange (event) {
    this.setState({otp: event.target.value})
  }

  verifyOtp () {
    this.props.dispatch(saveOtp(this.state.otp))
    this.props.dispatch(verifyOtp(this.state.otp, this.props.authentication.twoFactor.secret))
    this.props.routeProps.history.push('/container')
  }

  render () {
    return (
      <div className='card'>
        <div className='col-md-4 col-md-offset-4'>
          <form>
            <div className='form-group'>
              <label htmlFor='otp'>Enter Otp:</label>
              <input type='otp' className='form-control' id='otp' onChange={this.otpChange} />
            </div>
            <button onClick={this.verifyOtp} className='btn btn-default'>Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state, {})
}
Otp.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Otp)
