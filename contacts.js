const fs = require("fs/promises");
const path = require("path")

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
   
  }
  
  function getContactById(contactId) {
   
  }
  
  function removeContact(contactId) {
   
  }
  
  function addContact(name, email, phone) {
    
  }
  const contactsFunctions = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  };

module.exports = contactsFunctions;