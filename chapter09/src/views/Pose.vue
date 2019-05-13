<template>
  <div class="container">
    <div class="outsideWrapper">
      <div class="insideWrapper">
        <img crossorigin="anonymous" class="coveredImage" id="img" src="https://www.yogajournal.com/.image/t_share/MTQ3MTUyNzM1MjQ1MzEzNDg2/mountainhp2_292_37362_cmyk.jpg" width=1200 height=675 alt="Pose" ref="poseId" >
        <canvas ref="posecanvas" id="canvas"  class="coveringCanvas" width=1200 height=675></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import {PoseClassifier} from "@/Models/PoseClassifier";
  @Component
  export default class Pose extends Vue {
    @Prop() private msg!: string;
    private readonly classifier: PoseClassifier = new PoseClassifier();

    constructor() {
      super();
      this.Classify();
    }
    public Classify(): void {
      this.$nextTick().then(async () => {
        const pose = this.$refs["poseId"];
        const poseCanvas = this.$refs["posecanvas"];
        if (pose !== null) {
          const image: HTMLImageElement = pose as HTMLImageElement;
          const canvas: HTMLCanvasElement = poseCanvas as HTMLCanvasElement;
          await this.classifier.Pose(image, canvas);
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
    position:relative;}
  .coveredImage{
    width:100%; height:100%;
    position:absolute; top:0px; left:0px;
  }
  .coveringCanvas{
    width:100%; height:100%;
    position:absolute; top:0px; left:0px;
  }
</style>
