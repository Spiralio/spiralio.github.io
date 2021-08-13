// Template Style

styles.sun = {
    name: 'Sun'
}

/**
 * Runs when loaded
 */
styles.sun.load = () => {
    document.getElementById('sunGradients').style.opacity = 100
    document.getElementById('sunGradients').style.display = "block" 

    document.getElementById('timesCont').style.opacity = 100
    document.getElementById('timesCont').style.display = "block" 


    body.style.background = 'rgb(5,10,42)';
    body.style.fontFamily = 'Poppins'
    body.style.fontWeight = 600

}

/**
 * Runs when unloaded
 */
styles.sun.unload = () => {
    document.getElementById('sunGradients').style.opacity = 0
    document.getElementById('timesCont').style.opacity = 0
}

/**
 * Runs every frame
 */

let francePercSun = getPercOfDay(getTimezone(2)) - .40
let seattlePercSun = getPercOfDay(getTimezone(-7)) - .40

if (francePercSun < 0) francePercSun += 1
if (seattlePercSun < 0) seattlePercSun += 1

let moon = new Image;
moon.src = "./assets/moonFull.png";


let sun = new Image;
sun.src = "./assets/sun.png";


styles.sun.frame = () => {


    // francePercSun += 0.0001
    // seattlePercSun += 0.0001

    // if (francePercSun >= 1) francePercSun = 0
    // if (seattlePercSun >= 1) seattlePercSun = 0   


    let franceSize = c.width/18;
    if (francePercSun < 0.5) {
        let positionY = (c.height + franceSize*2)
            * (1 - (Math.abs((francePercSun > .25 ? 1 : 0) - francePercSun*2)*2))
            - franceSize/2

            ctx.drawImage(sun, c.width/4-franceSize, positionY, franceSize*2, franceSize*2)
    } else {
        let moonPerc = francePercSun-0.5
        let positionY = (c.height + franceSize)
                * (1 - (Math.abs((moonPerc > .25 ? 1 : 0) - moonPerc*2)*2))
                - franceSize     

        ctx.drawImage(moon, c.width/4-franceSize, positionY, franceSize*2, franceSize*2)
    }

    let franceDayPerc = francePercSun + .40
    if (franceDayPerc >= 1) franceDayPerc -= 1
    document.getElementById('leftGradient').style.top = -(franceDayPerc*(c.height* 25))


    let seattleSize = c.width/18;
    if (seattlePercSun < 0.5) {
        let positionY = (c.height + seattleSize*2)
            * (1 - (Math.abs((seattlePercSun > .25 ? 1 : 0) - seattlePercSun*2)*2))
            - seattleSize

            ctx.drawImage(sun, (3/4*c.width)-seattleSize, positionY, seattleSize*2, seattleSize*2)
    } else {
        let moonPerc = seattlePercSun-0.5
        let positionY = (c.height + seattleSize*2)
                * (1 - (Math.abs((moonPerc > .25 ? 1 : 0) - moonPerc*2)*2))
                - seattleSize     

        ctx.drawImage(moon, (3/4*c.width)-seattleSize, positionY, seattleSize*2, seattleSize*2)
    }

    let seattleDayPerc = seattlePercSun + .40
    if (seattleDayPerc >= 1) seattleDayPerc -= 1
    document.getElementById('rightGradient').style.top = -(seattleDayPerc*(c.height* 25))

    let seattle = getTimezone(-7)
    let france = getTimezone(2)
    document.getElementById('timeTextLeft').innerHTML = (`${france.getHours()}:${formatNumber(france.getMinutes())}:${formatNumber(france.getSeconds())}`)
    document.getElementById('timeTextRight').innerHTML = (`${seattle.getHours()}:${formatNumber(seattle.getMinutes())}:${formatNumber(seattle.getSeconds())}`)

}

function getTimezone(offset) {
    let d = new Date();
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    return nd = new Date(utc + (3600000*offset));    
}

function getPercOfDay(date) {
    let total = date.getHours() * 3600000
    total += date.getMinutes() * 60000
    total += date.getSeconds() * 1000
    total += date.getMilliseconds()

    return (total/86400000)
}