// document.getElementById('playButton').onclick = function(){
//     location.href = './game.html'
// }
// import anArrayOfEnglishWords from './node_modules/an-array-of-english-words';

async function readData(){
    try {
        let fetched = await fetch('./words.json')
        let data = await fetched.json()
        // console.log(data)
        words = data
        return data
    } catch (error) {
        console.log(error);
    }
}

let generated = ''

async function displayResult(){
    words = await readData()
   let picker = Math.floor(Math.random() * 11000);

       function fivelet(value){
           if(value.length == 5){
               return value
           }
       }
       let randomWord = words.filter(fivelet)[picker]
    //    document.getElementById('displayResult').innerHTML = randomWord.toUpperCase()
       generated = randomWord
       return randomWord
}
displayResult()

function addBar(){
    console.log(generated)
}




// function displayResult(){
//     var words = readData()
//     let picker = Math.floor(Math.random() * 11000);

//     function fivelet(value){
//         if(value.length == 5){
//             return value
//         }
//     }
//     console.log(readData())
//     // let randomWord = words.filter()
//     // document.getElementById('displayResult').innerHTML = randomWord
//     // return randomWord[picker]
// }

// console.log(displayResult())