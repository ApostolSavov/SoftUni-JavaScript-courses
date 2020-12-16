function delimiter(a) {
    console.log(a.slice(0, a.length - 1).join(a[a.length - 1]));
}


function nth(a) {
    a.slice(0, a.length - 1).forEach((x, i) => (i % a[a.length - 1] === 0 || i === 0) ? console.log(x) : null)
}


function add(a) {
    let arr = []
    let i = 1
    a.forEach(x => {
        if (x === 'add') arr.push(i), i++
        else arr.pop(), i++
    })
    console.log(arr.length > 0 ? arr.join('\n') : 'Empty');
}


function rotate(a) {
    (function recur(arr, times) {
        if (times == 0) {
            console.log(arr.join(' '));
            return
        }
        arr.unshift(arr.pop())
        recur(arr, times - 1)
    })(a.slice(0, a.length - 1), +a[a.length - 1])
}


function rotat(a) {
    let rotations = Number(a.pop())
    let arr = a
    for (let i = 0; i < rotations % arr.length; i++) {
        arr.unshift(arr.pop())
    }
    console.log(arr.join(' '));
}


function sequence(a) {
    let curr = a[0]
    a.forEach((x, i) => {
        if (x >= curr) {
            console.log(x);
            curr = x
        }
    })
}


function sort(a) {
    a.sort((a, b) => {
        if (a.length !== b.length) {
            return a.length - b.length
        } else {
            return a.localeCompare(b)
        }
    }).forEach(x => console.log(x))
}


function magic(a) {
    let sum = a[0].reduce((a, b) => a + b, 0)
    let vertSum = 0
    let magic = true
    for (let i = 0; i < a.length; i++) {
        if ((a[0].reduce((a, b) => a + b, 0)) !== sum) {
            magic = false
            break
        }
        for (let j = 0; j < a.length; j++) {
            vertSum += a[j][i]
        }
        if (vertSum !== sum) {
            magic = false
            break
        }
        vertSum = 0
    }
    console.log(magic);
}


function tictac(input) {
    let player = 'X'
    let field = [[false, false, false], [false, false, false], [false, false, false]]
    let check = {
        taken: (y, x) => field[y][x] !== false ? true : false,
        win: () => {
            for (let k = 0; k < 4; k++) {
                if (field[k].every(x => x === field[k][0] && x !== false)) return true
                else if ([field[0][k], field[1][k], field[2][k]].every(x => x === field[0][k] && x !== false)) return true
                else if ([field[0][0], field[1][1], field[2][2]].every(x => x === field[0][0] && x !== false)) return true
                else if ([field[0][2], field[1][1], field[2][0]].every(x => x === field[0][2] && x !== false)) return true
                else return false
            }
        }
    }

    for (let i = 0; i < input.length; i++) {
        let [y, x] = input[i].split(' ').map(Number)
        if (check.taken(y, x)) {
            console.log('This place is already taken. Please choose another!')
            continue
        }
        field[y][x] = player
        if (check.win()) {
            console.log(`Player ${player} wins!`);
            field.forEach(x => console.log(x.join('\t')))
            break
        }
        player = player === 'X' ? 'O' : 'X'
        if (!field.flat().includes(false)) {
            console.log('The game ended! Nobody wins :(');
            field.forEach(x => console.log(x.join('\t')))
            break
        }
    }
}


function diagonal(input) {
    let sum1 = sum2 = 0
    let matrix = input.map(x => x.split(' ').map(Number))

    for (let i = 0; i < matrix.length; i++) {
        sum1 += matrix[i][i]
        sum2 += matrix[i][matrix.length - 1 - i]
    }

    if (sum1 === sum2) convert(matrix).forEach(x => console.log(x.join(' ')))
    else matrix.forEach(x => console.log(x.join(' ')))

    function convert(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = matrix[i].map((x, j) => j === i || j === matrix.length - 1 - i ? x : sum1)
        }
        return matrix
    }
}


function orbit([w, h, x, y]) {
    let matrix = ((w, h, x, y) => {
        let temp = []
        for (let i = 0; i < h; i++) {
            temp.push(new Array(w).fill(' '))
        }
        temp[x][y] = '1'
        return temp
    })(w, h, x, y)

    let counter = 2

    while (matrix.flat().includes(' ')) {
        for (let i = x - (counter - 1); i <= x + (counter - 1); i++) {
            for (let j = y - (counter - 1); j <= y + (counter - 1); j++) {
                if (matrix[i] !== undefined && matrix[i][j] !== undefined && matrix[i][j] === ' ') {
                    matrix[i][j] = String(counter)
                }
            }
        }
        counter++
    }
    matrix.forEach(x => console.log(x.join(' ')))
}


function spiral(a, b) {
    let num = [1]
    let matrix = ((a, b) => {
        let temp = []
        for (let i = 0; i < a; i++) {
            temp.push(new Array(a).fill(0))
        }
        return temp
    })(a, b)

    let startCol = [0]
    let startRow = [0]
    let endCol = [matrix[0].length - 1]
    let endRow = [matrix.length - 1]

    function loop(matrix, iStart, iEnd, iCurr, num) {
        for (let i = iStart[0]; i <= iEnd[0]; i++ ) {
            matrix[iCurr[0]][i] = num[0]
            num[0]++
        }
        iCurr[0]++
    }

    function loop2(matrix, iStart, iEnd, iCurr, num, sign) {
        for (let i = iStart[0]; i >= iEnd[0]; i-- ) {
            matrix[iCurr[0]][i] = num[0]
            num[0]++
        }
        iCurr[0] = iCurr[0] + sign
    }

    while (startRow <= endRow && startCol <= endCol) {
        loop(matrix, startCol[0], endCol[0], startRow[0], num[0], 1)
        loop(matrix, startRow[0], endRow[0], endCol[0], num[0], (-1))
        loop2(matrix, endCol[0], startCol[0], endRow[0], num[0], 1)
        loop2(matrix, endRow[0], startRow[0], startCol[0], num[0], (-1))
    }

    matrix.forEach(x => console.log(x.join(' ')))
}

spiral(5,5)


function spiral1(a, b) {
    let num = 1
    let matrix = ((a, b) => {
        let temp = []
        for (let i = 0; i < a; i++) {
            temp.push(new Array(a).fill(0))
        }
        return temp
    })(a, b)

    let startCol = 0
    let startRow = 0
    let endCol = matrix[0].length - 1
    let endRow = matrix.length - 1

    while (startRow <= endRow && startCol <= endCol) {
        for (let i = startCol; i <= endCol; i++) {
            matrix[startRow][i] = num
            num++
        }
        startRow++
        for (let i = startRow; i <= endRow; i++) {
            matrix[i][endCol] = num
            num++
        }
        endCol--
        for (let i = endCol; i >= startCol; i--) {
            matrix[endRow][i] = num
            num++
        }
        endRow--
        for (let i = endRow; i >= startRow; i--) {
            matrix[i][startCol] = num
            num++
        }
        startCol++
    }
    matrix.forEach(x => console.log(x.join(' ')))
}