const {readFileSync} = require('fs')
const {ray} = require('node-ray')

const demo1 = readFileSync('./inputs/03-1-demo.txt', 'utf-8')
const real1 = readFileSync('./inputs/03-1-real.txt', 'utf-8')

const letterToPriority = letter => letter.match('[a-z]')
    ? letter.charCodeAt(0) - 96 // 97+ => 1+ for a-z
    : letter.charCodeAt(0) - 38 // 65+ => 27+ for A-Z

const r01 = input => {
    const common = input
        .split("\n") // each elf
        .map(e => { // slice items into compartments
            const items = e.split('')
            const half = Math.ceil(items.length / 2)
            return [items.slice(0, half), items.slice(half)]
        })
        .map(c => c[0].filter(i => c[1].includes(i))) // get matches
        .map(common => common[0]) // convert array of [X,X,X] to 'X'
    const sum = common
        .map(letterToPriority)
        .reduce((sum, i) => sum + i, 0)
    
    ray(sum)
}

const elfToSet = line => new Set(line.split(''))
const r02 = input => {
    const e = input.split("\n")
    const groups = []
    while (e.length) { groups.push([elfToSet(e.shift()), elfToSet(e.shift()), elfToSet(e.shift())]) }
    const sum = groups
        .map(g => [...g[0]].filter(l => g[1].has(l) && g[2].has(l))[0])
        .map(letterToPriority)
        .reduce((sum, i) => sum + i, 0)
    ray(sum)
}

ray().clearScreen()
r01(demo1)
r01(real1)
r02(demo1)
r02(real1)
