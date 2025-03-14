import { GravityObject } from '../models/GravityObject';

// Класс для физических расчетов
export class PhysicsEngine {
  private G: number;
  private MIN_DISTANCE: number;
  
  constructor(gravitationalConstant: number = 0.5, minDistance: number = 20) {
    this.G = gravitationalConstant;
    this.MIN_DISTANCE = minDistance;
  }
  
  // Обновляет физику всех объектов
  updatePhysics(objects: GravityObject[], canvasWidth: number, canvasHeight: number): void {
    this.calculateGravitationalForces(objects);
    this.updatePositions(objects, canvasWidth, canvasHeight);
  }
  
  // Вычисляет гравитационные силы между объектами
  private calculateGravitationalForces(objects: GravityObject[]): void {
    for (let i = 0; i < objects.length; i++) {
      const obj1 = objects[i];
      
      for (let j = i + 1; j < objects.length; j++) {
        const obj2 = objects[j];
        
        // Вычисляем расстояние между объектами
        const dx = obj2.x - obj1.x;
        const dy = obj2.y - obj1.y;
        const distanceSquared = dx * dx + dy * dy;
        const distance = Math.sqrt(distanceSquared);
        
        // Предотвращаем деление на ноль и слишком большие силы при малых расстояниях
        if (distance < this.MIN_DISTANCE) continue;
        
        // Вычисляем силу гравитации
        const force = this.G * obj1.mass * obj2.mass / distanceSquared;
        
        // Вычисляем компоненты силы
        const fx = force * dx / distance;
        const fy = force * dy / distance;
        
        // Применяем ускорение к обоим объектам (F = ma => a = F/m)
        obj1.vx += fx / obj1.mass;
        obj1.vy += fy / obj1.mass;
        
        obj2.vx -= fx / obj2.mass;
        obj2.vy -= fy / obj2.mass;
      }
    }
  }
  
  // Обновляет позиции объектов на основе их скоростей
  private updatePositions(objects: GravityObject[], canvasWidth: number, canvasHeight: number): void {
    for (const obj of objects) {
      obj.x += obj.vx;
      obj.y += obj.vy;
      
      // Простая обработка границ - объекты отражаются от краев экрана
      if (obj.x < obj.radius) {
        obj.x = obj.radius;
        obj.vx *= -0.8;
      } else if (obj.x > canvasWidth - obj.radius) {
        obj.x = canvasWidth - obj.radius;
        obj.vx *= -0.8;
      }
      
      if (obj.y < obj.radius) {
        obj.y = obj.radius;
        obj.vy *= -0.8;
      } else if (obj.y > canvasHeight - obj.radius) {
        obj.y = canvasHeight - obj.radius;
        obj.vy *= -0.8;
      }
    }
  }
} 