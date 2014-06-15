
var SEPARATION = 100, AMOUNTX = 50, AMOUNTY = 50;

var particles, particle, count = 0;
var mouseX = 0, mouseY = 0;

function initWaves() {

  // camera.position.z = 1000;

    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000, 100, 1000); 
   

    renderer = new THREE.CanvasRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color, 0);
 //   mouseX = 0;
  //  mouseY = 0;
     if (container.hasChildNodes())
    {
        while (container.childNodes.length >= 1)
        {
            container.removeChild(container.firstChild);
        }
    }
     container.appendChild(renderer.domElement); 
 

    particles = new Array();

    var PI2 = Math.PI * 2;
    var material = new THREE.SpriteCanvasMaterial({
        color: 0xf3f3f3,
        program: function(context) {

            context.beginPath();
            context.arc(0, 0, 0.5, 0, PI2, true);
            context.fill();

        }

    });

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

        for (var iy = 0; iy < AMOUNTY; iy++) {

            particle = particles[ i++ ] = new THREE.Sprite(material);
            particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
            particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
            scene.add(particle);

        }

    }

}

function animateWaves() {

    requestAnimationFrame(animateWaves);

    renderWaves();
    stats.update();

}

function renderWaves() {

    camera.position.x += (mouseX - camera.position.x) * .05;
    camera.position.y += (-mouseY - camera.position.y) * .05;
    camera.lookAt(scene.position);

    var i = 0;

    for (var ix = 0; ix < AMOUNTX; ix++) {

        for (var iy = 0; iy < AMOUNTY; iy++) {

            particle = particles[ i++ ];
            particle.position.y = (Math.sin((ix + count) * 0.3) * 50) +
                    (Math.sin((iy + count) * 0.5) * 50);
            particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 4 +
                    (Math.sin((iy + count) * 0.5) + 1) * 4;

        }

    }

    renderer.render(scene, camera);

    count += 0.1;

}