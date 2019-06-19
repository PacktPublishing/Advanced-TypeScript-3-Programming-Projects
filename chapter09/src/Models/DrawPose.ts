import {Keypoint} from '@tensorflow-models/posenet';

export class DrawPose {
  constructor(private canvas: HTMLCanvasElement, private context = canvas.getContext('2d')) {
    this.context!.clearRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
    this.context!.fillStyle = '#ff0300';
  }

  public Draw(keys: Keypoint[]): void {
    keys.forEach((kp: Keypoint) => {
      this.context!.fillRect(kp.position.x - 2.5, kp.position.y - 2.5, 5, 5);
    });
  }
}
