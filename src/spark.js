import * as THREE from 'three';
import {SVGRenderer} from 'three/addons/renderers/SVGRenderer.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
export function initSpark(host,motionButton){
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let renderer;
 const canvas=document.createElement('canvas'); let context; try{context=canvas.getContext('webgl2',{alpha:true,antialias:true,powerPreference:'low-power'});}catch{}
 const fallback=!context;
 try {renderer=fallback?new SVGRenderer():new THREE.WebGLRenderer({canvas,context,alpha:true,antialias:true,powerPreference:'low-power'});} catch {return()=>{};}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setClearColor(0x2448f4,0);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.22;
 host.appendChild(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
 const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(35,1,.1,80);camera.position.set(0,0,10.8);
 let env; if(!fallback){const pmrem=new THREE.PMREMGenerator(renderer);const room=new RoomEnvironment();env=pmrem.fromScene(room,.04);scene.environment=env.texture;room.dispose();pmrem.dispose();}else{renderer.setQuality('high');renderer.setPrecision(2);}
 const root=new THREE.Group();root.position.y=.1;root.rotation.set(-.28,.32,-.17);scene.add(root);
 const material=new THREE.MeshStandardMaterial({color:0xe5fb65,metalness:.45,roughness:.23});const chrome=new THREE.MeshStandardMaterial({color:0xe7edff,metalness:1,roughness:.13});
 const shape=new THREE.Shape();const points=[];for(let i=0;i<16;i++){const a=i/16*Math.PI*2;const radius=i%2===0?1.8:.64;points.push(new THREE.Vector2(Math.cos(a)*radius,Math.sin(a)*radius));}
 // Bevelled, extruded spark: a simple geometric brand object, not a flat image.
 shape.moveTo(points[0].x,points[0].y);for(let i=1;i<points.length;i++)shape.lineTo(points[i].x,points[i].y);shape.closePath();
 const geometry=new THREE.ExtrudeGeometry(shape,{steps:1,depth:.5,bevelEnabled:true,bevelThickness:.15,bevelSize:.13,bevelSegments:5,curveSegments:20});geometry.center();const star=new THREE.Mesh(geometry,material);root.add(star);
 const ring=new THREE.Mesh(new THREE.TorusGeometry(2.3,.055,fallback?6:14,fallback?48:100),chrome);ring.rotation.set(1.01,.33,-.35);root.add(ring);
 const nucleus=new THREE.Mesh(new THREE.SphereGeometry(.23,fallback?12:24,fallback?8:18),chrome);nucleus.position.set(0,0,.48);root.add(nucleus);
 const satellites=[];const smallGeometry=new THREE.IcosahedronGeometry(.14,fallback?0:2);const cubeGeometry=new THREE.BoxGeometry(.24,.24,.24);for(let i=0;i<10;i++){const mesh=new THREE.Mesh(i%3===0?cubeGeometry:smallGeometry,i%2?chrome:material);root.add(mesh);satellites.push(mesh);}
 const light=new THREE.DirectionalLight(0xffffff,fallback?.9:4);light.position.set(3,5,8);scene.add(light);scene.add(new THREE.AmbientLight(0xd7e2ff,fallback?.65:1.1));
 let stage=0,frame=0,paused=fallback||reduce.matches,visible=true,alive=true,angle=0,currentScale=1,targetScale=1;let targetX=0,targetY=0;const pointer=matchMedia('(pointer: fine)');
 function onMove(e){if(paused||!pointer.matches)return;const r=host.getBoundingClientRect();targetY=(e.clientX-r.left)/r.width-.5;targetX=(e.clientY-r.top)/r.height-.5;}
 host.addEventListener('pointermove',onMove);host.addEventListener('pointerleave',()=>{targetX=targetY=0;});
 function placeObjects(){for(let i=0;i<satellites.length;i++){const a=i/satellites.length*Math.PI*2+angle*.3;let p;if(stage===1)p=new THREE.Vector3((i%3-1)*.48,Math.floor(i/3)*.45-.7,1.25);else if(stage===3)p=new THREE.Vector3(Math.cos(a)*2.05,Math.sin(a)*1.9,Math.sin(a*2)*.65);else p=new THREE.Vector3(Math.cos(a)*2.35,Math.sin(a)*1.48,Math.cos(a*2)*.7);satellites[i].position.copy(p);satellites[i].rotation.set(a,a*.7,0);satellites[i].scale.setScalar(stage===1?1.3:.75+(i%3)*.2);}}
 function draw(){if(!alive)return;frame=0;if(!paused&&visible&&!document.hidden){angle+=.004;root.rotation.y+=(.28+targetY*.32+Math.sin(angle)*.28-root.rotation.y)*.03;root.rotation.x+=(-.22+targetX*.18-root.rotation.x)*.035;root.rotation.z=-.17+Math.sin(angle*.65)*.06;star.rotation.z+=stage===3?.0018:.0005;currentScale+=(targetScale-currentScale)*.055;}else currentScale=targetScale;star.scale.setScalar(currentScale);nucleus.scale.setScalar(currentScale);ring.rotation.z=-.35+angle*.08;ring.visible=stage!==1;star.position.z=stage===1?-.5:0;placeObjects();renderer.render(scene,camera);if(fallback)renderer.domElement.style.backgroundColor='transparent';if(!paused&&visible&&!document.hidden)frame=requestAnimationFrame(draw);}
 function schedule(){if(!frame&&alive)frame=requestAnimationFrame(draw);}
 const observer=new ResizeObserver(()=>{const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.position.z=w<360?11.3:10.8;camera.updateProjectionMatrix();schedule();});observer.observe(host);
 const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else if(frame){cancelAnimationFrame(frame);frame=0;}});intersection.observe(host);
 function updateButton(){motionButton.hidden=fallback;motionButton.setAttribute('aria-pressed',String(paused));motionButton.setAttribute('aria-label',paused?'Play spark animation':'Pause spark animation');motionButton.textContent=paused?'▷':'Ⅱ';}
 motionButton.addEventListener('click',()=>{paused=!paused;updateButton();schedule();});reduce.addEventListener('change',e=>{paused=fallback||e.matches;updateButton();schedule();});document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule();});
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();alive=false;cancelAnimationFrame(frame);renderer.domElement.style.display='none';host.classList.remove('is-ready');motionButton.hidden=true;});
 host.classList.add('is-ready');updateButton();schedule();
 window.addEventListener('pageshow',e=>{if(e.persisted)schedule();});
 window.addEventListener('pagehide',e=>{if(e.persisted){cancelAnimationFrame(frame);frame=0;return;}alive=false;cancelAnimationFrame(frame);observer.disconnect();intersection.disconnect();geometry.dispose();smallGeometry.dispose();cubeGeometry.dispose();ring.geometry.dispose();nucleus.geometry.dispose();material.dispose();chrome.dispose();env?.dispose();renderer.dispose?.();});
 return next=>{stage=next;targetScale=next===1?.68:next===2?1.03:next===3?.82:1;schedule();};
}
