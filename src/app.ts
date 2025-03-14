// Константы для симуляции
const G = 0.5; // Гравитационная постоянная (значительно увеличена для наглядности)
const MIN_DISTANCE = 20; // Минимальное расстояние для предотвращения бесконечного ускорения

// Интерфейс для объекта в симуляции
interface GravityObject {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  radius: number;
  color: string;
}

// Пресеты для различных сценариев
type Preset = {
  name: string;
  description: string;
  createObjects: () => GravityObject[];
};

// Состояние для создания объекта
interface CreateObjectState {
  isCreating: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

class GravitySimulator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private objects: GravityObject[] = [];
  private animationId: number = 0;
  private presets: Preset[] = [];
  private createState: CreateObjectState = {
    isCreating: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  };

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.setupCanvas();
    this.initPresets();
    this.setupEventListeners();
    this.loadRandomPreset();
    this.startAnimation();
  }

  private setupCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private initPresets(): void {
    // Пресет 1: Солнечная система
    this.presets.push({
      name: "Солнечная система",
      description: "Центральное солнце и планеты на орбите",
      createObjects: () => {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const objects: GravityObject[] = [];
        
        // Солнце
        objects.push({
          x: centerX,
          y: centerY,
          vx: 0,
          vy: 0,
          mass: 2000,
          radius: 30,
          color: '#FFD700' // Золотой
        });
        
        // Планеты
        const planetColors = ['#3498db', '#2ecc71', '#e74c3c', '#9b59b6', '#f39c12'];
        const distances = [100, 150, 200, 250, 300];
        const speeds = [3, 2.5, 2, 1.7, 1.5];
        
        for (let i = 0; i < 5; i++) {
          const distance = distances[i];
          const speed = speeds[i];
          objects.push({
            x: centerX + distance,
            y: centerY,
            vx: 0,
            vy: speed,
            mass: 10 + Math.random() * 20,
            radius: 5 + Math.random() * 10,
            color: planetColors[i]
          });
        }
        
        return objects;
      }
    });
    
    // Пресет 2: Двойная звезда
    this.presets.push({
      name: "Двойная звезда",
      description: "Две звезды вращаются вокруг общего центра масс",
      createObjects: () => {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const objects: GravityObject[] = [];
        
        // Первая звезда
        objects.push({
          x: centerX - 100,
          y: centerY,
          vx: 0,
          vy: -1.5,
          mass: 1000,
          radius: 25,
          color: '#FF5733' // Оранжевый
        });
        
        // Вторая звезда
        objects.push({
          x: centerX + 100,
          y: centerY,
          vx: 0,
          vy: 1.5,
          mass: 1000,
          radius: 25,
          color: '#33A8FF' // Голубой
        });
        
        // Несколько планет
        for (let i = 0; i < 3; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 300 + Math.random() * 100;
          objects.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            vx: Math.sin(angle) * 1.2,
            vy: -Math.cos(angle) * 1.2,
            mass: 5 + Math.random() * 15,
            radius: 3 + Math.random() * 7,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
          });
        }
        
        return objects;
      }
    });
    
    // Пресет 3: Хаос
    this.presets.push({
      name: "Хаос",
      description: "Множество объектов разной массы в хаотичном движении",
      createObjects: () => {
        const objects: GravityObject[] = [];
        
        for (let i = 0; i < 30; i++) {
          objects.push({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            mass: 10 + Math.random() * 40,
            radius: 3 + Math.random() * 10,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
          });
        }
        
        return objects;
      }
    });
    
    // Пресет 4: Столкновение галактик
    this.presets.push({
      name: "Столкновение галактик",
      description: "Две группы объектов движутся навстречу друг другу",
      createObjects: () => {
        const objects: GravityObject[] = [];
        
        // Первая галактика
        const center1X = this.canvas.width / 4;
        const center1Y = this.canvas.height / 2;
        
        objects.push({
          x: center1X,
          y: center1Y,
          vx: 1,
          vy: 0,
          mass: 1000,
          radius: 20,
          color: '#FF5733' // Оранжевый
        });
        
        for (let i = 0; i < 15; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 50 + Math.random() * 100;
          objects.push({
            x: center1X + Math.cos(angle) * distance,
            y: center1Y + Math.sin(angle) * distance,
            vx: 1 + Math.sin(angle) * 0.5,
            vy: Math.cos(angle) * 0.5,
            mass: 5 + Math.random() * 10,
            radius: 3 + Math.random() * 5,
            color: `hsl(${30 + Math.random() * 60}, 70%, 50%)`
          });
        }
        
        // Вторая галактика
        const center2X = (this.canvas.width / 4) * 3;
        const center2Y = this.canvas.height / 2;
        
        objects.push({
          x: center2X,
          y: center2Y,
          vx: -1,
          vy: 0,
          mass: 1000,
          radius: 20,
          color: '#3498DB' // Синий
        });
        
        for (let i = 0; i < 15; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 50 + Math.random() * 100;
          objects.push({
            x: center2X + Math.cos(angle) * distance,
            y: center2Y + Math.sin(angle) * distance,
            vx: -1 + Math.sin(angle) * 0.5,
            vy: Math.cos(angle) * 0.5,
            mass: 5 + Math.random() * 10,
            radius: 3 + Math.random() * 5,
            color: `hsl(${200 + Math.random() * 60}, 70%, 50%)`
          });
        }
        
        return objects;
      }
    });
    
    // Пресет 5: Танец планет
    this.presets.push({
      name: "Танец планет",
      description: "Сложная система с несколькими центрами притяжения",
      createObjects: () => {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const objects: GravityObject[] = [];
        
        // Три центра притяжения в треугольнике
        const radius = 150;
        const centerColors = ['#e74c3c', '#2ecc71', '#3498db'];
        
        for (let i = 0; i < 3; i++) {
          const angle = (i * Math.PI * 2) / 3;
          objects.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius,
            vx: Math.sin(angle) * 1,
            vy: -Math.cos(angle) * 1,
            mass: 500,
            radius: 15,
            color: centerColors[i]
          });
        }
        
        // Добавляем планеты
        for (let i = 0; i < 20; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = 250 + Math.random() * 150;
          objects.push({
            x: centerX + Math.cos(angle) * distance,
            y: centerY + Math.sin(angle) * distance,
            vx: Math.sin(angle) * (0.8 + Math.random() * 0.5),
            vy: -Math.cos(angle) * (0.8 + Math.random() * 0.5),
            mass: 2 + Math.random() * 8,
            radius: 2 + Math.random() * 4,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
          });
        }
        
        return objects;
      }
    });
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', () => this.setupCanvas());
    
    const randomSceneButton = document.getElementById('random-scene');
    if (randomSceneButton) {
      randomSceneButton.addEventListener('click', () => this.loadRandomPreset());
    }
    
    // Добавляем обработчики событий мыши для создания объектов
    this.canvas.addEventListener('mousedown', (e) => {
      this.createState.isCreating = true;
      this.createState.startX = e.clientX;
      this.createState.startY = e.clientY;
      this.createState.currentX = e.clientX;
      this.createState.currentY = e.clientY;
    });
    
    this.canvas.addEventListener('mousemove', (e) => {
      if (this.createState.isCreating) {
        this.createState.currentX = e.clientX;
        this.createState.currentY = e.clientY;
        const endX = e.clientX;
        const endY = e.clientY;
        
        // Вычисляем вектор скорости на основе перемещения мыши
        const dx = endX - this.createState.startX;
        const dy = endY - this.createState.startY;
        
        // Ограничиваем максимальную скорость
        const maxSpeed = 10;
        const speedFactor = 0.05;
        const vx = Math.max(-maxSpeed, Math.min(maxSpeed, dx * speedFactor));
        const vy = Math.max(-maxSpeed, Math.min(maxSpeed, dy * speedFactor));
        
        // Создаем новый объект
        const mass = 20 + Math.random() * 80;
        const radius = 5 + Math.sqrt(mass) / 2;
        
        this.objects.push({
          x: this.createState.startX,
          y: this.createState.startY,
          vx: vx,
          vy: vy,
          mass: mass,
          radius: radius,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`
        });
        
        this.createState.isCreating = false;
      }
    });
    
    // Отменяем создание объекта, если мышь покидает canvas
    this.canvas.addEventListener('mouseleave', () => {
      this.createState.isCreating = false;
    });
  }

  private loadRandomPreset(): void {
    const randomIndex = Math.floor(Math.random() * this.presets.length);
    const preset = this.presets[randomIndex];
    this.objects = preset.createObjects();
    
    // Обновляем информацию о пресете в интерфейсе
    const presetNameElement = document.getElementById('preset-name');
    const presetDescriptionElement = document.getElementById('preset-description');
    
    if (presetNameElement) {
      presetNameElement.textContent = preset.name;
    }
    
    if (presetDescriptionElement) {
      presetDescriptionElement.textContent = preset.description;
    }
    
    console.log(`Загружен пресет: ${preset.name}`);
  }

  private startAnimation(): void {
    this.animate();
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.update();
    this.render();
  }

  private update(): void {
    // Обновляем скорости объектов на основе гравитационных взаимодействий
    for (let i = 0; i < this.objects.length; i++) {
      const obj1 = this.objects[i];
      
      for (let j = i + 1; j < this.objects.length; j++) {
        const obj2 = this.objects[j];
        
        // Вычисляем расстояние между объектами
        const dx = obj2.x - obj1.x;
        const dy = obj2.y - obj1.y;
        const distanceSquared = dx * dx + dy * dy;
        const distance = Math.sqrt(distanceSquared);
        
        // Предотвращаем деление на ноль и слишком большие силы при малых расстояниях
        if (distance < MIN_DISTANCE) continue;
        
        // Вычисляем силу гравитации
        const force = G * obj1.mass * obj2.mass / distanceSquared;
        
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
    
    // Обновляем позиции объектов на основе их скоростей
    for (const obj of this.objects) {
      obj.x += obj.vx;
      obj.y += obj.vy;
      
      // Простая обработка границ - объекты отражаются от краев экрана
      if (obj.x < obj.radius) {
        obj.x = obj.radius;
        obj.vx *= -0.8;
      } else if (obj.x > this.canvas.width - obj.radius) {
        obj.x = this.canvas.width - obj.radius;
        obj.vx *= -0.8;
      }
      
      if (obj.y < obj.radius) {
        obj.y = obj.radius;
        obj.vy *= -0.8;
      } else if (obj.y > this.canvas.height - obj.radius) {
        obj.y = this.canvas.height - obj.radius;
        obj.vy *= -0.8;
      }
    }
  }

  private render(): void {
    // Очищаем canvas с эффектом следа
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Рисуем объекты
    for (const obj of this.objects) {
      // Рисуем след
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
      
      // Рисуем сам объект
      this.ctx.beginPath();
      this.ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = obj.color;
      this.ctx.globalAlpha = 1.0;
      this.ctx.fill();
      
      // Добавляем блик
      this.ctx.beginPath();
      this.ctx.arc(obj.x - obj.radius * 0.3, obj.y - obj.radius * 0.3, obj.radius * 0.4, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      this.ctx.fill();
    }
    
    // Рисуем линию при создании объекта
    if (this.createState.isCreating) {
      // Получаем текущую позицию мыши через обработчик движения мыши
      const mouseX = this.createState.startX;
      const mouseY = this.createState.startY;
      
      this.ctx.beginPath();
      this.ctx.moveTo(this.createState.startX, this.createState.startY);
      this.ctx.lineTo(mouseX, mouseY);
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
      
      // Рисуем предварительный объект
      this.ctx.beginPath();
      this.ctx.arc(this.createState.startX, this.createState.startY, 10, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      this.ctx.fill();
    }
  }
}

// Запускаем симуляцию при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  new GravitySimulator();
}); 