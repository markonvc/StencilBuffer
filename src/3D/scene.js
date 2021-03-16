import * as THREE from 'three';
import { Mesh } from 'three';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

const Feature = () => { 
    const canvas = document.getElementById("canvas");
  
    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
    camera.position.z = 5;
  
    let renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setClearColor("#e5e5e5");
    renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.3);
  
    document.body.appendChild(renderer.domElement);
  
    window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.3);
        camera.aspect = window.innerWidth / window.innerHeight;
  
        camera.updateProjectionMatrix();    
  
    })
  
    const loader =  new FBXLoader();
    const path = "src/assets/model.fbx";
    // geometry.translate( + 1/2, - 1/2, 0);
  
    var color = new THREE.Color(0xFF0050);
    var mat = new THREE.MeshBasicMaterial({ color: color });
    // let geometry3 = new THREE.PlaneGeometry(1.5, 1.5, 1.5);
    // var mesh = new THREE.Mesh(geometry3, mat);
    // scene.add(mesh)
  
    loader.load(path, (model) => {
  
        model.scene.traverse((child) => {
            child.material = mat;
            mat.transparent = true;
            mat.opacity = 0.7;
  
            
  
            // child.onBeforeRender = renderer => {
            //     const gl = renderer.getContext();
            //     gl.enable(gl.STENCIL_TEST);
            //     gl.stencilMask(10);
            //     gl.stencilFunc(gl.NOTEQUAL, 10, 10);
            //     gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
            // };
  
            // child.onAfterRender = renderer => {
            //     const gl = renderer.getContext();
            //     gl.disable(gl.STENCIL_TEST);
            //     gl.stencilMask(0);
            //     gl.stencilFunc(gl.ALWAYS, 1, 0xff);
            //     gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
            // };

            scene.add(child);
        });
    });    

     
    let light = new THREE.PointLight(0xFFFFFF, 1, 500)
    light.position.set(10,0,25);
    scene.add(light);

    var render = function(){
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    render();
  
  }
  export default Feature;