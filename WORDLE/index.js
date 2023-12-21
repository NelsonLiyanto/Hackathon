let height = 6;
let widht = 5;

let row = 0
let col = 0

let gameOver = false

let wordlist = ['cigar', 'squid', 'awake']
// let guesslist = ['cigar', 'squid', 'awake', 'water', 'qwert', 'aiueo', 'abcde']

let word = wordlist[Math.floor(Math.random() * wordlist.length)].toUpperCase()
console.log(word);

window.onload = function() {
    intialize()
}

function intialize() {
//create board
    for (let i =0; i < height;i++) {
        for (let j = 0; j < widht; j++) {
            let tile =  document.createElement('span')
            tile.id = i.toString() + '-' + j.toString()
            tile.classList.add('tile')
            tile.innerText = ''
            document.getElementById('board').appendChild(tile)
        }
    }
    
    // listen for key press
    document.addEventListener('keyup', (e) => {
        if (gameOver) return

        // alert(e.code)
        if ('KeyA' <= e.code && e.code <= 'KeyZ') {
            if (col < widht) {
                let currentTile = document.getElementById(row.toString() + '-' + col.toString())
                if (currentTile.innerText == '') {
                    currentTile.innerText = e.code[3]
                    col += 1
                }
            }
        }
        else if (e.code == 'Backspace') {
            if (0 < col && col <= widht) {
                col -= 1
            }
            let currentTile = document.getElementById(row.toString() + '-' + col.toString())
            currentTile.innerText = ''
        }
        else if (e.code == 'Enter') {
            update()
            row += 1 //start new row
            col = 0 /// start at 0 for new row
            //jika pake guesslist ini pindah kebawah
        }

        if (!gameOver && row == height) {
            gameOver = true
            document.getElementById('answer').innerText = word
        }

    })
    
}

function update() {
    // //menyambungkan gueslist ke word, kalau perlu
    // let guess = ''
    // document.getElementById('answer').innerText = "";
    // for (let j = 0; j < widht; j++) {
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
    for (let j = 0; j < widht; j++) {
        let currentTile = document.getElementById(row.toString() + '-' + j.toString())
        let letter = currentTile.innerText

        //posisi benar
        if (word[j] === letter) {
            currentTile.classList.add('correct')
            correct += 1
            letterCount[letter] -= 1

        } 

        if (correct == widht) {
            gameOver = true
        }
    }



     //loop kedua, cek benar tapi salah posisi
     for (let j = 0; j < widht; j++) {
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
