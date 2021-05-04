import React, {useState} from 'react';
import Link from '../router/Link';
import Button from './Button';
import Card from './Card';
import '../css/Register.css';
import api from '../services/api'

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');

  const onFormSubmit = (event) => {
    event.preventDefault();

    if(password === passwordVerify) {
      console.log(name + ' ' + email + ' ' + password);
      sendRegisterRequest();
    }else{
      console.log('failed register');
    }

  };

  const sendRegisterRequest = async () => {
    const response = await api.post('register', {
        name: name,
        email: email,
        password: password,
        guest: 0
    });
  }

  return (
    <Card width="20rem">

          <div className="content">
            <div className="header">
              Register
            </div>
          </div>

          <div className="content">
            <form className="ui large form" onSubmit={onFormSubmit}>

                <div className="field">
                  <label className="left aligned">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label className="left aligned">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                  />
                </div>

                <div className="field">
                  <label className="left aligned">
                    Verify Password
                  </label>
                  <input
                    type="password"
                    placeholder="Verify Password"
                    value={passwordVerify}
                    onChange={e => setPasswordVerify(e.target.value)}
                  />
                </div>

                <br></br>

                <Link href="/">
                  <Button
                    className="custom-button dark thin span"
                    type="submit"
                    onClick={onFormSubmit}>
                      Register
                  </Button>
                </Link>
              </form>

            <br></br>
            <Link href='/login'>
              <p style={{fontSize: "1.14285714rem"}}>Already have an account? Login</p>
            </Link>

          </div>
        </Card>

  );

};

export default Register;
