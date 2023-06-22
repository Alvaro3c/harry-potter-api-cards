const charactersContainer = document.getElementById('character-container');
const spellsContainer = document.getElementById('spells-container');
const characterFileContainer = document.getElementById('character-files');
const houseSelect = document.getElementById('house-select');
const patronusSelect = document.getElementById('patronus-select');
const wandSelect = document.getElementById('wand-select');
const inputSearch = document.getElementById('search-bar');
const cards = document.querySelectorAll('.card');
const form = document.querySelector('form');
const characterData = document.querySelector('.character-data')

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

function printCharactersCards(data) {
    charactersContainer.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let cardCharacter = document.createElement('article');
        cardCharacter.setAttribute('class', `card ${data[i].house} `);
        charactersContainer.appendChild(cardCharacter);
        let patronus = `<label id="label-patronus" class ="neon-text">Patronus: ${data[i].patronus}</label>`
        let wandCore = `<label id="label-wand-core" >wand: ${data[i].wand.core}</label>`
        let house = `<label id="label-house">House: ${data[i].house}</label>`
        cardCharacter.innerHTML = `
                <img src="${data[i].image}" alt="">
                <h3>${data[i].name}</h3>
                <div class="character-data"
                    <label">Species: ${data[i].species}</label>
                    ${data[i].house ? house : ''}
                    ${data[i].patronus ? patronus : ''}
                    ${data[i].wand.core ? wandCore : ''}
                </div>
                <label id="more-detail-label"><button id="btn-details0${i}">More details</button></label>`

        let btnDetail = document.querySelector(`#btn-details0${i}`);
        let btnDetailId = document.querySelector(`#btn-details0${i}`).attributes.id.nodeValue
        btnDetail.addEventListener('click', () => {
            localStorage.setItem('idBtn', btnDetailId);
            window.open('./characters-full.html');
        });
    };
};

function printCharactersFiles(data) {
    let questionsData = localStorage.getItem('idBtn');
    let stringIdOfCharacter = '' + (questionsData[questionsData.length - 2]) + (questionsData[questionsData.length - 1]);
    let numberIdOfCharacter = stringIdOfCharacter * 1
    let actor = `<label><span>Actor:</span> ${data[numberIdOfCharacter].actor}</label>`
    let ancestry = `<label><span>Ancestry:</span> ${data[numberIdOfCharacter].ancestry}</label>`
    let eyeColour = `<label><span>Eye color:</span> ${data[numberIdOfCharacter].eyeColour}</label>`
    let house = `<label><span>House:</span>${data[numberIdOfCharacter].house} </label>`
    let wandWood = `<label><span>Wand's wood:</span> ${data[numberIdOfCharacter].wand.wood}</label>`
    let wandCore = ` <label><span>Wand's core:</span> ${data[numberIdOfCharacter].wand.core}</label>`

    characterFileContainer.innerHTML = `
                <article class="all-data-container ${data[numberIdOfCharacter].house}">
                    <img src="${data[numberIdOfCharacter].image}" alt="">
                    <div class="data-container">
                        <h2>${data[numberIdOfCharacter].name}</h2>
                        ${data[numberIdOfCharacter].actor ? actor : ''}
                        ${data[numberIdOfCharacter].ancestry ? ancestry : ''}
                        ${data[numberIdOfCharacter].eyeColour ? eyeColour : ''}
                        ${data[numberIdOfCharacter].house ? house : ''}
                        ${data[numberIdOfCharacter].wandWood ? wandWood : ''}
                        ${data[numberIdOfCharacter].wandCore ? wandCore : ''}                       
                    </div>
                </article>
            `
}

async function getCharacters(data) {
    printWandOptions()
    printPatronusOptions()
    printCharactersCards(data);
    printCharactersFiles(data)
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


inputSearch.addEventListener('input', () => {
    let nameRGEX = /[a-záéíúó\s]$/
    let nameResult = nameRGEX.test(inputName.value)
    if (nameResult === false) {
    }
})







