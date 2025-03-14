import { GravityObject } from '../models/GravityObject';

// Расширяем интерфейс GravityObject для добавления эффекта слияния
interface GravityObjectWithMergeEffect extends GravityObject {
  mergeEffect?: {
    time: number;
    maxTime: number;
  };
}

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
  private collisionsEnabled: boolean = true; // Флаг для включения/выключения коллизий
  
  constructor(gravitationalConstant: number = PhysicsEngine.DEFAULT_G, minDistance: number = PhysicsEngine.DEFAULT_MIN_DISTANCE) {
    this.G = gravitationalConstant;
    this.MIN_DISTANCE = minDistance;
  }
  
  // Метод для включения/выключения коллизий
  public setCollisionsEnabled(enabled: boolean): void {
    this.collisionsEnabled = enabled;
  }
  
  // Метод для получения текущего состояния коллизий
  public getCollisionsEnabled(): boolean {
    return this.collisionsEnabled;
  }
  
  // Обновляет физику всех объектов
  updatePhysics(objects: GravityObject[], canvasWidth: number, canvasHeight: number, timeScale: number = 1.0): void {
    this.calculateGravitationalForces(objects, timeScale);
    this.updatePositions(objects, canvasWidth, canvasHeight, timeScale);
    
    // Обрабатываем коллизии только если они включены
    if (this.collisionsEnabled) {
      this.handleCollisions(objects);
    }
    
    this.updateMergeEffects(objects as GravityObjectWithMergeEffect[], timeScale);
  }
  
  // Вычисляет силу гравитации между двумя объектами
  calculateGravitationalForce(obj1: GravityObject, obj2: GravityObject): { fx: number, fy: number } | null {
    // Вычисляем расстояние между объектами
    const dx = obj2.x - obj1.x;
    const dy = obj2.y - obj1.y;
    const distanceSquared = dx * dx + dy * dy;
    const distance = Math.sqrt(distanceSquared);
    
    // Предотвращаем деление на ноль и слишком большие силы при малых расстояниях
    if (distance < this.MIN_DISTANCE) return null;
    
    // Вычисляем силу гравитации
    const force = this.G * obj1.mass * obj2.mass / distanceSquared;
    
    // Вычисляем компоненты силы
    const fx = force * dx / distance;
    const fy = force * dy / distance;
    
    return { fx, fy };
  }
  
  // Вычисляет гравитационные силы между объектами и применяет их
  calculateGravitationalForces(objects: GravityObject[], timeScale: number = 1.0): void {
    for (let i = 0; i < objects.length; i++) {
      const obj1 = objects[i];
      
      for (let j = i + 1; j < objects.length; j++) {
        const obj2 = objects[j];
        
        // Получаем силу гравитации между объектами
        const force = this.calculateGravitationalForce(obj1, obj2);
        
        // Если сила не null (объекты не слишком близко друг к другу)
        if (force) {
          const { fx, fy } = force;
          
          // Применяем ускорение к обоим объектам (F = ma => a = F/m)
          // Проверяем деление на ноль
          if (obj1.mass > 0) {
            obj1.vx += (fx / obj1.mass) * timeScale;
            obj1.vy += (fy / obj1.mass) * timeScale;
          }
          
          if (obj2.mass > 0) {
            obj2.vx -= (fx / obj2.mass) * timeScale;
            obj2.vy -= (fy / obj2.mass) * timeScale;
          }
        }
      }
    }
  }
  
  // Обновляет позиции объектов на основе их скоростей
  updatePositions(objects: GravityObject[], canvasWidth: number, canvasHeight: number, timeScale: number = 1.0): void {
    for (const obj of objects) {
      obj.x += obj.vx * timeScale;
      obj.y += obj.vy * timeScale;
      
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

  // Обновляет эффекты слияния
  private updateMergeEffects(objects: GravityObjectWithMergeEffect[], timeScale: number): void {
    for (const obj of objects) {
      if (obj.mergeEffect) {
        obj.mergeEffect.time -= timeScale;
        
        // Если время эффекта истекло, удаляем его
        if (obj.mergeEffect.time <= 0) {
          delete obj.mergeEffect;
        }
      }
    }
  }

  // Обрабатывает столкновения между объектами
  handleCollisions(objects: GravityObject[]): void {
    // Создаем массив для хранения объектов, которые нужно удалить
    const objectsToRemove: number[] = [];
    
    // Проверяем все пары объектов на столкновение
    for (let i = 0; i < objects.length; i++) {
      if (objectsToRemove.includes(i)) continue;
      
      const obj1 = objects[i] as GravityObjectWithMergeEffect;
      
      for (let j = i + 1; j < objects.length; j++) {
        if (objectsToRemove.includes(j)) continue;
        
        const obj2 = objects[j];
        
        // Проверяем, столкнулись ли объекты
        if (this.checkCollision(obj1, obj2)) {
          // Объединяем объекты
          this.mergeObjects(obj1, obj2);
          
          // Добавляем эффект слияния
          obj1.mergeEffect = {
            time: 30, // Длительность эффекта в кадрах
            maxTime: 30
          };
          
          // Помечаем второй объект для удаления
          objectsToRemove.push(j);
        }
      }
    }
    
    // Удаляем объекты, начиная с конца массива
    for (let i = objectsToRemove.length - 1; i >= 0; i--) {
      objects.splice(objectsToRemove[i], 1);
    }
  }
  
  // Проверяет, столкнулись ли два объекта
  private checkCollision(obj1: GravityObject, obj2: GravityObject): boolean {
    const dx = obj2.x - obj1.x;
    const dy = obj2.y - obj1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    const radius1 = PhysicsEngine.calculateRadius(obj1.mass);
    const radius2 = PhysicsEngine.calculateRadius(obj2.mass);
    
    // Уменьшаем радиус коллизии на порядок (с 0.9 до 0.1)
    // Теперь объекты должны перекрываться гораздо сильнее, чтобы слипнуться
    const collisionThreshold = (radius1 + radius2) * 0.1;
    
    // Объекты столкнулись, если расстояние между их центрами меньше порога столкновения
    return distance < collisionThreshold;
  }
  
  // Объединяет два объекта после столкновения
  private mergeObjects(obj1: GravityObject, obj2: GravityObject): void {
    // Вычисляем новую массу (сумма масс)
    const totalMass = obj1.mass + obj2.mass;
    
    // Вычисляем новую скорость по закону сохранения импульса
    const newVx = (obj1.vx * obj1.mass + obj2.vx * obj2.mass) / totalMass;
    const newVy = (obj1.vy * obj1.mass + obj2.vy * obj2.mass) / totalMass;
    
    // Вычисляем новую позицию как центр масс
    const newX = (obj1.x * obj1.mass + obj2.x * obj2.mass) / totalMass;
    const newY = (obj1.y * obj1.mass + obj2.y * obj2.mass) / totalMass;
    
    // Вычисляем новый цвет как смесь цветов двух объектов
    const newColor = this.blendColors(obj1.color, obj2.color, obj1.mass / totalMass);
    
    // Обновляем первый объект
    obj1.x = newX;
    obj1.y = newY;
    obj1.vx = newVx;
    obj1.vy = newVy;
    obj1.mass = totalMass;
    obj1.color = newColor;
  }
  
  // Смешивает два цвета с учетом весов
  private blendColors(color1: string, color2: string, weight: number): string {
    // Извлекаем HSL компоненты из строк цветов
    const hsl1 = this.parseHSL(color1);
    const hsl2 = this.parseHSL(color2);
    
    if (!hsl1 || !hsl2) return color1;
    
    // Смешиваем компоненты
    const h = Math.round(hsl1.h * weight + hsl2.h * (1 - weight));
    const s = Math.round(hsl1.s * weight + hsl2.s * (1 - weight));
    const l = Math.round(hsl1.l * weight + hsl2.l * (1 - weight));
    
    return `hsl(${h}, ${s}%, ${l}%)`;
  }
  
  // Парсит HSL цвет из строки
  private parseHSL(color: string): { h: number, s: number, l: number } | null {
    // Формат с запятыми: hsl(360, 70%, 50%)
    const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (match) {
      return {
        h: parseInt(match[1], 10),
        s: parseInt(match[2], 10),
        l: parseInt(match[3], 10)
      };
    }
    
    // Формат с пробелами: hsl(360 70% 50%)
    const match2 = color.match(/hsl\((\d+)\s+(\d+)%\s+(\d+)%\)/);
    if (match2) {
      return {
        h: parseInt(match2[1], 10),
        s: parseInt(match2[2], 10),
        l: parseInt(match2[3], 10)
      };
    }
    
    return null;
  }
} 