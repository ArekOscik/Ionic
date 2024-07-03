/* items.page.ts */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {

  id: any;
  data: any = {};
  items: any[] = [];
  veg: boolean = false;
  isLoading: boolean = false;
  cartData: any = {};
  storeData: any = {};
  model = {
    icon: "fast-food-outline",
    title: 'Brak dostępnych produktów'
  };
  restaurants: any[] = [
    {
      uid: '111',
      cover: 'assets/imgs/kebab.webp',
      name: 'BafraKebab',
      nameLowercase: 'bafrakebab',
      address: 'Przywidzka 6, Gdańsk',
      description: 'Cierpliwy to i kebab ugotuje',
      cuisines: [
        'Tureckie'
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
      address: 'Włoska 100, Włochowo',
      description: 'Pizza włoska',
      cuisines: [
        'Włoskie'
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
      address: 'Polska 39, Polanowo',
      description: 'Klasyczny polski obiad',
      cuisines: [
        'Polskie'
      ],
      rating: 3.5,
      delivery_time: 25,
      distance: 2.5,
      price: 29
    },
  ];

  categories: any[] = [
    {
      id:"e00",
      name: "Włoskie",
      uid: "100"
    },
    {
      id:"e0",
      name: "Polskie",
      uid: "101"
    },
    {
      id:"e000",
      name: "Tureckie",
      uid: "111"
    },
  ];

  allItems = [
    {
      category_id: "e00",
      cover: "assets/imgs/pizza.jpg",
      desc: "Pizza włoska z Włoch",
      id: "i1",
      name: "Pizza",
      price: 35,
      rating: 4,
      status: true,
      uid: "100",
      variation: false,
      veg: false
    },
    {
      category_id: "e000",
      cover: "assets/imgs/kebab.webp",
      desc: "Turecki Kebab",
      id: "i2",
      name: "Kebab",
      price: 30,
      rating: 5,
      status: true,
      uid: "111",
      variation: false,
      veg: false
    },
    {
      category_id: "e0",
      cover: "assets/imgs/schabowy.jpg",
      desc: "Kotlet Schabowy z ziemniakami i mizerią",
      id: "i3",
      name: "Kotlet Schabowy",
      price: 33,
      rating: 4.5,
      status: true,
      uid: "101",
      variation: false,
      veg: false
    },
    {
      category_id: "e00",
      cover: "assets/imgs/salatka.jpg",
      desc: "Salatka bez mięsa",
      id: "i4",
      name: "Sałatka warzywna",
      price: 10,
      rating: 1,
      status: true,
      uid: "100",
      variation: false,
      veg: true
    },
  ];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      console.log('data:', paramMap);
      if(!paramMap.has('restaurantId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('restaurantId');
      console.log('id: ', this.id);
      this.getItems();
    });
  }

  getCart() {
    return Preferences.get({key: 'cart'});
  }

  async getItems() {
    this.isLoading = true;
    this.data = {};
    this.cartData = {};
    this.storeData = {};
    setTimeout(async() => {
      
    let data: any = this.restaurants.filter(x => x.uid === this.id);
    this.data = data[0];
    this.categories = this.categories.filter(x => x.uid === this.id);
    this.items = this.allItems.filter(x => x.uid === this.id);
    console.log('restaurant: ', this.data)
    let cart: any = await this.getCart();
    console.log('cart: ', cart);
    if(cart?.value) {
      this.storeData = JSON.parse(cart.value);
      console.log('storeData: ', this.storeData);
      if(this.id == this.storeData.restaurant.uid && this.allItems.length > 0) {
        this.allItems.forEach((element: any) => {
          this.storeData.items.forEach((ele: any) => {
            if(element.id != ele.id) return;
            element.quantity = ele.quantity;
          });
        });
      }
      this.cartData.totalItem = this.storeData.totalItem;
      this.cartData.totalPrice = this.storeData.totalPrice; 
    }
    this.isLoading = false;
    }, 3000);
  }


  vegOnly(event: any) {
    console.log(event.detail.checked);
    this.items = [];
    if(event.detail.checked == true) this.items = this.allItems.filter(x => x.veg === true);
    else this.items = this.allItems;
    console.log('items: ', this.items);
  }

  quantityPlus(index: number) {
    try {
      console.log(this.items[index]);
      if(this.items[index].quantity == null || this.items[index].quantity === undefined){
        this.items[index].quantity = 1;
        this.calculate();
      } else {
        this.items[index].quantity += 1;
        this.calculate();
      }
    } catch(e) {
      console.log(e);
    }
  }
  
  quantityMinus(index: number) {
    if(this.items[index].quantity !== 0) {
      this.items[index].quantity -= 1;
    } else {
      this.items[index].quantity = 0;
    }
    this.calculate();
  }
  

  calculate() {
    console.log(this.items);
    this.cartData.items = [];
    let item = this.items.filter(x => x.quantity > 0);
    console.log('Dodano do koszyka', item);
    this.cartData.items = item;
    this.cartData.totalPrice = 0;
    this.cartData.totalItem = 0;
    item.forEach(element => {
      this.cartData.totalItem += element.quantity;
      this.cartData.totalPrice += (parseFloat(element.price) * parseFloat(element.quantity));
    });
    this.cartData.totalPrice = parseFloat(this.cartData.totalPrice).toFixed(2);    
    if(this.cartData.totalItem == 0) {
      this.cartData.totalItem = 0;
      this.cartData.totalPrice = 0;
    }
    console.log('Koszyk: ', this.cartData);
  }

  async saveToCart() {
    try {
      this.cartData.restaurant = {};
      this.cartData.restaurant = this.data;
      console.log('cartData', this.cartData);
      await Preferences.set({
        key: 'cart',
        value: JSON.stringify(this.cartData)
      });
    } catch(e) {
      console.log(e);
    }
  }

  async viewCart() {
    if(this.cartData.items && this.cartData.items.length > 0) await this.saveToCart();
    console.log('router url: ', this.router.url);
    this.router.navigate([this.router.url + '/cart']);
  }

}
