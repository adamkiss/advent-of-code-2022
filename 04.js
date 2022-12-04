const {readFileSync} = require('fs')
const {ray} = require('node-ray')

const demo1 = readFileSync('./inputs/04-1-demo.txt', 'utf-8')
const real1 = readFileSync('./inputs/04-1-real.txt', 'utf-8')

const range = (start, end) => start === end ? [start] : [start, ...range(start + 1, end)]

const r01 = input => {
    const result = input
        .split("\n")
        .map(pair => {
            const [r1, r2] = pair
                .split(',')
                .map(r => r.split('-').map(i => parseInt(i)))
                .map(r => range(...r))
                .sort((a, b) => a.length - b.length)
            return r1.filter(v => !r2.includes(v)).length === 0
        })
        .filter(t => t)
        .length
    ray(result)
}

const r02 = input => {
    const result = input
        .split("\n")
        .map(pair => {
            const [r1, r2] = pair
                .split(',')
                .map(r => r.split('-').map(i => parseInt(i)))
                .map(r => range(...r))
                .sort((a, b) => a.length - b.length)
            return r1.filter(v => !r2.includes(v)).length !== r1.length
        })
        .filter(t => t)
        .length
    ray(result)
}

ray().clearScreen()
r01(demo1)
r01(real1)
r02(demo1)
r02(real1)