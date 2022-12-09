import { readFileSync } from 'fs'
import { ray } from 'node-ray'

const demo1 = readFileSync('./inputs/09-1-demo.txt', 'utf-8')
const demo2 = readFileSync('./inputs/09-2-demo.txt', 'utf-8')
const real1 = readFileSync('./inputs/09-1-real.txt', 'utf-8')

const move_in = ({
    L: p => p.x -= 1,
    R: p => p.x += 1,
    U: p => p.y -= 1,
    D: p => p.y += 1
})
const follow_with = (tail, head) => {
    const diff = {x: head.x - tail.x, y: head.y - tail.y}
    if (Math.abs(diff.x) <= 1 && Math.abs(diff.y) <= 1)     return
    
    if (diff.y === 0) { tail.x += Math.round(diff.x * 0.5); return }
    if (diff.x === 0) { tail.y += Math.round(diff.y * 0.5); return }

    if (Math.abs(diff.x) > Math.abs(diff.y)) {
        tail.x += Math.round(diff.x * 0.5)
        tail.y += diff.y
    } else {
        tail.x += diff.x
        tail.y += Math.round(diff.y * 0.5)
    }
}

const drawHelp = (head, tail) => {
    // FUCKING D
    const h = [
        ['.','.','.','.','.','.'],
        ['.','.','.','.','.','.'],
        ['.','.','.','.','.','.'],
        ['.','.','.','.','.','.'],
        ['.','.','.','.','.','.'],
        ['.','.','.','.','.','.'],
    ]
    h[5+tail.y][tail.x] = 'T'
    h[5+head.y][head.x] = 'H'
    ray().html(`<pre>${h.map(l=>l.join('')).join("\n")}</pre>`)
}

const r01 = input => {
    const tailPositions = {}
    const head = {x: 0, y: 0}
    const tail = {x: 0, y: 0}

    const directions = input
        .split("\n")
        .map(move => {
            const [direction, count] = move.split(' ')

            for (let i = 0; i < count; i++) {
                move_in[direction](head)
                follow_with(tail, head)
    
                tailPositions[`x${tail.x}y${tail.y}`] = true
            }
        })
    
    ray(Object.keys(tailPositions).length)
}

const move_in2 = ({
    L: p => ({x: p.x - 1, y: p.y}),
    R: p => ({x: p.x + 1, y: p.y}),
    U: p => ({x: p.x, y: p.y - 1}),
    D: p => ({x: p.x, y: p.y + 1})
})
const follow_with2 = (head, tail) => {
    const diff = {x: head.x - tail.x, y: head.y - tail.y}
    if (Math.abs(diff.x) <= 1 && Math.abs(diff.y) <= 1)
        return Object.assign({}, tail)
    
    if (diff.y === 0)
        return {x: tail.x + Math.round(diff.x * 0.5), y: tail.y}
    if (diff.x === 0)
        return {x: tail.x, y: tail.y + Math.round(diff.y * 0.5)}

    if (Math.abs(diff.x) > Math.abs(diff.y))
        return {x: tail.x + Math.round(diff.x * 0.5), y: tail.y + diff.y}
    else if (Math.abs(diff.x) < Math.abs(diff.y))
        return {x: tail.x + diff.x, y: tail.y + Math.round(diff.y * 0.5)}
    else
        return {x: tail.x + Math.round(diff.x * 0.5), y: tail.y + Math.round(diff.y * 0.5)}
}


const r02 = input => {
    const tailPositions = {}
    const knots = [
        {x: 0, y: 0},
        {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0},
        {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0},
        {x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}
    ]

    const directions = input
        .split("\n")
        .map(move => {
            const [direction, count] = move.split(' ')

            for (let i = 0; i < count; i++) {
                knots[0] = move_in2[direction](knots[0])

                for(let j = 1; j <= 9; j++) {
                    knots[j] = follow_with2(knots[j-1], knots[j])
                }

                tailPositions[`x${knots[9].x}y${knots[9].y}`] = true
            }
        })

    ray(Object.keys(tailPositions).length)
}

ray().clearScreen()
// r01(demo1)
r01(real1)
// r02(demo2)
r02(real1)