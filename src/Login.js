import React from 'react'
import "./Login.css";
import { Button } from '@material-ui/core'
import { auth, provider } from './firebase'
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        })
      })
      .catch(err => alert(err.message))
  }
  return (
    <div className="login">
      <div className="login__container">
        <WhatsAppIcon style={{ color: "green", fontSize: 80 }} />
        <div className="login__text">
          <h2>Sign In to Whatsapp</h2>
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  )
}

export default Login
