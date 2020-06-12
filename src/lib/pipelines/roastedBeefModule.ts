import ThreeAmbientLight from '../three/objects/ThreeAmbientLight';
import ThreeDirectionalLight from '../three/objects/ThreeDirectionalLight';
import ThreeRaycaster from '../three/utils/ThreeRaycaster';
import ThreeGround from '../three/objects/ThreeGround';
import ThreeModel from '../three/objects/ThreeModel';

const modelPath = `/models/foods/roastedbeef.glb`;
let threeModelRoastedBeef: ThreeModel;
let threeAmbientLight: ThreeAmbientLight;
let threeDirectionalLight: ThreeDirectionalLight;
let threeGround: ThreeGround;

const roastedBeefModule = () => ({
  name: `roastedBeef`,

  onBeforeRun: async () => {
    threeModelRoastedBeef = new ThreeModel({ modelPath });
    await threeModelRoastedBeef.init();
  },

  onStart: () => {
    const { scene, camera, renderer } = XR8.Threejs.xrScene();
    renderer.shadowMap.enabled = true;

    // Ambient Light
    threeAmbientLight = new ThreeAmbientLight({
      force: 2,
    });
    threeAmbientLight.addTo(scene);

    // Directional Light
    threeDirectionalLight = new ThreeDirectionalLight({
      force: 2,
    });
    threeDirectionalLight.addTo(scene);
    threeDirectionalLight.rotateOnAxis(new THREE.Vector3(1, 0, 0), 20);

    threeGround = new ThreeGround();
    threeGround.addTo(scene);

    // touchevent
    window.addEventListener(`touchstart`, (e) => {
      const raycaster = new ThreeRaycaster();
      const rayPos = raycaster.getRayIntersectPos(e, camera, [threeGround.obj]);
      threeModelRoastedBeef.move(rayPos);

      if (!threeModelRoastedBeef.parent) {
        threeModelRoastedBeef.addTo(scene);
        threeModelRoastedBeef.setScale(0.002);
      }
    });
  },
});
export default roastedBeefModule;
