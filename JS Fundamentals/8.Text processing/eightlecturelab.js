function print(input) {
    let string = input

    for (const char of string) {
        console.log(char);
    }
}


function substring(str, a, b) {
    let string = str
    let start = a
    let end = start + b
    console.log(string.substring(start, end));
}


function censor(text, string) {
    let textString = text
    let wordString = string
    let count = wordString.length

    while (textString.includes(wordString)) {
        textString = textString.replace(wordString, ('*'.repeat(count)))
    }

    console.log(textString);
}


function occurencees(text,word){
    let words = text.split(' ')
    let counter = 0
    for (const string of words) {
        if (string === word){
            counter++
        }
    }
    console.log(counter);
}