const mongoose = require('mongoose');
const mail = require("./mail");
// Adres hosta bazy danych MongoDB na podstawie nazwy usługi w docker-compose.yml
const dbHost = 'database'; // To jest nazwa usługi bazy danych w docker-compose.yml
// Połączenie z bazą danych
mongoose.connect(`mongodb://${dbHost}:27017/faktury`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Błąd połączenia z bazą danych:', error);
});
db.once('open', () => {
  console.log('Połączono z bazą danych MongoDB');
});

const activeEmailSchema = new mongoose.Schema({
    email: String,
    token: String,
    created_at: Date,
    updated_at: Date,
});
const ActiveEmail = mongoose.model('ActiveEmail', activeEmailSchema);

async function add(email) {
    try {
        await removeToken(email);

        let token = generateToken();
        while(await checkToken(token)){
            token = generateToken();
        }
        const created_at = new Date();
        const updated_at = new Date();
            
        newToken = new ActiveEmail({ 
            email, 
            token, 
            created_at, 
            updated_at 
        });
        await newToken.save();
        console.log('Token aktywacji adresu email został dodany.');
        mail.sendActivationLink(email, token);
        return true;
    } catch (error) {
        console.error('Błąd podczas dodawania tokenu:', error);
        return false;
    }
}
function removeToken(email) {
    ActiveEmail.findOneAndRemove({ email: email })
        .then((doc) => {
            if (doc) {
                console.log('Usunięto element o adresie e-mail:', email);
            } else {
                console.log('Nie znaleziono elementu o adresie e-mail:', email);
            }
        })
        .catch((err) => {
            console.error('Błąd podczas usuwania elementu:', err);
        });
}
function generateToken() {
    const signs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
  
    for (let i = 0; i < 30; i++) {
      const randomIndex = Math.floor(Math.random() * signs.length);
      token += signs.charAt(randomIndex);
    }
  
    return token;
  }
async function getTokenByEmail(email) {
    try {
        const findToken = await ActiveEmail.findOne({ email: email }).exec();
        if (findToken){
            console.log('Znaleziony token:', findToken.token);
        }else{
            console.log('Nie znaleziono tokenu dla: ', email);
        }
        return findToken.token;
    } catch (error) {
        console.error('Błąd podczas wyszukiwania tokenu:', error);
    }
}
async function getEmailByToken(token) {
    try {
        const findEmail = await ActiveEmail.findOne({ token: token }).exec();
        if (findEmail){
            console.log('Znaleziony email:', findEmail.email);
        }else{
            console.log('Nie znaleziono emailu dla: ', token);
        }
        return findEmail.email;
    } catch (error) {
        console.error('Błąd podczas wyszukiwania adresu email:', error);
    }
}
async function checkToken(token) {
    try {
        const findToken = await ActiveEmail.findOne({ token: token }).exec();
        if (findToken){
            return true;
        }
        return false;
    } catch (error) {
        console.error('Błąd podczas wyszukiwania adresu email:', error);
    }
}
async function checkTokens() {
    const time = new Date();
    time.setMinutes(time.getMinutes() - 10);
  
    try {
        const wynik = await ActiveEmail.deleteMany({ created_at: { $lt: time } });
        wynik>0?console.log('Usunięto', wynik.deletedCount, 'elementów.'):null;
    } catch (error) {
        console.error('Błąd podczas usuwania elementów:', error);
    }
}

module.exports = { add,getTokenByEmail,getEmailByToken,checkToken,removeToken,checkTokens };