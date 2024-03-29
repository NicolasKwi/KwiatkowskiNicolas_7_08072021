import React, { useState } from "react";
import axios from "axios";
import { setProfilUser } from "../utils";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // envoie une souscription utilisateur
  const handleSignup = (e) => {
    e.preventDefault();
    const signupError = document.querySelector(".signup_error");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/auth/signup`,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        if (!res.data.profil || !res.data.profil.token) {
          signupError.innerHTML = "Profil non trouvé";
        } else {
          //memorise le profil
          setProfilUser(res.data.profil);
          window.location = "/acceuil";
        }
      })
      .catch((err) => {
        if (err.response.data.error) {
          signupError.innerHTML = err.response.data.error;          
        } else {
          alert(err);
        }
      });
  };

  return (
    <div className="signup">
      <h1>Inscription :</h1>

      <form className="signup-form" action="" onSubmit={handleSignup}>
        <label htmlFor="signup_email">E-mail : </label>
        <input
          type="email"
          id="signup_email"
          name="signup_email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />

        <label htmlFor="signup_password">Mot de passe : </label>
        <input
          type="password"
          id="signup_password"
          name="signup_password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <div className="signup_error"></div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
