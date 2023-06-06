const charactersContainer = document.getElementById('character-container');
let arrayOfWands = []
let arrayOfPatronus = []

async function getCharacters() {
    let response = await fetch('https://hp-api.onrender.com/api/characters');
    let data = await response.json();
    console.log(data[9].wand.core)
    //Print Characters
    for (let i = 0; i < data.length; i++) {
        let cardArticle = document.createElement('article');
        cardArticle.setAttribute('class', `card ${data[i].house}`)

        charactersContainer.appendChild(cardArticle);
        cardArticle.innerHTML =
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
            arrayOfPatronus.push(data[i].patronus)

        }

    }
    return arrayOfWands, arrayOfPatronus
}
getCharacters();




console.log(arrayOfWands[5]);
console.log(arrayOfPatronus)






