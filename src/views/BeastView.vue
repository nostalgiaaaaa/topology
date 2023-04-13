<template>
  <div id="canvas-div" class="canvas-wrap">
    <canvas class="canvas" ref="canvasRef"></canvas>
  </div>
  <!-- <button @click="addChild()">자식 추가</button> -->
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import beastLogo from '@/assets/logo.svg'

let canvas: HTMLCanvasElement | undefined
let ctx: CanvasRenderingContext2D | null | undefined
const canvasRef = ref<HTMLCanvasElement>()
let canvasWidth = 0
let canvasHeight = 0
let cx = 0
let cy = 0
let raf: number = 0
let linkOpacity = 1
let linkDown = true

let logo = new Image()
logo.src = beastLogo
const originalWidth = logo.width
const originalHeight = logo.height

onMounted(() => {
  canvas = canvasRef.value
  ctx = canvas?.getContext('2d')
  const dom = document.getElementById(`canvas-div`)
  if (!ctx || !canvas || !dom) {
    return
  }

  canvasWidth = dom.clientWidth
  canvasHeight = dom.clientHeight
  cx = canvasWidth / 2
  cy = canvasHeight / 2
  canvas.style.height = canvasHeight.toString() + 'px'
  const dpr = window.devicePixelRatio
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)

  render()

  //   window.addEventListener('resize', resize)
})

onUnmounted(() => {
  window.cancelAnimationFrame(raf)
})

const resize = () => {
  const dom = document.getElementById(`canvas-div`)
  if (!ctx || !canvas || !dom) {
    return
  }
  canvasWidth = dom.clientWidth
  canvasHeight = dom.clientHeight
  cx = canvasWidth / 2
  cy = canvasHeight / 2
  canvas.style.height = canvasHeight.toString() + 'px'
  const dpr = window.devicePixelRatio
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr)
}

const render = () => {
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = '#02172c'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
  }
  drawLine()
  drawApi()
  drawApi2()
  drawApi3()
  drawApi3_1()
  drawApi4()
  drawApi4_1()
  drawLogo()
  drawWall()
  raf = window.requestAnimationFrame(render)
}

const drawWall = () => {
  if (ctx && canvas) {
    ctx.fillStyle = '#02172c'
    ctx.fillRect(0, 0, cx / 3, canvasHeight)

    ctx.fillRect(cx + (cx * 2) / 3, 0, cx / 3, canvasHeight)

    ctx.fillRect(cx / 3, cy, cx / 3, cy / 3)

    ctx.fillRect(cx / 3, (cy * 3) / 2, cx / 8, cy / 3)

    ctx.fillRect((cx * 4) / 3, cy / 4, cx / 3, cy / 3)

    ctx.fillRect((cx * 3) / 2, (cy * 4) / 3, cx / 3, cy / 3)
  }
}

const drawLogo = () => {
  if (canvas && ctx) {
    ctx.strokeStyle = '#fff'
    ctx.fillStyle = '#21aba5'
    ctx.lineWidth = 12
    ctx.beginPath()
    // ctx.fillRect(cx - 100, cy - 50, 200, 100)
    ctx.setLineDash([])
    ctx.moveTo(cx - 80, cy - 50)
    ctx.ellipse(cx + 80, cy - 30, 20, 20, (Math.PI / 2) * 3, 0, Math.PI / 2)
    ctx.ellipse(cx + 80, cy + 30, 20, 20, (Math.PI / 2) * 4, 0, Math.PI / 2)
    ctx.ellipse(cx - 80, cy + 30, 20, 20, Math.PI / 2, 0, Math.PI / 2)
    ctx.ellipse(cx - 80, cy - 30, 20, 20, (Math.PI / 2) * 6, 0, Math.PI / 2)
    ctx.stroke()
    ctx.fill()
    ctx.closePath()
    ctx.beginPath()
    const logoWidth = 150
    const logoHeight = originalHeight * (logoWidth / originalWidth)
    ctx.drawImage(logo, cx - logoWidth / 2, cy - logoHeight / 2, logoWidth, logoHeight)
    ctx.fill()
    ctx.closePath()
  }
}

