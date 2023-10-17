import React, { useEffect, useState } from 'react';
import styles from './NewPasswordPage.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import fakturki from "../assets/fakturki.png";

const NewPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validatedPassword, setValidatedPassword] = useState(false);
  const [token, setToken] = useState<string>('');

  const handleSetNewPassword = () => {
    const apiUrl = 'http://localhost:8080/setNewPassword';

    const requestBody = {
        password: password,
        confirmPassword: confirmPassword,
        token: token,
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
          throw new Error('Set New Password  failed');
        }
        return response.json();
      })
      .then((data) => {
        if(data.success) {
          console.log('Password changed:', data.success);
          document.location.href = '/login';
        }else {
          console.log('Cos sie pospuslo:', data.fail);
        }
      });
  };
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tokenParam = params.get('token');
        if (tokenParam) {
        // Jeśli token został znaleziony w adresie URL, ustaw go w stanie komponentu
        setToken(decodeURIComponent(tokenParam));
        }else{
          document.location.href = '/welcome';
        }
    }, []); // useEffect zostanie uruchomiony tylko raz po pierwszym renderowaniu komponentu
  return (
    <>
    
    <div className={styles.container_new}>
    <div className={styles.logoContainer}>
      <Link to="/welcome" className={styles.logoLink}>
        <img src={fakturki} alt="Fakturki" className={styles.logo} />
      </Link>
    </div>
      <h1 className={styles.newPasswordH1}>Wprowadź nowe hasło</h1>
      <div className={styles.newStyle}>
        <div className={styles.form_container_new}>
          <label htmlFor="password">Nowe Hasło:</label>
          <InputGroup className={styles.inputText} hasValidation>
            <Form.Control
              type="password"
              id="password"
              placeholder='Nowe Hasło'
              value={password}
              isInvalid={validatedPassword}
              onChange={(e) => {
                setValidatedPassword(false);
                setPassword(e.target.value);
              }}
            />
            <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
              Hasło musi składać się z co najmniej 6 znaków.
            </Form.Control.Feedback>
          </InputGroup>

          <label htmlFor="confirmPassword">Potwierdź Hasło:</label>
          <InputGroup className={styles.inputText} hasValidation>
            <Form.Control
              type="password"
              id="confirmPassword"
              placeholder='Potwierdź Hasło'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
              Hasło musi składać się z co najmniej 6 znaków.
            </Form.Control.Feedback>
          </InputGroup>

          <button onClick={handleSetNewPassword} className={styles.newPasswordButton}>Zmień hasło</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default NewPasswordPage;
