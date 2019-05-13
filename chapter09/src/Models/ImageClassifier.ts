import * as mobilenet from '@tensorflow-models/mobilenet';
import {MobileNet} from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import {TensorInformation} from '@/Models/TensorInformation';

export class ImageClassifier {
  private model: MobileNet | null = null;

  constructor() {
    // If running on Windows, there can be issues loading WebGL textures properly.
    // Running the following command solves this.
    tf.ENV.set('WEBGL_PACK', false);
  }
  public async Classify(image: tf.Tensor3D | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement):
      Promise<TensorInformation[] | null> {
    if (!this.model) {
      this.model = await mobilenet.load();
    }

    if (this.model) {
      const result = await this.model.classify(image);
      return {
        ...result,
      };
    }
    return null;
  }
}
