

var particlesWaves = [];

var particleWaves, particleWavesCount = 0;
function particleWavesRender(context) {

    // we get passed a reference to the canvas context
    context.beginPath();
    // and we just have to draw our shape at 0,0 - in this
    // case an arc from 0 to 2Pi radians or 360º - a full circle!
    context.arc(0, 0, 1, 0, Math.PI * 2, true);
    context.fill();
}
;
function makeParticleWaves() {



    // we're gonna move from z position -1000 (far away) 
    // to 1000 (where the camera is) and add a random particleWaves at every pos. 
    for (var zpos = -1000; zpos < 1000; zpos += 20) {

        // we make a particleWaves material and pass through the 
        // colour and custom particleWaves render function we defined. 
        var materialWaves = new THREE.ParticleCanvasMaterial({color: 0xffffff, program: particleWavesRender});
        // make the particleWaves
        particleWaves = new THREE.Particle(materialWaves);

        // give it a random x and y position between -500 and 500
        particleWaves.position.x = Math.random() * 1000 - 500;
        particleWaves.position.y = Math.random() * 1000 - 500;

        // set its z position
        particleWaves.position.z = zpos;

        // scale it up a bit
        particleWaves.scale.x = particleWaves.scale.y = 10;

        // add it to the scene
        scene.add(particleWaves);

        // and to the array of particles. 
        particlesWaves.push(particleWaves);
    }

}
function initParticleWaves() {

    //camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000, 100, 1000);


    renderer = new THREE.CanvasRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color, 0);
    //   mouseX = 0;
    //  mouseY = 0;
    //forget the others
    if (container.hasChildNodes())
    {
        while (container.childNodes.length >= 1)
        {
            container.removeChild(container.firstChild);
        }
    }
    container.appendChild(renderer.domElement);

    makeParticleWaves();
}

function animateParticleWaves() {

    requestAnimationFrame(animateParticleWaves);

    renderParticleWaves();
    stats.update();

}

function renderParticleWaves() {

//    camera.position.x += (mouseX - camera.position.x) * .05;
//    camera.position.y += (-mouseY - camera.position.y) * .05;
//    camera.lookAt(scene.position);

    // iterate through every particle
    for (var i = 0; i < particlesWaves.length; i++) {

        particleWaves = particlesWaves[i];

        // and move it forward dependent on the mouseY position. 
        particleWaves.position.z += particleWavesCount * 0.1;
        camera.rotation.x += 1;
        // if the particle is too close move it to the back
        if (particleWaves.position.z > 1000)
            particleWaves.position.z -= 2000;

//        particleWaves.position.y = (Math.sin((i + particleWavesCount) * 0.3) * 50) +
//                (Math.sin((i + particleWavesCount) * 0.5) * 50);
        particleWaves.scale.x =
                particleWaves.scale.y =
                (Math.sin((i + particleWavesCount) * 0.3) + 1) * 4 +
                (Math.sin((i + particleWavesCount) * 0.5) + 1) * 4;

    }
    particleWavesCount += 0.1;
    renderer.render(scene, camera);


}