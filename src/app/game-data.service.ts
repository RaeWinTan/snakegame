import { Injectable } from '@angular/core';
import { Queue } from 'queue-typescript';
@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  n:number = 10;
  cellSide: number = 10;
  snakeQueue:Queue<number> = new Queue<number>();
  snakeSet:Set<number> = new Set<number>();
  usePreview = false;
  constructor() { }
}
