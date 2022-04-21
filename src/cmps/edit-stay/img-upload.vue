<template>
  <div class="images-display-container">
    <template v-if="!isLoading">
      <label
        v-for="(img, idx) in imgUrls"
        :key="idx"
        for="imgUploader"
        @drop.prevent="handleFile($event, img)"
        @dragover.prevent="dragOver"
        @dragleave="isDragOver = false"
        @click="savePrevImg(img)"
        :class="{ drag: isDragOver, 'not-drag': !isDragOver }"
      >
        <transition name="fade" mode="out-in">
          <img alt="Drop images here" :key="idx" :src="img" />
        </transition>
      </label>
      <input
        class="upload-input"
        type="file"
        name="img-uploader"
        id="imgUploader"
        @change="handleFile($event, prevImg)"
      />
    </template>
  </div>
</template>

<script>
import { uploadImg } from '../../services/img.upload.service.js';
export default {
  name: 'img-upload',
  props: { imgUrls: Array },
  data() {
    return {
      isLoading: false,
      isDragOver: false,
      prevImg: '',
    };
  },
  methods: {
    dragOver(ev) {
      this.isDragOver = true;
    },

    savePrevImg(img) {
      this.prevImg = img;
    },

    handleFile(ev, prevImg) {
      let file;
      if (ev.type === 'change') file = ev.target.files[0];
      else if (ev.type === 'drop') file = ev.dataTransfer.files[0];
      this.onUploadImg(prevImg, file);
    },

    async onUploadImg(prevImg, file) {
      this.isLoading = true;
      this.isDragOver = false;
      const res = await uploadImg(file);
      const newImg = res.url;
      this.$emit('imagesUpdated', {
        newImg,
        prevImg,
      });
      this.isLoading = false;
    },
  },
  computed: {},
};
</script>
