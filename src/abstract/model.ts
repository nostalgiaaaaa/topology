import { System } from './system'
import type { ModelType } from './type'

export abstract class Model {
  abstract type: string
  abstract color: string
  abstract width: number
  abstract height: number
  modelType: ModelType
  child: Model[] = []

  constructor(modelType: ModelType) {
    this.modelType = modelType
  }

  public onDraw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    this.onOptionDraw(canvas, ctx)
    this.drawLink(canvas, ctx)
  }

  public getChild() {
    return this.child.length
  }

  public onOptionDraw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.child.forEach((model) => {
      model.onDraw(canvas, ctx)
    })
  }

  public onMove(dx: number, dy: number) {
    this.modelType.x += dx
    this.modelType.y += dy
    this.child.forEach((model) => {
      model.onMove(dx, dy)
    })
  }

  public getSelectPosition(
    event: MouseEvent,
    key: number,
    optionModel: Model,
    parent?: Model
  ): { key: number; parent: Model | undefined } | undefined {
    if (
      event.offsetX > this.modelType.x &&
      event.offsetX < this.modelType.x + this.width &&
      event.offsetY > this.modelType.y &&
      event.offsetY < this.modelType.y + this.height
    ) {
      return { key: key, parent: parent }
    }
    let idx = 0
    for (let model of this.child) {
      let isValue = model.getSelectPosition(event, idx, model, optionModel)
      idx++
      if (isValue) {
        return isValue
      }
    }
  }

  public setPosition(index: number, interval: number, canvasHeight: number) {
    this.modelType.x = interval * (index + 1) - this.width / 2
    this.modelType.y = canvasHeight / 3 - this.height
    const count = this.getChild()

    this.child.forEach((child, idx) => {
      child.setChildPosition(count, idx, this.modelType.x, this.modelType.y)
    })
  }

  public setChildPosition = (count: number, index: number, x: number, y: number) => {
    const interval = 100
    if (count % 2 == 0) {
      this.modelType.x = x - interval * (count - index - 1) + (interval / 2) * (count - 1)
    } else {
      this.modelType.x = x - interval * (count - index - 1) + interval * Math.trunc(count / 2)
    }
    this.modelType.y = y + 100
    this.child.forEach((child, idx) => {
      child.setChildPosition(this.getChild(), idx, this.modelType.x, this.modelType.y)
    })
  }

  pos = 0
  opacity = 1
  down = true
  linkOpacity = 1
  linkDown = true
  public drawLink(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    if (this.linkDown) this.linkOpacity = this.linkOpacity - 0.01
    else this.linkOpacity = this.linkOpacity + 0.01
    if (this.linkOpacity <= 0) {
      this.linkDown = !this.linkDown
      this.linkOpacity = 0
    }
    if (this.linkOpacity > 1) {
      this.linkDown = !this.linkDown
      this.linkOpacity = 1
    }

    this.child = this.child.sort((a, b) =>
      a.modelType.state === b.modelType.state ? 0 : a.modelType.state ? 1 : -1
    )

    this.child.forEach((child) => {
      ctx.lineWidth = 9
      ctx.setLineDash([])
      ctx.lineCap = 'butt'
      ctx.strokeStyle = 'gray'

      ctx.beginPath()
      ctx.moveTo(this.modelType.x + this.width / 2, this.modelType.y + this.height)
      ctx.lineTo(
        this.modelType.x + this.width / 2,
        (this.modelType.y + this.height + child.modelType.y) / 2
      )
      ctx.lineTo(
        child.modelType.x + child.width / 2,
        (this.modelType.y + this.height + child.modelType.y) / 2
      )
      ctx.lineTo(child.modelType.x + child.width / 2, child.modelType.y)
      ctx.stroke()
      ctx.closePath()

      if (this.modelType.state && child.modelType.state) {
        ctx.setLineDash([15, 15])
        ctx.lineWidth = 3
        // ctx.strokeStyle = "white";
        ctx.strokeStyle = `rgba(255,255,255,${this.linkOpacity})`
        const linePoint = [
          {
            x: this.modelType.x + this.width / 2,
            y: (this.modelType.y + this.height + child.modelType.y) / 2
          },
          {
            x: child.modelType.x + child.width / 2,
            y: (this.modelType.y + this.height + child.modelType.y) / 2
          },
          { x: child.modelType.x + child.width / 2, y: child.modelType.y }
        ]

        ctx.beginPath()
        if (this.modelType.y < child.modelType.y) {
          if (child.pos <= 30) {
            ctx.moveTo(this.modelType.x + this.width / 2, this.modelType.y + child.pos)
          } else {
            child.pos = 0
            ctx.moveTo(this.modelType.x + this.width / 2, this.modelType.y + child.pos)
          }

          ctx.lineTo(linePoint[0].x, linePoint[0].y)
          ctx.lineTo(linePoint[1].x, linePoint[1].y)
          ctx.lineTo(linePoint[2].x, linePoint[2].y)
        } else {
          if (child.pos <= 30) {
            ctx.moveTo(
              this.modelType.x + this.width / 2,
              this.modelType.y + this.height - child.pos
            )
          } else {
            child.pos = 0
            ctx.moveTo(
              this.modelType.x + this.width / 2,
              this.modelType.y + this.height - child.pos
            )
          }

          ctx.lineTo(linePoint[0].x, linePoint[0].y)
          ctx.lineTo(linePoint[1].x, linePoint[1].y)
          ctx.lineTo(linePoint[2].x, linePoint[2].y)
        }
        ctx.stroke()
        ctx.closePath()
        child.pos += 0.2
      } else {
        child.modelType.state = false
      }
    })
  }

  public addChild = () => {
    const newModal = new System({
      x: 0,
      y: 0,
      state: true,
      isSelected: false
    })
    newModal.modelType.y = this.modelType.y + 100
    this.child.push(newModal)
    const count = this.child.length
    this.child.forEach((child, idx) => {
      child.setChildPosition(count, idx, this.modelType.x, this.modelType.y)
    })
  }
}
