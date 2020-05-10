import _ from 'lodash';
import ThreeUnlitTexture from '../../ThreeUnlitTexture';
import * as TWEEN from '@tweenjs/tween.js';

const CONFIG_DEFAULT = {
  texPath: `/img/logo.jpg`,
  isTransparent: true,
  isReceiveShadow: true,
};

export default class ThreeDecoration extends ThreeUnlitTexture {
  config: any;
  texture: any;

  constructor(config: any = null) {
    super(config);
    this.config = config ? _.assign(CONFIG_DEFAULT, config) : CONFIG_DEFAULT;
    console.log(TWEEN);
  }

  moveRandom = () => {
    console.log(TWEEN);
  };
}
