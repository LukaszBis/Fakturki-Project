import React, { useEffect, useState } from 'react';
import styles from './UserSettingsPage.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Cookies from "js-cookie";

let emailFeedback:string;
let passwordFeedback:string;
let newPasswordFeedback:string;
let confirmPasswordFeedback:string;

const LoginData: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailActivated_at, setEmailActivated_at] = useState(false);
  const [emailChanged, setEmailChanged] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
 

//   const [validated, setValidated] = useState(false);
//   const [validatedEmail, setValidatedEmail] = useState(false);
//   const [validatedPassword, setValidatedPassword] = useState(false);
//   const [validatedNewPassword, setValidatedNewPassword] = useState(false);
  // const [validatedConfirmPassword, setValidatedConfirmPassword] = useState(false);
  
  
  useEffect( () => {
    const user = Cookies.get('user');
    const details = true;
    const active = true;
    if(user != ''){
        const apiUrl = 'http://localhost:8080/auth';
        
        const requestBody = {
            user: user,
            details: details,
            active: active,
        };
        console.log(requestBody)
        fetch(apiUrl, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
        .then((response) => {
          if (response.status == 500) {
              throw new Error('Błąd serwera');
          }
          return response.json();
        })
        .then((data) => {
          if(data.active){
            console.log("Aktywuj adres email")
            setEmailActivated_at(data.active)
          }
          if(data.details){
            console.log(data.details)
            setEmail(data.details.email)
          }
        })
        .catch((error) => {
            console.log(error);
        });
    }else{
      document.location.href = '/welcome';
    }
  }, []);

  
  const handleGetInfoUserPage = () => {
    const user = Cookies.get('user');
    const apiUrl = 'http://localhost:8080/setUserSettings/loginData';

    const requestBody = {
      user: user,
      email: email,
      password: password,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };
    console.log(requestBody)
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Reset password failed: User not found');
      }
      return response.json();
    })
    .then((data) => {
      if(data.updated.email) 
      {
        //data.updated.email true jeśli email został zmieniony
        console.log("Email updated");
        setEmailChanged(true);
      }
      else if(data.errors.email.length > 0)
      {
        //data.errors.email tablica błędów
        console.log(data.errors.email[0]);
        emailFeedback = data.errors.email[0];
      }
      if(data.updated.password){
        console.log("Hasło zostało pomyślnie zmienione");
        setPasswordChanged(true);
      }else{
        if(data.errors.password[0]){
          passwordFeedback = data.errors.password[0]
        }
        if(data.errors.newPassword[0]){
          newPasswordFeedback = data.errors.newPassword[0]
        }
        if(data.errors.confirmPassword[0]){
          confirmPasswordFeedback = data.errors.confirmPassword[0]
        }
      }
    });
  };
  
  const handleReactivate = () => {
    const apiUrl = 'http://localhost:8080/reactivate';

    const requestBody = {
      email:email
    };
    console.log(requestBody)
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
    .then((response) => {
      if (response.status == 500) {
        throw new Error('Błąd serwera');
      }
      return response.json();
    })
    .then((data) => {
      if(data.success) 
      {
        console.log('Correct email:', data.success);
      }
      else
      {
        console.log('Correct email:', data.fail);
      }
    });
  };

  return (
    <>
        <div className={styles.form_container}>
            <div className={styles.contentForm}>
                <div className={styles.form_group}>
                    <label htmlFor="email">Adres e-mail</label><br />
                    <InputGroup className={styles.inputText} hasValidation>
                    <Form.Control
                        type="email"
                        id="email"
                        value={email}
                        // isInvalid={validatedEmail}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                        {emailFeedback}
                    </Form.Control.Feedback>
                    </InputGroup>
                </div>
                {emailActivated_at ? <button onClick={handleReactivate}>Wyślij potwierdzenie</button> : null}
                <div className={styles.form_group}>
                    <label htmlFor="password">Bieżące hasło</label><br />
                    <InputGroup className={styles.inputText} hasValidation>
                    <Form.Control
                        type="password"
                        id="password"
                        value={password}
                        // isInvalid={validatedPassword}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                        {passwordFeedback}
                    </Form.Control.Feedback>
                    </InputGroup>
                </div>
                  {passwordChanged && <div className={styles.successMessage}>Hasło zostało zmienione</div>}
                <div className={styles.form_group}>
                    <label htmlFor="newPassword">Nowe hasło</label><br />
                    <InputGroup className={styles.inputText} hasValidation>
                    <Form.Control
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        // isInvalid={validatedNewPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                        {newPasswordFeedback}
                    </Form.Control.Feedback>
                    </InputGroup>
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="confirmPassword">Potwierdź nowe hasło</label><br />
                    <InputGroup className={styles.inputText} hasValidation>
                    <Form.Control
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        // isInvalid={validatedConfirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                        {confirmPasswordFeedback}
                    </Form.Control.Feedback>
                    </InputGroup>
                </div>
                {<button onClick={handleGetInfoUserPage} className={styles.buttonEdit}>Zmień</button>}
            </div>
        </div>
    </>
  );
};

export default LoginData;
