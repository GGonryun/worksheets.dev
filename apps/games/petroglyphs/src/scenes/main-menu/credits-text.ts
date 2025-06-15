import { ElementDepths } from '../combat/constants';
import { absorbFunction, PortalController } from '../portal/portal';

export class CreditsText extends Phaser.GameObjects.Text {
  portal: PortalController;
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    portal: PortalController
  ) {
    super(scene, x, y, 'a match-3 game by amodestduck', {
      fontSize: '18px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
    });
    this.setOrigin(0.5, 0.5);
    this.setDepth(ElementDepths.BACKGROUND);
    this.portal = portal;
  }

  absorb() {
    absorbFunction(this.scene, {
      object: this,
      point: this.portal.point,
    });
  }
}
