import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


firebase.initializeApp(firebaseConfig)


function App() {
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        console.log(displayName, email, photoURL);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          photo: '',
          email: '',
          password: '',
          isValid: false
        }
        setUser(signedOutUser);
        console.log(res);
      })
      .catch(err => {

      })
  }

  const is_valid_email = email => /(.+)@(.+){2,}\.(.+){2,}/.test(email);
  const hasNumber = input => /\d/.test(input);

  const handleChange = e => {
    const newUserInfo = {
      ...user
    }

    // perform validation
    let isValid = true;
    if(e.target.name === 'email') {
      isValid = is_valid_email(e.target.value);
    }
    if(e.target.name === 'password') {
      isValid = e.target.value > 8 && hasNumber(e.target.value);
    }

    newUserInfo[e.target.name] = e.target.value;
    newUserInfo.isValid = isValid;
    setUser(newUserInfo);
  }

  const createAccount = () => {
    if (user.isValid) {
      console.log(user.email, user.password);
    }
    else{
      console.log('not valid');
    }
  }

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button> : <button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <h1>Out Own Auth</h1>
      <form onSubmit={createAccount}>
        <input type="text" onBlur={handleChange} name="email" placeholder="Your email" required />
        <br />
        <input type="password" onBlur={handleChange} name="password" placeholder="password" required />
        <br />
        <input type="submit" value="Create Account" />
      </form>
    </div >
  );
}

export default App;
