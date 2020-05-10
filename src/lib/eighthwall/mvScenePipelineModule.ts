import ThreeAmbientLight from '../three/objects/ThreeAmbientLight';
import ThreeGround from 'src/lib/three/objects/ThreeGround';
import ThreeRaycaster from '../three/utils/ThreeRaycaster';
import ThreeUnlitTexture from '../three/objects/ThreeUnlitTexture';
import ThreeVideoPlane from 'src/lib/three/objects/ThreeVideoPlane';
import XrThreeBase from 'src/lib/eighthwall/XrThreeBase';

const VIDEO_ELM_CLASSNAME = `.video-hoshino`;

let threeAmbientLight;
let threeBase: XrThreeBase;
let threeGround: ThreeGround;
let threeVideoPlane: ThreeVideoPlane;
let threeLyricTex: ThreeUnlitTexture;

const onStart = async () => {
  threeBase = new XrThreeBase();

  // Ground
  threeGround = new ThreeGround();
  threeGround.addTo(threeBase.scene);

  // Video
  threeVideoPlane = new ThreeVideoPlane({
    videoElClassName: VIDEO_ELM_CLASSNAME,
  });
  await threeVideoPlane.init();
  threeVideoPlane.setScaleAspect(1.0);

  // lyric
  threeLyricTex = new ThreeUnlitTexture({
    texPath: `/img/webar/mv/01_FILL.png`,
  });
  await threeLyricTex.init();
  threeLyricTex.obj.scale.set(1.2, 0.1, 1);
  //threeLyricTex.setScaleAspect(1.2);

  // touchevent
  window.addEventListener(`touchstart`, (e) => {
    const raycaster = new ThreeRaycaster();
    const rayPos = raycaster.getRayIntersectPos(e, threeBase.camera, [threeGround.obj]);
    threeVideoPlane.move(rayPos);
    threeVideoPlane.lookAtAxisY(threeBase.camera);

    if (!threeVideoPlane.parent) {
      threeVideoPlane.play();
      threeVideoPlane.addTo(threeBase.scene);

      threeLyricTex.addTo(threeVideoPlane.obj);
      threeLyricTex.move(new THREE.Vector3(0, -0.5, 0.5));
    }
  });

  // Ambient Light
  threeAmbientLight = new ThreeAmbientLight();
  threeAmbientLight.addTo(threeBase.scene);
};

const onUpdate = () => {
  console.log(`onUpdate`);
};

const mvScenePipelineModule = () => ({
  name: `MV`,
  onStart,
  onUpdate,
});
export default mvScenePipelineModule;
