import React, { useState } from 'react';
import './RegistrationPage.css';
import { Link } from 'react-router-dom';

const RegistrationPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [buildingNumber, setBuildingNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [NIP, setNIPNumber] = useState('');

  const handleRegistration = () => {
    const apiUrl = 'http://localhost:8080/register';

    const requestBody = {
      firstName: firstName,
      email: email,
      password: password,
      postalCode: postalCode,
      street: street,
      lastName: lastName,
      phoneNumber: phoneNumber,
      confirmPassword: confirmPassword,
      city: city,
      buildingNumber: buildingNumber,
      apartmentNumber: apartmentNumber,
      NIP: NIP,
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
          throw new Error('Register failed');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Register successful:', data);
      })
      .catch((error) => {
        console.error('Register error:', error);
      });
  };

  return (
    <>
      <div className='container-register'>
        <div className="registration-page">
          <div className="registration-container">
            <h1>Zarejestruj się</h1>

                <div className='form-container'>
                    <div className='leftColumn'>
                        <div className="form-group">
                            <label htmlFor="email">Adres e-mail</label><br />
                            <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Hasło</label><br />
                            <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Powtórz hasło</label><br />
                            <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">Imię</label><br />
                            <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Nazwisko</label><br />
                            <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Nr telefonu</label><br />
                            <input
                            type="text"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            />
                        </div>
                    </div>


                    <div className='rightColumn'>
                        <div className="form-group">
                            <label htmlFor="postalCode">Kod pocztowy</label><br />
                            <input
                            type="text"
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city">Miasto</label><br />
                            <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="street">Ulica</label><br />
                            <input
                            type="text"
                            id="street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="buildingNumber">Nr budynku</label><br />
                            <input
                            type="text"
                            id="buildingNumber"
                            value={buildingNumber}
                            onChange={(e) => setBuildingNumber(e.target.value)}
                            required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apartmentNumber">Nr lokalu</label><br />
                            <input
                            className='numberHouse'
                            type="text"
                            id="apartmentNumber"
                            value={apartmentNumber}
                            onChange={(e) => setApartmentNumber(e.target.value)}
                            />
                        </div>
                        <div className='NrNip'>
                            <div className="form-group">
                                <label htmlFor="NIP">Nr NIP</label><br />
                                <input
                                type="text"
                                id="NIP"
                                value={NIP}
                                onChange={(e) => setNIPNumber(e.target.value)}
                                required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                
                <button onClick={handleRegistration} className='registrationButton'>Zarejestruj się</button>
          </div>
          <div className='loginButton'>
            <div>Masz konto? <Link to="/login">Zaloguj się</Link></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
