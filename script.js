let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function displayContacts(list = contacts) {
  const contactList = document.getElementById("contactList");
  contactList.innerHTML = "";

  list.forEach((contact, index) => {
    contactList.innerHTML += `
      <div class="contact">
        <h3>${contact.name}</h3>
        <p>📞 ${contact.phone}</p>
        <p>✉️ ${contact.email}</p>
        <div class="actions">
          <button class="edit" onclick="editContact(${index})">Edit</button>
          <button onclick="deleteContact(${index})">Delete</button>
        </div>
      </div>
    `;
  });
}

function addContact() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !phone || !email) {
    alert("Please fill all fields!");
    return;
  }

  contacts.push({ name, phone, email });
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts();

  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("email").value = "";
}

function deleteContact(index) {
  contacts.splice(index, 1);
  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts();
}

function editContact(index) {
  const newName = prompt("Enter new name:", contacts[index].name);
  const newPhone = prompt("Enter new phone:", contacts[index].phone);
  const newEmail = prompt("Enter new email:", contacts[index].email);

  if (newName && newPhone && newEmail) {
    contacts[index] = { name: newName, phone: newPhone, email: newEmail };
    localStorage.setItem("contacts", JSON.stringify(contacts));
    displayContacts();
  }
}

function searchContact() {
  const query = document.getElementById("search").value.toLowerCase();
  const filtered = contacts.filter(
    c =>
      c.name.toLowerCase().includes(query) ||
      c.phone.includes(query) ||
      c.email.toLowerCase().includes(query)
  );
  displayContacts(filtered);
}

displayContacts();