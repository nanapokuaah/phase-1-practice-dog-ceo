console.log('%c HI', 'color: firebrick')
function getRandomImages() {
    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(appendImages)
    .catch(error => document.querySelector().appendChild(error.message))
  }
  ​
  function appendImages(json) {
    const images = json.message;
    images.forEach(image => {
      const img = document.createElement('img');
      img.src = image;
      img.width = 350;
      document.querySelector('#dog-image-container').appendChild(img);
    })
  }
  ​
  function getDogBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(appendDogBreeds)
    .catch(error => console.log(error))
  }
  ​
  function appendDogBreeds(json) {
    const breeds = Object.entries(json.message);
    
    const dropDown = document.querySelector('#breed-dropdown');
    dropDown.addEventListener('change', (e) => filterBreeds(e, breeds))
  ​
    breeds.forEach(createDogList);
  }
  ​
  function filterBreeds(e, breeds) {
    replaceDogBreeds();
    const letter = e.target.value;
    breeds = breeds.filter(([breed]) => breed[0] === letter || letter === 'all');
    breeds.forEach(createDogList);
  }
  ​
  function replaceDogBreeds() {
    document.querySelector('#dog-breeds').remove()
  ​
    const breedList = document.createElement('ul');
    breedList.id = 'dog-breeds';
    document.body.appendChild(breedList);
  }
  ​
  function createDogList(breed) {
    const li = document.createElement('li');
    li.textContent = breed[0];
    
    if (breed[1].length > 0) {
      const sub = listSimiliarBreeds(breed[1])
      li.appendChild(sub);
    }
    
    document.querySelector('#dog-breeds').appendChild(li);
  }
  ​
  function listSimiliarBreeds(subBreeds) {
    const ul = document.createElement('ul');
    subBreeds.forEach(sub => {
      const li = document.createElement('li');
      li.textContent = sub;
      ul.appendChild(li);
    })
    return ul;
  }
  ​
  function addMoreDropdownOptions() {
    const dropDown = document.querySelector('#breed-dropdown')
    
    for (let charCode = 'e'.charCodeAt(); charCode <= 122; charCode++) {
      const option = document.createElement('option');
      const value = String.fromCharCode(charCode);
      option.value = value;
      option.textContent = value;
      dropDown.appendChild(option);
    }
  }
  ​
  function init() {
    getRandomImages();
    getDogBreeds();
    addMoreDropdownOptions();
  }
  ​
  init();