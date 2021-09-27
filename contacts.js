const fs = require('fs').promises;
const path = require("path")

const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async (contacts) => {
  const newContacts = await fs.writeFile(contactsPath, JSON.stringify(contacts));    
  return newContacts;
}

const listContacts = async() => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
 }
  
  const getContactById = async(contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item=>item.id === contactId);
    if(idx === -1) {
      return null;
    }
    return contacts[idx];
  }
  
  const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item=>item.id === contactId);
    if(idx === -1) {
        return null;
    }
    contacts.splice(idx, 1);
    await updateContacts(contacts);
    return true;   
  }
  
  const addContact = async(data) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item=>item.name === data.name);
    if(idx !== -1) {
      throw new Error(`Contact with name ${data.name} exists in contact list`);;
    }
    const maxId = Math.max.apply(null, contacts.map(item => item.id));
    const newId = maxId + 1;
    const newContact = { id: newId, ...data };
    contacts.push(newContact);
    await updateContacts(contacts);  
    return newContact;
  }

  const contactsFunctions = {
    listContacts,
    getContactById,
    removeContact,
    addContact
  };

module.exports = contactsFunctions;