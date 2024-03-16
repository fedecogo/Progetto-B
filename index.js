const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 0.8

class Player {
    constructor() {
        this.position = {
            x:100,
            y:100
        }
        this.velocity = {
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
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if(this.position.y + this.height+ this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        else 
        this.velocity.y = 0
    }
}

class Platform {
     constructor({x,y,image}) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw(){
        c.drawImage(this.image , this.position.x , this.position.y)
    }
}

class scenarioObject {
    constructor({x,y,image}) {
       this.position = {
           x,
           y
       }
       this.image = image
       this.width = image.width
       this.height = image.height
   }
   draw(){
       c.drawImage(this.image , this.position.x , this.position.y)
   }
}

const player = new Player()
const platforms = []

const image = new Image()
image.onload = () => {
    platforms.push(new Platform({ x:  -20, y: 520,image}))
    platforms.push(new Platform({ x: image.width - 20, y: 520,image}))
    platforms.push(new Platform({ x: image.width - 20 + image.width, y: 520,image}))
    // platforms.push(new Platform({ x: 200, y: 100, image }))
    // platforms.push(new Platform({ x: 400, y: 200, image }))
}
image.src = './img/platform.png'


const scenarioObjects = []

const imageSO = new Image()
imageSO.onload = () => {
    scenarioObjects.push(new scenarioObject({x:0, y:0,imageSO}))
}
imageSO.src = './img/backGround.jpg'




const keys = {
    right:{
        pressed: false 
    },
    left:{
        pressed: false 
    }
}

let scrollOffSet = 0

function aniamte(){
    requestAnimationFrame(aniamte)
    c.clearRect(0,0, canvas.width, canvas.height)
    platforms.forEach((platform) => {
         platform.draw()  
    })
    scenarioObjects.forEach(scenarioObject =>{
        scenarioObject.draw()
    })
     player.update()
    if(keys.right.pressed 
        && player.position.x <500){
        player.velocity.x = 5
    } else if (keys.left.pressed 
        && player.position.x > 100)
        player.velocity.x = -5 
    else{
       player.velocity.x = 0 
       if (keys.right.pressed){
        scrollOffSet += 5
        platforms.forEach((platfrom) => {
            platfrom.position.x -= 5
       })
      
       } else if (keys.left.pressed){
        scrollOffSet -=5
        platforms.forEach((platfrom) => {
            platfrom.position.x += 5
        })
       }
    } 

    console.log(scrollOffSet)
    platforms.forEach((platform) => {
       //platform collitions 
       if(player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height + player.velocity.y >= platform.position.y 
        && player.position.x + player.width >= platform.position.x 
        && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0 
    }
   })
   if(scrollOffSet > 2000){
    console.log("you win")
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
            player.velocity.y -= 10
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
            player.velocity.y -= 20
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