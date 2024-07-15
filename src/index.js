let addToy = false;


// index.js

document.addEventListener('DOMContentLoaded', function() {
  const toyCollection = document.getElementById('toy-collection');

  fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(toys => {
          toys.forEach(toy => renderToy(toy));
      });

  function renderToy(toy) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
          <h2>${toy.name}</h2>
          <img src="${toy.image}" class="toy-avatar" />
          <p>${toy.likes} Likes</p>
          <button class="like-btn" data-id="${toy.id}">Like ❤️</button>
      `;
      toyCollection.appendChild(card);

      const likeButton = card.querySelector('.like-btn');
      likeButton.addEventListener('click', () => increaseLikes(toy, card));
  }

  function increaseLikes(toy, card) {
      const newLikes = toy.likes + 1;
      fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
          },
          body: JSON.stringify({
              likes: newLikes
          })
      })
      .then(response => response.json())
      .then(updatedToy => {
          card.querySelector('p').textContent = `${updatedToy.likes} Likes`;
      });
  }
});

// Continuing from index.js

document.addEventListener('DOMContentLoaded', function() {
  // Existing code...

  const addBtn = document.querySelector('#new-toy-btn');
  const toyForm = document.querySelector('.container');
  let addToy = false;

  addBtn.addEventListener('click', () => {
      addToy = !addToy;
      if (addToy) {
          toyForm.style.display = 'block';
      } else {
          toyForm.style.display = 'none';
      }
  });

  const toyFormSubmit = document.querySelector('.add-toy-form');

  toyFormSubmit.addEventListener('submit', event => {
      event.preventDefault();

      const name = event.target.name.value;
      const image = event.target.image.value;
      const likes = 0;

      fetch('http://localhost:3000/toys', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
          },
          body: JSON.stringify({
              name: name,
              image: image,
              likes: likes
          })
      })
      .then(response => response.json())
      .then(newToy => {
          renderToy(newToy);
          event.target.reset();
      });
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
