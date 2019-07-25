import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import {Keypoint, Pose, PoseNet} from '@tensorflow-models/posenet';
import {DrawPose} from '@/Models/DrawPose';

export class PoseClassifier {
  private model: PoseNet | null = null;
  private drawPose: DrawPose | null = null;
  constructor() {
    // If running on Windows, there can be issues loading WebGL textures properly.
    // Running the following command solves this.
    tf.ENV.set('WEBGL_PACK', false);
  }

  public async Pose(image: HTMLImageElement, canvas: HTMLCanvasElement): Promise<Keypoint[] | null> {
    if (!this.model) {
      this.model = await posenet.load();
      this.drawPose = new DrawPose(canvas);
    }

    if (this.model) {
      const result: Pose = await this.model.estimateSinglePose(image);
      if (result) {
        this.drawPose!.Draw(result.keypoints);
        return result.keypoints;
      }
    }
    return null;
  }
}
