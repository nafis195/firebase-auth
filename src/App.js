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
        password: ''
      }
      setUser(signedOutUser);
      console.log(res);
    })
    .catch(err => {

    })
  }

  const handleChange = e => {
    const newUserInfo = {
      ...user
    }
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
  }

  const createAccount = () => {
    console.log(user.email, user.password);
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
      <input type="text" onBlur={handleChange} name="email" placeholder = "Your email"/>
      <br/>
      <input type="password" onBlur={handleChange} name="password" placeholder="password"/>
      <br/>
      <button onClick={createAccount}>Create Account</button>
    </div>
  );
}

export default App;
