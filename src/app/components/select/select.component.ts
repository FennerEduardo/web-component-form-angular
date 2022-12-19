import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { OptionsSelect } from './select.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {

  selected: string = '';
  @Input('divClasses') divClasses = '';
  @Input('labelClasses') labelClasses = '';
  @Input('selectClasses') selectClasses = '';
  @Input('optionsSelect') optionsSelect: OptionsSelect[] = [];
  @Input('label') label = '';
  @Input('idSelect') idSelect = '';
  @Input('titleSelect') titleSelect = '';
  @Input('optionSelected') optionSelected = '';
  @Input('disabledSelect') disabledSelect = '';
  @Input('requiredSelect') requiredSelect = '';
  @Output() change: EventEmitter<any> = new EventEmitter();

  constructor() { }


  ngOnInit(): void {
    this.selected = this.optionSelected;
   }

  onChange() {
    this.change.emit(this.selected);
  }

}
