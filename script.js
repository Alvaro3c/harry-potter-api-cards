const charactersContainer = document.getElementById('character-container');
let data = ''
async function getCharacters() {
    let response = await fetch('https://hp-api.onrender.com/api/characters');
    let data = await response.json();
    console.log(data[6].patronus);

    for (let i = 0; i < data.length; i++) {
        let cardArticle = document.createElement('article');
        cardArticle.setAttribute('class', `card ${data[i].house}`)

        charactersContainer.appendChild(cardArticle);
        cardArticle.innerHTML =
            `<img src="${data[i].image}" alt="">
                        <h3 for="">${data[i].name}</h3>
                       <div class="character-data"
                        <label>${data[i].species}</label>
                        <label>${data[i].house}</label>
                        <label>${data[i].patronus}</label>
                        </div>
                       `
    }
}
getCharacters();