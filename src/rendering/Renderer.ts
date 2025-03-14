import { GravityObject } from '../models/GravityObject';

// Класс для рендеринга
export class Renderer {
  private ctx: CanvasRenderingContext2D;
  
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }
  
  // Очищает холст с эффектом следа
  clearCanvas(width: number, height: number): void {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, width, height);
  }
  
  // Рисует все объекты
  renderObjects(objects: GravityObject[]): void {
    for (const obj of objects) {
      this.renderObjectTrail(obj);
      this.renderObject(obj);
      this.renderHighlight(obj);
    }
  }
  
  // Рисует след объекта
  private renderObjectTrail(obj: GravityObject): void {
    const gradient = this.ctx.createRadialGradient(
      obj.x, obj.y, 0,
      obj.x, obj.y, obj.radius * 3
    );
    gradient.addColorStop(0, obj.color);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    this.ctx.beginPath();
    this.ctx.arc(obj.x, obj.y, obj.radius * 3, 0, Math.PI * 2);
    this.ctx.fillStyle = gradient;
    this.ctx.globalAlpha = 0.2;
    this.ctx.fill();
  }
  
  // Рисует сам объект
  private renderObject(obj: GravityObject): void {
    this.ctx.beginPath();
    this.ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = obj.color;
    this.ctx.globalAlpha = 1.0;
    this.ctx.fill();
  }
  
  // Рисует блик на объекте
  private renderHighlight(obj: GravityObject): void {
    this.ctx.beginPath();
    this.ctx.arc(obj.x - obj.radius * 0.3, obj.y - obj.radius * 0.3, obj.radius * 0.4, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    this.ctx.fill();
  }
  
  // Рисует линию при создании объекта
  renderCreationLine(startX: number, startY: number, currentX: number, currentY: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    
    // Рисуем предварительный объект
    this.ctx.beginPath();
    this.ctx.arc(startX, startY, 10, 0, Math.PI * 2);
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    this.ctx.fill();
  }
} 