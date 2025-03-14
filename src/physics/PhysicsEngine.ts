import { GravityObject } from '../models/GravityObject';

// Класс для физических расчетов
export class PhysicsEngine {
  // Константы для физических расчетов
  public static readonly DEFAULT_G: number = 0.5;
  public static readonly DEFAULT_MIN_DISTANCE: number = 20;
  
  // Вычисляет радиус объекта на основе его массы
  public static calculateRadius(mass: number): number {
    return 5 + Math.sqrt(mass) / 2;
  }
  
  private G: number;
  private MIN_DISTANCE: number;
  
  constructor(gravitationalConstant: number = PhysicsEngine.DEFAULT_G, minDistance: number = PhysicsEngine.DEFAULT_MIN_DISTANCE) {
    this.G = gravitationalConstant;
    this.MIN_DISTANCE = minDistance;
  }
  
  // Обновляет физику всех объектов
  updatePhysics(objects: GravityObject[], canvasWidth: number, canvasHeight: number): void {
    this.calculateGravitationalForces(objects);
    this.updatePositions(objects, canvasWidth, canvasHeight);
  }
  
  // Вычисляет гравитационные силы между объектами
  calculateGravitationalForces(objects: GravityObject[]): void {
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
        // Проверяем деление на ноль
        if (obj1.mass > 0) {
          obj1.vx += fx / obj1.mass;
          obj1.vy += fy / obj1.mass;
        }
        
        if (obj2.mass > 0) {
          obj2.vx -= fx / obj2.mass;
          obj2.vy -= fy / obj2.mass;
        }
      }
    }
  }
  
  // Обновляет позиции объектов на основе их скоростей
  updatePositions(objects: GravityObject[], canvasWidth: number, canvasHeight: number): void {
    for (const obj of objects) {
      obj.x += obj.vx;
      obj.y += obj.vy;
      
      // Вычисляем радиус на основе массы
      const radius = PhysicsEngine.calculateRadius(obj.mass);
      
      // Простая обработка границ - объекты отражаются от краев экрана
      if (obj.x < radius) {
        obj.x = radius;
        obj.vx *= -0.8;
      } else if (obj.x > canvasWidth - radius) {
        obj.x = canvasWidth - radius;
        obj.vx *= -0.8;
      }
      
      if (obj.y < radius) {
        obj.y = radius;
        obj.vy *= -0.8;
      } else if (obj.y > canvasHeight - radius) {
        obj.y = canvasHeight - radius;
        obj.vy *= -0.8;
      }
    }
  }
} 