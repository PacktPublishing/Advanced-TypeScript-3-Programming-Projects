<template>
  <div class="container">
    <div class="outsideWrapper">
      <div class="insideWrapper">
        <img crossorigin="anonymous" class="coveredImage" id="img" src="https://www.yogajournal.com/.image/t_share/MTQ3MTUyNzM1MjQ1MzEzNDg2/mountainhp2_292_37362_cmyk.jpg" alt="Pose" ref="poseId" >
        <canvas ref="posecanvas" id="canvas" class="coveringCanvas" width="1200" height="675"></canvas>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <b-table striped hover :items="keypoints" :fields="fields"></b-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {PoseClassifier} from '@/Models/PoseClassifier';
  import {Keypoint} from '@tensorflow-models/posenet';
  @Component
  export default class Pose extends Vue {
    private readonly classifier: PoseClassifier = new PoseClassifier();
    private keypoints: Keypoint[] | null;
    private fields =
        {'score':
          { label: 'Confidence', sortable: true},
        'part':
          { label: 'Part', sortable: true},
        'position.x':
          {label:'X'},
        'position.y': {label: 'Y'}};

    constructor() {
      super();
      this.keypoints = null;
      this.Classify();
    }
    public Classify(): void {
      this.$nextTick().then(async () => {
        /* tslint:disable:no-string-literal */
        const pose = this.$refs['poseId'];
        const poseCanvas = this.$refs['posecanvas'];
        /* tslint:enable:no-string-literal */
        if (pose !== null) {
          const image: HTMLImageElement = pose as HTMLImageElement;
          const canvas: HTMLCanvasElement = poseCanvas as HTMLCanvasElement;
          this.keypoints = await this.classifier.Pose(image, canvas);
        }
      });
    }
  }
</script>

<style scoped>
  .outsideWrapper{
    width:1200px; height:675px;
  }
  .insideWrapper{
    width:100%; height:100%;
    position:relative;
  }
  .coveredImage{
    width:100%; height:100%;
    position:absolute;
    top:0;
    left:0;
  }
  .coveringCanvas{
    width:100%; height:100%;
    position:absolute;
    top:0;
    left:0;
  }
</style>
