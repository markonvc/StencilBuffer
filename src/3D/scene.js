import * as THREE from 'three';
// import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
// import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
// import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

const Feature = () => { 
    const canvas = document.getElementById("canvas");
  
    var scene = new THREE.Scene();
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
        new THREE.Vector3(1000, 1000, 10)
      );
      camera.lookAt(new THREE.Vector3(0,0,0));
      camera.updateProjectionMatrix();

  
    let renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setClearColor("#e5e5e5");
    renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.3);
  
    document.body.appendChild(renderer.domElement);
  
    window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.3);
        camera.aspect = window.innerWidth / window.innerHeight;
  
        camera.updateProjectionMatrix();    
  
    })
  
    var loader =  new FBXLoader();
    var path = "https://configurator.mag.archi/media/wvklcqwq/r-5-1.fbx";
    var color = new THREE.Color(0xFF0050);
    var mat = new THREE.MeshBasicMaterial({ color: color });


    const gl = renderer.getContext();
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);
    gl.enable(gl.STENCIL_TEST);
    gl.stencilFunc(gl.NOTEQUAL, 1, 0xFF);
    gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE)
    gl.stencilMask(0xFF);
    renderer.setClearColor("white");
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    gl.stencilMask(0x00);   

    let geometry3 = new THREE.PlaneGeometry(1.5, 1.5, 1.5);
    var mesh = new THREE.Mesh(geometry3, mat);
    scene.add(mesh)
   

    // var obj = [];
    // loader.load(path, (model) => {
    //     // console.log(model);
    //     model.visible = true;  
    //     model.traverse( (child) => {
    //         // console.log(child); 
    //         if(child.isMesh) {
    //             // console.log(child);
    //             child.material = mat;
    //             mat.transparent = true;
    //             mat.opacity = 0.7;
                
    //         }

    //         child.position.set(0, 0, 0);
    //         child.scale.set(0.5, 0.5, 0.5);
    //         child.rotateY(0)
    //         child.rotateX(0)
    //         child.rotateZ(0.7)
            
    //         if(child.isMesh){
    //         scene.add(child); 
    //         obj.push(child);
            
    //         }
            
    //     });
        
       
    // });  


    // const composer = new EffectComposer(renderer);
    // const renderPass = new RenderPass(scene, camera);
    // composer.addPass(renderPass);

    // const outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
    // outlinePass.edgeStrength = 4;
    // outlinePass.visibleEdgeColor = ("green");
    // composer.addPass( outlinePass );
    // outlinePass.selectedObjects = obj;
    // console.log(outlinePass.selectedObjects)

    // const effectFXAA = new ShaderPass( FXAAShader );
    // effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
    // effectFXAA.renderToScreen = true;
    // composer.addPass( effectFXAA );
    
    gl.stencilFunc(gl.ALWAYS, 1, 0xff);
    gl.stencilMask(0xFF);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    gl.disable(gl.DEPTH_TEST);

     
    let light = new THREE.PointLight(0xFFFFFF, 1, 500)
    light.position.set(10,0,25);
    scene.add(light);

    var render = function(){
        renderer.clear()
        requestAnimationFrame(render);
        renderer.clearDepth()
        renderer.render(scene, camera);
    }

    render();
  
  }
  export default Feature;