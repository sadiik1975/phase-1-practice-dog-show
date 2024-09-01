document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
  
    // Handle form submission for updating dog information
    document.querySelector('#dog-form').addEventListener('submit', handleFormSubmit);
  });
  
  // Fetch all dogs and render them in the table
  function fetchDogs() {
    const tableBody = document.querySelector('#table-body');
    tableBody.innerHTML = ''; // Clear the table before rendering
  
    fetch('http://localhost:3000/dogs')
      .then(response => response.json())
      .then(dogs => dogs.forEach(renderDog));
  }
  
  // Render a single dog in the table
  function renderDog(dog) {
    const tableBody = document.querySelector('#table-body');
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td><button data-id="${dog.id}" class="edit-btn">Edit</button></td>
    `;
  
    tableBody.appendChild(tr);
  
    // Add an event listener to the edit button
    const editButton = tr.querySelector('.edit-btn');
    editButton.addEventListener('click', () => populateForm(dog));
  }
  
  // Populate the form with the dog's current data
  function populateForm(dog) {
    const form = document.querySelector('#dog-form');
    form.name.value = dog.name;
    form.breed.value = dog.breed;
    form.sex.value = dog.sex;
    form.dataset.id = dog.id; // Store the dog's ID in the form
  }
  
  // Handle form submission to update dog information
  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const dogId = form.dataset.id;
  
    const updatedDog = {
      name: form.name.value,
      breed: form.breed.value,
      sex: form.sex.value,
    };
  
    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDog),
    })
    .then(response => response.json())
    .then(() => {
      form.reset(); // Clear the form after submission
      fetchDogs(); // Re-fetch and re-render the updated list of dogs
    });
  }
npm   