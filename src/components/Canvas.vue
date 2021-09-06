<template>
  <div>
      <canvas ref="img_canvas"/>
      <canvas ref="img_canvas_decode"/>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted, onUnmounted, watch } from 'vue'
import drawCanvas from './canvasEncode'
import drawCanvasDecode from './canvasDecode'

export default defineComponent({
  setup() {
    // Ref to canvas and window size
    const img_canvas = ref(null)
    const img_canvas_decode = ref(null)
    const windowSize = ref(window.innerWidth)

    onMounted(() => {
      drawCanvas(img_canvas)
      drawCanvasDecode(img_canvas_decode)
      window.addEventListener('resize', () => { windowSize.value = window.innerWidth })
    })

    onUnmounted(() => {
      window.removeEventListener('resize', () => { windowSize.value = window.innerWidth })
    })

    // Use ref and event to redraw canvas on change
    watch(windowSize, () => {
      //drawCanvas(img_canvas, img_wrapper)
      //drawCanvasDecode(img_canvas_decode, img_wrapper_decode)
    })

    return {
      img_canvas,
      img_canvas_decode
    }
  },
})
</script>

<style scoped>
.wrapper {
  width: 100%;
}
canvas {
  max-width: 100%;
}
</style>