import React from 'react'
import {
  deleteSetUp,
  saveOtp,
  setUpAuthentication,
  verifyAuthentication
} from '../store/actions/action-creators'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'

class SetUp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imageSource: null,
      user: {},
      verificationCode: '',
      otp: ''
    }
    this.setUp = this.setUp.bind(this)
    this.otpChange = this.otpChange.bind(this)
    this.confirm = this.confirm.bind(this)
    this.disable = this.disable.bind(this)
    this.moveForward = this.moveForward.bind(this)
  }

  setUp () {
    this.props.dispatch(setUpAuthentication())
  }

  disable () {
    this.props.dispatch(deleteSetUp())
    this.props.routeProps.history.push('/')
  }

  otpChange (event) {
    this.setState({otp: event.target.value})
  }

  confirm () {
    this.props.dispatch(saveOtp(this.state.otp))
    this.props.dispatch(verifyAuthentication(this.state.otp))
    this.props.routeProps.history.push('/container')
  }

  moveForward () {
    if (this.props.authentication.isVerified) {
      this.props.routeProps.history.push('/container')
    }
  }

  render () {
    return (
      <div className='card'>
        {this.props.authentication.twoFactor.secret
          ? <div className='col-md-4 col-md-offset-4'>
            <h3>Current Settings</h3>
            <img src={this.props.authentication.twoFactor.dataURL} alt='...' className='img-thumbnail' />
            <p>Secret - {this.props.authentication.twoFactor.secret || this.props.authentication.twoFactor.tempSecret}</p>
            <p>Type - TOTP</p>
            <button onClick={this.moveForward} className='btn btn-default'>Go to Container</button>
          </div>
          : <div className='col-md-4 col-md-offset-4'>
            <h3>Setup Otp</h3>
            <div>
              <button onClick={this.setUp} className='btn btn-default'>Enable</button>
            </div>
            {this.props.authentication.twoFactor.tempSecret
              ? <span>
                <p>Scan the QR code or enter the secret in Google Authenticator</p>
                <img src={this.props.authentication.twoFactor.dataURL} alt='...' className='img-thumbnail' />
                <p>Secret - {this.props.authentication.twoFactor.tempSecret}</p>
                <p>Type - TOTP</p>
                <div className='form-group'>
                  <label htmlFor='otp'>Enter Otp:</label>
                  <input type='otp' className='form-control' id='otp' onChange={this.otpChange} />
                </div>
                <button onClick={this.confirm} className='btn btn-default'>confirm</button>
              </span> : <span />}

          </div>
        }
        <div className='col-md-1'>
          <h3>Disable</h3>
          <button onClick={this.disable} className='btn btn-danger'>Disable</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state, {})
}
SetUp.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(SetUp)
