// DVD Style

styles.dvd = {
    name: 'DVD'
}

var img = new Image; 
img.src = "./assets/dvd.png";

let speed = 1.2;

let size = 300;

let dvdX = 0;
let dvdY = 0;

let moveRight = true;
let moveDown = true;

let dvdColor;

/**
 * Runs when loaded
 */
styles.dvd.load = () => {
    body.style.fontFamily = 'vcr'
    body.style.fontWeight = 'inherit'
    body.style.background = '#08080C'
    document.getElementById('barCont').style.borderRadius = '0px';
    document.getElementById('barCont').style.marginTop = '0px';

    dvdX = Math.random() * (c.width - size)
    dvdY = Math.random() * (c.height - size)

    moveRight = Math.floor(Math.random() * 2) == 0
    moveDown = Math.floor(Math.random() * 2) == 0

    dvdColor = `hsl(${Math.random() * 360}, 100%, 50%)`
}

/**
 * Runs when unloaded
 */
styles.dvd.unload = () => {
    return;
}

/**
 * Runs every frame
 */
styles.dvd.frame = () => {
    let sizeHeight = size * img.height / img.width

    if (moveRight) dvdX += speed;
    else dvdX -= speed

    if (moveDown) dvdY += speed;
    else dvdY -= speed

    let beforeRight = moveRight
    let beforeDown = moveDown

    if (dvdX > c.width - size || dvdX < 0) moveRight = !moveRight
    if (dvdY > c.height - sizeHeight || dvdY < 0) moveDown = !moveDown

    if (dvdX > c.width - size) dvdX = c.width - size
    if (dvdX < 0) dvdX = 0
    if (dvdY > c.height - sizeHeight) dvdY = c.height - sizeHeight
    if (dvdY < 0) dvdY = 0


    if (beforeRight != moveRight || beforeDown != moveDown) dvdColor = `hsl(${Math.random() * 360}, 100%, 50%)`

    ctx.fillStyle = dvdColor
    ctx.fillRect(0, 0, c.width, c.height);
    
    // set composite mode
    ctx.globalCompositeOperation = "destination-in";
    
    // draw image
    ctx.drawImage(img, dvdX, dvdY, size, sizeHeight);
}