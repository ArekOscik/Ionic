import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

@ViewChild('searchInput') sInput: any;
  model: any = {
    title: 'Nie znaleziono restauracji spełniającej kryteria'
  }
  isLoading: boolean = false;
  query: any;
  allRestaurants: any[] = [
    {
      uid: '111',
      cover: 'assets/imgs/kebab.webp',
      name: 'BafraKebab',
      nameLowercase: 'bafrakebab',
      description: 'Cierpliwy to i kebab ugotuje',
      cuisines: [
        'turkish'
      ],
      rating: 3.5,
      delivery_time: 25,
      distance: 2.5,
      price: 29
    },
    {
      uid: '100',
      cover: 'assets/imgs/pizza.jpg',
      name: 'Pizzeria',
      nameLowercase: 'pizzeria',
      description: 'Pizza włoska',
      cuisines: [
        'italian'
      ],
      rating: 3.5,
      delivery_time: 25,
      distance: 2.5,
      price: 29
    },
    {
      uid: '101',
      cover: 'assets/imgs/schabowy.jpg',
      name: 'Polska Restauracja',
      nameLowercase: 'polska restauracja',
      description: 'Klasyczny polski obiad',
      cuisines: [
        'polish'
      ],
      rating: 3.5,
      delivery_time: 25,
      distance: 2.5,
      price: 29
    }
  ]

  restaurants: any[] = [];

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.sInput.setFocus();
    }, 500)
  }

  async onSearchChange(event: any) {
    console.log(event.detail.value);
    this.query = event.detail.value.toLowerCase();
    this.restaurants = [];
    if(this.query.length > 0) {
      this.isLoading = true;
      setTimeout(async() => {
        this.restaurants = this.allRestaurants.filter((element: any) => {
          return element.nameLowercase.includes(this.query);
        });
        console.log(this.restaurants)
        this.isLoading = false;
      }, 500)
    }

  }

}
