import { Injectable } from '@angular/core';

export interface TractorData {
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

@Injectable({
  providedIn: 'root'
})
export class TractorDataService {
  private tractorDataArray: TractorData[] = [];

  addOrUpdateTractorData(data: TractorData) {
    // Find if entry already exists
    const existingIndex = this.tractorDataArray.findIndex(item => 
      item.manufacturer === data.manufacturer &&
      item.model === data.model &&
      item.year === data.year
    );

    if (existingIndex !== -1) {
      // Update existing entry
      this.tractorDataArray[existingIndex] = data;
    } else {
      // Add new entry
      this.tractorDataArray.push(data);
    }

    // Save to localStorage
    localStorage.setItem('tractorData', JSON.stringify(this.tractorDataArray));
  }

  getTractorData(manufacturer: string, model: string, year: string): TractorData | undefined {
    return this.tractorDataArray.find(data => 
      data.manufacturer === manufacturer &&
      data.model === model &&
      data.year === year
    );
  }

  // Load data when service initializes
  constructor() {
    const savedData = localStorage.getItem('tractorData');
    if (savedData) {
      this.tractorDataArray = JSON.parse(savedData);
    }
  }
}
