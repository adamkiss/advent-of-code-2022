const {readFileSync} = require('fs')
const {ray} = require('node-ray')

// note: manually rewrite crate image into 90deg rotated array

const demo1 = readFileSync('./inputs/05-1-demo.txt', 'utf-8')
const real1 = readFileSync('./inputs/05-1-real.txt', 'utf-8')

const r01 = input => {
    const [stackStr, moveStr] = input.split("\n\n")
    const stacks = stackStr.split("\n").map(s => s.split(''))
    const r = new RegExp(/move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/)

    const result = moveStr 
        .split("\n")
        .map(move => {
            const [, count, from ,to] = r.exec(move).map(i => parseInt(i, 10))
            for (let i = 0; i < count; i++) {
                stacks[to-1].push(stacks[from-1].pop())
            }
        })
    
        ray(stacks.map(s => s[s.length-1]).join(''))
}

const r02 = input => {
    const [stackStr, moveStr] = input.split("\n\n")
    const stacks = stackStr.split("\n").map(s => s.split(''))
    const r = new RegExp(/move (?<count>\d+) from (?<from>\d+) to (?<to>\d+)/)

    const result = moveStr 
        .split("\n")
        .map(move => {
            const [, count, from, to] = r.exec(move).map(i => parseInt(i, 10))

            stacks[to-1].push(...stacks[from-1].splice(stacks[from-1].length-count))
        })
    
        ray(stacks.map(s => s[s.length-1]).join(''))
}

ray().clearScreen()
r01(demo1)
r01(real1)
r02(demo1)
r02(real1)
