import { Component, OnInit } from '@angular/core';
import { 
  ActivatedRoute, 
  Router,
  Params, 
  NavigationExtras 
} from '@angular/router';
import { UnitService } from './unit.service';

@Component({
  selector: 'pe-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {
  table: any;
  error: any;
  cat: string;
  selectedUnit: any;
  inputValue: number;
  outputVal: any;
  constructor(
    private unitService: UnitService,
    private route: ActivatedRoute,
    private router: Router 
  ) {}
  ngOnInit(): void {
    console.log('TablesComponent Initialized');
    this.route.params.forEach( (params: Params) => {
      // set props based on URL params
      this.selectedUnit = params['name'];

      // reset outputVal if category selection changes
      if (this.cat !== params['id']) {
        this.outputVal = null;
        this.cat = params['id'];
      }

      // fetch table
      this.unitService.getTable( params['id'] )
        .then( table => { 
          this.table = table;
          this.error = null;
        })
        .catch( error => {
          this.table = null;
          this.error = error;
        });
    });
  }
  onSelectRow(unit) {
    let navExtras: NavigationExtras = {
      queryParams: { unit: unit }
    };
    this.selectedUnit = this.unitService.getUnit(this.cat, unit);
    this.router.navigate(['tables', this.cat], navExtras);
    console.log(unit);
  }
  isSelected(name) {
    if (this.selectedUnit) {
      return name === this.selectedUnit.name;
    }
    return false;
  }
  setValue(val) {
    this.inputValue = val;
  }
}