const {readFileSync} = require('fs')

const demo1 = readFileSync('./inputs/01-1-demo.txt')
const real1 = readFileSync('./inputs/01-1.txt')

const r01 = input => {
    const elves = input.split("\n\n").map(elf => elf.split("\n").reduce())
}

