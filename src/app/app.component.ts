import { Component, ViewChild, OnInit, AfterViewInit } from "@angular/core";
import { Observable } from "rxjs";
import { GridComponent, GridDataResult } from "@progress/kendo-angular-grid";
import { CategoriesService } from "./northwind.service";
import { isDocumentAvailable } from '@progress/kendo-angular-common';

@Component({
  providers: [CategoriesService],
  selector: "my-app",
  template: `
    <kendo-grid
      [data]="view | async"
      [loading]="isLoading"
      [height]="550"
      [navigable]="true"
    >
      <kendo-grid-column  title="Country ID" field="CategoryID" [width]="100"></kendo-grid-column>
      <kendo-grid-column
        field="Country"
        [width]="200"
        title="Country Name"
      ></kendo-grid-column>
     
      <div *kendoGridDetailTemplate="let dataItem">
        <category-details [category]="dataItem"></category-details>
      </div>
    </kendo-grid>
  `
})
export class AppComponent implements OnInit, AfterViewInit {
  public view: Observable<GridDataResult>;
  public isLoading: boolean;

  // For Angular 8
  // @ViewChild(GridComponent, { static: false })
  // public grid: GridComponent;

  @ViewChild(GridComponent) grid: GridComponent;

  constructor(private service: CategoriesService) {}

  public ngOnInit(): void {
    // Bind directly to the service as it is a Subject
    this.view = this.service;
    this.isLoading = this.service.loading;

    // Fetch the data with the initial state
    this.loadData();
  }

  public ngAfterViewInit(): void {
    if (!isDocumentAvailable()) {
        return;
    }

    // Expand the first row initially
    this.grid.expandRow(0);
  }

  private loadData(): void {
    this.service.query({
      skip: 0,
      take: 8
    });
  }
}
