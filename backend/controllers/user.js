const db = require("./database");
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

async function add(company, firstName, email, password, postalCode, street, lastName, phoneNumber, city, buildingNumber, apartmentNumber, NIP, accountNumber) {
    let user;
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        user = new db.User({ 
            company,
            email, 
            passwordHash, 
            firstName, 
            lastName, 
            phoneNumber, 
            NIP, 
            postalCode, 
            city, 
            street, 
            buildingNumber, 
            apartmentNumber,
            accountNumber
        });
        await user.save();
        console.log('Osoba została dodana do bazy danych.');
    } catch (error) {
        console.error('Błąd podczas dodawania osoby:', error);
    }
    return user;
}
async function auth(id){
    try {
        return db.User.findOne({_id : new ObjectId(id)}).exec();
    } catch (error) {
        console.error('Błąd podczas pobierania osób:', error);
        throw error;
    }
}
async function resetCounter(user){
    user.counter = 0;
    await user.save()
}
async function increseCounter(user){
    user.counter = user.counter + 1;
    await user.save()
}
async function changePassword(user, password) {
    try {
        user.passwordHash = await bcrypt.hash(password, 10);
        await user.save();
        return true;
    } catch (error) {
        console.error('Błąd podczas pobierania osób:', error);
        throw error;
    }
}
async function passwordCompare(passwordHash, password) {
    try {
        if (await bcrypt.compare(password, passwordHash)){
            return true;
        }
        return false;
    } catch (error) {
        console.error('Błąd podczas pobierania osób:', error);
        throw error;
    }
}
async function checkEmail(email) {
    try {
        const user = await db.User.findOne({ email: email }).exec();
        console.log('Użytkownik znaleziony:', email);
        return user;
    } catch (error) {
        console.error('Błąd podczas pobierania osób:', error);
        throw error;
    }
}
async function NIPUnique(arr, NIP) {
    try {
        const user = await db.User.findOne({ NIP: NIP }).exec();
        if(user){
            arr.push("Konto z podanym NIP już istnieje.");
            return true;
        }
        return false;
    } catch (error) {
        console.error('Błąd podczas sprawdzania unikalności NIP:', error);
        throw error;
    }
}
async function accountNumberUnique(arr, accountNumber) {
    try {
        const user = await db.User.findOne({ accountNumber: accountNumber }).exec();
        if(user){
            arr.push("Konto z podanym numerze konta już istnieje.");
            return true;
        }
        return false;
    } catch (error) {
        console.error('Błąd podczas sprawdzania unikalności numeru konta:', error);
        throw error;
    }
}
async function emailUnique(arr, email) {
    try {
        const user = await db.User.findOne({ email: email }).exec();
        if(user){
            arr.push("Konto z podanym adresem email już istnieje.");
            return true;
        }
        return false;
    } catch (error) {
        console.error('Błąd podczas sprawdzania unikalności adresu email:', error);
        throw error;
    }
}
async function displayAll() {
    try {
        const users = await db.User.find().exec(); // Pobierz wszystkie osoby z bazy danych
        console.log('Wszystkie osoby w bazie danych:', users);
        return users;
    } catch (error) {
        console.error('Błąd podczas pobierania osób:', error);
        throw error;
    }
}
async function active(email){
    const user = await checkEmail(email);
    console.log(user);
    if (user){
        user.emailActivated_at = new Date();
        await user.save();
        return true;
    }
    return false;
}

module.exports = { increseCounter,resetCounter,add,auth,changePassword,passwordCompare,checkEmail,NIPUnique,accountNumberUnique,emailUnique,displayAll,active };