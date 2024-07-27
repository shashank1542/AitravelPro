// import React, { useEffect, useState } from 'react';
import { auth, provider } from './firebase-config';
// import { signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from  "firebase/auth";
// import { auth, provider } from  "./utils/firebase-config";
import { useState } from  "react";
import  TripForm  from  "./TripForm";
import { Button } from  "@mui/material";

function App() {
  const [user, setUser] = useState(null);

  const  signInWithGoogle  = () => {
		signInWithPopup(auth, provider)
		.then((result) => {
			const  user  =  result.user;
			setUser({
				name:  user.displayName,
				email:  user.email,
			});
			console.log(user);
			})
		.catch((error) => {
			console.log(error);
			}); 
  };

  return (
    <div  style={{ display:  "grid", justifyContent:  "center" }}>
      <div  style={{ display:  "grid", justifyContent:  "center" }}>
        <h1>Welcome to My Travel Planner</h1>
      </div>
      {user ? (
        <div>
          <div  style={{ display:  "grid", justifyContent:  "center" }}>
            <p>Welcome, {user.name}</p>
          </div>
          <TripForm  />
        </div>
      ) : (
      <Button variant="contained" color="primary" fullWidth onClick={signInWithGoogle}>Sign in with Google</Button>)}
    </div>
    );
}

export default App;
