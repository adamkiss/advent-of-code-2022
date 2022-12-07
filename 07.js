import { readFileSync } from 'fs'
import { join } from "path";
import { ray } from 'node-ray'
import { setProperty, escapePath } from "dot-prop"

const demo1 = readFileSync('./inputs/07-1-demo.txt', 'utf-8')
const real1 = readFileSync('./inputs/07-1-real.txt', 'utf-8')

const pathToDot = p => p.split('/').filter(e=>e).join('.')

const r01 = input => {
    let tree = {}
    let cwd = ''
    let part1_sum = 0

    const lines = input
        .split("\n")
        .forEach(line => {
            if (line === '$ ls')
                return //skip

            if (line.startsWith('$')) {
                if (line === '$ cd /') {
                    cwd = '/'
                    return //force change
                }
                cwd = join(cwd, line.split('$ cd ')[1])
                return //change cwd
            }

            if (line.startsWith('dir'))
                return //skip
            
            const [size, name] = line.split(' ')
            const dotCwd = (cwd === '/' || cwd === '//')
                ? escapePath(name)
                : `${pathToDot(cwd)}.${escapePath(name)}`
            setProperty(tree, dotCwd, Number(size))
        })

    const countSize = obj => Object.keys(obj).reduce((sum, curr) => {
        if (typeof obj[curr] === 'object') {
            const size = countSize(obj[curr])
            if (size <= 100000){
                part1_sum += size
            }
            return sum + size
        }
        return sum + obj[curr]
    }, 0)
        
    countSize(tree)
    ray(part1_sum)
}

const r02 = input => {
    let tree = {}
    let cwd = ''

    const lines = input
        .split("\n")
        .forEach(line => {
            if (line === '$ ls')
                return //skip

            if (line.startsWith('$')) {
                if (line === '$ cd /') {
                    cwd = '/'
                    return //force change
                }
                cwd = join(cwd, line.split('$ cd ')[1])
                return //change cwd
            }

            if (line.startsWith('dir'))
                return //skip
            
            const [size, name] = line.split(' ')
            const dotCwd = (cwd === '/' || cwd === '//')
                ? escapePath(name)
                : `${pathToDot(cwd)}.${escapePath(name)}`
            setProperty(tree, dotCwd, Number(size))
        })

    const traverse = obj => Object.keys(obj).reduce((sum, curr) => {
        if (typeof obj[curr] === 'object') {
            const {size, dirs} = traverse(obj[curr])

            return {
                size: sum.size + size,
                dirs: [...sum.dirs, ...dirs, {name: curr, size}]
            }
        }

        return {
            size: sum.size + obj[curr],
            dirs: sum.dirs
        }
    }, {size: 0, dirs: []})

    // ray(tree)
    const {size, dirs} = traverse(tree)
    // ray(dirs)
    const target = 30_000_000 - (70_000_000 - size)
    dirs.sort((a,b) => a.size - b.size)
    const winner = dirs.filter(d => d.size > target)[0]
        
    ray(target, winner)
}

ray().clearScreen()
// r01(demo1)
r01(real1)
// r02(demo1)
r02(real1)
