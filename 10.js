import { readFileSync } from 'fs'
import { ray } from 'node-ray'

const demo1 = readFileSync('./inputs/10-1-demo.txt', 'utf-8')
const real1 = readFileSync('./inputs/10-1-real.txt', 'utf-8')


const r01 = input => {
    const register = [1]
    let strength = 1
    input.split("\n")
        .map((line) => {
            const [i, ch] = [...line.split(' '), 0]
            switch (i) {
                case 'addx':
                    register.push(strength, strength)
                    break;
                default:
                    register.push(strength)
                    break;
            }
            strength += Number(ch)
        })
    
    const result = [0, 1, 2, 3, 4, 5].map(i => {
        const j = i * 40 + 20
        return j * register[j]
    }).reduce((sum, i) => sum + i, 0)

    ray(result)
}

const r02 = input => {
    const register = [1]
    let strength = 1
    const screen = [
        [], [], [], [], [], []
    ]

    const i_to_xy = i => {
        i = i % 240
        const y = Math.floor(i / 40)
        const x = i - y * 40
        return {x,y}
    }
    const sprite = pos => [pos-1,pos,pos+1]
    const char = (w, str) => {
        const {x} = i_to_xy(w)
        return sprite(str).includes(x) ? '▮' : '.'
    }
    const draw = (pos, c) => {
        const {x, y} = i_to_xy(pos)
        screen[y][x] = c
    }
    const drawScreen = () => screen.map(l=>l.join('')).join("\n")

    draw(1, char(register.length, strength))
    input.split("\n")
        .map((line) => {
            const [i, ch] = [...line.split(' '), 0]
            switch (i) {
                case 'addx':
                    register.push(strength)
                    draw(register.length-1, char(register.length-2, strength))
                    register.push(strength)
                    draw(register.length-1, char(register.length-2, strength))
                    break;
                default:
                    register.push(strength)
                    draw(register.length-1, char(register.length-2, strength))
                    break;
            }
            strength += Number(ch)
        })

    ray().html(`<pre>${drawScreen()}</pre>`)
}

ray().clearScreen()
r01(demo1)
r01(real1)
r02(demo1)
r02(real1)