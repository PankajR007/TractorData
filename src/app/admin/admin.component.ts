import { Component } from '@angular/core';
import { TractorDataService } from '../tractor-data.service';

interface TractorData {
  manufacturer: string;
  model: string;
  year: string;
  baseValue: number;
  rearValue: number;
  frontValue: number;
  lookValue: number;
  ownerValue: number;
  repairValue: number;
  rtoExpenseValue: number;
}

interface FormValues {
  baseValue: number;
  rearValue: number;
  frontValue: number;
  lookValue: number;
  ownerValue: number;
  repairValue: number;
  rtoExpenseValue: number;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  // First form selections
  selectedManufacturer: string = '';
  selectedModel: string = '';
  selectedYear: string = '';

  // Control second form visibility
  showSecondForm: boolean = false;

  // Array to store all tractor data
  tractorDataArray: TractorData[] = [];

  // Second form values
  formValues: FormValues = {
    baseValue: 0,
    rearValue: 0,
    frontValue: 0,
    lookValue: 0,
    ownerValue: 0,
    repairValue: 0,
    rtoExpenseValue: 0
  };

  constructor(private tractorDataService: TractorDataService) {}

  onSubmit() {
    // Check for existing data
    const existingData = this.tractorDataService.getTractorData(
      this.selectedManufacturer,
      this.selectedModel,
      this.selectedYear
    );

    if (existingData) {
      // Populate form with existing values
      this.formValues = {
        baseValue: existingData.baseValue,
        rearValue: existingData.rearValue,
        frontValue: existingData.frontValue,
        lookValue: existingData.lookValue,
        ownerValue: existingData.ownerValue,
        repairValue: existingData.repairValue,
        rtoExpenseValue: existingData.rtoExpenseValue
      };
    } else {
      // Reset form for new entry
      this.formValues = {
        baseValue: 0,
        rearValue: 0,
        frontValue: 0,
        lookValue: 0,
        ownerValue: 0,
        repairValue: 0,
        rtoExpenseValue: 0
      };
    }
    this.showSecondForm = true;
  }

  onValuesSubmit() {
    const tractorData: TractorData = {
      manufacturer: this.selectedManufacturer,
      model: this.selectedModel,
      year: this.selectedYear,
      ...this.formValues
    };

    this.tractorDataService.addOrUpdateTractorData(tractorData);
    this.resetForms();
  }

  private resetForms() {
    // Reset first form
    this.selectedManufacturer = '';
    this.selectedModel = '';
    this.selectedYear = '';

    // Reset second form
    this.formValues = {
      baseValue: 0,
      rearValue: 0,
      frontValue: 0,
      lookValue: 0,
      ownerValue: 0,
      repairValue: 0,
      rtoExpenseValue: 0
    };

    // Hide second form
    this.showSecondForm = false;
  }
}
