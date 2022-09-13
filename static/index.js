const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(24, (window.innerWidth)/(window.innerHeight*0.9), 0.1, 1000);

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight*0.9);
document.body.appendChild(renderer.domElement);


const colorPink = new THREE.Color('hsl(306, 100%, 50%)')
const colorYellow = new THREE.Color('hsl(40, 100%, 50%)')
const colorBlue = new THREE.Color('hsl(160, 100%, 50%)')

const cubes = []
let j=0
for (let i=0; i< Object.keys(bricks).length+1; i++){
    const cubeGeometry = new THREE.BoxGeometry(0.5,1,2);
    const cubeMaterial = new THREE.MeshPhongMaterial({color: colorPink});
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(i%x_max * 0.6,Math.floor(i/x_max)*1.1,bricks[i]/3)
    cubes.push(cube)
    scene.add(cube);
}


const light = new THREE.PointLight(colorYellow,0.5)
light.position.set(200,-400,400)
const light2 = new THREE.PointLight(colorBlue,3)
light2.position.set(10,100,200)
scene.add(light);
scene.add(light2);


camera.position.set(-8,24,30)
camera.lookAt(3,5.7,0)

// scene.background = new THREE.Color(0xffffff);
scene.background = new THREE.Color(0xf5f5f5);
renderer.render(scene, camera)


/////////////// Functions
var slider = document.getElementById('myRange');
var second_slider = document.getElementById('mySecondRange');
var third_slider = document.getElementById('myThirdRange');

function highlight(no, color){
    cubes.forEach(change_color);
    function change_color(item){
        item.material.color.set( colorPink)
    }
    cubes[no].material.color.set( colorBlue)
}

function move(no, factor){
    console.log(factor)
    cubes[no].position.z = factor;
}

slider.addEventListener('input', ()=>{
    highlight(slider.value)
    renderer.render(scene, camera)
});

second_slider.addEventListener('input', ()=>{
    move(slider.value, second_slider.value);
    renderer.render(scene, camera)
});