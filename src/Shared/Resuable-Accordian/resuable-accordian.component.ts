import { OnInit, Component, Input } from "@angular/core";
@Component({
    selector:'resuable-accordian',
    templateUrl:'./resuable-accordian.component.html',
    styleUrls:['./resuable-accordian.component.css']
})
export class AccordianResuableComponent implements OnInit{
    @Input() hasJustView:boolean;
    @Input() panelTitle:string;
    isPanelHidden:boolean=true;
    constructor(){
        
    }
    ngOnInit(){

    }
}