const contactsOps = require("./contacts")

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
        const contacts = await contactsOps.listContacts();
        console.log(`Contact list \n`, contacts)
      break;

    case 'get':
        const contactById = await contactsOps.getContactById(Number(id));
        if (!contactById){
            throw new Error(`Contact with id=${id} not found`);
        } 
        console.log(`Contact with id=${id} \n`, contactById)
      break;

    case 'add':
        const newData = {
                        name,
                        email,
                        phone
                      };
        const newAddedContact = await contactsOps.addContact(newData)
        console.log(`Successfully added new contact \n`, newAddedContact);
      break;

    case 'remove':
        const result = await contactsOps.removeContact(Number(id));
        if (!result){
            throw new Error(`Contact with id=${id} not found`);
        }
        console.log(`Successfully remove contact with id=${id}`);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

// (async()=> {
//     try {
//         const contacts = await contactsOps.listContacts();
//         console.log(`Contact list \n`, contacts)

//         const id = 1

        // const contactById = await contactsOps.getContactById(id);
        // if (!contactById){
        //     throw new Error(`Contact with id=${id} not found`);
        // } 
        // console.log(`Contact with id=${id} \n`, contactById)


        // const result = await contactsOps.removeContact(id);
        // if (!result){
        //     throw new Error(`Contact with id=${id} not found`);
        // }
        // console.log(`Successfully remove contact with id=${id}`);

//         const newData = {
//             "name": "Allena Raymonda",
//             "email": "nullaa.ante@vestibul.co.uk",
//             "phone": "(992) 914-3792"
//           };
        //   const newAddedContact = await contactsOps.addContact(newData)
        //   console.log(`Successfully added new contact \n`, newAddedContact);
          


//     }
//     catch (error) {
//         console.log(error.message)
//     }
// })();
