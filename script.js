const charactersContainer = document.getElementById('character-container');
const spellsContainer = document.getElementById('spells-container');
const characterFileContainer = document.getElementById('character-file');
const houseSelect = document.getElementById('house-select');
const patronusSelect = document.getElementById('patronus-select');
const wandSelect = document.getElementById('wand-select');
const inputSearch = document.getElementById('search-bar');
const cards = document.querySelectorAll('.card');
const btn = document.querySelector('#btn')

console.log(houseSelect)
console.log(patronusSelect)
console.log(wandSelect)

let arrayOfWands = [];
let arrayOfPatronus = [];

async function getCharacters() {
    let response = await fetch('https://hp-api.onrender.com/api/characters');
    let data = await response.json();
    function printCharacters() {

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
            //return an array with no repeated elements of wand's core //CHECK BIEN
            if (arrayOfWands.indexOf(data[i].wand.core) === -1 && data[i].wand.core !== "") {
                arrayOfWands.push(data[i].wand.core);
            };

            //return an array with no repeated elements of patronus //CHECK BIEN
            if (arrayOfPatronus.indexOf(data[i].patronus) === -1 && data[i].patronus !== "") {
                arrayOfPatronus.push(data[i].patronus);
            };
        };


        return arrayOfPatronus, arrayOfWands
    };

    function printPatronusOptions() {
        for (patronus of arrayOfPatronus) {
            patronusSelect.innerHTML += `<option value="${patronus}">${patronus}</option>`

        }
    }
    function printWandOptions() {
        for (wand of arrayOfWands) {
            wandSelect.innerHTML += `<option value="${wand}">${wand}</option>`
        }
    }

    function filterCards() {
        //inputSearch, wandSelect, patronusSelect
        //cards
        //Si los valores de los inputs son nulos, se muesta todo
        //Si coindcide uno solo dato, charactersContainer.innerHTML se vacia, y despues imprimo las nuevas
        btn.addEventListener('click', (e) => {
            console.log(e.)
            console.log(inputSearch.e.)
        })
        data.filter(Characters => {
            if (Characters.name.includes(inputSearch.value) === true) {
                console.log('hay un harry')
            }
        })


    }


    printCharacters();
    printWandOptions()
    printPatronusOptions()
    filterCards()
}
getCharacters()




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








