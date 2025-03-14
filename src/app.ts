import { GravityObject, CreateObjectState } from './models/GravityObject';
import { PhysicsEngine } from './physics/PhysicsEngine';
import { Renderer } from './rendering/Renderer';
import { PresetManager } from './presets/PresetManager';

// Основной класс симуляции
class GravitySimulator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private objects: GravityObject[] = [];
  private animationId: number = 0;
  private createState: CreateObjectState = {
    isCreating: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  };
  
  // Модули для физики, рендеринга и пресетов
  private physics: PhysicsEngine;
  private renderer: Renderer;
  private presetManager: PresetManager;

  constructor() {
    this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    
    // Инициализация модулей
    this.physics = new PhysicsEngine();
    this.renderer = new Renderer(this.ctx);
    this.presetManager = new PresetManager();
    
    this.setupCanvas();
    this.setupEventListeners();
    this.loadRandomPreset();
    this.startAnimation();
  }

  private setupCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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
      }
    });
    
    this.canvas.addEventListener('mouseup', (e) => {
      if (this.createState.isCreating) {
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
    const preset = this.presetManager.getRandomPreset();
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
    // Используем физический движок для обновления объектов
    this.physics.updatePhysics(this.objects, this.canvas.width, this.canvas.height);
  }

  private render(): void {
    // Используем рендерер для отрисовки
    this.renderer.clearCanvas(this.canvas.width, this.canvas.height);
    this.renderer.renderObjects(this.objects);
    
    // Рисуем линию при создании объекта
    if (this.createState.isCreating) {
      this.renderer.renderCreationLine(
        this.createState.startX, 
        this.createState.startY, 
        this.createState.currentX, 
        this.createState.currentY
      );
    }
  }
}

// Запускаем симуляцию при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  new GravitySimulator();
}); 