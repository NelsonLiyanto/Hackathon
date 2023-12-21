let height =6;
let width =5;
let row = 0;
let col =0;

let lose =false
let wordlist = ["SQUID", "BISON", "CAMEL", "COBRA", "EAGLE"]

let word = wordlist[Math.floor(Math.random() * wordlist.length)].toUpperCase()
console.log(word);

window.onload = function() {
    intialize();
}
// console.log("bakso");
function intialize() {
    for(let i =0; i < height; i++) {
        for(let j =0; j < width;j++) {
            let box = document.createElement("div");
            box.id = i.toString() + "-"+ j.toString()
            box.classList.add("box")
            box.innerText = "";
            document.getElementById("board").appendChild(box)
        }
    }

    document.addEventListener("keyup", function(key) {
        if(lose) return
        if("KeyA" <= key.code && key.code <= "keyZ") {
            if(col < width) {
                let curbox = document.getElementById(row.toString() + "-"+ col.toString());
                if(curbox.innerText == "") {
                    curbox.innerText = key.code[3];
                    col++;
                }
            }

        } else if (key.code == "Backspace"){
            if(0 < col && col <= width) {
                col--;
            }
            let curbox = document.getElementById(row.toString() + "-"+ col.toString());
            curbox.innerText = "";
        } else if(key.code == "Enter") {
            if(col === 5) {
                update();
                row++; 
                col =0;
                document.getElementById("answer").innerText = ""  
            } else if(col < 5) {
                document.getElementById("answer").innerText = "masukan kata yang lengkap" 
            }
        }

        if(!lose && row == height) {
            lose = true;
            document.getElementById("answer").innerText = word  
        }
    })
}

function update() {
    let correct =0;
    let letterCount = {};
    for(let i=0; i < word.length; i++) {
        let char = word[i]
        if(letterCount[char] === undefined) {
            letterCount[char] = 1
        } else {
            letterCount[char] += 1
        }
    }

    for(let i =0; i < width; i++) {
        let curbox = document.getElementById(row.toString() + "-"+ i.toString());
        let letter = curbox.innerText;

        if(word[i] == letter) {
            curbox.classList.add("correct");
            correct++;
            letterCount[letter] -= 1
        } else if(word.includes(letter)) {
            curbox.classList.add("maybe");
        } else {
            curbox.classList.add("wrong")
        }
        if(correct == width) {
            lose = true;
        }
    }

    for(let i =0; i < width; i++) {
        let curbox = document.getElementById(row.toString() + "-"+ i.toString());
        let letter = curbox.innerText;
        if(!curbox.classList.contains("correct")) {
            if(word.includes(letter) && letterCount[letter] > 0) {
                curbox.classList.add("maybe");
            } else {
                curbox.classList.add("wrong")
            }
        }
    }
}