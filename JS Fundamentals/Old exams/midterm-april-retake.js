function counter(input) {
    let energy = +input.shift()
    let neededEnergy = 0
    let wins = 0
    let flag = true


    for (let i = 0; i < input.length; i++) {
        neededEnergy = isNaN(Number(input[i])) ? input[i] : +input[i]
        if (input[i] === 'End of battle') {
            console.log(`Won battles: ${wins}. Energy left: ${energy}`);
            flag = false
            break
        } else if (energy - neededEnergy < 0) {
            console.log(`Not enough energy! Game ends with ${wins} won battles and ${energy} energy`);
            flag = false
            break
        } else {
            energy -= neededEnergy
            wins++
            if (wins % 3 === 0) energy += wins
        }
    }

    if (flag) console.log(`Won battles: ${wins}. Energy left: ${energy}`);

}


function shoot(input) {
    let targets = input.shift().split(' ').map(Number)
    let indices = input.slice(0, input.length - 1)
    let shotCount = 0
    let currTarget = 0
    let finalString = ''

    for (const index of indices) {
        if (targets[index] !== undefined) {
            currTarget = targets[index]
            targets[index] = -1
            shotCount++

            for (let j = 0; j < targets.length; j++) {
                if (targets[j] > currTarget) {
                    targets[j] -= currTarget
                } else if (targets[j] <= currTarget && targets[j] !== -1) {
                    targets[j] += currTarget
                }
            }

            currTarget = 0
        }
    }

    for (const target of targets) {
        finalString += ` ${target}`
    }

    console.log(`Shot targets: ${shotCount} ->${finalString}`);

}


function moving(input) {
    let targets = input.shift().split(' ').map(Number)
    let commands = input.slice(0, input.length - 1)

    for (const command of commands) {
        let [action, index, value] = command.split(' ')

        switch (action) {
            case 'Shoot': shoot(targets, index, value); break
            case 'Add': add(targets, index, value); break
            case 'Strike': strike(targets, index, value); break
        }
    }

    function shoot(array, index, power) {
        if (array[index] !== undefined) {
            array[index] -= power

            if (array[index] <= 0) {
                array.splice(index, 1)
            }
        }
    }

    function add(array, index, value) {
        if (array[index] !== undefined) {
            array.splice(index, 0, +value)
        } else {
            console.log('Invalid placement!');
        }
    }

    function strike(array, index, radius) {
        index = +index
        radius = +radius
        for (let i = index - radius; i <= index + radius; i++) {
            if (array[i] == undefined) {
                console.log(`Strike missed!`);
                return
            }
        }
        array.splice(index - radius, radius * 2 + 1)
    }

    console.log(targets.join('|'));
}



function equal(input) {
    let curr = [input[0]]
    let highest = []

    for (let i = 1; i < input.length; i++) {
        if (curr.includes(input[i])) {
            curr.push(input[i])
        } else {
            if (curr.length > highest.length) {
                highest = curr
            }
            curr = [input[i]]
        }
    }

    console.log(highest.join(' '));
}