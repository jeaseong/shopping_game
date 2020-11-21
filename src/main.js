

function loadItems() {
    return fetch('data/data.json')
        .then(response => response.json())
        .then(json => json.items);
}

function displayItems(items) {
    const container = document.querySelector(".items");
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
    return `
    <li class="item">
        <img class="item-img" src="${item.image}" alt="${item.type}" />
        <h3 class="item-description">${item.gender}, ${item.size}</h3>
      </li>
    `
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if(key == null || value == null) {
        return;
    }
     updateItems(items, key, value);
     displayItems(items.filter(item => item[key] === value));
}

function updateItems(items, key, value) {
    const list = document.querySelector('.item');
    items.forEach(item => {
        if(item[key] === value) {
            list.classList.remove('invisible');
        } else {
            list.classList.add('invisible');
        }
    });
    
}

function setEventListener(items) {
    const logo = document.querySelector(".logo");
    const buttons = document.querySelector(".buttons");
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

loadItems()
.then(items => {
    console.log(items);
    displayItems(items);
    setEventListener(items);
})
.catch(console.log);