import * as THREE from 'three';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import {OutlineEffect} from 'three/examples/jsm/effects/OutlineEffect'


const Feature = () => { 
    const canvas = document.getElementById("canvas");

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(
        100,
        // window.innerWidth / window.innerHeight,
        1.777777,
        0.1,
        2000
      );
      camera.setFocalLength(35)
      // camera.lookAt(new Vector3(0.10593, -2.0524, 0));
      
      // This is where the camera position is hardcoded to align the hotspots
      // camera.position.copy(
      //   new Vector3(22.612559451406984, 30.53181744066928, 45.523622716900114)
      //   );
      camera.position.copy(
        new THREE.Vector3(10, 10, 10)
      );
      camera.lookAt(new THREE.Vector3(0,0,0));
      camera.updateProjectionMatrix();

    let renderer = new THREE.WebGLRenderer({canvas, antialias: true, alpha: true});
    renderer.setClearColor("black");
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();    

    })

    let controls = new OrbitControls( camera, renderer.domElement );
				controls.minDistance = 5;
				controls.maxDistance = 20;
				controls.enablePan = false;
				controls.enableDamping = true;
				controls.dampingFactor = 0.05;


    const loader =  new FBXLoader();
    const path = "https://configurator.mag.archi/media/gnunm1ll/kubusi-2-1.fbx";


    var color = new THREE.Color(255, 0, 0);
    var mat = new THREE.MeshBasicMaterial({ color: color});
    let geometry3 = new THREE.BoxGeometry( 2, 2, 2 );
    var mesh = new THREE.Mesh(geometry3, mat); 
    // mesh.material. = 0; 
    console.log(mesh)
    scene.add(mesh);

    var color2 = new THREE.Color(0, 255, 255);
    var mat2 = new THREE.MeshBasicMaterial({ color: color2});
    let geometry2 = new THREE.BoxGeometry( 2, 2, 2 );
    var mesh2 = new THREE.Mesh(geometry2, mat2); 
    mesh2.position.x = 0.5;
    mesh2.position.z = -3;
    mesh2.position.y = 0
    scene.add(mesh2);


    // loader.load(path, (model) => {
    //     model.visible = true;
    //     console.log(model)
    //     model.traverse(function (child) {
    //         console.log(child)
    //         if(child.isMesh){
    //         child.material = mat;
    //         mat.transparent = true;
    //         mat.opacity = 0;
    //         // scene.add(child);
    //         }
    //         console.log(scene)
    //     });
      
       
    // });    

  


    let light = new THREE.PointLight(0xFFFFFF, 1, 500)
    light.position.set(10,0,25);
    // scene.add(light);

    var render = function(){
        
     
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    render();

}
  export default Feature;