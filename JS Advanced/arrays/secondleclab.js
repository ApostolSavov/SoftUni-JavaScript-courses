function sum(a) {
    console.log((+a[0] + +a[a.length - 1]));
}


function even(a) {
    console.log(a.filter((x, i) => i % 2 === 0).join(' '));
}


function negative(a) {
    let arr = []
    a.forEach((x) => x < 0 ? arr.unshift(x) : arr.push(x))
    arr.forEach(x => console.log(x))
}


function lastK(n, k) {
    let arr = [1]
    for (let i = 1; i < n; i++) {
        arr[i] = arr.slice(Math.max(i - k, 0), i).reduce((a, b) => a + b)
    }
    console.log(arr.join(' '));
}


function odd(a) {
    console.log(a.filter((x, i) => i % 2 !== 0).map(x => x * 2).reverse().join(' '));
}


function smallest(a) {
    console.log(a.splice(a.indexOf(Math.min(...a)), 1) + ' ' + Math.min(...a));
}


function biggest(a) {
    console.log(Math.max(...a.flat()))
}


function diagonal(a) {
    let i = 0
    let j = a.length - 1
    let first = second = 0
    for (const arr of a) {
        first += +arr[i]
        second += +arr[j]
        i++
        j--
    }
    console.log(first, second);
}


function equal(a) {
    a.push([])
    let pairs = 0
    for (let i = 0; i < a.length - 1; i++) {
        for (let j = 0; j < a[i].length; j++) {
            if (a[i][j] === a[i + 1][j]) pairs++
            if (a[i][j] === a[i][j + 1]) pairs++
        }
    }
    console.log(pairs);
}
