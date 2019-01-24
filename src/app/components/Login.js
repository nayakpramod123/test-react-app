import React from 'react'
import { loginUser } from '../store/actions/action-creators'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imageSource: null,
      user: {},
      verificationCode: '',
      email: '',
      password: ''
    }
    this.emailChange = this.emailChange.bind(this)
    this.passChange = this.passChange.bind(this)
    this.login = this.login.bind(this)
  }

  emailChange (event) {
    this.setState({email: event.target.value})
  }

  passChange (event) {
    this.setState({password: event.target.value})
  }

  login () {
    this.props.dispatch(loginUser(this.state.email, this.state.password, ''))
    if (this.props.authentication.isVerified) {
      this.props.routeProps.history.push('/otp')
    } else {
      this.props.routeProps.history.push('/setup')
    }
  }

  render () {
    return (
      <div className='card'>
        <div className='col-md-4 col-md-offset-4'>
          <div className='form-group'>
            <label htmlFor='email'>Email address:</label>
            <input type='email' className='form-control' id='email' onChange={this.emailChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='pwd'>Password:</label>
            <input type='password' className='form-control' id='pwd' onChange={this.passChange} />
          </div>
          <div className='checkbox'>
            <label><input type='checkbox' /> Remember me </label>
          </div>
          <button onClick={this.login} className='btn btn-default'>Submit</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state, {})
}
Login.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Login)
