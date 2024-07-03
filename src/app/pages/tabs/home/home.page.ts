import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

 banners: any[] = [];
 restaurants: any[] = [];
 isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(() => {
      this.banners = [
        {banner: 'assets/imgs/kebab.webp'},
        {banner: 'assets/imgs/pizza.jpg'},
        {banner: 'assets/imgs/schabowy.jpg'}
      ];
  
  
      this.restaurants = [
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
      this.isLoading = false
    }, 500);
  }
}