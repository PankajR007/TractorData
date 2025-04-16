import { Component } from '@angular/core';
import { TractorDataService } from '../tractor-data.service'; 


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  // First form selections
  selectedManufacturer: string = '';
  selectedModel: string = '';
  selectedYear: string = '';
  
  // Second form values
  showDetails: boolean = false;
  rearTyrePercentage: number = 0;
  frontTyrePercentage: number = 0;
  lookPercentage: number = 0;
  selectedOwner: string = '';
  repairValue: number = 0;
  rtoExpenses: number = 0;
  calculatedTotal: number = 0;
  showCalculation: boolean = false;

  constructor(private tractorDataService: TractorDataService) {}

  onSubmit() {
    this.showDetails = true;
  }

  calculateTotal() {
    const adminData = this.tractorDataService.getTractorData(
      this.selectedManufacturer,
      this.selectedModel,
      this.selectedYear
    );

    if (adminData) {
      // Calculate percentage values
      const rearTyreValue = (adminData.rearValue * this.rearTyrePercentage) / 100;
      const frontTyreValue = (adminData.frontValue * this.frontTyrePercentage) / 100;
      const lookValue = (adminData.lookValue * this.lookPercentage) / 100;
      const ownerValue = adminData.ownerValue / parseInt(this.selectedOwner);

      // Add both admin and user repair/RTO values
      const totalRepair = adminData.repairValue + this.repairValue;
      const totalRTO = adminData.rtoExpenseValue + this.rtoExpenses;

      // Calculate final total
      this.calculatedTotal = 
        adminData.baseValue + 
        rearTyreValue +
        frontTyreValue +
        lookValue +
        ownerValue +
        totalRepair +    // Combined repair value
        totalRTO;        // Combined RTO value

      this.showCalculation = true;
    }
  }

  allFieldsFilled(): boolean {
    return !!(
      this.rearTyrePercentage &&
      this.frontTyrePercentage &&
      this.lookPercentage &&
      this.selectedOwner &&
      this.repairValue &&
      this.rtoExpenses
    );
  }
}
