const {readFileSync} = require('fs')
const {ray} = require('node-ray')

const demo1 = readFileSync('./inputs/06-1-demo.txt', 'utf-8')
const real1 = readFileSync('./inputs/06-1-real.txt', 'utf-8')

const buildExpression = length => {
    if (length < 2) return
    const lookaheads = [null]
    for (let i = 1; i < length; i++) {
        const la = [];
        for (let j = 1; j <= i; j++) { la.push(`\\${j}`) }
        lookaheads.push(`(?!${la.join('|')})`)
    }
    lookaheads.push(null)
    return new RegExp(`${lookaheads.join('(.)')}`)
}

const r01 = input => {
    const match = input.match(buildExpression(4))[0];
    const index = input.indexOf(match) + match.length;
    ray(`${match} => ${index}`)
}

const r02 = input => {
    const match = input.match(buildExpression(14))[0];
    const index = input.indexOf(match) + match.length;
    ray(`${match} => ${index}`)
}

ray().clearScreen()
r01(demo1)
r01(real1)
r02(demo1)
r02(real1)

