let height = 5;
let width = 5;

let row = 0
let col = 0
let score = 0
let gameOver = false

let key = function(e) {
    if (gameOver) return

    // alert(e.code)
    if ('KeyA' <= e.code && e.code <= 'KeyZ') {
        if (col < width) {
            let currentTile = document.getElementById(row.toString() + '-' + col.toString())
            if (currentTile.innerText == '') {
                currentTile.innerText = e.code[3]
                col += 1
            }
        }
    }
    else if (e.code == 'Backspace') {
        if (0 < col && col <= width) {
            col -= 1
        }
        let currentTile = document.getElementById(row.toString() + '-' + col.toString())
        currentTile.innerText = ''
    }
    else if (e.code == 'Enter') {
    if(col == width){
        update()
        row += 1 //start new row
        col = 0 /// start at 0 for new row
        //jika pake guesslist ini pindah kebawah
    } else if(col < width){
        window.alert(`Isi hingga 5 karakter!!`)
    }
    }
    
    if (!gameOver && row == height) {
        gameOver = true
        // document.getElementById('play').remove()
        const createPlay = document.createElement('input')
        createPlay.setAttribute('id','play')
        createPlay.setAttribute('onclick','window.location.reload()')
        createPlay.setAttribute('type','button')
        createPlay.setAttribute('value','Play')
        createPlay.setAttribute('class','play')
        
        const content = document.getElementById('content')
        
        let board = document.createElement('div')
        board.setAttribute('id','board')
        document.getElementById('board').remove()
        
        let answer = document.createElement('div')
        answer.setAttribute('id','answer')
        document.removeEventListener('keyup',key)
        content.appendChild(board)
        content.appendChild(answer)
        content.appendChild(createPlay)
        
         height = 5;
         width = 5;
         row = 0
         col = 0

         gameOver = false

        document.getElementById('wrongAnswer').innerText = `Nice try! The answer is ${word}`
    }

}
// let guesslist = ['cigar', 'squid', 'awake', 'water', 'qwert', 'aiueo', 'abcde']



let word = ''
displayResult()

function play(){
displayResult()

    intialize()
    startCountdown(60)
    // console.log(word)
    document.getElementById('play').remove()
    document.getElementById('answer').remove()
    document.getElementById('wrongAnswer').innerText = ''

}

function conti(){
displayResult()

    intialize()
    console.log(word)
    document.getElementById('answer').remove()
    document.getElementById('play').remove()
}

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
       word = randomWord.toUpperCase()
       return word
}






function startCountdown(seconds) {
    let counter = seconds;
      
    const interval = setInterval(() => {
      document.getElementById('timer').innerHTML = `Timer: ${counter}`
      counter--;
        
      if (counter < 0 ) {
        clearInterval(interval);
        gameOver = true
        // document.getElementById('play').remove()
        const createPlay = document.createElement('input')
        createPlay.setAttribute('id','play')
        createPlay.setAttribute('onclick','play()')
        createPlay.setAttribute('type','button')
        createPlay.setAttribute('value','Play')
        createPlay.setAttribute('class','play')
        
        const content = document.getElementById('content')
        
        let board = document.createElement('div')
        board.setAttribute('id','board')
        document.getElementById('board').remove()
        
        let answer = document.createElement('div')
        answer.setAttribute('id','answer')
        document.removeEventListener('keyup',key)
        content.appendChild(board)
        content.appendChild(answer)
        content.appendChild(createPlay)
        document.getElementById('answer').innerText = `Time's up! The answer is ${word}`
        
         height = 5;
         width = 5;
         row = 0
         col = 0

         gameOver = false
        // console.log('Ding!');
      }
    }, 1000);
  }

function intialize() {
//create board
    for (let i =0; i < height;i++) {
        for (let j = 0; j < width; j++) {
            let tile =  document.createElement('span')
            tile.id = i.toString() + '-' + j.toString()
            tile.classList.add('tile')
            tile.innerText = ''
            document.getElementById('board').appendChild(tile)
        }
    }
    
    // listen for key press
    document.addEventListener('keyup', key)
    
}

function update() {
    // //menyambungkan gueslist ke word, kalau perlu
    // let guess = ''
    // document.getElementById('answer').innerText = "";
    // for (let j = 0; j < width; j++) {
    //     let currentTile = document.getElementById(row.toString() + '-' + j.toString())
    //     let letter = currentTile.innerText
    //     guess += letter
    // }

    // guess = guess.toLowerCase()
    // if (!guesslist.includes(guess)) {
    //     document.getElementById('answer').innerText = 'Not a word'
    //     return
    // }
    
    // start processing game
    let correct = 0
    let letterCount = {} // SKKKD {S:1, K:3, D:1}
    // console.log(word, 'TESTING')
    for (let i = 0 ; i < word.length; i++) {
        letter = word[i]
        if (letterCount[letter]) {
            letterCount[letter] += 1
        }
        else {
            letterCount[letter] = 1
        }
    }
    //loop pertama, cek jawaban benar semua
    for (let j = 0; j < width; j++) {
        let currentTile = document.getElementById(row.toString() + '-' + j.toString())
        let letter = currentTile.innerText
        //posisi benar
        // console.log(word[j],letter)
        if (word[j] === letter) {
            currentTile.classList.add('correct')
            correct += 1
            letterCount[letter] -= 1
        } 

        if (correct == width) {
            score++
            height = 5;
            width = 5;
            row = 0
            col = 0
            gameOver = false

            let scorediv = document.getElementById('score-count')
            scorediv.innerHTML = `Score: ${score}`
            document.getElementById('board').remove()
            const content = document.getElementById('content')
            let board = document.createElement('div')
            board.setAttribute('id','board')
            let answer = document.createElement('div')
             answer.setAttribute('id','answer')
            document.removeEventListener('keyup',key)

            content.appendChild(board)
            content.appendChild(answer)
            conti()
            }
    }



     //loop kedua, cek benar tapi salah posisi
     for (let j = 0; j < width; j++) {
        let currentTile = document.getElementById(row.toString() + '-' + j.toString())
        let letter = currentTile.innerText

        if (!currentTile.classList.contains('correct')) {

            //huruf benar
            if (word.includes(letter) && letterCount[letter] > 0) {
                currentTile.classList.add('present')
                letterCount[letter] -= 1
            } //salah huruf
            else {
                currentTile.classList.add('abscent')
            } 
        }
            
    }

    
}