import ThreeAmbientLight from '../three/objects/ThreeAmbientLight';
import ThreeDirectionalLight from '../three/objects/ThreeDirectionalLight';

const url = `/models/foods/roastedbeef.glb`;

const loadGltf = (url: string) =>
  new Promise((resolve) => {
    new THREE.GLTFLoader().load(url, (gltf: object) => {
      resolve(gltf);
    });
  });

let model: any;
let threeAmbientLight: ThreeAmbientLight;
let threeDirectionalLight: ThreeDirectionalLight;

const roastedBeefModule = () => ({
  name: `roastedBeef`,

  onBeforeRun: async () => {
    model = await loadGltf(url);
    console.log(model);
  },

  onStart: () => {
    const { scene } = XR8.Threejs.xrScene();

    // model
    scene.add(model.scene);

    // Ambient Light
    threeAmbientLight = new ThreeAmbientLight();
    threeAmbientLight.addTo(scene);

    // Directional Light
    threeDirectionalLight = new ThreeDirectionalLight();
    threeDirectionalLight.addTo(scene);
  },
});
export default roastedBeefModule;
