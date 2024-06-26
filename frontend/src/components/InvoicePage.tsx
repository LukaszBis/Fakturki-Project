import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import fakturki from "../assets/fakturki.png";
import styles from '../css/InvoicePage.module.css';
import Cookies from "js-cookie";
import { Form, InputGroup } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Link } from 'react-router-dom';
import logo from "../assets/fakturki.png"

var date = new Date()
// date = today.getFullYear() + '.' + (today.getMonth() + 1) + '.' + today.getDate();
const futureDate = date.getDate();
    date.setDate(futureDate);
    const defaultValue = date.toLocaleDateString('en-CA');

    const defaultPrice = 0.01;

var id=1, valuen:number, vatprice:number, valueb:number, sum=0

let services:any = []
var details:any = []

// const account = "12345678901234567890123456"

// console.log(account.substring(0,2))
// console.log(account.substring(2,6))
// console.log(account.substring(6,10))
// console.log(account.substring(10,14))
// console.log(account.substring(14,18))
// console.log(account.substring(18,22))
// console.log(account.substring(22,26))

const InvoiceForm = () => {
    const [rows, setRows] = useState(services)
    const [name, setName] = useState("")
    const [jm, setJm] = useState("Usługa")
    const [quantity, setQuantity] = useState(1)
    // const [price, setPrice] = useState(0.01)
    const [price, setPrice] = useState(defaultPrice)
    // console.log(price)
    const [vat, setVat] = useState(23)
    const [client, setClient] = useState("")
    const [dateIssuance, setDateIssuance] = useState(defaultValue)
    const [dateSell, setDateSell] = useState("")
    const [place, setPlace] = useState("")
    const [payDate, setPayDate] = useState("")
    const [payType, setPayType] = useState("Przelew")
    const [account, setAccount] = useState("")
    // const [tmpaccount, settmpAccount] = useState("")
    const [seller, setSeller] = useState(details.firstName)
    const [totalPrice, setTotalPrice] = useState(0)
    const [, setdetailsTable] = useState(details)
    const [nipArray, setNipArray] = useState(details)
    const [validatedValues, setValidatedValues] = useState({
        client: false,
        dateIssuance: false,
        dateSell: false,
        place: false,
        payDate: false,
        payType: false,
        account: false,
        seller: false,
        name: false,
        jm: false,
        quantity: false,
        price: false,
        vat: false,
        services: false
    })
    const [feedbackValues, setFeedbackValues] = useState({
        client: '',
        dateIssuance: '',
        dateSell: '',
        place: '',
        payDate: '',
        payType: '',
        account: '',
        seller: '',
        name: '',
        jm: '',
        quantity: '',
        price: '',
        vat: '',
        services: ''
    })
        

    useEffect( () => {
        const user = Cookies.get('user');
        if(user){
            // const apiUrl = 'http://localhost:8080/auth';
            
            // const requestBody = {
            //     user: user,
            //     active: true,
            //     details: true,
            //     nip: true
            // };
            // // console.log(requestBody)
            // fetch(apiUrl, {
            //     method: 'POST',
            //     headers: {
            //     'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(requestBody),
            // })
            // .then((response) => {
            //     if (response.status == 500) {
            //         throw new Error('Błąd serwera');
            //     }
            //     return response.json();
            // })
            // .then((data) => {
            //     if(data.active){
            //       console.log("Aktywuj adres email")
            //     }else{
                    // if(data.details){
        
                    //     details = data.details
                    //     setdetailsTable(details)
                    //   console.log("detale:", details)

                    //   const accounttmpnumber = details.accountNumber.substring(0,2) +' '+ 
                    //     details.accountNumber.substring(2,6) +' '+
                    //     details.accountNumber.substring(6,10) +' '+
                    //     details.accountNumber.substring(10,14) +' '+
                    //     details.accountNumber.substring(14,18) +' '+
                    //     details.accountNumber.substring(18,22) +' '+
                    //     details.accountNumber.substring(22,26);

                    //     setAccount(accounttmpnumber)
                    //     // console.log(accounttmpnumber)
                    // //   setAccount(tmpaccount)
                    //   setSeller(details.firstName + " " + details.lastName)
                    //   setPlace(details.city)
                      
                    //   // AddNewRow()
                    // //   console.log(detailsTable)
                    // }
            //         if(data.nipArray){
            //             // console.log("nipy:", data.nipArray)
            //             setNipArray(data.nipArray)
            //         }
            //     }
            //     // else{
            //     //     document.location.href = '/welcome';
            //     // }
            // })
            // .catch((error) => {
            //     console.log(error);
            // });




        const authUrl = 'http://localhost:8080/auth';
        const activeUrl = 'http://localhost:8080/getactive';
        const nipUrl = 'http://localhost:8080/getnips';
        const detailsUrl = 'http://localhost:8080/getdetails';
        
        const requestBody = {
            user: user
        };
        console.log(requestBody)
        fetch(authUrl, {
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
          if(data.fail){
            document.location.href = '/welcome';
          }
        })
        .catch((error) => {
            console.log(error);
        });
    
        fetch(activeUrl, {
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
        if(!data.success){
            document.location.href = '/welcome';
        }
        })
        .catch((error) => {
            console.log(error);
        });


        fetch(detailsUrl, {
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
            if(data.success){
                details = data.success
                setdetailsTable(details)
                console.log("detale:", details)

                const accounttmpnumber = details.accountNumber.substring(0,2) +' '+ 
                details.accountNumber.substring(2,6) +' '+
                details.accountNumber.substring(6,10) +' '+
                details.accountNumber.substring(10,14) +' '+
                details.accountNumber.substring(14,18) +' '+
                details.accountNumber.substring(18,22) +' '+
                details.accountNumber.substring(22,26);

                setAccount(accounttmpnumber)
                // console.log(accounttmpnumber)
            //   setAccount(tmpaccount)
                setSeller(details.firstName + " " + details.lastName)
                setPlace(details.city)
            }
          })
          .catch((error) => {
              console.log(error);
          });

          fetch(nipUrl, {
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
            if(data.success){
                setNipArray(data.success)
            }
          })
          .catch((error) => {
              console.log(error);
          });
        }else{
          document.location.href = '/welcome';
        }
      }, []);

    const handleDelete = (id:any) => {
        let copyrows = [...rows]
        copyrows = copyrows.filter(
            (_, index) => id !=index
        )
        setRows(copyrows)
        // console.log(rows)
    }

    const Row = (props:any) => {
        const {NAME, JM, QUANTITY, PRICE, VALUEN, VAT, VATPRICE, VALUEB, index, delRow} = props
        return(
            <tr>
                <td>{index+1}</td>
                <td>{NAME}</td>
                <td>{JM}</td>
                <td>{QUANTITY}</td>
                <td>{PRICE}</td>
                <td>{VALUEN}</td>
                <td>{VAT}</td>
                <td>{VATPRICE}</td>
                <td>{VALUEB}</td>
                <td><button onClick={() => delRow(index)}><i className="fa-solid fa-trash"></i></button></td>
            </tr>
        )
    }
    
    const Table = (props:any) => {
        const {data, delRow} = props
        return(
            <tbody>
                {data.map((row: any,index:any) => 
                    <Row key = {index}
                        ID = {row.ID}
                        NAME = {row.NAME}
                        JM = {row.JM}
                        QUANTITY = {row.QUANTITY}
                        PRICE = {row.PRICE}
                        VALUEN = {row.VALUEN}
                        VAT = {row.VAT}
                        VATPRICE = {row.VATPRICE}
                        VALUEB = {row.VALUEB}
                        delRow = {delRow}
                        index = {index}
                    />
                )}
            </tbody>
        )
    }

    const handleAddService = () => {
        const apiUrl = 'http://localhost:8080/addService';

        const requestBody = {
            NAME:name, 
            JM:jm, 
            QUANTITY:quantity, 
            PRICE:price, 
            VAT:vat
        };
    
        // console.log(requestBody)
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
          .then((response) => {
            if (!response.ok) {
                throw new Error('Błąd serwera');
            }
            return response.json();
        })
        .then((data) => {
            if(data.success){
                AddNewRow()
            }else{
                console.log(data.errors);
                if(data.errors.name != "") {
                    setValidatedValues((prev) => ({
                        ...prev, 
                        name: true
                    }));
                    setFeedbackValues((prev) => ({
                        ...prev, 
                        name: data.errors.name[0]
                    }));
                    // feedbackValues.client = data.errors.client[0]
                    }else{
                    setValidatedValues((prev) => ({
                        ...prev, 
                        name: false
                    }));
                }

                if(data.errors.jm != "") {
                    setValidatedValues((prev) => ({
                        ...prev, 
                        jm: true
                    }));
                    setFeedbackValues((prev) => ({
                        ...prev, 
                        jm: data.errors.jm[0]
                    }));
                    // feedbackValues.client = data.errors.client[0]
                    }else{
                    setValidatedValues((prev) => ({
                        ...prev, 
                        jm: false
                    }));
                }

                if(data.errors.quantity != "") {
                    setValidatedValues((prev) => ({
                        ...prev, 
                        quantity: true
                    }));
                    setFeedbackValues((prev) => ({
                        ...prev, 
                        quantity: data.errors.quantity[0]
                    }));
                    // feedbackValues.client = data.errors.client[0]
                    }else{
                    setValidatedValues((prev) => ({
                        ...prev, 
                        quantity: false
                    }));
                }

                if(data.errors.price != "") {
                    setValidatedValues((prev) => ({
                        ...prev, 
                        price: true
                    }));
                    setFeedbackValues((prev) => ({
                        ...prev, 
                        price: data.errors.price[0]
                    }));
                    // feedbackValues.client = data.errors.client[0]
                    }else{
                    setValidatedValues((prev) => ({
                        ...prev, 
                        price: false
                    }));
                }

                if(data.errors.vat != "") {
                    setValidatedValues((prev) => ({
                        ...prev, 
                        vat: true
                    }));
                    setFeedbackValues((prev) => ({
                        ...prev, 
                        vat: data.errors.vat[0]
                    }));
                    // feedbackValues.client = data.errors.client[0]
                    }else{
                    setValidatedValues((prev) => ({
                        ...prev, 
                        vat: false
                    }));
                }
            }
        });
      };

    function AddNewRow(){
        valuen = quantity * price
        vatprice = valuen * (vat / 100)
        vatprice = Math.ceil((vatprice) * 100) / 100;
        valueb = valuen + vatprice
        valueb = Math.ceil((valueb) * 100) / 100;
        setRows([...rows,{ID:id, NAME:name, JM:jm, QUANTITY:quantity, PRICE:price, VALUEN:valuen, VAT:vat, VATPRICE:vatprice, VALUEB:valueb}])

        setName("")
        setQuantity(1)
        setPrice(0.01)

        sum = sum + valueb
        setTotalPrice(Math.ceil((sum) * 100) / 100)
        id++
    }

    const handleInvoice = () => {
        const apiUrl = 'http://localhost:8080/invoice';
        const user_id = Cookies.get('user');
        const aditionalValues = [
            {
                Vat: 23,
                NettoSum: 0,
                VatSum: 0,
                BruttoSum: 0
              },
              {
                Vat: 8,
                NettoSum: 0,
                VatSum: 0,
                BruttoSum: 0
              },
              {
                Vat: 5,
                NettoSum: 0,
                VatSum: 0,
                BruttoSum: 0
              }
        ]

        for(let j=0;j<rows.length;j++){
            if(rows[j].VAT == aditionalValues[0].Vat){
                aditionalValues[0].NettoSum += rows[j].VALUEN
                aditionalValues[0].VatSum += rows[j].VATPRICE
                aditionalValues[0].BruttoSum += rows[j].VALUEB
            }else if(rows[j].VAT == aditionalValues[1].Vat){
                aditionalValues[1].NettoSum += rows[j].VALUEN
                aditionalValues[1].VatSum += rows[j].VATPRICE
                aditionalValues[1].BruttoSum += rows[j].VALUEB
            }else{
                aditionalValues[2].NettoSum += rows[j].VALUEN
                aditionalValues[2].VatSum += rows[j].VATPRICE
                aditionalValues[2].BruttoSum += rows[j].VALUEB
            }
            if(j+1 == rows.length){
                for(let i=0;i<aditionalValues.length;i++){
                    aditionalValues[i].NettoSum = Math.ceil((aditionalValues[i].NettoSum) * 100) / 100;
                    aditionalValues[i].VatSum = Math.ceil((aditionalValues[i].VatSum) * 100) / 100;
                    aditionalValues[i].BruttoSum = Math.ceil((aditionalValues[i].BruttoSum) * 100) / 100;
                }
                
            }
        }

        const requestBody = {
            services:rows,
            client:client,
            dateIssuance:dateIssuance,
            dateSell:dateSell,
            place:place,
            payDate:payDate,
            payType:payType,
            account:account,
            seller:seller,
            totalPrice:totalPrice,
            userId:user_id,
            aditionalValues:aditionalValues
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
              throw new Error('Nie dodano faktury');
            }
            return response.json();
          })
          .then((data) => {
            if(data.success) {
              console.log('Register successful:', data);
              document.location.href = '/homePage';
            }else {
              console.log(data.errors);

            // przygotowane do sprawdzania validacji i feedbacku
              if(data.errors.clientNIP != "") {
                setValidatedValues((prev) => ({
                    ...prev, 
                    client: true
                }));
                setFeedbackValues((prev) => ({
                    ...prev, 
                    client: data.errors.clientNIP[0]
                }));
                // feedbackValues.client = data.errors.client[0]
              }else{
                setValidatedValues((prev) => ({
                    ...prev, 
                    client: false
                }));
              }

              if(data.errors.dateIssuance != "") {
                setValidatedValues((prev) => ({
                    ...prev, 
                    dateIssuance: true
                }));
                setFeedbackValues((prev) => ({
                    ...prev, 
                    dateIssuance: data.errors.dateIssuance[0]
                }));
                // feedbackValues.client = data.errors.client[0]
              }else{
                setValidatedValues((prev) => ({
                    ...prev, 
                    dateIssuance: false
                }));
              }

              if(data.errors.dateSell.length != 0) {
                setValidatedValues((prev) => ({
                    ...prev, 
                    dateSell: true
                }));
                setFeedbackValues((prev) => ({
                    ...prev, 
                    dateSell: data.errors.dateSell[0]
                }));
                console.log(data.errors.dateSell)
                // feedbackValues.client = data.errors.client[0]
              }else{
                setValidatedValues((prev) => ({
                    ...prev, 
                    dateSell: false
                }));
              }


              if(data.errors.place.length != 0) {
                setValidatedValues((prev) => ({
                    ...prev, 
                    place: true
                }));
                setFeedbackValues((prev) => ({
                    ...prev, 
                    place: data.errors.place[0]
                }));
                // feedbackValues.client = data.errors.client[0]
              }else{
                setValidatedValues((prev) => ({
                    ...prev, 
                    place: false
                }));
              }


              if(data.errors.dateSell != "") {
                setValidatedValues((prev) => ({
                    ...prev, 
                    dateSell: true
                }));
                setFeedbackValues((prev) => ({
                    ...prev, 
                    dateSell: data.errors.dateSell[0]
                }));
                // feedbackValues.client = data.errors.client[0]
              }else{
                setValidatedValues((prev) => ({
                    ...prev, 
                    dateSell: false
                }));
              }

              if(data.errors.services != "") {
                setValidatedValues((prev) => ({
                    ...prev, 
                    services: true
                }));
                setFeedbackValues((prev) => ({
                    ...prev, 
                    services: data.errors.services[0]
                }));
                // feedbackValues.client = data.errors.client[0]
              }else{
                setValidatedValues((prev) => ({
                    ...prev, 
                    services: false
                }));
              }

              if(data.errors.payType != "") {
                setValidatedValues((prev) => ({
                    ...prev, 
                    payType: true
                }));
                setFeedbackValues((prev) => ({
                    ...prev, 
                    payType: data.errors.payType[0]
                }));
                // feedbackValues.client = data.errors.client[0]
              }else{
                setValidatedValues((prev) => ({
                    ...prev, 
                    payType: false
                }));
              }

              if(data.errors.payDate != "") {
                setValidatedValues((prev) => ({
                    ...prev, 
                    payDate: true
                }));
                setFeedbackValues((prev) => ({
                    ...prev, 
                    payDate: data.errors.payDate[0]
                }));
                // feedbackValues.client = data.errors.client[0]
              }else{
                setValidatedValues((prev) => ({
                    ...prev, 
                    payDate: false
                }));
              }

              if(data.errors.account != "") {
                setValidatedValues((prev) => ({
                    ...prev, 
                    account: true
                }));
                setFeedbackValues((prev) => ({
                    ...prev, 
                    account: data.errors.account[0]
                }));
                // feedbackValues.client = data.errors.client[0]
              }else{
                setValidatedValues((prev) => ({
                    ...prev, 
                    account: false
                }));
              }

              if(data.errors.seller != "") {
                setValidatedValues((prev) => ({
                    ...prev, 
                    seller: true
                }));
                setFeedbackValues((prev) => ({
                    ...prev, 
                    seller: data.errors.seller[0]
                }));
                // feedbackValues.client = data.errors.client[0]
              }else{
                setValidatedValues((prev) => ({
                    ...prev, 
                    seller: false
                }));
              }

            }
          });
      };
    //   console.log(validatedValues.dateIssuance)
    //   console.log(validatedValues.place)
    //   console.log(feedbackValues);
