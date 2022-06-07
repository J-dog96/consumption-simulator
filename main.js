var canvas = document.querySelector("canvas")
var ctx = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight

function getRandomRange(min, max) {
    return Math.random() * (max - min) + min;
}


var pressingDown =false
var pressingUp = false
var pressingLeft =false
var pressingRight =false

function prepareSprite(url, size) {
    var img = new Image(1,1)
    img.src = url
    img.width = size
    img.height = size
    return img
}

document.addEventListener ("keydown", function(event) {
    if (event.key == "s") { 
        pressingDown = true
    }
    if (event.key == "d") { 
        pressingRight = true
    }
    if (event.key == "a") { 
        pressingLeft = true
        
    }
    if (event.key == "w") { 
        pressingUp = true
    }
})

document.addEventListener ("keyup", function (event) {
    if (event.key == "s") { 
        pressingDown = false
    }
    if (event.key == "d") { 
        pressingRight = false
    }
    if (event.key == "a") { 
        pressingLeft = false
        
    }
    if (event.key == "w") { 
        pressingUp = false
    }
})


var player = {
    x: 9,
    y: 8,
    size: 10,
    health: 100,


    detectFood: function() {
        if ((player.x >= FOOD.x && player.x <= FOOD.x + FOOD.size && player.y >= FOOD.y && player.y <= FOOD.y + FOOD.size) || (FOOD.x >= player.x && FOOD.x <= player.x + player.size && FOOD.y >= player.y && FOOD.y <= player.y + player.size)) {
            console.log("eted5")
            this.health += FOOD.nourishment
            if (this.size < 300) { 
                this.size += 1

            }
            if (FOOD.size > 0) {
                 FOOD.size += -1
            }

        }
    },
    move: function() {
        if  (pressingDown == true){ 
            this.y+=2
        }
        if  (pressingUp == true){ 
            this.y+=-2
            
        }
        if  (pressingLeft == true){ 
            this.x+=-2
        }
        if  (pressingRight == true){ 
            this.x+=2
        }
    },
    render: function() {
        ctx.fillStyle = "green"
        ctx.fillRect(this.x, this.y, this.size, this.size)
        ctx.font = '100px arial'
        ctx.fillText(this.health, canvas.width-200, 0+150 )
    }
    
}

var FOOD = {
    x: 200,
    y: 200,
    size: 300,
    nourishment: 100,
    // sprite: prepareSprite("chiken-wing.png", 5),

    render: function() {
        ctx.fillStyle = "blue"
        ctx.fillRect(this.x, this.y, this.size, this.size)
        // ctx.drawImage(this.sprite, this.x, this.y)
    }
}


function frameLoop () {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
   
    FOOD.render()
    player.render()
    player.move()
    player.detectFood()
    console.log(player.health)


    

    requestAnimationFrame(frameLoop) 
}   

frameLoop()