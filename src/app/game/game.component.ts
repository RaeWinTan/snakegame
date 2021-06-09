import {OnChanges,SimpleChanges, Component, ViewChild, ElementRef,AfterViewInit,  Renderer2,HostListener  } from '@angular/core';
import {AngularResizeElementEvent} from './angularResizeElementEvent';
//import {AngularResizeElementDirection} from './angularResizeDirection';
import { ToastrService } from 'ngx-toastr';
import {GameDataService} from '../game-data.service';
import { Queue } from 'queue-typescript';

enum AngularResizeElementDirection {
  TOP = 'top',
  TOP_RIGHT = 'top-right',
  RIGHT = 'right',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM = 'bottom',
  BOTTOM_LEFT = 'bottom-left',
  LEFT = 'left',
  TOP_LEFT = 'top-left'
}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements AfterViewInit {

    x:number;
    y:number;

    speed:number;

    cellSide:number;
    n:number;

    data: any = {};
    data2:any = {};
    c:string = "appliedResize";
    //SNAKES PAUSE STATE
    p:string;
    //mouse text box
    activate:boolean;
    tmpN:number;

    //somehtin
    //setting for the draw-snake
    snakeQueue:Queue<number> = new Queue<number>();
    snakeSet:Set<number> = new Set<number>();
    usePreview:boolean = false;
    showHelp:boolean = false;



    public readonly AngularResizeElementDirection = AngularResizeElementDirection;

    @ViewChild('container1',  {read: ElementRef}) containerElement:ElementRef
    @ViewChild('container2',  {read: ElementRef}) containerElement2:ElementRef

    constructor(private renderer: Renderer2, private toastr: ToastrService, private gds:GameDataService){
      //bare bones
      this.x = 4;
      this.y = 4;
      this.speed=2;
      this.cellSide = gds.cellSide;

      this.n = gds.n;
      this.p="pause";

      this.activate = false;
      this.tmpN = this.n;


    }
    ngOnInit(){
      if(this.gds.usePreview){
        this.snakeQueue = this.gds.snakeQueue;
        this.snakeSet = this.gds.snakeSet;
        this.usePreview =true;
      }
    }
    usePreviewChanges(usePreview:boolean){

      this.usePreview = !usePreview;
      this.gds.usePreview = !this.usePreview;
    }

    goDraw(){
      this.gds.n = this.n;
      this.gds.cellSide = this.cellSide;
    }

    ngAfterViewInit(){
      this.renderer.setStyle(this.containerElement2.nativeElement,"width",this.n*this.cellSide+"px");
      this.renderer.setStyle(this.containerElement2.nativeElement,"height",this.n*this.cellSide+"px");
      this.renderer.setStyle(this.containerElement.nativeElement,"width",this.containerElement2.nativeElement.offsetWidth+"px");
      this.renderer.setStyle(this.containerElement.nativeElement,"height",this.containerElement2.nativeElement.offsetHeight+"px");
    }
    public onResizePreview(evt: AngularResizeElementEvent):void{
      this.activate = true;
      if(evt.currentWidthValue % this.cellSide === 0){
        this.data2.width = evt.currentWidthValue;
        this.data2.height = evt.currentHeightValue;

        this.tmpN = evt.currentWidthValue / this.cellSide;
      }
    }

    public onResize(evt: AngularResizeElementEvent): void {
      this.activate = false;
      this.data.width = this.data2.width;
      this.data.height = this.data2.height;
      this.n = this.data.width/this.cellSide;
      this.showSuccess("SIZE", ""+this.n);
    }
    death(){
      this.toastr.error("restart game","DEATH",{
        positionClass: 'toast-bottom-right',
        timeOut:3000
      });
    }
    showSuccess(att:string, val:string){
      this.toastr.success(val, att,{
        positionClass: 'toast-bottom-right',
        timeOut:3000
      });
    }

}
