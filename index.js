const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1


class Player {
    constructor() {
        this.speed =15
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


let player = new Player()
let platforms = []

let image = new Image()
image.onload = () => {
    platforms.push(new Platform({ x:  -20, y: 520,image}))
    platforms.push(new Platform({ x: image.width - 20, y: 520,image}))
    platforms.push(new Platform({ x: image.width *2 -20, y: 520,image}))
    platforms.push(new Platform({ x: image.width *4 -40, y: 520,image}))
    platforms.push(new Platform({ x: image.width *5 -40, y: 520,image}))
    // platforms.push(new Platform({ x: 200, y: 100, image }))
    // platforms.push(new Platform({ x: 400, y: 200, image }))
}
image.src = './img/platform.png'


let scenarioObjects = []

let imageSO = new Image()
imageSO.src = './img/backGround.jpg'
let imageTR = new Image()
imageTR.src = './img/hills.png'
imageSO.onload = () => {
    // scenarioObjects.push(new scenarioObject({x:0, y:0,image:imageSO}))
    scenarioObjects.push(new scenarioObject({x:0, y:250,image:imageTR}))
    scenarioObjects.push(new scenarioObject({x:250, y:300,image:imageTR}))
}


function init (){
 player = new Player()
 platforms = []

 image = new Image()
image.onload = () => {
    platforms.push(new Platform({ x:  -20, y: 520,image}))
    platforms.push(new Platform({ x: image.width - 20, y: 520,image}))
    platforms.push(new Platform({ x: image.width *2 -20, y: 520,image}))
    platforms.push(new Platform({ x: image.width *4 -40, y: 520,image}))
    platforms.push(new Platform({ x: image.width *5 -40, y: 520,image}))
    platforms.push(new Platform({ x: image.width *7 -20, y: 520,image}))
    platforms.push(new Platform({ x: image.width *8 -40, y: 520,image}))
    platforms.push(new Platform({ x: image.width *11 -40, y: 520,image}))
    platforms.push(new Platform({ x: image.width *12 -20, y: 520,image}))
    platforms.push(new Platform({ x: image.width *14 -40, y: 520,image}))
    platforms.push(new Platform({ x: image.width *15 -80, y: 520,image}))
    
    // platforms.push(new Platform({ x: 200, y: 100, image }))
    // platforms.push(new Platform({ x: 400, y: 200, image }))
}
image.src = './img/platform.png'


 scenarioObjects = []

 imageSO = new Image()
imageSO.src = './img/backGround.jpg'
 imageTR = new Image()
imageTR.src = './img/hills.png'
imageSO.onload = () => {
    // scenarioObjects.push(new scenarioObject({x:0, y:0,image:imageSO}))
    scenarioObjects.push(new scenarioObject({x:0, y:250,image:imageTR}))
    scenarioObjects.push(new scenarioObject({x:250, y:300,image:imageTR}))
}

}


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
    scenarioObjects.forEach(scenarioObject =>{
        scenarioObject.draw()
    })
    platforms.forEach((platform) => {
         platform.draw()  
    })
  
     player.update()
    if(keys.right.pressed && player.position.x <500){
        player.velocity.x = player.speed
    } else if (
        (keys.left.pressed && player.position.x > 100 )    || 
        (keys.left.pressed && scrollOffSet === 0 && player.position.x > 0)
     ) { player.velocity.x = -player.speed}
    else{
       player.velocity.x = 0 
       if (keys.right.pressed){
        scrollOffSet += player.speed
        platforms.forEach((platfrom) => {
            platfrom.position.x -= player.speed
       })
       scenarioObjects.forEach(scenarioObject =>{
        scenarioObject.position.x -= player.speed *.66
       })
      
       } else if (keys.left.pressed && scrollOffSet > 0){
        scrollOffSet -= player.speed
        platforms.forEach((platfrom) => {
            platfrom.position.x += player.speed
        })
        scenarioObjects.forEach(scenarioObject =>{
            scenarioObject.position.x += player.speed *.66
           })

       }
    } 

    platforms.forEach((platform) => {
       //platform collitions 
       if(player.position.y + player.height <= platform.position.y 
        && player.position.y + player.height + player.velocity.y >= platform.position.y 
        && player.position.x + player.width >= platform.position.x 
        && player.position.x <= platform.position.x + platform.width){
        player.velocity.y = 0 
    }
   })

   // win condition
   if(scrollOffSet > 2000){
    console.log("you win")
   }
   // lose condition
   if (player.position.y >= canvas.height){
    init()
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
            player.velocity.y -= 20
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