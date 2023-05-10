import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";

import { ProductsService } from "./northwind.service";

export interface Category {
  CategoryID: number;
  CategoryName: string;
  Discription: string;
  Picture: string;
}
@Component({
  selector: "category-details",
  providers: [ProductsService],
  template: `
    <kendo-grid
      [data]="view | async"
      [loading]="isLoading"
      [pageSize]="5"
      [skip]="skip"
      [pageable]="true"
      scrollable="none"
      (pageChange)="pageChange($event)"
      [navigable]="true"
      kendoGridFocusable
    >
      <kendo-grid-column field="ProductID" title="Cities" [width]="120">
      </kendo-grid-column>
      <kendo-grid-column-group title="Department">
          <kendo-grid-column  title="QA"> </kendo-grid-column>
          <kendo-grid-column  title="Developer"> </kendo-grid-column>
      </kendo-grid-column-group>
 
    </kendo-grid>
  `
})
export class CategoryDetailComponent implements OnInit {
  /**
   * The category for which details are displayed
   */
  @Input() public category: Category;

  public view: Observable<GridDataResult>;
  public isLoading: boolean;
  public skip = 0;

  constructor(private service: ProductsService) {}

  public ngOnInit(): void {
    this.view = this.service;
    this.isLoading = this.service.loading;
    /*load products for the given category*/
    this.service.queryForCategory(this.category.CategoryID, {
      skip: this.skip,
      take: 5
    });
  }

  public pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.service.queryForCategory(this.category.CategoryID, { skip, take });
  }
}
