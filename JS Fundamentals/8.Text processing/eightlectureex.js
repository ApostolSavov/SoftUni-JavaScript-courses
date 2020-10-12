function reveal(first, second) {
    let words = first.split(', ')
    let text = second.split(' ')
    let wordLen = 0
    let tempLen = 0
    let tempStr = ''

    for (const word of words) {
        wordLen = word.length
        for (let i = 0; i < text.length; i++) {
            tempLen = text[i].length
            tempStr = text[i]
            if (tempStr.startsWith('*') && tempLen === wordLen) {
                text[i] = word
                break
            }
        }
    }

    console.log(text.join(' '));

}


function hash(input) {
    let strings = input.split(' ')
    let flag = false

    for (let i = 0; i < strings.length; i++) {
        let curr = strings[i]
        if (curr.includes('#') && curr.length > 1) {
            flag = true
            curr = curr.substring(1, curr.length)

            for (let j = 0; j < curr.length; j++) {

                if (curr.charCodeAt(j) > 123 || curr.charCodeAt(j) < 65) {
                    flag = false
                    break
                }
            }
            if (flag) console.log(curr);
        }
    }
}



function extract(input) {
    let strings = input.split('\\')
    let file = strings.pop().split('.')
    let extension = file.pop()
    let fileName = file.length > 1 ? file.join('.') : file

    console.log(`File name: ${fileName}`);
    console.log(`File extension: ${extension}`);
}


function substring(a, b) {
    let word = a.toLowerCase()
    let strings = b.split(' ').map(x => x.toLowerCase())
    let flag = false

    for (const string of strings) {
        if (word == string) {
            console.log(word);
            flag = true
            break
        }
    }

    if (!flag) {
        console.log(`${word} not found!`);
    }

}


function repeat(input) {
    let curr = ''
    let previous = input[0]
    let letters = previous
    for (let i = 1; i < input.length; i++) {
        curr = input[i]
        if (!(previous === curr)) {
            letters += curr
            previous = curr
        }
    }
    console.log(letters);
}


function pascal(input) {
    let string = input.split('')
    let curr = ''

    for (let i = 1; i < string.length; i++) {
        curr = string[i]
        if (curr === curr.toUpperCase()) {
            string[i] = `, ${curr}`
        }
    }

    console.log(string.join(''));
}


function cut(input) {
    let first = input.slice(0, input.length / 2)
    let second = input.slice(input.length / 2, input.length)
    let firstRev = first.split('').reverse().join('')
    let secondRev = second.split('').reverse().join('')
    console.log(firstRev);
    console.log(secondRev);
}


function hard(input) {
    let text = input[0].split(' ')
    let words = input[1]

    for (const string of text) {
        if (string.startsWith('_')) {
            for (const word of words) {
                if (word.length === string.length) {
                    text[text.indexOf(string)] = word
                }
            }
        }
    }

    console.log(text.join(' '));
}


function password(input) {
    let vowels = 'aeiou'
    let word = input[2]
    let string = (input[0] + input[1]).split('')
    let vowelCount = 0

    for (let i = 0; i < string.length; i++) {
        if (vowels.includes(string[i])) {
            string[i] = '*'
            vowelCount++
        }
    }

    let wordRepeat = vowelCount / word.length < 1 ? 1 : vowelCount / word.length
    word = word.repeat(Math.ceil(wordRepeat)).toUpperCase()
    string = string.join('')


    for (let i = 0; i < word.length; i++) {
        if (string.includes('*')) {
            string = string.replace('*', word[i])
        } else {
            break
        }
    }

    console.log(`Your generated password is ${string.split('').reverse().join('')}`);
}


function change(input) {
    let strings = input.split(' ').map(x => x.trim()).filter(x => x)
    let firstLetter = ''
    let firstPos = 0
    let lastLetter = ''
    let lastPos = 0
    let number = 0
    let alphabet = '*abcdefghijklmnopqrstuvwxyz'
    let numbersArr = []

    for (const string of strings) {
        firstLetter = string[0]
        firstPos = alphabet.indexOf(firstLetter.toLowerCase())
        lastLetter = string[string.length - 1]
        lastPos = alphabet.indexOf(lastLetter.toLowerCase())
        number = Number(string.slice(1, string.length - 1))

        number = firstLetter === firstLetter.toUpperCase() ? divide(number, firstPos) : multiply(number, firstPos)
        number = lastLetter === lastLetter.toUpperCase() ? subtract(number, lastPos) : add(number, lastPos)

        numbersArr.push(Number(number))
    }

    console.log((numbersArr.reduce((a, b) => a + b, 0)).toFixed(2))

    function divide(number, position) {
        return number /= position
    }

    function multiply(number, position) {
        return number *= position
    }

    function subtract(number, position) {
        return number -= position
    }

    function add(number, position) {
        return number += position
    }
}
