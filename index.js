const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight
const gravity = 0.5
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.vellocity = {
            x:0,
            y:1
        }
        this.width = 50
        this.height= 50
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y,
            this.width,this.height)
    }   
    update(){
        this.position.y += this.vellocity.y
        this.draw()
        this.vellocity.y += gravity
    }
}

const player = new Player()
player.update()


function aniamte(){
    requestAnimationFrame(aniamte)
    c.clearRect(0,0, canvas.width, canvas.height)
    player.update()
}

aniamte()