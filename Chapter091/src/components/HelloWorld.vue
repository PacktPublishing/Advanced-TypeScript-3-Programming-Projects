<template>
  <div class="container">
    <img crossorigin="anonymous" id="img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0ucPLLnB4Pu1kMEs2uRZISegG5W7Icsb7tq27blyry0gnYhVOfg" alt="Dog" ref="dogId" >
    <div class="row">
      <div class="col">
        <b-list-group>
          <b-list-group-item v-for="tensor in tensors" v-bind:key="tensor.className">
            {{ tensor.className }} - {{ tensor.probability }}
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import {ImageClassifier} from '@/Models/ImageClassifier';
  import {TensorInformation} from '@/Models/TensorInformation';

  @Component
export default class HelloWorld extends Vue {
  private readonly classifier: ImageClassifier = new ImageClassifier();
  private tensors: TensorInformation[] | null = null;

  constructor() {
    super();
    this.Classify();
  }
  public Classify(): void {
    this.$nextTick().then(async () => {
      /* tslint:disable:no-string-literal */
      const dog = this.$refs['dogId'];
      /* tslint:enable:no-string-literal */
      if (dog !== null && !this.tensors) {
        const image = dog as HTMLImageElement;
        this.tensors = await this.classifier.Classify(image);
      }
    });
  }
}
</script>
