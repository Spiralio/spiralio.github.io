// NIGHT STYLE

styles.night = {
    name: 'Night'
}

let stars = []

let moveX = 0;
let moveY = 0;

/**
 * Runs when loaded
 */
styles.night.load = () => {
    body.style.fontFamily = 'Poppins'
    body.style.fontWeight = 600
    document.getElementById('moonCont').style.transition = 'opacity 1.2s'
    document.getElementById('moonCont').style.opacity = 1
    body.style.background = '#191924'

}

/**
 * Runs when unloaded
 */
styles.night.unload = () => {
    document.getElementById('moonCont').style.transition = 'opacity 0.2s'
    document.getElementById('moonCont').style.opacity = 0
}

/**
 * Runs every frame
 */
styles.night.frame = () => {
    if (stars.length < Math.floor((perc/100) * 1000)) genStars(1)

    for (i = 0; i < stars.length; i++) {
        let star = stars[i]

        let starX = (c.width * star.x)
        let starY = (c.height * star.y)
        let starSize = (star.size * 3) + 2

        let framesNeeded = 20000

        star.moveX += moveX/framesNeeded
        star.moveY += moveY/framesNeeded

        star.x += ((moveX/framesNeeded)/80) * (star.speed + 0.05)
        star.y += ((moveY/framesNeeded)/80) * (star.speed + 0.05)

        moveX -= moveX/framesNeeded
        moveY -= moveY/framesNeeded

        if (starX < 0) starX += c.width
        if (starY < 0) starY += c.height

        if (starX > c.width) starX -= c.width
        if (starY > c.height) starY -= c.height

        // let edgeDistance = Math.abs((starX/c.width)*2 - 1)

        ctx.beginPath();
        ctx.ellipse(starX, starY, starSize, starSize, 0, 0, 2*Math.PI)
        ctx.fillStyle = '#8c8c91'
        ctx.fill()

        star.y += ((0.00003 * star.speed + 0.00002) * (perc/100))*2;

        if (star.y >= 1) star.y -= 1
        if (star.x >= 1) star.x -= 1

        if (star.y < 0) star.y += 1
        if (star.x < 0) star.x += 1
    }

    setupMoon()
}

// Style functions

/**
 * Setup the moon
 */
function setupMoon() {
    let moonTop = document.getElementById('moonTop');
    let topCtx = moonTop.getContext('2d');

    let moonBottom = document.getElementById('moonBottom');
    let bottomCtx = moonBottom.getContext('2d');

    let darkImg = document.createElement('img');
    let lightImg = document.createElement('img');

    lightImg.onload = function () {
        let date = new Date()
        let age = getLunarAgePercent(date)
        
        let moonWidth = moonTop.width/2;

        let newAge = age
        let full = false

        newAge -= 0.25;
        if (newAge < 0) newAge += 1

        if (newAge > 0.5) {
            full = true
            newAge -= 0.5
        }

        let left = moonWidth
        let right = moonWidth

        if (newAge < 0.25) left = moonWidth * (newAge / 0.25)
        else right = moonWidth - moonWidth * ((newAge - 0.25) / 0.25)
        if (right < 0) right = 0

        bottomCtx.clearRect(0, 0, moonBottom.width, moonBottom.height);
        topCtx.clearRect(0, 0, moonTop.width, moonTop.height);


        // Circular part
        bottomCtx.save();
        bottomCtx.beginPath();
        bottomCtx.arc(moonTop.width/2, moonTop.height/2, moonWidth - 2, 0, 2 * Math.PI);
        bottomCtx.clip();
        if (!full) bottomCtx.drawImage(darkImg, 0, 0);
        else bottomCtx.drawImage(lightImg, 0, 0);
        bottomCtx.restore();

        // Non circular part
        topCtx.save();
        topCtx.beginPath();
        topCtx.ellipse(moonTop.width/2, moonTop.height/2, right, moonWidth, 0, (3*Math.PI)/2, Math.PI/2);
        topCtx.ellipse(moonTop.width/2, moonTop.height/2, left, moonWidth, 0, Math.PI/2, (3*Math.PI)/2);
        topCtx.clip();
        if (full) topCtx.drawImage(darkImg, 0, 0);
        else topCtx.drawImage(lightImg, 0, 0);
        topCtx.restore();
    }

    lightImg.src = "./assets/moon500.png";
    darkImg.src = "./assets/moondark500.png";
}

/**
 * Generates stars
 * 
 * @param {int} num Number of stars to generate
 */
function genStars(num) {
    for (i = 0; i < num; i++) {
        stars.push({
            x: Math.random(),
            y: Math.random(),
            size: Math.random(),
            speed: Math.random(),
            moveX: 0,
            moveY: 0,
        })
    }
}

const LUNAR_MONTH = 29.530588853;

/**
 * Returns a Julian date for a given date
 * 
 * @param {Date} date 
 * @returns 
 */
 function getJulianDate(date) {
    const time = date.getTime();
    const tzoffset = date.getTimezoneOffset()
    return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
}

/**
 * Get the lunar age percent
 * 
 * @param {Date} date 
 */
function getLunarAgePercent(date) {
  return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
}

/**
 * No idea what this does tbh
 */
function normalize(value) {
  value = value - Math.floor(value);
  if (value < 0)
    value = value + 1
  return value;
}