import XrThreeBase from 'src/lib/eighthwall/XrThreeBase';
import ThreeGround from 'src/lib/three/objects/ThreeGround';
import ThreeVideoPlane from 'src/lib/three/objects/ThreeVideoPlane';
import ThreeRaycaster from '../three/utils/ThreeRaycaster';
import ThreeAmbientLight from '../three/objects/ThreeAmbientLight';

const VIDEO_ELM_CLASSNAME = `.video-hoshino`;

let videoEl: any;
let threeBase: XrThreeBase;
let threeAmbientLight;
let threeGround: ThreeGround;
let threeVideoPlane: ThreeVideoPlane;

const onStart = () => {
  threeBase = new XrThreeBase();

  // Ground
  threeGround = new ThreeGround();
  threeGround.addTo(threeBase.scene);

  // Video
  videoEl = document.querySelector(VIDEO_ELM_CLASSNAME);
  threeVideoPlane = new ThreeVideoPlane({
    videoEl,
  });
  threeVideoPlane.init();

  // touchevent
  window.addEventListener(`touchstart`, (e) => {
    const raycaster = new ThreeRaycaster();
    const rayPos = raycaster.getRayIntersectPos(e, threeBase.camera, [threeGround.obj]);
    threeVideoPlane.move(rayPos);
    //threeVideoPlane.lookAtAxisY(threeBase.camera);

    if (!threeVideoPlane.parent) {
      videoEl.play();
      threeVideoPlane.setScaleVideoAspect(2);
      threeVideoPlane.addTo(threeBase.scene);
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
