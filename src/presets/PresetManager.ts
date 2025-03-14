import { GravityObject, Preset } from '../models/GravityObject';

// Класс для управления пресетами
export class PresetManager {
  private presets: Preset[] = [];
  
  constructor() {
    this.initPresets();
  }
  
  // Получить все пресеты
  getPresets(): Preset[] {
    return this.presets;
  }
  
  // Получить случайный пресет
  getRandomPreset(): Preset {
    const randomIndex = Math.floor(Math.random() * this.presets.length);
    return this.presets[randomIndex];
  }
  
  // Инициализация пресетов
  private initPresets(): void {
    // Пресет 1: Солнечная система
    this.presets.push({
      name: "Солнечная система",
      description: "Центральное солнце и планеты на орбите",
      createObjects: () => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
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
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
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
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
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
        const center1X = window.innerWidth / 4;
        const center1Y = window.innerHeight / 2;
        
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
        const center2X = (window.innerWidth / 4) * 3;
        const center2Y = window.innerHeight / 2;
        
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
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
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
} 