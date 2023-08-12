// script.js

// Initialize the array to store reservations
let reservations = [];

// Function to add a new reservation to the array
function addReservation(name, grade, guests, date) {
  const newReservation = {
    name: name,
    grade: grade,
    guests: guests,
    date: date
  };
  reservations.push(newReservation);
}

// Function to display reservations in the list
function displayReservations() {
  const reservationList = document.getElementById('reservationList');
  reservationList.innerHTML = '';

  reservations.forEach((reservation, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('reservationItem');
    listItem.innerHTML = `
      <span>${reservation.name} - Grade ${reservation.grade} - Guests: ${reservation.guests} - Date: ${reservation.date}</span>
      <button onclick="cancelReservation(${index})">Cancel</button>
    `;
    reservationList.appendChild(listItem);
  });
}

// Function to handle reservation form submission
function handleSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const grade = parseInt(document.getElementById('grade').value, 10);
  const guests = parseInt(document.getElementById('guests').value, 10);
  const date = document.getElementById('date').value;

  // Perform data validation
  if (!name || !grade || isNaN(grade) || grade < 1 || grade > 12 || isNaN(guests) || guests < 0 || !date) {
    alert('Invalid input. Please check the fields and try again.');
    return;
  }

  // Check for duplicate reservations
  const existingReservation = reservations.find(reservation => reservation.name === name);
  if (existingReservation) {
    const confirmUpdate = confirm("You already have a reservation. Do you want to update it?");
    if (confirmUpdate) {
      // Update existing reservation
      existingReservation.grade = grade;
      existingReservation.guests = guests;
      existingReservation.date = date;
    }
    return;
  }

  // Add the new reservation and display the updated list
  addReservation(name, grade, guests, date);
  displayReservations();
  document.getElementById('reservationForm').reset();
}

// Function to cancel a reservation
function cancelReservation(index) {
  reservations.splice(index, 1);
  displayReservations();
}

// Function to search reservations by name
function searchReservations() {
  const searchTerm = document.getElementById('searchBar').value.trim().toLowerCase();
  if (!searchTerm) {
    displayReservations();
    return;
  }

  const matchingReservations = reservations.filter(reservation =>
    reservation.name.toLowerCase().includes(searchTerm)
  );

  const reservationList = document.getElementById('reservationList');
  reservationList.innerHTML = '';

  matchingReservations.forEach((reservation, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('reservationItem');
    listItem.innerHTML = `
      <span>${reservation.name} - Grade ${reservation.grade} - Guests: ${reservation.guests} - Date: ${reservation.date}</span>
      <button onclick="cancelReservation(${index})">Cancel</button>
    `;
    reservationList.appendChild(listItem);
  });
}

// Event listeners
document.getElementById('reservationForm').addEventListener('submit', handleSubmit);
document.getElementById('searchBar').addEventListener('input', searchReservations);

// Initial display of reservations
displayReservations();
