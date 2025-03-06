import { AxesHelper, BoxGeometry, BufferGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Points, PointsMaterial, Scene, WebGLRenderer } from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new Scene(); //creer une scene
const count = 100

scene.add(new AxesHelper()) // Voir les axes

const camera = new PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 1000); //creer la camera visuelle 1(zoom cam) 2(ratio de l'image) 3 et 4(afficher entre ... et ...)
camera.position.z = 2; // bouger la camera en fonction de l'axe z 
camera.position.y = .5 // y
camera.position.x = .5 // x
scene.add(camera); //ajouter la camera

const points = new Float32Array(count*3)
for(let i = 0; i<count; i++){
  points[i] = 1 //coordonnée x 
  points[i+1] = 1 //coordonnée y
  points[i+2] = 1 //coordonnée z
}

const cubeGeometry = new BufferGeometry(1,1,1); //creer une geometrie carré
const material = new PointsMaterial({size:.5, color:0xff0000})
const points = new Points(cubeGeometry, material) //ceer plusieurs geometries

// const cube = new Mesh(  // objet compose geometrie(ensemble de point pr former qqc) et materiel pour texture
//   new BoxGeometry(1,1,1), //geometrie avec largeur hauteur et profondeur
//   new MeshNormalMaterial() //materiel de base pr debbuguer
// ) 
scene.add(points) //ajouter la geometrie a la scene
const renderer = new WebGLRenderer({
  antialias:true,
}) //ceer un rendu
renderer.setSize(window.innerWidth, window.innerHeight); //définir la taille du rendu (dans notre cas la taille = taille de la page)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)); //définir le pixelRatio
document.body.appendChild(renderer.domElement); //afficher la scene dans le body
// renderer.render(scene, camera); //afficher le rendu en fonction de la scene et la camera

const controls = new OrbitControls(camera, renderer.domElement) //controller la camera

function tick(){
  renderer.render(scene, camera) //afficher le rendu en fonction de la scene et la camera
  controls.update
  // camera.position.x += .01
  camera.lookAt(0,0,0)
  requestAnimationFrame(tick); //rappeler la fonction pour l'animation
}

tick() //appelle de la fonction tick

window.addEventListener('resize', ()=>{  // redimensionner les mesures si les dimensions de l'ecran changent
  camera.aspect = window.innerWidth / window.innerHeight //changer l'aspect de la camera
  camera.updateProjectionMatrix() //update la projection
  renderer.setSize(window.innerWidth, window.innerHeight) //update les dimensions du rendu
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)); //redéfinir le pixelRatio
})