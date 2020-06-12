/**
 * Three.js : 平行光
 */

import _ from 'lodash';
import ThreeObjectBase from 'src/lib/three/objects/base/ThreeObjectBase';

const CONFIG_DEFAULT: any = {
  color: 0xffffff,
  force: 1,
};

export default class ThreeDirectionalLight extends ThreeObjectBase {
  config: any;

  constructor(config = null) {
    super();
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
    this.init();
  }

  init() {
    this.obj = new THREE.DirectionalLight(this.config.color, this.config.force);
  }
}
