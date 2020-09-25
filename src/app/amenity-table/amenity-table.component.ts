import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Amenity } from '../_models/amenity';

@Component({
  selector: 'amenity-table',
  templateUrl: './amenity-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmenityTableComponent {
  @Input() dataSource: Amenity[];
  @Input() searchData;

  constructor(private router: Router) {
  }

  listOfColumns: ColumnItem[] = [
    {
      name: 'Name',
      sortOrder: null,
      sortFn: (a: Amenity, b: Amenity) => a.name.localeCompare(b.name),
    },
    // {
    //   name: 'Region',
    //   sortOrder: null,
    //   sortFn: (a: Amenity, b: Amenity) => a.region.localeCompare(b.region),
    // },
    // {
    //   name: 'City',
    //   sortOrder: null,
    //   sortFn: (a: Amenity, b: Amenity) => a.city.localeCompare(b.city),
    // },
    // {
    //   name: 'Road',
    //   sortOrder: null,
    //   sortFn: (a: Amenity, b: Amenity) => a.road.localeCompare(b.road),
    // },
    {
      name: 'Pets',
      filterMultiple: false,
      listOfFilter: [
        { text: 'true', value: true },
      ],
      filterFn: (val: boolean, item: Amenity) => item.pets === val
    },
    {
      name: 'Smoking',
      filterMultiple: false,
      listOfFilter: [
        { text: 'true', value: true },
      ],
      filterFn: (val: boolean, item: Amenity) => item.smoking === val
    },
    {
      name: 'Gatherings',
      filterMultiple: false,
      listOfFilter: [
        { text: 'true', value: true },
      ],
      filterFn: (val: boolean, item: Amenity) => item.gatherings === val
    },
    {
      name: 'LivingRoom',
      filterMultiple: false,
      listOfFilter: [
        { text: 'true', value: true },
      ],
      filterFn: (val: boolean, item: Amenity) => item.livingroom === val
    },
    {
      name: 'Wifi',
      filterMultiple: false,
      listOfFilter: [
        { text: 'true', value: true },
      ],
      filterFn: (val: boolean, item: Amenity) => item.wifi === val
    },
    {
      name: 'AC',
      filterMultiple: false,
      listOfFilter: [
        { text: 'true', value: true },
      ],
      filterFn: (val: boolean, item: Amenity) => item.ac === val
    },
    {
      name: 'Heater',
      filterMultiple: false,
      listOfFilter: [
        { text: 'true', value: true },
      ],
      filterFn: (val: boolean, item: Amenity) => item.heater === val
    },
    {
      name: 'Kitchen',
      filterMultiple: false,
      listOfFilter: [
        { text: 'true', value: true },
      ],
      filterFn: (val: boolean, item: Amenity) => item.kitchen === val
    },
    {
      name: 'Parking',
      filterMultiple: false,
      listOfFilter: [
        { text: 'true', value: true },
      ],
      filterFn: (val: boolean, item: Amenity) => item.parking === val
    },
    {
      name: 'TV',
      filterMultiple: false,
      listOfFilter: [
        { text: 'true', value: true },
      ],
      filterFn: (val: boolean, item: Amenity) => item.tv === val
    },
    {
      name: 'Elevator',
      filterMultiple: false,
      listOfFilter: [
        { text: 'true', value: true },
      ],
      filterFn: (val: boolean, item: Amenity) => item.elevator === val
    },
    {
      name: 'Minprice',
      sortOrder: null,
      sortFn: (a: Amenity, b: Amenity) => a.minprice - b.minprice,
    },
    {
      name: 'Rooms',
      sortOrder: null,
      sortFn: (a: Amenity, b: Amenity) => a.roomnumber - b.roomnumber,
      filterMultiple: true,
      listOfFilter: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3+', value: 3 },
      ],
      filterFn: (valList: number[], item: Amenity) => {
        if (valList.includes(3)) {
          return valList.includes(item.roomnumber) || item.roomnumber > 3
        } else {
          return valList.includes(item.roomnumber)
        }
      }
    },
    {
      name: 'Bathrooms',
      sortOrder: null,
      sortFn: (a: Amenity, b: Amenity) => a.bathroomnumber - b.bathroomnumber,
      filterMultiple: true,
      listOfFilter: [
        { text: '1', value: 1 },
        { text: '2+', value: 2 },
      ],
      filterFn: (valList: number[], item: Amenity) => {
        if (valList.includes(2)) {
          return valList.includes(item.bathroomnumber) || item.bathroomnumber > 2
        } else {
          return valList.includes(item.bathroomnumber)
        }
      }
    },
    {
      name: 'Beds',
      sortOrder: null,
      sortFn: (a: Amenity, b: Amenity) => a.bednumber - b.bednumber,
      filterMultiple: true,
      listOfFilter: [
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3+', value: 3 },
      ],
      filterFn: (valList: number[], item: Amenity) => {
        if (valList.includes(3)) {
          return valList.includes(item.bednumber) || item.bednumber > 3
        } else {
          return valList.includes(item.bednumber)
        }
      }
    },
  ];

  goToAmenityPage(id) {
    console.log(this.searchData)
    this.router.navigateByUrl('/amenity/' + id, { state: { searchData: this.searchData } });
  }
}

interface ColumnItem {
  name: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
}