const drawLine = () => {
  if (canvas && ctx) {
    ctx.setLineDash([])
    ctx.strokeStyle = 'rgb(200, 200, 200)'
    ctx.lineWidth = 2
    ctx.beginPath()
    //
    ctx.moveTo(cx, cy)
    ctx.lineTo((cx * 2) / 3, cy / 2)
    ctx.lineTo(cx / 3, cy / 2)

    ctx.moveTo(cx, cy)
    ctx.lineTo(cx / 5 + cx, cy / 3)
    ctx.lineTo((cx * 2) / 3 + cx, cy / 3)
    //
    ctx.moveTo(cx, cy)
    ctx.lineTo((cx * 3) / 4, (cy * 6) / 5)
    ctx.lineTo(cx / 3, (cy * 6) / 5)

    ctx.moveTo(cx, cy)
    ctx.lineTo((cx * 5) / 4, (cy * 4) / 5)
    ctx.lineTo((cx * 2) / 3 + cx, (cy * 4) / 5)
    //
    ctx.moveTo(cx, cy)
    ctx.lineTo((cx * 3) / 4, (cy * 2) / 3 + cy)
    ctx.lineTo(cx / 3, (cy * 2) / 3 + cy)
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx / 3 + cx, cy / 2 + cy)
    ctx.lineTo((cx * 3) / 4 + cx, cy / 2 + cy)
    ctx.stroke()
    ctx.closePath()
  }
}
let pos = 0
const gap = 10
const gap2 = 20
const drawApi = () => {
  if (canvas && ctx) {
    // if (linkDown) linkOpacity = linkOpacity - 0.01
    // else linkOpacity = linkOpacity + 0.01
    // if (linkOpacity <= 0) {
    //   linkDown = !linkDown
    //   linkOpacity = 0
    // }
    // if (linkOpacity > 1) {
    //   linkDown = !linkDown
    //   linkOpacity = 1
    // }

    if (pos > 900) {
      pos = 0
    }

    ctx.setLineDash([15, 45])
    ctx.strokeStyle = `rgba(33,171,165,${linkOpacity})`
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.beginPath()
    //
    ctx.moveTo(cx / 3 - pos, cy / 2 - gap)
    ctx.lineTo((cx * 2) / 3, cy / 2 - gap)
    ctx.lineTo(cx, cy - gap)

    ctx.moveTo(cx / 3 - pos + 30, cy / 2 + gap)
    ctx.lineTo((cx * 2) / 3, cy / 2 + gap)
    ctx.lineTo(cx, cy + gap)

    ctx.moveTo((cx * 2) / 3 + cx + pos, cy / 3 - gap)
    ctx.lineTo(cx / 5 + cx, cy / 3 - gap)
    ctx.lineTo(cx, cy - gap)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 30, cy / 3 + gap)
    ctx.lineTo(cx / 5 + cx, cy / 3 + gap)
    ctx.lineTo(cx, cy + gap)
    //
    ctx.moveTo(cx / 3 - pos, (cy * 6) / 5 - gap)
    ctx.lineTo((cx * 3) / 4, (cy * 6) / 5 - gap)
    ctx.lineTo(cx, cy - gap)

    ctx.moveTo(cx / 3 - pos + 30, (cy * 6) / 5 + gap)
    ctx.lineTo((cx * 3) / 4, (cy * 6) / 5 + gap)
    ctx.lineTo(cx, cy + gap)

    ctx.moveTo((cx * 2) / 3 + cx + pos, (cy * 4) / 5 - gap)
    ctx.lineTo((cx * 5) / 4, (cy * 4) / 5 - gap)
    ctx.lineTo(cx, cy - gap)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 30, (cy * 4) / 5 + gap)
    ctx.lineTo((cx * 5) / 4, (cy * 4) / 5 + gap)
    ctx.lineTo(cx, cy + gap)
    //

    ctx.moveTo(cx / 3 - pos, (cy * 2) / 3 + cy - gap)
    ctx.lineTo((cx * 3) / 4, (cy * 2) / 3 + cy - gap)
    ctx.lineTo(cx, cy - gap)

    ctx.moveTo(cx / 3 - pos + 30, (cy * 2) / 3 + cy + gap)
    ctx.lineTo((cx * 3) / 4, (cy * 2) / 3 + cy + gap)
    ctx.lineTo(cx, cy + gap)

    ctx.moveTo((cx * 2) / 3 + cx + pos, cy / 2 + cy - gap)
    ctx.lineTo(cx / 3 + cx, cy / 2 + cy - gap)
    ctx.lineTo(cx, cy - gap)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 30, cy / 2 + cy + gap)
    ctx.lineTo(cx / 3 + cx, cy / 2 + cy + gap)
    ctx.lineTo(cx, cy + gap)
    ctx.stroke()
    ctx.closePath()
    pos += 1
  }
}

