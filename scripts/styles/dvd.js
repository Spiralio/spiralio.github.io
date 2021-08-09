var img = new Image; 
img.src = "./assets/dvd.png";

let speed = 1.2;

let size = 300;

let dvdX = 0;
let dvdY = 0;

let moveRight = true;
let moveDown = true;

let dvdColor = `hsl(${Math.random() * 360}, 100%, 50%)`

function loadDVD() {

    let sizeHeight = size * img.height / img.width

    if (moveRight) dvdX += speed;
    else dvdX -= speed

    if (moveDown) dvdY += speed;
    else dvdY -= speed

    let beforeRight = moveRight
    let beforeDown = moveDown

    if (dvdX > c.width - sizeHeight*2 || dvdX < 0) moveRight = !moveRight
    if (dvdY + size/2 > c.height || dvdY < 0) moveDown = !moveDown

    if (dvdX - 1 > c.width - sizeHeight*2) dvdX = c.width - sizeHeight*2
    if (dvdX + 1 < 0) dvdX = 0
    if (dvdY - 1 + size/2 > c.height) dvdY = c.height
    if (dvdY + 1 < 0) dvdY = 0


    if (beforeRight != moveRight || beforeDown != moveDown) dvdColor = `hsl(${Math.random() * 360}, 100%, 50%)`

    ctx.fillStyle = dvdColor
    ctx.fillRect(0, 0, c.width, c.height);
    
    // set composite mode
    ctx.globalCompositeOperation = "destination-in";
    
    // draw image
    ctx.drawImage(img, dvdX, dvdY, size, sizeHeight);
}