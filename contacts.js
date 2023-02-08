const fs = require('node:fs/promises');
const path = require('node:path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contactList = JSON.parse(data);
  return contactList;
}

async function getContactById(contactId) {
  const contactList = await listContacts();
  const result = contactList.find(({ id }) => id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const contactList = await listContacts();
  const index = contactList.findIndex(({ id }) => id === contactId.toString());
  if (index === -1) {
    return null;
  }
  const [removedContact] = contactList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return removedContact;
}

async function addContact(name, email, phone) {
  const contactList = await listContacts();
  const lastElementId = Number(contactList[contactList.length - 1].id);
  const nextElementId = lastElementId + 1;
  const newContact = { id: nextElementId.toString(), name, email, phone };
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