const drawApi2 = () => {
  if (canvas && ctx) {
    ctx.setLineDash([5, 175])
    ctx.strokeStyle = `rgba(255,153,78,${linkOpacity})`
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.beginPath()
    //
    ctx.moveTo(cx / 3 - pos - 85, cy / 2 - gap2)
    ctx.lineTo((cx * 2) / 3, cy / 2 - gap2)
    ctx.lineTo(cx, cy - gap2)

    ctx.moveTo(cx / 3 - pos + 5, cy / 2 + gap2)
    ctx.lineTo((cx * 2) / 3, cy / 2 + gap2)
    ctx.lineTo(cx, cy + gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 85, cy / 3 - gap2)
    ctx.lineTo(cx / 5 + cx, cy / 3 - gap2)
    ctx.lineTo(cx, cy - gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos - 5, cy / 3 + gap2)
    ctx.lineTo(cx / 5 + cx, cy / 3 + gap2)
    ctx.lineTo(cx, cy + gap2)
    //
    ctx.moveTo(cx / 3 - pos - 85, (cy * 6) / 5 - gap2)
    ctx.lineTo((cx * 3) / 4, (cy * 6) / 5 - gap2)
    ctx.lineTo(cx, cy - gap2)

    ctx.moveTo(cx / 3 - pos + 5, (cy * 6) / 5 + gap2)
    ctx.lineTo((cx * 3) / 4, (cy * 6) / 5 + gap2)
    ctx.lineTo(cx, cy + gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 85, (cy * 4) / 5 - gap2)
    ctx.lineTo((cx * 5) / 4, (cy * 4) / 5 - gap)
    ctx.lineTo(cx, cy - gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos - 5, (cy * 4) / 5 + gap2)
    ctx.lineTo((cx * 5) / 4, (cy * 4) / 5 + gap)
    ctx.lineTo(cx, cy + gap2)
    //

    ctx.moveTo(cx / 3 - pos - 85, (cy * 2) / 3 + cy - gap2)
    ctx.lineTo((cx * 3) / 4, (cy * 2) / 3 + cy - gap2)
    ctx.lineTo(cx, cy - gap2)

    ctx.moveTo(cx / 3 - pos + 5, (cy * 2) / 3 + cy + gap2)
    ctx.lineTo((cx * 3) / 4, (cy * 2) / 3 + cy + gap2)
    ctx.lineTo(cx, cy + gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 85, cy / 2 + cy - gap2)
    ctx.lineTo(cx / 3 + cx, cy / 2 + cy - gap2)
    ctx.lineTo(cx, cy - gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos - 5, cy / 2 + cy + gap2)
    ctx.lineTo(cx / 3 + cx, cy / 2 + cy + gap2)
    ctx.lineTo(cx, cy + gap2)
    ctx.stroke()
    ctx.closePath()
  }
}

const drawApi3 = () => {
  if (canvas && ctx) {
    ctx.setLineDash([10, 170])
    ctx.strokeStyle = `rgba(255,224,61,${linkOpacity})`
    ctx.lineWidth = 10
    ctx.lineCap = 'butt'
    ctx.beginPath()
    //
    ctx.moveTo(cx / 3 - pos - 27, cy / 2 - gap2)
    ctx.lineTo((cx * 2) / 3, cy / 2 - gap2)
    ctx.lineTo(cx, cy - gap2)

    ctx.moveTo((cx * 2) / 5 + cx + pos + 17, cy / 3 - gap2)
    ctx.lineTo(cx / 5 + cx, cy / 3 - gap2)
    ctx.lineTo(cx, cy - gap2)

    //
    ctx.moveTo(cx / 3 - pos - 27, (cy * 6) / 5 - gap2)
    ctx.lineTo((cx * 3) / 4, (cy * 6) / 5 - gap2)
    ctx.lineTo(cx, cy - gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 27, (cy * 4) / 5 - gap2)
    ctx.lineTo((cx * 5) / 4, (cy * 4) / 5 - gap2)
    ctx.lineTo(cx, cy - gap2)

    //

    ctx.moveTo(cx / 3 - pos - 27, (cy * 2) / 3 + cy - gap2)
    ctx.lineTo((cx * 3) / 4, (cy * 2) / 3 + cy - gap2)
    ctx.lineTo(cx, cy - gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 27, cy / 2 + cy - gap2)
    ctx.lineTo(cx / 3 + cx, cy / 2 + cy - gap2)
    ctx.lineTo(cx, cy - gap2)

    ctx.stroke()
    ctx.closePath()
  }
}

