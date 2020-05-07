/**
 * ビデオ板
 */

import _ from 'lodash';
import vertexShader from 'src/shaders/chromakey/chromakey.vert';
import fragmentShader from 'src/shaders/chromakey/chromakey.frag';
import ThreeObjectBase from './base/ThreeObjectBase';

const CONFIG_DEFAULT = {
  videoEl: document.querySelector(`video`),
  transparent: true,
  receiveShadow: true,
  difference: 0.7,
};

export default class ThreeVideoPlane extends ThreeObjectBase {
  config: any;

  constructor(config: any = null) {
    super();
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
  }

  init() {
    const geometory: any = new THREE.PlaneGeometry();

    const texture: any = new THREE.VideoTexture(this.config.videoEl);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    const material = new THREE.ShaderMaterial({
      uniforms: {
        texture: {
          value: texture,
        },
        difference: {
          value: this.config.difference,
        },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      DoubleSide: THREE.DoubleSide,
    });

    this.obj = new THREE.Mesh(geometory, material);
    this.obj.receiveShadow = this.config.receiveShadow;
  }

  setScaleVideoAspect(widthScale: number) {
    const aspectRatio = this.config.videoEl.videoHeight / this.config.videoEl.videoWidth;
    const scaleVec = new THREE.Vector3(widthScale, widthScale * aspectRatio, 1);
    this.obj.scale.copy(scaleVec);
  }
}
