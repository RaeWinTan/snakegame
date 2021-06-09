import {ViewChild,ElementRef,AfterViewInit , HostListener,Component, OnInit, Renderer2 } from '@angular/core';
import { Queue } from 'queue-typescript';
import {GameDataService} from '../game-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-drawsnake',
  templateUrl: './drawsnake.component.html',
  styleUrls: ['./drawsnake.component.css']
})
//DrawsnakeComponent
export class DrawsnakeComponent implements AfterViewInit {
  down:number = 0;
  //snake stuff
  snakeQueue:Queue<number> = new Queue<number>();
  snakeSet:Set<number> = new Set<number>();
  cellSide:number;//input
  n:number = 10;//iput

  private colourCode:any = {
 0:"#FFFFFF",
 1:"#000000",
 2:"#FF0000"
};

ctx: CanvasRenderingContext2D;
@ViewChild("drawId") canvas: ElementRef<HTMLCanvasElement>
constructor(private gds:GameDataService, private toastr: ToastrService){
  this.cellSide = gds.cellSide;
  this.n = gds.n;
}
saveChanges(){
  if(!this.snakeQueue.length){
    this.toastr.error("Snake Cannot be empty","ERROR",{
      positionClass: 'toast-bottom-right',
      timeOut:3000
    });
    return;
  }
  this.gds.snakeQueue = this.snakeQueue;
  this.gds.snakeSet = this.snakeSet;
  this.gds.usePreview = true;
  this.toastr.success("Snake is changed","CHANGED",{
    positionClass: 'toast-bottom-right',
    timeOut:3000
  });
}
movingEvt(evt:MouseEvent){
  let x:number = evt.offsetX;
  let y:number = evt.offsetY;
  if(this.down>0) this.insertSnake(x,y);

}

convertPos(pos:any){
  if (pos.y === 0) return pos.x+1;
  else return (pos.y)*this.n+pos.x + 1;
}

changeColour(pos:any, colourNum:number){
  this.ctx.fillStyle = this.colourCode[colourNum];
  this.ctx.fillRect( pos.x*this.cellSide,pos.y*this.cellSide, this.cellSide, this.cellSide);
}

drawBorder(){
  this.ctx.strokeStyle = "black";
  this.ctx.lineWidth = 2;
  for(let i=1; i<this.n; i++){
      this.ctx.moveTo(i*this.cellSide, 0);
      this.ctx.lineTo(i*this.cellSide, this.cellSide*this.n);
      this.ctx.stroke();
  }
  for(let i=1; i<this.n; i++){
      this.ctx.moveTo(0 , i*this.cellSide);
      this.ctx.lineTo(this.cellSide*this.n, i * this.cellSide);
      this.ctx.stroke();
  }
}

convertNum(num:number){
  if(num <= this.n)	return [num-1,0];
  else return num%this.n > 0 ? [num%this.n-1,Math.floor(num/this.n)]:[this.n-1, num/this.n-1];
}

insertSnake(x:number, y:number){
  let c:any = {};
  let num:number = 0;
  if(x<0 || y<0 || y>this.n*this.cellSide || x>this.n*this.cellSide) return;
  //do the estimate here
  if (x===0) x = 1;
  if (y===0) y = 1;
  c.x = Math.ceil(x/this.cellSide) - 1;
  c.y = Math.ceil(y/this.cellSide) - 1;
  num = this.convertPos(c);

  //check if num is valid against front this.snakeQueue.tail
  if (!this.snakeSet.has(num)) {
    if(this.snakeQueue.length){
      let tmpNum:number[] = this.convertNum(num);
      let tmpT:number[] = this.convertNum(this.snakeQueue.tail);
      if (tmpNum[1] === tmpT[1]){
        if(!(tmpNum[0]===tmpT[0]+1 || tmpNum[0]===tmpT[0]-1 || tmpNum[0]===tmpT[0]+(this.n-1)||tmpNum[0]===tmpT[0]-(this.n-1))){
          return;
        }
      } else if(tmpNum[0] === tmpT[0]){
        if(!(tmpNum[1]===tmpT[1]+1 || tmpNum[1]===tmpT[1]-1 || tmpNum[1]===tmpT[1]+(this.n-1)||tmpNum[1]===tmpT[1]-(this.n-1))){
          return;
        }
      } else {
        return;
      }
    }
    this.snakeSet.add(num);
    this.snakeQueue.enqueue(num);
    this.changeColour(c, 1);
  }
}




upEvt(evt:MouseEvent){
  console.log(this.snakeQueue.toArray());
  console.log(this.snakeSet);
  this.down--;
}

downEvt(evt:MouseEvent){
  let x:number = evt.offsetX;
  let y:number = evt.offsetY;
  this.insertSnake(x,y);
  this.down++;
}

ngAfterViewInit(){
  this.canvas.nativeElement.width = this.n * this.cellSide;
  this.canvas.nativeElement.height = this.n * this.cellSide;
  this.ctx = this.canvas.nativeElement.getContext("2d");
  this.drawBorder();
}




}
