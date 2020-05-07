export default class XrThreeBase {
  renderer: any;
  scene: any;
  camera: any;

  constructor() {
    this.init();
  }

  init() {
    this.initRenderer();
    this.initScene();
    this.initCamera();
  }

  initRenderer() {
    this.renderer = XR8.Threejs.xrScene().renderer;
  }

  initScene() {
    this.scene = XR8.Threejs.xrScene().scene;
  }

  initCamera() {
    this.camera = XR8.Threejs.xrScene().camera;
  }
}
