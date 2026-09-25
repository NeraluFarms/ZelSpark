import * as THREE from 'three';

const canvas=document.querySelector('#journey-canvas');
if(canvas){
  const prefersReduced=matchMedia('(prefers-reduced-motion: reduce)');
  let renderer;
  try{renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});}catch{canvas.hidden=true;}
  if(renderer){
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    renderer.toneMapping=THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure=1.2;
    const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x080e1b,.022);
    const camera=new THREE.PerspectiveCamera(42,innerWidth/innerHeight,.1,130);
    const root=new THREE.Group();root.position.x=3.15;scene.add(root);
    const lime=new THREE.MeshStandardMaterial({color:0xdfff66,metalness:.42,roughness:.22,emissive:0x5d7a11,emissiveIntensity:.16});
    const chrome=new THREE.MeshStandardMaterial({color:0xb6d5f3,metalness:.85,roughness:.2});
    const blue=new THREE.MeshStandardMaterial({color:0x3965d9,metalness:.6,roughness:.35});
    const lineMat=new THREE.LineBasicMaterial({color:0x7799d3,transparent:true,opacity:.3});
    const starShape=new THREE.Shape();for(let i=0;i<16;i++){const a=i*Math.PI/8;const r=i%2?1.05:2.4;const x=Math.sin(a)*r,y=Math.cos(a)*r;i?starShape.lineTo(x,y):starShape.moveTo(x,y);}starShape.closePath();
    const starGeo=new THREE.ExtrudeGeometry(starShape,{depth:.72,bevelEnabled:true,bevelThickness:.22,bevelSize:.16,bevelSegments:3});starGeo.center();
    const star=new THREE.Mesh(starGeo,lime);star.rotation.set(.12,-.35,.24);root.add(star);
    const ringGeo=new THREE.TorusGeometry(3.65,.035,8,128);const ring=new THREE.Mesh(ringGeo,chrome);ring.rotation.set(.95,.1,.3);root.add(ring);
    const secondRing=new THREE.Mesh(new THREE.TorusGeometry(4.65,.012,6,128),lineMat);secondRing.rotation.set(-.65,.2,-.65);root.add(secondRing);
    const nucleus=new THREE.Mesh(new THREE.IcosahedronGeometry(.35,2),chrome);nucleus.position.z=.7;root.add(nucleus);
    const shards=[];for(let i=0;i<34;i++){const geometry=i%3===0?new THREE.BoxGeometry(.32,.32,.32):new THREE.TetrahedronGeometry(.2+i%5*.06);const mesh=new THREE.Mesh(geometry,i%4===0?lime:i%3===0?blue:chrome);const a=i*2.39996,r=3.4+(i%7)*.45;mesh.userData={a,r,z:(i%9-4)*.52};root.add(mesh);shards.push(mesh);}
    const frames=new THREE.Group();scene.add(frames);
    for(let i=0;i<9;i++){const frame=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(11+i*.4,8+i*.25,.1)),new THREE.LineBasicMaterial({color:i%2?0x28588d:0x7597ca,transparent:true,opacity:.10-i*.006}));frame.position.set(3.15,0,-8-i*4.3);frame.rotation.z=i*.11;frames.add(frame);}
    const starsGeo=new THREE.BufferGeometry();const points=[];for(let i=0;i<260;i++){const a=i*2.39996,r=3+Math.sqrt(i/260)*42;points.push(Math.sin(a)*r,(Math.cos(a*1.31)*.5)*r, -5-(i%41)*1.7);}starsGeo.setAttribute('position',new THREE.Float32BufferAttribute(points,3));const stars=new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0xaed0ff,size:.045,transparent:true,opacity:.65,sizeAttenuation:true}));scene.add(stars);
    scene.add(new THREE.AmbientLight(0x8da9e2,1.4));const key=new THREE.PointLight(0xe5ff84,120,28);key.position.set(5,4,8);scene.add(key);const rim=new THREE.PointLight(0x427aff,130,40);rim.position.set(-3,-4,-4);scene.add(rim);
    const sections=[...document.querySelectorAll('[data-journey]')];let target=0,smooth=0,raf=0,visible=true;
    const mobile=()=>innerWidth<700;
    function resize(){renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();schedule();}
    function onScroll(){let index=0;for(let i=0;i<sections.length;i++){if(sections[i].getBoundingClientRect().top<innerHeight*.6)index=i;}const current=sections[index],next=sections[Math.min(index+1,sections.length-1)];const distance=Math.max(1,next.offsetTop-current.offsetTop);target=Math.min(5,index+Math.max(0,Math.min(1,(scrollY-current.offsetTop+innerHeight*.6)/distance)));schedule();}
    function render(){raf=0;if(!visible||document.hidden)return;smooth+=(target-smooth)*(prefersReduced.matches?1:.045);const t=smooth;const time=performance.now()*.001;camera.position.set(Math.sin(t*.48)*2.1,Math.sin(t*.8)*.85,17.5-t*.55+(mobile()?8:0));camera.lookAt(mobile()?2.6:1.4,0,-1-t*.3);root.position.set((mobile()?2.7:3.15)+Math.sin(t*.7)*.9,Math.cos(t*1.2)*.4,-t*.22);root.rotation.set(t*.1,t*.3,Math.sin(t)*.15);if(!prefersReduced.matches){root.rotation.y+=Math.sin(time*.35)*.12;star.rotation.z=time*.08;ring.rotation.z=time*.045;secondRing.rotation.z=-time*.025;stars.rotation.z=time*.0015;}
      for(let i=0;i<shards.length;i++){const m=shards[i],{a,r,z}=m.userData,phase=a+t*.45+(prefersReduced.matches?0:time*.04);m.position.set(Math.sin(phase)*r,Math.cos(phase)*r*.7,z+Math.sin(t+i*.3)*.4);m.rotation.set(phase*.6,phase*.9,i*.4);}
      lime.emissiveIntensity=.15+Math.max(0,Math.sin(t*1.6))*.16;key.intensity=115+Math.sin(t*1.2)*28;renderer.render(scene,camera);if(!prefersReduced.matches||Math.abs(target-smooth)>.002)raf=requestAnimationFrame(render);}
    function schedule(){if(!raf&&visible)raf=requestAnimationFrame(render);}
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else if(raf){cancelAnimationFrame(raf);raf=0;}},{threshold:0});observer.observe(document.querySelector('.journey-site'));
    addEventListener('resize',resize);addEventListener('scroll',onScroll,{passive:true});prefersReduced.addEventListener('change',schedule);document.addEventListener('visibilitychange',schedule);resize();onScroll();
    addEventListener('pagehide',()=>{cancelAnimationFrame(raf);observer.disconnect();starGeo.dispose();ringGeo.dispose();starsGeo.dispose();renderer.dispose();},{once:true});
  }
}
