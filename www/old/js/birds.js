
if (!Detector.webgl)
    Detector.addGetWebGLMessage();

var hash = document.location.hash.substr(1);
if (hash)
    hash = parseInt(hash, 0);


var WIDTH = hash || 32;

var BIRDS = WIDTH * WIDTH;

THREE.BirdGeometry = function() {

    var triangles = BIRDS * 3;
    var points = triangles * 3;

    THREE.BufferGeometry.call(this);

    var vertices = new THREE.Float32Attribute(points, 3);
    var birdColors = new THREE.Float32Attribute(points, 3);
    var references = new THREE.Float32Attribute(points, 2);
    var birdVertex = new THREE.Float32Attribute(points, 1);

    this.addAttribute('position', vertices);
    this.addAttribute('birdColor', birdColors);
    this.addAttribute('reference', references);
    this.addAttribute('birdVertex', birdVertex);

    var v = 0;

    function verts_push() {
        for (var i = 0; i < arguments.length; i++) {
            vertices.array[v++] = arguments[i];
        }
    }

    var wingsSpan = 20;

    for (var f = 0; f < BIRDS; f++) {

        verts_push(
                0, -0, -20,
                0, 4, -20,
                0, 0, 30
                );

        verts_push(
                0, 0, -15,
                -wingsSpan, 0, 0,
                0, 0, 15
                );

        verts_push(
                0, 0, 15,
                wingsSpan, 0, 0,
                0, 0, -15
                );

    }

    for (var v = 0; v < triangles * 3; v++) {

        var i = ~~(v / 3);
        var x = (i % WIDTH) / WIDTH;
        var y = ~~(i / WIDTH) / WIDTH;

        var c = new THREE.Color(
                0x444444 +
                ~~(v / 9) / BIRDS * 0x666666
                );

        birdColors.array[ v * 3 + 0 ] = c.r;
        birdColors.array[ v * 3 + 1 ] = c.g;
        birdColors.array[ v * 3 + 2 ] = c.b;

        references.array[ v * 2     ] = x;
        references.array[ v * 2 + 1 ] = y;

        birdVertex.array[ v         ] = v % 9;

    }

    this.applyMatrix(new THREE.Matrix4().makeScale(0.2, 0.2, 0.2));

}

THREE.BirdGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);


var i, h, color;


var PARTICLES = WIDTH * WIDTH;
var BOUNDS = 800, BOUNDS_HALF = BOUNDS / 2;

var last = performance.now();

var simulator;

function initBirds() {

   camera.position.z = 1350;
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000, 100, 1000);
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(scene.fog.color, 0);
      if (container.hasChildNodes())
    {
        while (container.childNodes.length >= 1)
        {
            container.removeChild(container.firstChild);
        }
    }
     container.appendChild(renderer.domElement);

    simulator = new SimulationRenderer(WIDTH, renderer);
    simulator.init();


    //gui = new dat.GUI();


    var effectController = {
        seperation: 20.0,
        alignment: 20.0,
        cohesion: 20.0,
        freedom: 0.75
    };

    var valuesChanger = function() {

        simulator.velocityUniforms.seperationDistance.value = effectController.seperation;
        simulator.velocityUniforms.alignmentDistance.value = effectController.alignment;
        simulator.velocityUniforms.cohesionDistance.value = effectController.cohesion;
        simulator.velocityUniforms.freedomFactor.value = effectController.freedom;

    };

    valuesChanger();


//    gui.add(effectController, "seperation", 0.0, 100.0, 1.0).onChange(valuesChanger);
//    gui.add(effectController, "alignment", 0.0, 100, 0.001).onChange(valuesChanger);
//    gui.add(effectController, "cohesion", 0.0, 100, 0.025).onChange(valuesChanger);
//    gui.close();


    var geometry = new THREE.BirdGeometry();

    // For Vertex Shaders
    birdAttributes = {
        // index: { type: 'i', value: [] },
        birdColor: {type: 'c', value: null},
        reference: {type: 'v2', value: null},
        birdVertex: {type: 'f', value: null}
    };

    // For Vertex and Fragment
    birdUniforms = {
        color: {type: "c", value: new THREE.Color(0xff2200)},
        texturePosition: {type: "t", value: null},
        textureVelocity: {type: "t", value: null},
        time: {type: "f", value: 1.0},
        delta: {type: "f", value: 0.0},
    };

    // ShaderMaterial
    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: birdUniforms,
        attributes: birdAttributes,
        vertexShader: document.getElementById('birdVS').textContent,
        fragmentShader: document.getElementById('birdFS').textContent,
        side: THREE.DoubleSide

    });


    // var 
    birdMesh = new THREE.Mesh(geometry, shaderMaterial);
    birdMesh.rotation.y = Math.PI / 2;
    birdMesh.matrixAutoUpdate = false;
    birdMesh.updateMatrix();

    scene.add(birdMesh);

}

function animateBirds() {

    requestAnimationFrame(animateBirds);

    renderBirds();
    stats.update();

}

function renderBirds() {

    var now = performance.now()
    var delta = (now - last) / 1000;

    if (delta > 1)
        delta = 1; // safety cap on large deltas
    last = now;

    birdUniforms.time.value = now;
    birdUniforms.delta.value = delta;

    simulator.simulate(delta);
    simulator.velocityUniforms.predator.value.set(mouseX / windowHalfX, -mouseY / windowHalfY, 0);

   // mouseX = 10000;
   // mouseY = 10000;

    renderer.render(scene, camera);

}
