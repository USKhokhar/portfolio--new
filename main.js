import * as THREE from 'three'

let scene, lightScene, lightPortal, lightPortalX, lightPortalXX,camera, renderer, geoPart, matePart, geoSmoke, mateSmoke, clock, partArr = [], smokeArr = []

function init() {
    scene = new THREE.Scene()

    lightScene = new THREE.DirectionalLight(0xffffff, 0.45)
    lightScene.position.set(0, 0, 1)
    scene.add(lightScene)

    // portal light
    lightPortal = new THREE.PointLight(0x062d89, 10, 450, 2)
    lightPortal.position.set(0, 0, 150)
    scene.add(lightPortal)
    
    lightPortalX = new THREE.PointLight(0x000C66, 5, 350, 1)
    lightPortalX.position.set(0, 0, 150)
    scene.add(lightPortalX)

    lightPortalXX = new THREE.PointLight(0xA30000, 20, 250, 2)
    lightPortalXX.position.set(0, 0, 50)
    scene.add(lightPortalXX)

    // camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 10000)
    camera.position.z = 1000
    scene.add(camera)

    // renderer
    renderer = new THREE.WebGLRenderer({alpha: true,})
    renderer.setSize(window.innerWidth, window.innerHeight)

    document.body.appendChild(renderer.domElement)
    setParticle()
}

function setParticle() {
    let loader = new THREE.TextureLoader()

    loader.load('/assets/smoke.png', function(texture){
        geoPart = new THREE.PlaneGeometry(250, 250)
        matePart = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true,
        })
        geoSmoke = new THREE.PlaneGeometry(1200, 800)
        mateSmoke = new THREE.MeshStandardMaterial({
            map: texture,
            transparent: true,
        })

        for(let i = 880; i > 250; i--){
            let particle = new THREE.Mesh(geoPart, matePart)
            particle.position.set(
                0.45 * i * Math.cos((4 * i * Math.PI) / 180),
                0.45 * i * Math.sin((4 * i * Math.PI) / 180),
                0.1 * i 
            )
            particle.rotation.z = Math.random() * 360
            partArr.push(particle)
            scene.add(particle)
        }
        for(let i = 0; i < 40; i++){
            let particle = new THREE.Mesh(geoSmoke, mateSmoke)
            particle.position.set(
                Math.random() * 1000-500,
                Math.random() * 400-200,
                25
            )
            particle.rotation.z = Math.random() * 360
            particle.material.opacity = 0.3
            smokeArr.push(particle)
            scene.add(particle)
        }

        clock = new THREE.Clock()
        animate()
    })
}

function animate(){ 
    let delta = clock.getDelta()
    partArr.forEach(p => {
        p.rotation.z -= delta * 1.5
    })
    smokeArr.forEach(p => {
        p.rotation.z -= delta * 0.2
    })

    if(Math.random() > 0.9){
        lightPortal.power = 350 + Math.random() * 500
        lightPortalX.power = 350 + Math.random() * 500
        lightPortalXX.power = 350 + Math.random() * 500
    }

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

function onResize() {
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onResize, false)


init()