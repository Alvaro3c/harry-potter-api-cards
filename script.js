const charactersContainer = document.getElementById('character-container');
const spellsContainer = document.getElementById('spells-container');
const characterFileContainer = document.getElementById('character-file');
const houseSelect = document.getElementById('house-select');
const patronusSelect = document.getElementById('patronus-select');
const wandSelect = document.getElementById('wand-select');
const inputSearch = document.getElementById('search-bar');
const cards = document.querySelectorAll('.card');
const form = document.querySelector('form');

let arrayOfWands = [];
let arrayOfPatronus = [];

let dataArray = [];

async function getDataFromCharacters() {
    try {
        const response = await fetch('https://hp-api.onrender.com/api/characters');
        const data = await response.json();
        dataArray = [...data];
        data.forEach(character => {
            if (arrayOfWands.indexOf(character.wand.core) === -1 && character.wand.core !== "") {
                arrayOfWands.push(character.wand.core);
            };

            if (arrayOfPatronus.indexOf(character.patronus) === -1 && character.patronus !== "") {
                arrayOfPatronus.push(character.patronus);
            };
        })
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

function printPatronusOptions() {
    for (patronus of arrayOfPatronus) {
        const option = document.createElement('option')
        option.value = patronus;
        option.textContent = patronus;
        patronusSelect.appendChild(option);
    }
}

function printWandOptions() {
    for (wand of arrayOfWands) {
        const option = document.createElement('option')
        option.value = wand;
        option.textContent = wand;
        wandSelect.appendChild(option);
    }
}

function printCharacters(data) {
    charactersContainer.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let cardCharacter = document.createElement('article');
        cardCharacter.setAttribute('class', `card ${data[i].house} `);
        charactersContainer.appendChild(cardCharacter);
        cardCharacter.innerHTML =
            `<img src="${data[i].image}" alt="">
            <h3>${data[i].name}</h3>
            <div class="character-data"
                <label">Species: ${data[i].species}</label>
                <label id="label-house">House: ${data[i].house}</label>
                <label id="label-patronus" class ="neon-text">Patronus: ${data[i].patronus}</label>
                <label id="label-wand-core" >wand: ${data[i].wand.core}</label>
                <label><a href="characters-full.html">More details</a></label>
            </div>
            `
    };
};

async function getCharacters(data) {
    printWandOptions()
    printPatronusOptions()
    printCharacters(data);
}

function filterCharacters() {
    const search = inputSearch.value.toLowerCase();
    const house = houseSelect.value.toLowerCase();
    const patronus = patronusSelect.value.toLowerCase();
    const wand = wandSelect.value.toLowerCase();

    const formattedData = dataArray.filter(character => {
        const nameMatch = !search || (search && character.name.toLowerCase().includes(search));
        const houseMatch = !house || (house && character.house.toLowerCase().includes(house));
        const patronusMatch = !patronus || (patronus && character.patronus.toLowerCase().includes(patronus));
        const wandMatch = !wand || (wand && character.wand.core.toLowerCase().includes(wand));


        return nameMatch && houseMatch && patronusMatch && wandMatch;
    })

    getCharacters(formattedData)
    //inputSearch, wandSelect, patronusSelect, houseSelect
    //cards
    //Si los valores de los inputs son nulos, se muesta todo
    //Si coindcide uno solo dato, charactersContainer.innerHTML se vacia, y despues imprimo las nuevas
}

async function initialize() {
    const data = await getDataFromCharacters();
    getCharacters(data);
    form.addEventListener('input', filterCharacters);
}
initialize();

async function getAndPrintSpells() {
    let response = await fetch('https://hp-api.onrender.com/api/spells');
    let data = await response.json();
    //Print Characters
    for (let i = 0; i < data.length; i++) {
        let cardSpells = document.createElement('article');
        cardSpells.setAttribute('class', 'card spells');
        spellsContainer.appendChild(cardSpells)
        cardSpells.innerHTML = `
                                <h3>${data[i].name}</h3>
                                <label>${data[i].description}</label>
                                `
    }
}
getAndPrintSpells()