// console.log(client)
    return (
        <>
        <div className={styles.formContainer}>
            <div className={styles.invoiceForm}>
                <div className={styles.banner}>
                    <span className={styles.optionsButton}>
                        <Link to="/homePage"><i className="fa-solid fa-arrow-left fa-2xl"></i></Link>
                    </span>
                    <img src={logo} alt="Fakturki" className={styles.logo} />
                </div>
                <div className={styles.firstContainer}>
                    <div className={styles.firstContainerName}>
                        <label>
                            <p>Klient:</p>
                            {/* <input type="text" name="NumberInvoice" value={client} onChange={(e) => setClient(e.target.value)}/> */}
                            {/* <InputGroup className={styles.inputText} hasValidation>
                                <Form.Control
                                    type="text"
                                    id="client"
                                    value={client}
                                    isInvalid={validatedValues.client}
                                    onChange={(e) => setClient(e.target.value)}
                                />
                                <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                                    {feedbackValues.client}
                                </Form.Control.Feedback>
                            </InputGroup> */}
                            <Stack className={styles.inputStack}>
                                <Autocomplete
                                    className={styles.inputAuto}
                                    freeSolo
                                    options={nipArray.map((option:any) => option)}
                                    renderInput={(params) => 
                                        <TextField {...params} 
                                            // label="Klient" 
                                            value={client}
                                            onChange={(e) => setClient(e.target.value)}
                                        />
                                    }
                                    onInputChange={(_, newInputValue) => setClient(newInputValue)}
                                />
                            </Stack>
                            <p className={styles.errClient}>{validatedValues.client?feedbackValues.client:null}</p>
                        </label>
                    </div>
                    <div className={styles.firstContainerDates}>
                        <label>
                            <p>Data Wystawienia:</p>
                            {/* <input type="date" name="Dataissuance" value={dateIssuance} onChange={(e) => setDateIssuance(e.target.value)}/> */}
                        
                        <InputGroup className={styles.inputText} hasValidation>
                            <Form.Control
                                type="date"
                                id="Dataissuance"
                                value={dateIssuance}
                                isInvalid={validatedValues.dateIssuance}
                                onChange={(e) => setDateIssuance(e.target.value)}
                            />
                            <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                                {feedbackValues.dateIssuance}
                            </Form.Control.Feedback>
                        </InputGroup>
                        </label>
                        <label>
                            <p>Data sprzedaży:</p>
                            {/* <input type="date" name="sellInovices" value={dateSell} onChange={(e) => setDateSell(e.target.value)}/> */}
                            <InputGroup className={styles.inputText} hasValidation>
                                <Form.Control
                                    type="date"
                                    id="sellInovices"
                                    value={dateSell}
                                    isInvalid={validatedValues.dateSell}
                                    onChange={(e) => setDateSell(e.target.value)}
                                />
                                <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                                    {feedbackValues.dateSell}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </label>
                        <label>
                            <p>Miejsce Wystawienia:</p>
                            {/* <input type="text" name="Place" value={place} onChange={(e) => setPlace(e.target.value)}/> */}
                            <InputGroup className={styles.inputText} hasValidation>
                                <Form.Control
                                    type="text"
                                    id="Place"
                                    value={place}
                                    isInvalid={validatedValues.place}
                                    onChange={(e) => setPlace(e.target.value)}
                                />
                                <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                                    {feedbackValues.place}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </label>
                    </div>
                </div>
                
                <div className={styles.WspolnyContainer}>
                    <table>
                        <thead>
                            <th>Lp.</th>
                            <th>Nazwa</th>
                            <th>Jm.</th>
                            <th>Ilośc</th>
                            <th>Cena netto</th>
                            <th>Wartość netto (R)</th>
                            <th>VAT</th>
                            <th>Kwota VAT</th>
                            <th>Wartość brutto</th>
                            <th></th>
                        </thead>
                        <Table data = {rows}
                            delRow = {handleDelete}/>
                    </table>
                    <hr></hr>
                    <div className={styles.dodajiwartosc}>  
                        <div className={styles.DodajContainer}>
                            <label>
                                <p>Nazwa:</p>
                                {/* <input type='text' value={name} onChange={(e) => setName(e.target.value)}/> */}
                                <InputGroup className={styles.inputText} hasValidation>
                                    <Form.Control
                                        type="text"
                                        id="name"
                                        value={name}
                                        isInvalid={validatedValues.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                                        {feedbackValues.name}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </label>
                            <label>
                                <p>Jednostka miary:</p>
                                {/* <select value={jm} onChange={(e) => setJm(e.target.value)}>
                                    <option value="Usługa">Usługa</option>
                                    <option value="m2">m2</option>
                                </select> */}
                                <InputGroup className={styles.inputText} hasValidation>
                                    <Form.Select
                                        id="name"
                                        value={jm}
                                        isInvalid={validatedValues.jm}
                                        onChange={(e) => setJm(e.target.value)}
                                    >
                                        <option value="Usługa">Usługa</option>
                                        <option value="m2">m2</option>
                                    </Form.Select>
                                    <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                                        {feedbackValues.jm}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </label>
                            <label>
                                <p>Ilość:</p>
                                {/* <input type='number' value={quantity} onChange={(e) => setQuantity(parseFloat(e.target.value))}/>     */}
                                <InputGroup className={styles.inputText} hasValidation>
                                    <Form.Control
                                        type="number"
                                        id="quantity"
                                        value={quantity}
                                        isInvalid={validatedValues.quantity}
                                        onChange={(e) => setQuantity(parseFloat(e.target.value))}
                                        min={1}
                                    />
                                    <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                                        {feedbackValues.quantity}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </label>
                            <label>
                                <p>Cena:</p>
                                {/* <input type='number' value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}/> */}
                                <InputGroup className={styles.inputText} hasValidation>
                                    <Form.Control
                                        type="text"
                                        id="price"
                                        value={price}
                                        isInvalid={validatedValues.price}
                                        onChange={(e) => {
                                            const inputValue = e.target.value;

                                            // Usuń wszystkie niepotrzebne znaki, pozostawiając jedynie cyfry i kropki
                                            const sanitizedValue = inputValue.replace(/[^0-9.]/g, '');

                                            //czy liczba miejsc po przecinku nie przekracza dwóch
                                            if (/^\d*\.?\d{0,2}$/.test(sanitizedValue) || sanitizedValue === '') {
                                                setPrice(parseFloat(sanitizedValue) || 0.01);
                                            }
                                        }}
                                        min={1}
                                    />
                                    <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                                        {feedbackValues.price}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </label>
                            <label>
                                <p>VAT:</p>
                                {/* <select value={vat} onChange={(e) => setVat(parseFloat(e.target.value))}>
                                    <option value="23">23%</option>
                                    <option value="8">8%</option>
                                    <option value="5">5%</option>
                                </select> */}
                                <InputGroup className={styles.inputText} hasValidation>
                                    <Form.Select
                                        id="vat"
                                        value={vat}
                                        // isInvalid={validatedValues.vat}
                                        isInvalid={validatedValues.services?true:validatedValues.vat?true:false}
                                        onChange={(e) => setVat(parseFloat(e.target.value))}
                                    >
                                        <option value="23">23%</option>
                                        <option value="8">8%</option>
                                        <option value="5">5%</option>
                                    </Form.Select>
                                    <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                                        {feedbackValues.vat}
                                        {feedbackValues.services}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </label>
                            
                            <button onClick={handleAddService}>Dodaj nową pozycję</button>
                        </div>
                        <div className={styles.WartoscContainer}>
                            {/* <p>Wartość brutto:</p> */}
                            {/* <input type='number'></input> */}
                            <div className={styles.cena}>
                                <label>
                                    <p>Wartość brutto: {totalPrice}</p>
                                </label>
                                <label>
                                    <p>PLN</p>
                                </label>
                            </div>
                            <div className={styles.platnosc_termin}>
                                <label>
                                    <p>Forma płatności</p> 
                                    {/* <select value={payType} onChange={(e) => setPayType(e.target.value)}>
                                        <option value="Przelew">Przelew</option>
                                        <option value="Gotówka">Gotówka</option>
                                    </select> */}
                                    <InputGroup className={styles.inputText} hasValidation>
                                        <Form.Select
                                            id="vat"
                                            value={payType}
                                            isInvalid={validatedValues.payType}
                                            onChange={(e) => setPayType(e.target.value)}
                                        >
                                            <option value="Przelew">Przelew</option>
                                            <option value="Gotówka">Gotówka</option>
                                        </Form.Select>
                                        <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                                            {feedbackValues.payType}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </label>
                                <label>
                                    <p>Termin płatności</p>
                                    {/* <input type="date" value={payDate} onChange={(e) => setPayDate(e.target.value)}/> */}
                                    <InputGroup className={styles.inputText} hasValidation>
                                    <Form.Control
                                        type="date"
                                        id="payDate"
                                        value={payDate}
                                        isInvalid={validatedValues.payDate}
                                        onChange={(e) => setPayDate(e.target.value)}
                                    />
                                    <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                                        {feedbackValues.payDate}
                                    </Form.Control.Feedback>
                                </InputGroup>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.lastContainer}>
                    <div className={styles.bank}>
                        <label>
                            <p>Rachunek bankowy</p>
                            {/* <select value={account} onChange={(e) => setAccount(e.target.value)}>
                                <option value={tmpaccount}>{tmpaccount}</option>
                                <option value="49 1020 2892 2276 3005 0000 1111">49 1020 2892 2276 3005 0000 1111</option>
                            </select> */}
                            <InputGroup className={styles.inputText} hasValidation>
                                <Form.Control
                                    type="text"
                                    id="price"
                                    value={account}
                                    isInvalid={validatedValues.account}
                                    onChange={(e) => setAccount(e.target.value)}
                                />
                                <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                                    {feedbackValues.account}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </label>
                    </div>
                    <div className={styles.wystawil}>
                        <label>
                            <p>Wystawił</p>
                            {/* <select value={seller} onChange={(e) => setSeller(e.target.value)}>
                                <option value={details.firstName}>{details.firstName}</option>
                                <option value="Jakub">Jakub</option>
                            </select> */}
                            <InputGroup className={styles.inputText} hasValidation>
                                <Form.Control
                                    type="text"
                                    id="price"
                                    value={seller}
                                    isInvalid={validatedValues.seller}
                                    onChange={(e) => setSeller(e.target.value)}
                                />
                                <Form.Control.Feedback className={styles.ErrorInput} type='invalid'>
                                    {feedbackValues.seller}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </label>
                    </div>
                    <button onClick={handleInvoice}>Wystaw fakture</button>
                </div>
            </div>
        </div>
        </>
        
    );
};

export default InvoiceForm;