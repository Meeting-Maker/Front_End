import React, { useState } from 'react';
import '../css/Login.css';
import Link from '../router/Link';
import Button from './Button';
import Card from './Card';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log(email + ' ' + password)
    // TODO: connect with backend
  };

  return(

    <Card width="20rem" padding="10rem 0 0 0">
      <div className="content">
        <div className="header">
          Login
        </div>
      </div>

      <div className="content">
        <form className="ui large form" onSubmit={onFormSubmit}>
          <div className="field">
            <label className="left aligned">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label className="left aligned">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Link href="/">
              <p style={{fontSize: "1"}}>Forgot your password?</p>
            </Link>
          </div>

          <div>
            <Link>
              <Button
                className="custom-button dark thin span"
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
    </Card>


  );

};

export default Login;
