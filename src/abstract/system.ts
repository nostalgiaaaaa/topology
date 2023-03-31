import { Model } from './model'
import system from '@/assets/system.png'
export class System extends Model {
  type = 'system'
  sysId = 'sampleSysId'
  width = 40
  height = 40
  color = '#C687F6'
  image = new Image()
  public onDraw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    super.drawLink(canvas, ctx)
    super.onOptionDraw(canvas, ctx)
    ctx.setLineDash([])
    ctx.beginPath()
    ctx.lineCap = 'round'

    if (this.modelType.isSelected) {
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 3
    } else {
      ctx.strokeStyle = 'rgba(0,0,0,0)'
      ctx.lineWidth = 0.5

      if (!this.modelType.state) {
        ctx.lineWidth = 3
        ctx.strokeStyle = `rgba(255,0,0,${this.opacity})`
        if (this.down) this.opacity = this.opacity - 0.01
        else this.opacity = this.opacity + 0.01
        if (this.opacity <= 0) {
          this.down = !this.down
          this.opacity = 0
        }
        if (this.opacity > 1) {
          this.down = !this.down
          this.opacity = 1
        }
      }
    }
    this.image.src = system
    ctx.fillRect(this.modelType.x, this.modelType.y, this.width, this.height)
    ctx.strokeRect(this.modelType.x, this.modelType.y, this.width, this.height)
    ctx.drawImage(this.image, this.modelType.x, this.modelType.y, this.width, this.height)
    // ctx.fillStyle = this.color;
    // ctx.moveTo(this.modelType.x, this.modelType.y);
    // ctx.lineTo(this.modelType.x + this.width, this.modelType.y);
    // ctx.lineTo(this.modelType.x + this.width, this.modelType.y + this.height);
    // ctx.lineTo(this.modelType.x, this.modelType.y + this.height);
    // ctx.lineTo(this.modelType.x, this.modelType.y);
    // ctx.fill();
    ctx.stroke()
  }
}
