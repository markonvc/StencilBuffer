import * as THREE from 'three';
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

const Feature = () => { 
    const canvas = document.getElementById("canvas");
  
    var scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
    camera.position.z = 5;


  
    let renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setClearColor("green");
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
  
    document.body.appendChild(renderer.domElement);
  
    window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
  
        camera.updateProjectionMatrix();    
  
    })
    var container = document.createElement('div');
    var stats = new Stats();
    container.appendChild(stats.dom);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    var controls = new OrbitControls( camera, renderer.domElement );
        controls.minDistance = 5;
        controls.maxDistance = 20;
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

    const geometry = new THREE.SphereGeometry( 1, 32, 32 );
    var color = new THREE.Color(0xFF0050);
    var mat = new THREE.MeshBasicMaterial({ color: color });
    var mesh = new THREE.Mesh(geometry, mat);
    mesh.geometry.center();
    mesh.receiveShadow = true;
    mesh.castShadow = true;

    scene.add(mesh);   
    
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    var visibleColor = new THREE.Color(0xff0000)
    var hiddenColor = new THREE.Color(0x000000)

    const outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
    outlinePass.edgeStrength = 4;
    outlinePass.edgeThickness = 1;
    outlinePass.visibleEdgeColor = (visibleColor);
    outlinePass.hiddenEdgeColor = (hiddenColor);
    // outlinePass.selectedObjects = object;
    composer.addPass( outlinePass );
   

    const effectFXAA = new ShaderPass( FXAAShader );
                effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
                composer.addPass( effectFXAA );

    var selectedObjects;

    renderer.domElement.addEventListener( 'pointermove', onPointerMove );

    function onPointerMove( event ) {

        if ( event.isPrimary === false ) return;

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        checkIntersection();

    }

    function addSelectedObject( object ) {

        selectedObjects = [];
        selectedObjects.push( object );

    }

    function checkIntersection() {

        raycaster.setFromCamera( mouse, camera );

        const intersects = raycaster.intersectObject( scene, true );

        if ( intersects.length > 0 ) {
            console.log("presreteni")
            var selectedObject = intersects[ 0 ].object;
            addSelectedObject( selectedObject );
            outlinePass.selectedObjects = selectedObjects;
            console.log(outlinePass);

        } else {

            outlinePass.selectedObjects = [];

        }   
    }         



  
    // var loader =  new FBXLoader();
    // var path = "https://configurator.mag.archi/media/wvklcqwq/r-5-1.fbx";
 
    // const gl = renderer.getContext();
    // gl.enable(gl.DEPTH_TEST);
    // gl.depthFunc(gl.LESS);
    // gl.enable(gl.STENCIL_TEST);
    // gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF);
    // gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE)
    // gl.stencilMask(0xFF);
    // renderer.setClearColor("white");
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    // gl.stencilMask(0x00); 


    // let geometry3 = new THREE.PlaneGeometry(1.5, 1.5, 1.5);
    
    
    // gl.stencilFunc(gl.ALWAYS, 1, 0xff);
    // gl.stencilMask(0xFF);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    // gl.disable(gl.DEPTH_TEST);

     
    let light = new THREE.DirectionalLight(0xddffdd, 0.6)
    light.position.set(1,1,1);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;

    const d = 10;

    light.shadow.camera.left = - d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = - d;
    light.shadow.camera.far = 1000;

    scene.add(light);

    var render = function(){
        requestAnimationFrame(render);
        stats.begin()
        composer.render();
        stats.end()
    }

    render();
  
  }
  export default Feature;