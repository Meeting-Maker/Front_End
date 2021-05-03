import React, { useState } from 'react';
import '../css/Login.css';
import Link from '../router/Link';
import Button from './Button';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(email + ' ' + password)
    // TODO: connect with backend
  };

  return(

    <div className="ui centered grid" style={{paddingTop: "15rem"}}>
      <div className="ui container" style={{width: "25%"}}>
        <div className="ui grey fluid card">

            <div className="content">
              <div className="header">
                Login
              </div>
            </div>

              <div className="content">
                <form className="ui large form" onSubmit={onFormSubmit}>

                  <div className="field">
                    <input
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="field">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />

                    <Link href="/">
                      <p style={{fontSize: "1"}}>Forgot your password?</p>
                    </Link>

                  </div>

                  <div>
                    <Link>
                      <Button
                        className="custom-button dark login"
                        type="submit"
                        onClick={onFormSubmit}>
                          Login
                      </Button>
                    </Link>
                  </div>

                </form>

                <br></br>

                <Link href='/register'>
                  <p style={{fontSize: "1.14285714rem"}}>Don't have an account? Register</p>
                </Link>

              </div>
            </div>
          </div>
        </div>


  );

};

export default Login;
