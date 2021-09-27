const contactsOps = require("./contacts")
const fs = require('fs').promises;

(async()=> {
    try {
        const contacts = await contactsOps.listContacts();
        console.log(`Contact list \n`, contacts)

        const id = 1

        const contactById = await contactsOps.getContactById(id);
        if (!contactById){
            throw new Error(`Contact with id=${id} not found`);
        } 
        console.log(`Contact with id=${id} \n`, contactById)


        const result = await contactsOps.removeContact(id);
        if (!result){
            throw new Error(`Contact with id=${id} not found`);
        }
        console.log(`Successfully remove contact with id=${id}`);

        const newData = {
            "name": "Allena Raymonda",
            "email": "nullaa.ante@vestibul.co.uk",
            "phone": "(992) 914-3792"
          };
          const newAddedContact = await contactsOps.addContact(newData)
          console.log(`Successfully added new contact \n`, newAddedContact);
          


    }
    catch (error) {
        console.log(error.message)
    }
})();
