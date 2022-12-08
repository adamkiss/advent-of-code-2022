import { readFileSync } from 'fs'
import { ray } from 'node-ray'

const demo1 = readFileSync('./inputs/08-1-demo.txt', 'utf-8')
const real1 = readFileSync('./inputs/08-1-real.txt', 'utf-8')

const visible = (trees, x, y) => {
    if (x === 0 || y === 0 || x === trees[0].length - 1 || y === trees.length - 1)
        return true // edges are visible

    // row left
    if (Math.max(...trees[y].slice(0, x)) < trees[y][x]) return true
    // row right
    if (Math.max(...trees[y].slice(x + 1)) < trees[y][x]) return true

    // compare column
    const vertical = []; for (let i = 0; i < trees.length; i++) { vertical.push(trees[i][x]) }
    // top
    if (Math.max(...vertical.slice(0, y)) < trees[y][x]) return true
    // bottom
    return Math.max(...vertical.slice(y + 1)) < trees[y][x]
}
const r01 = input => {
    const trees = input.split("\n").map(t => t.split(''))


    const trees_visible = trees.reduce((sum, row, y) => {
        return sum + row.reduce((rsum, _, x) => {
            return rsum += Number(visible(trees, x, y))
        }, 0)
    }, 0)

    ray(trees_visible)
}

const treeSeesLast = (arr, t) => {
    if (! arr.length) return 0
    const sees = arr.findLastIndex(el => el >= t)
    return sees === -1 ? arr.length : arr.length - sees
}
const treeSeesFirst = (arr, t) => {
    if (! arr.length) return 0
    const sees = arr.findIndex(el => el >= t)
    return sees === -1 ? arr.length : sees + 1
}
const calculateScore = (trees, x, y) => {
    const vertical = []; for (let i = 0; i < trees.length; i++) { vertical.push(trees[i][x]) }

    const LRTB = [
        treeSeesLast(trees[y].slice(0, x), trees[y][x]),
        treeSeesFirst(trees[y].slice(x+1), trees[y][x]),
        treeSeesLast(vertical.slice(0, y), trees[y][x]),
        treeSeesFirst(vertical.slice(y+1), trees[y][x])
    ]
    
    return LRTB.reduce((sum, i) => i * sum, 1)
}
const r02 = input => {
    const trees = input.split("\n").map(t => t.split(''))

    const best = trees.reduce((sum, row, y) => {
        return row.reduce((rsum, tree, x) => {
            const score = calculateScore(trees, x, y)
            return rsum.score < score
                ? {score, x, y}
                : rsum;
        }, sum)
    }, {score: -100})

    ray(best)
}

ray().clearScreen()
// r01(demo1)
r01(real1)
// r02(demo1)
r02(real1)