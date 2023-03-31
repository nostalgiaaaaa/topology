<template>
  <div id="canvas-div" class="canvas-wrap">
    <canvas class="canvas" ref="canvasRef"></canvas>
  </div>
  <button @click="addSystem()">시스템 추가</button>
  <!-- <button @click="addChild()">자식 추가</button> -->
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Model } from '@/abstract/model'
import { System } from '@/abstract/system'

let selectedModel: Model | undefined
let selectedKey = -1
const rootArray: Model[] = []

const canvasRef = ref<HTMLCanvasElement>()

let canvas: HTMLCanvasElement | undefined
let ctx: CanvasRenderingContext2D | null | undefined
const MEGE_MIN_WIDTH = 20
let canvasWidth = 0
let canvasHeight = 0
let raf: number = 0
let prevMouseX = 0
let prevMouseY = 0

const addSystem = () => {
  const newModal = new System({
    x: 0,
    y: 0,
    state: true,
    isSelected: false
  })
  rootArray.push(newModal)
  rootArray.forEach((model, idx) => {
    if (ctx && canvas) {
      const interval = canvasWidth / (rootArray.length + 1)
      model.setPosition(idx, interval, canvasHeight)
    }
  })
}

const addChild = () => {
  rootArray.forEach((model, idx) => {
    const newModal = new System({
      x: 0,
      y: 0,
      state: true,
      isSelected: false
    })
    newModal.modelType.y = model.modelType.y + 100
    model.child.push(newModal)

    const interval = canvasWidth / (rootArray.length + 1)
    // model.child.forEach((child, idx) => {
    //   child.setChildPosition(count, idx, model.modelType.x, model.modelType.y);
    // });
    model.setPosition(idx, interval, canvasHeight)
  })
}

onMounted(() => {
  canvas = canvasRef.value
  ctx = canvas?.getContext('2d')
  const dom = document.getElementById(`canvas-div`)
  if (!ctx || !canvas || !dom) {
    return
  }

  canvasWidth = dom.offsetWidth
  canvasHeight = dom.offsetHeight
  canvas.style.width = `${canvasWidth}px`
  canvas.style.height = `${canvasHeight}px`
  const dpr = window.devicePixelRatio
  const rect = canvas.getBoundingClientRect()
  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  ctx.scale(dpr, dpr)

  window.addEventListener('resize', resize)
  registerDragEvent(canvas)
  requestAnimationFrame()
})

onUnmounted(() => {
  window.cancelAnimationFrame(raf)
})

const drawBackground = () => {
  if (canvas && ctx) {
    ctx.strokeStyle = 'rgb(120,120,120)'
    ctx.lineWidth = 0.2
    ctx.beginPath()
    for (let i = 0; i < canvasWidth; i += 20) {
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvasHeight)
    }
    for (let i = 0; i < canvasHeight; i += 20) {
      ctx.moveTo(0, i)
      ctx.lineTo(canvasWidth, i)
    }

    ctx.stroke()
    ctx.closePath()
  }
}

const resize = () => {
  const dom = document.getElementById(`canvas-div`)
  if (!ctx || !canvas || !dom) {
    return
  }

  canvasWidth = dom.offsetWidth
  canvasHeight = dom.offsetHeight
  canvas.style.width = `${canvasWidth}px`
  canvas.style.height = `${canvasHeight}px`
  const dpr = window.devicePixelRatio
  const rect = canvas.getBoundingClientRect()
  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  ctx.scale(dpr, dpr)
}

const registerDragEvent = (canvas: HTMLCanvasElement) => {
  let isMouseDown = false
  let isdrag = false
  canvas.onmousedown = (event) => {
    prevMouseX = event.offsetX
    prevMouseY = event.offsetY
    isMouseDown = true
    getSelectedPositionModel(event)
  }

  canvas.onmouseup = () => {
    isMouseDown = false
    if (!isdrag) {
      selectedModel?.addChild()
    }
    isdrag = false
    selectedKey = -1
  }

  canvas.onmousemove = (event) => {
    if (!isMouseDown || selectedModel == undefined || selectedKey < 0) {
      return
    }
    isdrag = true

    let x = event.offsetX
    let y = event.offsetY

    let dx = x - prevMouseX
    let dy = y - prevMouseY

    selectedModel.onMove(dx, dy)

    prevMouseX = x
    prevMouseY = y
  }

  canvas.onmouseout = function (e) {
    isMouseDown = false
    isdrag = false
    if (selectedModel) {
      selectedModel.modelType.isSelected = false
    }
    selectedModel = undefined
    selectedKey = -1
  }
}

const requestAnimationFrame = () => {
  render()
}

const render = () => {
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.fillStyle = 'rgb(50,50,50)'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)
    drawBackground()

    rootArray.forEach((model, idx) => {
      if (ctx && canvas) {
        model.onDraw(canvas, ctx)
      }
    })
  }

  raf = window.requestAnimationFrame(render)
}

const getSelectedPositionModel = (event: MouseEvent) => {
  if (selectedModel) {
    selectedModel.modelType.isSelected = false
    selectedModel = undefined
    selectedKey = -1
  }
  let idx = 0
  for (let model of rootArray) {
    let isValue = model.getSelectPosition(event, idx, model)
    idx++
    if (isValue) {
      if (isValue.parent) {
        selectedModel = isValue.parent?.child[isValue.key]
        selectedKey = isValue.key
      } else {
        selectedModel = rootArray[isValue.key]
        selectedKey = isValue.key
      }
    }
  }
  if (selectedModel) selectedModel.modelType.isSelected = true
}

window.addEventListener('keypress', function (e) {
  if (e.code == 'Enter' && selectedModel) {
    if (selectedModel.modelType.state) {
      selectedModel.modelType.state = false
    } else {
      selectedModel.modelType.state = true
    }
  }
})
</script>

<style>
.canvas-wrap {
  width: 80%;
  height: 90%;
  margin: 0;
  padding: 0;
  min-width: 1024px;
  min-height: 860px;
}
.canvas {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
