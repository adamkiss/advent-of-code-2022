const {readFileSync} = require('fs')
const {ray} = require('node-ray')

const demo1 = readFileSync('./inputs/02-1-demo.txt', 'utf-8')
const real1 = readFileSync('./inputs/02-1-real.txt', 'utf-8')
let i = 0

const letterToHandMap = letter => ({
    A: 1, B: 2, C: 3,
    X: 1, Y: 2, Z: 3
}[letter])
const letterToResultMap = letter => ({
    X: 0, Y: 3, Z: 6
}[letter])

const resultFromHand = (they, you) => ({'-2': 6, '-1': 0, 0: 3, 1: 6, 2: 0}[you-they])
const handFromResult = (they, result) => ({0: 3, 1: 1, 2: 2, 3: 3, 4: 1}[{0: they-1, 3: they, 6: they+1}[result]])

const r01 = input => {
    const points = input
        .split("\n")
        .map(g => {
            const [they, you] = g.split(' ').map(letterToHandMap)
            return {they, you, result: resultFromHand(they, you)}
        })
        .reduce((p, c) => p + c.you + c.result, 0)
    ray(points)
}

const r02 = input => {
    const points = input
        .split("\n")
        .map(g => {
            const [theyStr, resultStr] = g.split(' ')
            const they = letterToHandMap(theyStr)
            const result = letterToResultMap(resultStr)
            return {they, you: handFromResult(they, result), result}
        })
        .reduce((p, c) => p + c.you + c.result, 0)
    ray(points)
}

ray().clearScreen()
r01(demo1)
r01(real1)
r02(demo1)
r02(real1)