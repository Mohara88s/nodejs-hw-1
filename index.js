const contactsOps = require("./contacts")

(async()=> {
    try {
        const contacts = await contactsOps.listContacts();
        console.log(contacts)
    }
    catch (error) {
        console.log(error.message)
    }
})();
console.log('hallo')