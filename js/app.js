
const elements = {
    score: null,
    answer: null,
    choices: null
};

const words = [
    'JAVASCRIPT',
    'STYLESHEET',
    'LANGUAGE',
    'SYMFONY',

]

let choices = [];
let word = '';
let wordMapping = [];
let choicesMapping = [];
let scroreCount = 0;
let scoreMax = 8;


const init =() =>{
    console.log('>> #init');

    //attach elements 
    elements.score = document.getElementById('score');
    elements.answer = document.getElementById('answer');
    elements.choices = document.getElementById('choices');

    //pick word
    word = pickWord();

    //generate choices
    choices = generateChoices();

    //-create word mapping
    wordMapping = getWordMapping(word);

    //-create choices mapping
    choicesMapping = getChoicesMapping(choices);

    //display word
    displayWord(wordMapping)


    //display choices
    displayChoices(choicesMapping)

    //display score
    // displayScore();

    //listen mouse events and keyboard events
    elements.choices.addEventListener('click', ({target}) => {
        // evt.target => { target }
        if(target.matches('li')) {
            checkLetter(target.innerHTML)
        }
    });
    document.addEventListener('keydown', ({keyCode}) => {
        //evt.keyboardEvent evt.keyCode => {keyCode}
        const letter = String.fromCharCode(keyCode)
        if(keyCode >= 65 && keyCode <= 90) {
            checkLetter(letter)
        }
    })

    //check letter
    //-add an error if not in word
    //-add letter if in word
    //endGame
    //-if score max == loseGame
    //-if letter are visible : wingame
    
    function checkLetter(letter)
    {
        let isLetterInWord = false;
        let isAllLetterAreFounds = true;
   
        wordMapping.forEach((letterMapping) => {
            
            if(letterMapping.letter == letter) {

                letterMapping.isVisible = true;
                isLetterInWord = true; 
            }

            if(!letterMapping.isVisible) {
                isAllLetterAreFounds = false;
            }
        })
        
        choicesMapping.forEach((letterMapping) => {
            if(letterMapping.letter == letter) {

                letterMapping.isChosen = true;
            }

          
        })
        displayChoices(choicesMapping);


        if(isLetterInWord == true) {
            displayWord(wordMapping)
        }else {
            scroreCount++;
            displayScore();
        }

        if(scroreCount === scoreMax) {
            endGame();
        }

        if(isAllLetterAreFounds) {
            winGame()
        }
    }
};



function pickWord()
{

    const randomIndex = getRandomeInt (0, words.length - 1);

    return words[randomIndex];
}

function generateChoices()
{
    const choices= [];
    //le code ASCII HTML pour les lettre commence de 65 et va jusqu'à 90 donc nous allons boucler dessus pour creer les letters
    for(let index = 65; index<= 90; index++) {

        //string.fromCharCode permet de recuperer un string à partir d'un code
        choices.push(String.fromCharCode(index));
    }

    return choices
}

/*******************************Mapping Function**************************** */

function getChoicesMapping(choices)
{
    // map sert a boucler sur tous les elements
    const choicesMapping = choices.map((letter) => {
        return {
            letter,
            isChosen: false
        };
    });

    return choicesMapping;
}

function getWordMapping(word)
{
    //sert a decouper un mot et le mettre dans un tableau
    const wordArr = word.split('');
    // map sert a boucler sur tous les elements
    const wordMapping = wordArr.map((letter, index) => {
        let isVisible = false;

        if(index == 0 || index == wordArr.length -1 ) {
            isVisible = true;
        }

        return {
            letter,
            isVisible
        };
    });

    return wordMapping;
}

/***************************fin Mapping Function**************************** */


/*******************************display Function**************************** */

function displayChoices(choicesMapping)
{
    const choicesHtml = choicesMapping.map((letterMapping) =>{
        if(letterMapping.isChosen == false) {
            return `<li>${letterMapping.letter}</li>`;
        }else {
            return `<li class="disabled">${letterMapping.letter}</li>`;
        }
    })

    elements.choices.querySelector('ul').innerHTML = choicesHtml.join('');
}

function displayWord(wordMapping)
{
    const wordHtml = wordMapping.map((letterMapping) =>{
        if(letterMapping.isVisible == true) {
            return `<li>${letterMapping.letter}</li>`;
        }else {
            return `<li>_</li>`;
        }
    })

    elements.answer.querySelector('ul').innerHTML = wordHtml.join('');
}

function displayScore()
{
    elements.score.innerHTML = `${scroreCount} / ${scoreMax}`;
    elements.score.innerHTML = `<img src="./img/00${scroreCount}.png" alt="hangman" />`
}

/***************************fin display Function**************************** */

/***********************win and endGame Function**************************** */

function endGame()
{
    document.querySelector('body').style.backgroundColor = 'red';
    elements.choices.innerHTML = `<h1>You are dead !!!!</h1>`;
}

function winGame() 
{
    elements.choices.innerHTML = `<h1>You Live !</h1>`;
}


/*******************fin win and endGame Function**************************** */

window.addEventListener('load', () => {
    init();
})


function getRandomeInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min + 1)) + min;
}