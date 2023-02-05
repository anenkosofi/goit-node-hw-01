const fs = require('node:fs/promises');
const path = require('node:path');

const contactsPath = path.resolve('./db/contacts.json');

async function readFile() {
  try {
    return await fs.readFile(contactsPath, {
      encoding: 'utf8',
    });
  } catch (error) {
    console.error(error);
  }
}

async function listContacts() {
  try {
    const contactList = await readFile();
    console.table(JSON.parse(contactList));
  } catch (error) {
    console.error(error);
  }
}

async function getContactById(contactId) {
  try {
    const contactList = await readFile();
    console.log(JSON.parse(contactList).find(({ id }) => id === contactId));
  } catch (error) {
    console.error(error);
  }
}

async function removeContact(contactId) {
  try {
    const contactList = await readFile();
    const updatedContactList = JSON.parse(contactList).filter(
      ({ id }) => id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContactList));
    const newContactList = await readFile();
    console.table(JSON.parse(newContactList));
  } catch (error) {
    console.error(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contactList = await readFile();
    const parsedContactList = JSON.parse(contactList);
    const lastElementId = Number(
      parsedContactList[parsedContactList.length - 1].id
    );
    const nextElementId = lastElementId + 1;
    const contact = { id: nextElementId.toString(), name, email, phone };
    const updatedContactList = [...parsedContactList, contact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContactList));
    const newContactList = await readFile();
    console.table(JSON.parse(newContactList));
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
