import _ from 'lodash';
import ThreeAmbientLight from '../three/objects/ThreeAmbientLight';
import ThreeGround from 'src/lib/three/objects/ThreeGround';
import ThreeRaycaster from '../three/utils/ThreeRaycaster';
import ThreeUnlitTexture from '../three/objects/ThreeUnlitTexture';
import ThreeVideoPlane from 'src/lib/three/objects/ThreeVideoPlane';
import XrThreeBase from 'src/lib/eighthwall/XrThreeBase';

const VIDEO_ELM_CLASSNAME = `.video-hoshino`;
const DECORATION_PATHES = [
  `/img/webar/mv/decorations/DOT.png`,
  `/img/webar/mv/decorations/FRAME_SMALL.png`,
  `/img/webar/mv/decorations/FRAME.png`,
  `/img/webar/mv/decorations/RING.png`,
  `/img/webar/mv/decorations/SQUARE_SMALL.png`,
  `/img/webar/mv/decorations/TRIANGLE_FILL.png`,
  `/img/webar/mv/decorations/TRIANGLE_FRAME.png`,
];

let threeAmbientLight;
let threeBase: XrThreeBase;
let threeGround: ThreeGround;
let threeVideoPlane: ThreeVideoPlane;
let threeLyricTex: ThreeUnlitTexture;

const threeDecorations: Array<ThreeUnlitTexture> = [];

const onStart = async () => {
  threeBase = new XrThreeBase();

  // Ambient Light
  threeAmbientLight = new ThreeAmbientLight();
  threeAmbientLight.addTo(threeBase.scene);

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
    texPath: `/img/webar/mv/lyrics/01_FILL.png`,
  });
  await threeLyricTex.init();
  threeLyricTex.obj.scale.set(1.2, 0.1, 1);
  //threeLyricTex.setScaleAspect(1.2);

  // decorations
  await Promise.all(
    _.map(DECORATION_PATHES, async (path) => {
      const texPlane = new ThreeUnlitTexture({
        texPath: path,
      });
      await texPlane.init();
      texPlane.obj.scale.set(0.5, 0.5, 1);
      threeDecorations.push(texPlane);
    })
  );

  // touchevent
  window.addEventListener(`touchstart`, (e) => {
    const raycaster = new ThreeRaycaster();
    const rayPos = raycaster.getRayIntersectPos(e, threeBase.camera, [threeGround.obj]);

    // first tap
    if (!threeVideoPlane.parent) {
      // video
      threeVideoPlane.play();
      threeVideoPlane.addTo(threeBase.scene);

      // lyric
      threeLyricTex.addTo(threeVideoPlane.obj);
      threeLyricTex.move(new THREE.Vector3(0, -0.5, 0.5));

      // decoration
      _.forEach(threeDecorations, (deco) => {
        deco.addTo(threeVideoPlane.obj);
        deco.move(new THREE.Vector3(_.random(-1, 1, true), _.random(0.2, 1, true), _.random(-1, 1, true)));
      });
    }

    // every tap
    threeVideoPlane.move(rayPos);
    threeVideoPlane.lookAtAxisY(threeBase.camera);
    _.forEach(threeDecorations, (deco) => {
      deco.move(new THREE.Vector3(_.random(-1, 1, true), _.random(0.2, 1, true), _.random(-1, 1, true)));
    });
  });
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
