let tests = []
let strips = []
function setup(){
    createCanvas(window.innerWidth, window.innerHeight)
    strips.push(new strip(Math.floor(Math.random()*width), Math.random()*10+15, 2))
    
}

function draw(){

    //Creates a new strip on 10% of frames
    if(Math.random()<0.1){  
        strips.push(new strip(Math.floor(Math.random()*width), Math.floor(Math.random()*10+30), Math.floor(Math.random()*6+2)))
    }
    //Refreshes the background to black
    background(0)
    //Draws and moves each character
    strips.forEach(strp=>{
        strp.children.forEach(chr=>{
            chr.move()
            chr.draw()
        })
    })
    //Removes the first strip in the array if it's off the screen
    if(strips[0].children[strips[0].children.length-1].y>height){ 
        strips.shift()
    }
}

//Gets a random character from the katakana unicode block
function getRandomChar(){
    const katakana = 12448+95
    return String.fromCharCode(Math.floor(Math.random()*95)+12448)
}
//Strip class: Essentially an array of characters
class strip{
    constructor(x, length, distance){
        this.x = x
        this.length = length
        this.distance = distance
        this.children = this.createCharacters()
        
    }
    //Fleshes out the array with characters
    createCharacters(){
        let chars = [new character(this.x,0,this.distance,255,true)]
        for(let i = 1; i < this.length; i++){
            let fadePoint = this.length-15
                // Creates the characters: The characters start to fade out after the fade point.
            if(i<fadePoint){
                chars.push(new character(this.x,0-i*15,this.distance,255))
            }else{
                chars.push(new character(this.x,0-i*15,this.distance,255-(i-fadePoint)*15))
            }
            
        }
        return chars
    }
    
}
//Character class: holds information about what character, the distance from the camera, the character position etc
class character{
    constructor(x,y,distance,opacity,leading = false){
    this.x = x
    this.y = y
    this.leading = leading
    this.text = getRandomChar()
    this.size = 30-3*distance
    this.speed = 10-distance
    this.opacity = opacity
    }
    //Draws the character: Changes colour if the character is the leading character in the strip
    draw(){
        push()
        textSize(this.size)
        if(this.leading){
            fill(192, 238, 191, this.opacity)
            text(this.text, this.x, this.y)
        }else{
            fill(55,170,66, this.opacity)
            text(this.text, this.x, this.y)
        }
        pop()
    }
    //Moves the character and has a chance to change the character displayed
    move(){
        this.y+=this.speed
        if(Math.random()<0.05){
            this.text = getRandomChar()
        }
    }
}