const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1

const PlayerRunRight = new Image()
PlayerRunRight.src = './img/PlayerRunRight.png'

const PlayerRunLeft = new Image()
PlayerRunLeft.src = './img/PlayerRunLeft.png'

const PlayerStandRight = new Image()
PlayerStandRight.src = './img/PlayerStandRight.png'

const PlayerStandLeft = new Image()
PlayerStandLeft.src = './img/PlayerStandLeft.png'

class Player {
    constructor() {
        this.speed = 15
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 1
        }
        this.width = 66
        this.height = 150
        this.image = PlayerStandRight
        this.frame = 0
        this.players = {
            stand: {
                right: PlayerStandRight,
                left: PlayerStandLeft,
                cropWidth: 177,
                width: 66
            },
            run: {
                right: PlayerRunRight,
                left: PlayerRunLeft,
                cropWidth: 341,
                width: 127.875
            }
        }
        this.currentPlayer = this.players.stand.right
        this.currentCropWidth = 177
    }
    draw() {
        c.drawImage(
            this.currentPlayer,
            this.currentCropWidth * this.frame,
            0,
            this.currentCropWidth,
            400,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }
    update() {
        this.frame++

        if (this.frame > 59 &&
            (this.currentPlayer === this.players.stand.right ||
                this.currentPlayer === this.players.stand.left))
            this.frame = 0
        else if (this.frame > 29 &&
            (this.currentPlayer === this.players.run.right ||
                this.currentPlayer === this.players.run.left))
            this.frame = 0

        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}

class Platform {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class scenarioObject {
    constructor({ x, y, image }) {
        this.position = {
            x,
            y
        }
        this.image = image
        this.width = image.width
        this.height = image.height
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}


let player = new Player()
let platforms = []

let image = new Image()
image.onload = () => {
    platforms.push(new Platform({ x: -2, y: 520, image }))
    platforms.push(new Platform({ x: image.width - 20, y: 520, image }))
    platforms.push(new Platform({ x: image.width * 2 - 20, y: 520, image }))
    platforms.push(new Platform({ x: image.width * 4 - 40, y: 520, image }))
    platforms.push(new Platform({ x: image.width * 5 - 40, y: 520, image }))
    platforms.push(new Platform({ x: image.width * 7 - 20, y: 520, image }))
    platforms.push(new Platform({ x: image.width * 8 - 40, y: 520, image }))
    platforms.push(new Platform({ x: image.width * 11 - 40, y: 520, image }))
    platforms.push(new Platform({ x: image.width * 12 - 20, y: 520, image }))
    platforms.push(new Platform({ x: image.width * 14 - 40, y: 520, image }))
    platforms.push(new Platform({ x: image.width * 15 - 80, y: 520, image }))
}
image.src = './img/platform.png'


let scenarioObjects = []

let imageSO = new Image()
imageSO.src = './img/backGround.jpg'
let imageTR = new Image()
imageTR.src = './img/hills.png'
imageSO.onload = () => {
    scenarioObjects.push(new scenarioObject({ x: 0, y: 250, image: imageTR }))
    scenarioObjects.push(new scenarioObject({ x: 250, y: 300, image: imageTR }))
}

function init() {
    player = new Player()
    platforms = []

    image = new Image()
    image.onload = () => {
        platforms.push(new Platform({ x: -2, y: 520, image }))
        platforms.push(new Platform({ x: image.width - 20, y: 520, image }))
        platforms.push(new Platform({ x: image.width * 2 - 20, y: 520, image }))
        platforms.push(new Platform({ x: image.width * 4 - 40, y: 520, image }))
        platforms.push(new Platform({ x: image.width * 5 - 40, y: 520, image }))
        platforms.push(new Platform({ x: image.width * 7 - 20, y: 520, image }))
        platforms.push(new Platform({ x: image.width * 8 - 40, y: 520, image }))
        platforms.push(new Platform({ x: image.width * 11 - 40, y: 520, image }))
        platforms.push(new Platform({ x: image.width * 12 - 20, y: 520, image }))
        platforms.push(new Platform({ x: image.width * 14 - 40, y: 520, image }))
        platforms.push(new Platform({ x: image.width * 15 - 80, y: 520, image }))
    }
    image.src = './img/platform.png'

    scenarioObjects = []

    imageSO = new Image()
    imageSO.src = './img/backGround.jpg'
    imageTR = new Image()
    imageTR.src = './img/hills.png'
    imageSO.onload = () => {
        scenarioObjects.push(new scenarioObject({ x: 0, y: 250, image: imageTR }))
        scenarioObjects.push(new scenarioObject({ x: 250, y: 300, image: imageTR }))
    }
}

let lastKey
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffSet = 0

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    scenarioObjects.forEach(scenarioObject => {
        scenarioObject.draw()
    })
    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()

    if (keys.right.pressed && player.position.x < 500) {
        player.velocity.x = player.speed
    } else if (
        (keys.left.pressed && player.position.x > 100) ||
        (keys.left.pressed && scrollOffSet === 0 && player.position.x > 0)
    ) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0
        if (keys.right.pressed) {
            scrollOffSet += player.speed
            platforms.forEach((platfrom) => {
                platfrom.position.x -= player.speed
            })
            scenarioObjects.forEach(scenarioObject => {
                scenarioObject.position.x -= player.speed * .66
            })
        } else if (keys.left.pressed && scrollOffSet > 0) {
            scrollOffSet -= player.speed
            platforms.forEach((platfrom) => {
                platfrom.position.x += player.speed
            })
            scenarioObjects.forEach(scenarioObject => {
                scenarioObject.position.x += player.speed * .66
            })
        }
    }

    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })

    if (
        keys.right.pressed &&
        lastKey === 'right' &&
        player.currentPlayer !== player.players.run.right
    ) {
        player.frame = 1
        player.currentPlayer = player.players.run.right
        player.currentCropWidth = player.players.run.cropWidth
        player.width = player.players.run.width
    } else if (
        keys.left.pressed &&
        lastKey === 'left' &&
        player.currentPlayer !== player.players.run.left
    ) {
        player.currentPlayer = player.players.run.left
        player.currentCropWidth = player.players.run.cropWidth
        player.width = player.players.run.width
    } else if (
        !keys.left.pressed &&
        lastKey === 'left' &&
        player.currentPlayer !== player.players.stand.left
    ) {
        player.currentPlayer = player.players.stand.left
        player.currentCropWidth = player.players.stand.cropWidth
        player.width = player.players.stand.width
    }
    // hai vinto
    if (scrollOffSet > 2000) {
        console.log("you win")
        
  
    }
    //hai perso 
    if (player.position.y >= canvas.height) {
        init()
        scrollOffSet = 0;
    }
}

animate()

window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            console.log('left')
            keys.left.pressed = true
            lastKey = 'left'
            break
        case 38:
            console.log('up')
            player.velocity.y -= 20
            break
        case 40:
            console.log('down')
            break
        case 39:
            console.log('right')
            keys.right.pressed = true
            lastKey = 'right'
            break
    }
})

window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            console.log('left')
            keys.left.pressed = false
            player.currentPlayer = player.players.stand.left
            player.currentCropWidth = player.players.stand.cropWidth
            player.width = player.players.stand.width
            break
        case 38:
            console.log('up')
            break
        case 40:
            console.log('down')
            break
        case 39:
            console.log('right')
            keys.right.pressed = false
            player.currentPlayer = player.players.stand.right
            player.currentCropWidth = player.players.stand.cropWidth
            player.width = player.players.stand.width
            break
    }
})