const drawApi3_1 = () => {
  if (canvas && ctx) {
    ctx.setLineDash([8, 172])
    ctx.strokeStyle = `rgba(2,23,44,1)`
    ctx.lineWidth = 8
    ctx.lineCap = 'butt'
    ctx.beginPath()
    //
    ctx.moveTo(cx / 3 - pos - 26, cy / 2 - gap2)
    ctx.lineTo((cx * 2) / 3, cy / 2 - gap2)
    ctx.lineTo(cx, cy - gap2)

    ctx.moveTo((cx * 2) / 5 + cx + pos + 16, cy / 3 - gap2)
    ctx.lineTo(cx / 5 + cx, cy / 3 - gap2)
    ctx.lineTo(cx, cy - gap2)

    //
    ctx.moveTo(cx / 3 - pos - 26, (cy * 6) / 5 - gap2)
    ctx.lineTo((cx * 3) / 4, (cy * 6) / 5 - gap2)
    ctx.lineTo(cx, cy - gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 26, (cy * 4) / 5 - gap2)
    ctx.lineTo((cx * 5) / 4, (cy * 4) / 5 - gap2)
    ctx.lineTo(cx, cy - gap2)

    //

    ctx.moveTo(cx / 3 - pos - 26, (cy * 2) / 3 + cy - gap2)
    ctx.lineTo((cx * 3) / 4, (cy * 2) / 3 + cy - gap2)
    ctx.lineTo(cx, cy - gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 26, cy / 2 + cy - gap2)
    ctx.lineTo(cx / 3 + cx, cy / 2 + cy - gap2)
    ctx.lineTo(cx, cy - gap2)

    ctx.stroke()
    ctx.closePath()
  }
}

const drawApi4 = () => {
  if (canvas && ctx) {
    ctx.setLineDash([0, 180])
    ctx.strokeStyle = `rgba(255,78,99,${linkOpacity})`
    ctx.lineWidth = 10
    ctx.lineCap = 'round'
    ctx.beginPath()
    //
    ctx.moveTo(cx / 3 - pos - 112, cy / 2 + gap2)
    ctx.lineTo((cx * 2) / 3, cy / 2 + gap2)
    ctx.lineTo(cx, cy + gap2)

    ctx.moveTo((cx * 2) / 5 + cx + pos + 102, cy / 3 + gap2)
    ctx.lineTo(cx / 5 + cx, cy / 3 + gap2)
    ctx.lineTo(cx, cy + gap2)
    //
    ctx.moveTo(cx / 3 - pos - 112, (cy * 6) / 5 + gap2)
    ctx.lineTo((cx * 3) / 4, (cy * 6) / 5 + gap2)
    ctx.lineTo(cx, cy + gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 112, (cy * 4) / 5 + gap2)
    ctx.lineTo((cx * 5) / 4, (cy * 4) / 5 + gap2)
    ctx.lineTo(cx, cy + gap2)
    //
    ctx.moveTo(cx / 3 - pos - 112, (cy * 2) / 3 + cy + gap2)
    ctx.lineTo((cx * 3) / 4, (cy * 2) / 3 + cy + gap2)
    ctx.lineTo(cx, cy + gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 112, cy / 2 + cy + gap2)
    ctx.lineTo(cx / 3 + cx, cy / 2 + cy + gap2)
    ctx.lineTo(cx, cy + gap2)

    ctx.stroke()
    ctx.closePath()
  }
}

const drawApi4_1 = () => {
  if (canvas && ctx) {
    ctx.setLineDash([0, 180])
    ctx.strokeStyle = `rgba(2,23,44,1)`
    ctx.lineWidth = 7
    ctx.lineCap = 'round'
    ctx.beginPath()
    //
    ctx.moveTo(cx / 3 - pos - 112, cy / 2 + gap2)
    ctx.lineTo((cx * 2) / 3, cy / 2 + gap2)
    ctx.lineTo(cx, cy + gap2)

    ctx.moveTo((cx * 2) / 5 + cx + pos + 102, cy / 3 + gap2)
    ctx.lineTo(cx / 5 + cx, cy / 3 + gap2)
    ctx.lineTo(cx, cy + gap2)
    //
    ctx.moveTo(cx / 3 - pos - 112, (cy * 6) / 5 + gap2)
    ctx.lineTo((cx * 3) / 4, (cy * 6) / 5 + gap2)
    ctx.lineTo(cx, cy + gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 112, (cy * 4) / 5 + gap2)
    ctx.lineTo((cx * 5) / 4, (cy * 4) / 5 + gap2)
    ctx.lineTo(cx, cy + gap2)
    //
    ctx.moveTo(cx / 3 - pos - 112, (cy * 2) / 3 + cy + gap2)
    ctx.lineTo((cx * 3) / 4, (cy * 2) / 3 + cy + gap2)
    ctx.lineTo(cx, cy + gap2)

    ctx.moveTo((cx * 2) / 3 + cx + pos + 112, cy / 2 + cy + gap2)
    ctx.lineTo(cx / 3 + cx, cy / 2 + cy + gap2)
    ctx.lineTo(cx, cy + gap2)

    ctx.stroke()
    ctx.closePath()
  }
}
</script>

<style>
.canvas-wrap {
  width: 100%;
  height: 80%;
  margin: 0;
  padding: 0;
}
.canvas {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
