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
        this.draw() 
        this.position.y += this.vellocity.y
        this.position.x += this.vellocity.x
        if(this.position.y + this.height+ this.vellocity.y <= canvas.height)
        this.vellocity.y += gravity
        else 
        this.vellocity.y = 0
    }
}

const player = new Player()
const keys = {
    right:{
        pressed: false 
    },
    left:{
        pressed: false 
    }
}

function aniamte(){
    requestAnimationFrame(aniamte)
    c.clearRect(0,0, canvas.width, canvas.height)
    player.update()
    if(keys.right.pressed){
        player.vellocity.x = 5
    }
}

aniamte()

window.addEventListener('keydown',({keyCode})=>{
    switch(keyCode){
        case 37 :
            console.log('left')
            keys.left.pressed = true
            break
        case 38 :
            console.log('up')
            player.vellocity.y -= 20
            break
        case 40 :
            console.log('down')
            break
        case 39 :
            console.log('right')
            keys.right.pressed = true
            break    
    }
})

window.addEventListener('keyup',({keyCode})=>{
    switch(keyCode){
        case 37 :
            console.log('left')
            keys.left.pressed = false
            break
        case 38 :
            console.log('up')
            player.vellocity.y -= 20
            break
        case 40 :
            console.log('down')
            break
        case 39 :
            console.log('right')
            keys.right.pressed = false
            break    
    }
})