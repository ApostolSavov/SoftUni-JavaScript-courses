function match(input) {
    let pattern = /\b([A-Z][a-z]{1,})[ ]([A-Z][a-z]{1,})\b/g
    let names = input[0]
    let valid = names.match(pattern)
    console.log(valid.join(' '));
}


function phone(input) {
    let numbers = input[0]
    let pattern = /\+359([ -])2\1\d{3}\1\d{4}\b/g
    let valid = numbers.match(pattern)
    console.log(valid.join(', '));
}


function date(input) {
    let dates = input[0]
    let pattern = /\b(?<day>\d{2})([.\-\/])(?<month>[A-Z][a-z]{2})\2(?<year>\d{4})\b/g
    let valid = dates.match(pattern)

    while ((valid = pattern.exec(dates)) !== null) {
        let day = valid.groups['day']
        let month = valid.groups['month']
        let year = valid.groups['year']
        console.log(`Day: ${day}, Month: ${month}, Year: ${year}`);
    }
}


function remove(a, b) {
    // let word = new RegExp(`${a}`, 'g')
    let word = new RegExp(a.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g')
    let text = b

    while (word.test(text)) {
        text = text.replace(word, '')
    }

    console.log(text);
}



