let c, ctx;

let perc = 0;
let stars = []

let cursorX = null;
let cursorY = null;

let moveX = 0;
let moveY = 0;

const endTime = new Date('2021-08-31T00:00:00.000+08:00');
const startTime = new Date('2021-07-17T00:00:00.000+02:00');
const total = endTime.getTime() - startTime.getTime();

function load() {
    document.onmousemove = getCursorXY;

    c = document.getElementById("canvaBg");
    ctx = c.getContext("2d");

    console.log(stars)

    setInterval(function() {
        const curTime = Date.now()

        perc = (1 - (endTime.getTime() - curTime)/total) * 100

        document.getElementById('perc').innerHTML = perc.toFixed(6).slice(0, perc.toFixed(7).length - 3)
        
        let smallPerc = perc.toFixed(6).toString()
        smallPerc = perc.toFixed(6).toString().slice(smallPerc.length - 2,smallPerc.length)
        
        document.getElementById('smallPerc').innerHTML = smallPerc
        document.getElementById('smallPerc').style.color = `hsl(${(smallPerc/100)*145}, 100%, 60%)`

        document.getElementById('barDone').style.width = `calc(50vw*${1 - (endTime.getTime() - curTime)/total})`
        // document.getElementById('barLeft').style.width = `calc(50vw*${(endTime.getTime() - curTime)/total})`

        document.getElementById('barDone').style.backgroundColor = `hsl(${(perc/100)*145}, 100%, 60%)`

        if (stars.length < Math.floor((perc/100) * 1000)) genStars(1)

        loadCanvas()
        nextMilestone()

    }, 1);
}

function nextMilestone() {
    const every = 5;

    let next = (Math.floor(perc / every) + 1) * every 
    // console.log(next)

    let eta = (next * total)/100 - total + endTime.getTime()
    let left = eta - Date.now()

    let hours = Math.floor(left/1000/60/60)
    left -= hours * 3600000;
    let mins = Math.floor(left/1000/60)
    left -= mins * 60000;
    let secs = Math.floor(left/1000)

    document.getElementById('milestoneTime').innerHTML = `${hours}:${mins.toString().length == 1 ? '0' + mins : mins}:${secs.toString().length == 1 ? '0' + secs : secs}`
    document.getElementById('milestonePerc').innerHTML = `${next}%`
    document.getElementById('milestonePerc').style.color = `hsl(${((next/100)*145)}, 100%, 60%)`

}

// let age = 0.01

function loadCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);

    c.style.width ='100%';
    c.style.height='100%';
    // ...then set the internal size to match
    c.width  = c.clientWidth*2;
    c.height = c.clientHeight*2;

    moonWidth = 160;

    let date = new Date()
    let age = getLunarAgePercent(date)


    // let percMovedX = 0;
    // let percMovedY = 0;

    // if (cursorX != null) percMovedX = (cursorX/(c.width/2))*2 - 1;
    // if (cursorY != null) percMovedY = (cursorY/(c.height/2))*2 - 1;

    // console.log((cursorX/(c.width/2))*200 - 100)

    for (i = 0; i < stars.length; i++) {
        let star = stars[i]
        // console.log(stars.length)

        let starX = (c.width * star.x)// + (50)*percMovedX*star.speed
        let starY = (c.height * star.y)// + (50)*percMovedY*star.speed
        let starSize = (star.size * 3) + 2

        // star.moveX = (50)*percMovedX*star.speed
        // star.moveY = (50)*percMovedY*star.speed

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

        ctx.beginPath();
        ctx.arc(starX, starY, starSize, 0, 2 * Math.PI);
        ctx.fillStyle = '#8c8c91'
        ctx.fill()

        star.y += ((0.00003 * star.speed + 0.00002) * (perc/100))*2;

        if (star.y >= 1) star.y -= 1
        if (star.x >= 1) star.x -= 1

        if (star.y < 0) star.y += 1
        if (star.x < 0) star.x += 1
    }

    // ctx.strokeStyle = '#191923'
    // ctx.lineWidth = '5'

    // age += 0.001
    // console.log(age)

    let newAge = age

    let full = false

    newAge -= 0.25;
    if (newAge < 0) newAge += 1

    if (newAge > 0.5) {
        full = true
        newAge -= 0.5
    }

    // if (age >= 1) age = 0

    let left = moonWidth
    let right = moonWidth

    if (newAge < 0.25) left = moonWidth * (newAge / 0.25)
    else right = moonWidth - moonWidth * ((newAge - 0.25) / 0.25)

    if (right < 0) right = 0

    ctx.beginPath();
    ctx.arc(c.width/2, moonWidth*1.8, moonWidth - 1, 0, 2 * Math.PI);
    ctx.fillStyle = (full) ? '#FFE96B' : '#191923'

    ctx.fill()

    ctx.beginPath();
    ctx.ellipse(c.width/2, moonWidth*1.8, right, moonWidth, 0, (3*Math.PI)/2, Math.PI/2);
    ctx.ellipse(c.width/2, moonWidth*1.8, left, moonWidth, 0, Math.PI/2, (3*Math.PI)/2);
    // ctx.arc(c.width/2, moonWidth*1.5, moonWidth, Math.PI * 1.5, Math.PI*2.5);
    // ctx.fillStyle = '#191923'
    ctx.fillStyle = (!full) ? '#FFE96B' : '#191923'
    ctx.fill()


}

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

function formatNumber(x) {
    // convert it to a string
    var s = "" + x;
    // if x is integer, the point is missing, so add it
    if (s.indexOf(".") == -1) {
        s += ".";
    }
    // make sure if we have at least 2 decimals
    s += "00";
    // get the first 2 decimals
    return s.substring(0, s.indexOf(".") + 3);
}

const getJulianDate = (date = new Date()) => {
    const time = date.getTime();
    const tzoffset = date.getTimezoneOffset()

    return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
}

const LUNAR_MONTH = 29.530588853;
const getLunarAgePercent = (date = new Date()) => {
  return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
}
const normalize = value => {
  value = value - Math.floor(value);
  if (value < 0)
    value = value + 1
  return value;
}

function getCursorXY(e) {
	let newCursorX = (window.Event) ? e.pageX : e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	let newCursorY = (window.Event) ? e.pageY : e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

    if (cursorX != null) moveX += newCursorX - cursorX
    if (cursorY != null) moveY += newCursorY - cursorY

    cursorX = newCursorX
    cursorY = newCursorY

    console.log(cursorX)
}