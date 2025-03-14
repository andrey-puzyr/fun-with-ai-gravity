// Интерфейс для объекта в симуляции
export interface GravityObject {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  color: string;
}

// Пресеты для различных сценариев
export type Preset = {
  name: string;
  description: string;
  createObjects: () => GravityObject[];
};

// Состояние для создания объекта
export interface CreateObjectState {
  isCreating: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
} 