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
  
    var scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
    camera.position.z = 5;


  
    let renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setClearColor("black");
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
  
    document.body.appendChild(renderer.domElement);
  
    window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
  
        camera.updateProjectionMatrix();    
  
    })

    var controls = new OrbitControls( camera, renderer.domElement );
        controls.minDistance = 5;
        controls.maxDistance = 20;
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

    const geometry = new THREE.BoxGeometry( 2, 2, 2 );
    var color = new THREE.Color(0xFF0050);
    var mat = new THREE.MeshBasicMaterial({ color: color });
    var mesh = new THREE.Mesh(geometry, mat);

    scene.add(mesh);
    
    var effect = new OutlineEffect( renderer, {
         	defaultThickness: 0.004,
        	defaultColor: [ 0, 0, 1 ],
         	defaultAlpha: 0.8,
         	defaultKeepAlive: true
         } );
    
    function rende() {
    
    effect.render( scene, camera );
    
     }

    // const effectFXAA = new ShaderPass( FXAAShader );
    // effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
    // renderer.addPass( effectFXAA );
   

     
    let light = new THREE.DirectionalLight(0xddffdd, 0.6)
    light.position.set(1,1,1);
    scene.add(light);

    var render = function(){
        requestAnimationFrame(render);
        rende();
       
    }

    render();
  
  }
  export default Feature;