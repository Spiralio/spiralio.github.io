// Rain Style

styles.rain = {
    name: 'Rain'
}

let drops = []
let timeout;

/**
 * Runs when loaded
 */
styles.rain.load = () => {
    drops = []
    body.style.background = '#7A848B';

    document.getElementById('gradient').style.display = 'block'
    document.getElementById('gradient').style.opacity = 1

    // body.style.background = 'linear-gradient(180deg, rgba(145,160,167,1) 0%, rgba(94,105,113,1) 100%)'
    body.style.fontFamily = "Merriweather"

    timeout = setInterval(() => {
        rainDrop()
    }, (30 * (1 - 100/100)) + 16);
    
}

/**
 * Runs when unloaded
 */
styles.rain.unload = () => {
    document.getElementById('barCont').style.borderRadius = '100px';
    document.getElementById('barCont').style.marginTop = '20px';

    document.getElementById('gradient').style.opacity = 0

    if (timeout) clearInterval(timeout)
}

/**
 * Runs every frame
 */
styles.rain.frame = () => {


    drops.forEach((d, i) => {
        ctx.beginPath()

        ctx.ellipse(d.x, d.y, 40, 5, (3*Math.PI)/2, (3*Math.PI)/2, Math.PI/2);
        ctx.ellipse(d.x, d.y, 8, 5, (3*Math.PI)/2, Math.PI/2, (3*Math.PI)/2);
    
        ctx.fillStyle = '#ccefff66'
        ctx.fill()
        
        d.y += 3.5 + 1*d.speed

        if (d.y > c.height + 50) drops.splice(i, 1)
    })
}

function rainDrop() {
    drops.push({
        x: Math.random() * c.width,
        y: 0,
        speed: Math.random()
    })
}