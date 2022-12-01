const {readFileSync} = require('fs')
const {ray} = require('node-ray')

const demo1 = readFileSync('./inputs/01-1-demo.txt', 'utf-8')
const real1 = readFileSync('./inputs/01-1-real.txt', 'utf-8')

const elves = input => input.split("\n\n").map(elf => elf.split("\n").reduce((p, c) => p + Number(c), 0))

const r01 = input => {
    ray(Math.max(...elves(input)))
}

const r02 = input => {
    const sorted = elves(input).sort((a, b) => b-a)
    ray(sorted.shift() + sorted.shift() + sorted.shift())
}

r01(demo1)
r01(real1)
r02(real1)

