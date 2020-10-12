function bonus(input) {
    let totalStudents = +input.shift()
    let lectureCount = +input.shift()
    let extraBonus = +input.shift()
    let maxAttendances = Math.max(...(input.map(Number)))
    let maxPoints = maxAttendances / lectureCount * (5 + extraBonus)

    if (lectureCount == 0) {
        maxPoints = 0
        maxAttendances = 0
    }

    console.log(`Max Bonus: ${Math.ceil(maxPoints)}.`);
    console.log(`The student has attended ${maxAttendances} lectures.`);
}


function mu(input) {
    let health = 100
    let bitcoins = 0
    let rooms = input.split('|')
    let room = 0
    let alive = true

    for (let i = 0; i < rooms.length; i++) {
        room = i + 1

        let [command, number] = rooms[i].split(' ')

        switch (command) {
            case "potion": potion(number); break
            case "chest": chest(number); break
            default: monster(command, number); break
        }

        if (!alive) {
            break
        }

    }

    if (alive) {
        console.log(`You've made it!`);
        console.log(`Bitcoins: ${bitcoins}`);
        console.log(`Health: ${health}`);
    }

    function potion(number) {
        if (health + Number(number) > 100) {
            number = 100 - health
            health = 100
        } else {
            health += Number(number)
        }
        console.log(`You healed for ${number} hp.`);
        console.log(`Current health: ${health} hp.`);
    }

    function chest(number) {
        bitcoins += Number(number)
        console.log(`You found ${number} bitcoins.`);
    }

    function monster(command, number) {
        health -= Number(number)
        console.log(health);
        if (!(health <= 0)) {
            console.log(`You slayed ${command}.`)
        } else {
            console.log(`You died! Killed by ${command}.`);
            console.log(`Best room: ${room}`);
            alive = false
        }
    }

}



function inventory(input) {
    let items = input[0].split(', ')

    for (const command of input) {
        if (command == "Craft!") break
        let [action, item] = command.split(' - ')
        switch (true) {
            case action == "Collect" && !(items.includes(item)): items.push(item); break
            case action == "Drop" && items.includes(item): items.splice(items.indexOf(item), 1); break
            case action == "Combine Items" && items.includes(item.split(':')[0]): items.splice(items.indexOf(item.split(':')[0]) + 1, 0, item.split(':')[1]); break
            case action == "Renew" && items.includes(item): items.splice(items.indexOf(item), 1); items.push(item); break
        }
    }

    console.log(items.join(', '));
}

