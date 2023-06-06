const charactersContainer = document.getElementById('character-container');
const spellsContainer = document.getElementById('spells-container');
let arrayOfWands = [];
let arrayOfPatronus = [];

async function getCharacters() {
    let response = await fetch('https://hp-api.onrender.com/api/characters');
    let data = await response.json();
    //Print Characters
    for (let i = 0; i < data.length; i++) {
        let cardCharacter = document.createElement('article');
        cardCharacter.setAttribute('class', `card ${data[i].house}`);

        charactersContainer.appendChild(cardCharacter);
        cardCharacter.innerHTML =
            `<img src="${data[i].image}" alt="">
                        
                            <h3>${data[i].name}</h3>
                            <div class="character-data"
                                <label>Species: ${data[i].species}</label>
                                <label>House: ${data[i].house}</label>
                                <label class ="neon-text">Patronus: ${data[i].patronus}</label>
                                <label><a>More details</a></label>
                            </div>
                        
                        `



        //return an array with no repeated elements of wand's core
        if (arrayOfWands.indexOf(data[i].wand.core) === -1) {
            arrayOfWands.push(data[i].wand.core);

        }
        //return an array with no repeated elements of patronus
        if (arrayOfPatronus.indexOf(data[i].patronus === -1)) {
            arrayOfPatronus.push(data[i].patronus);

        };

    };
    return arrayOfWands, arrayOfPatronus;
};
getCharacters();



async function getSpells() {
    let response = await fetch('https://hp-api.onrender.com/api/spells');
    let data = await response.json();
    console.log(data)
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
getSpells()








