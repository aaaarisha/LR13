class User {
    constructor(data) {
      this.data = data;
    }
  
    edit(updatedData) {
      this.data = { ...this.data, ...updatedData };
    }
  
    get() {
      return this.data;
    }
  }
  
  class Contacts {
    constructor() {
      this.data = [];
    }
  
    add(contactData) {
      const newUser = new User(contactData);
      this.data.push(newUser);
    }
  
    edit(id, updatedData) {
      const user = this.data.find(user => user.get().id === id);
      if (user) {
        user.edit(updatedData);
      } else {
        console.log(`Контакт с id: ${id} не найден`);
      }
    }
  
    remove(id) {
      this.data = this.data.filter(user => user.get().id !== id);
    }
  
    get() {
      return this.data.map(user => user.get());
    }
  }
  
  class ContactsApp extends Contacts {
    constructor() {
      super();
      this.app = document.createElement('div');
      this.app.classList.add('contacts');
      document.body.appendChild(this.app);
      this.createUI();
    }
  
    createUI() {
      const form = document.createElement('form');
      const inputName = this.createInput('name', 'Имя');
      const inputEmail = this.createInput('email', 'Email');
      const inputAddress = this.createInput('address', 'Адрес');
      const inputPhone = this.createInput('phone', 'Телефон');
      const addButton = this.createButton('Добавить контакт', () => this.onAdd(inputName, inputEmail, inputAddress, inputPhone));
  
      form.appendChild(inputName);
      form.appendChild(inputEmail);
      form.appendChild(inputAddress);
      form.appendChild(inputPhone);
      form.appendChild(addButton);
  
      this.contactsList = document.createElement('div');
      this.contactsList.classList.add('contacts-list');
      this.app.appendChild(form);
      this.app.appendChild(this.contactsList);
    }
  
    createInput(name, placeholder) {
      const input = document.createElement('input');
      input.type = 'text';
      input.name = name;
      input.placeholder = placeholder;
      return input;
    }
  
    createButton(text, onClick) {
      const button = document.createElement('button');
      button.innerText = text;
      button.type = 'button';
      button.addEventListener('click', onClick);
      return button;
    }
  
    onAdd(inputName, inputEmail, inputAddress, inputPhone) {
      const newContact = {
        id: Date.now(),
        name: inputName.value,
        email: inputEmail.value,
        address: inputAddress.value,
        phone: inputPhone.value
      };
  
      this.add(newContact);
      this.updateContactsList();
    }
  
    onEdit(id) {
      const contact = this.data.find(user => user.get().id === id);
      if (contact) {
        const updatedData = {
          name: prompt('Введите новое имя', contact.get().name),
          email: prompt('Введите новый email', contact.get().email),
          address: prompt('Введите новый адрес', contact.get().address),
          phone: prompt('Введите новый телефон', contact.get().phone)
        };
        this.edit(id, updatedData);
        this.updateContactsList();
      }
    }
  
    onRemove(id) {
      this.remove(id);
      this.updateContactsList();
    }
  
    updateContactsList() {
      this.contactsList.innerHTML = '';
  
      const contacts = this.get();
      contacts.forEach(contact => {
        const contactItem = document.createElement('div');
        contactItem.innerText = `Имя: ${contact.name}, Email: ${contact.email}, Адрес: ${contact.address}, Телефон: ${contact.phone}`;
        
        const editButton = this.createButton('Редактировать', () => this.onEdit(contact.id));
        const removeButton = this.createButton('Удалить', () => this.onRemove(contact.id));
  
        contactItem.appendChild(editButton);
        contactItem.appendChild(removeButton);
  
        this.contactsList.appendChild(contactItem);
      });
    }
  }
  
  const app = new ContactsApp();
  