import {CUSTOM_ELEMENTS_SCHEMA, Component, HostListener, Inject, Renderer2, inject, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, Route, icons } from 'lucide-angular';
import { Store } from '@ngrx/store';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CommonModule, DOCUMENT } from '@angular/common';
import {MnDropdownComponent} from "../../../../components/dropdown";
import { DrawerModule } from '../../../../components/drawer/drawer.module';
import {cart, notification} from "../../../../supervisor/data/topbar";
import {AuthenticationService} from "../../../../../services/services/authentication.service";
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [DrawerModule, MnDropdownComponent, LucideAngularModule, SimplebarAngularModule, RouterModule, CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA,],
  providers: [{ provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons) }],
})
export class TopbarComponent implements OnInit{

  cookieValue: any;
  flagvalue: any;

  notifyList: any;
  type: any = 'all';
  mode: any;
  subtotal: any = 0;
  discount: any;
  discountRate = 0.12;
  shipping: any;
  shippingRate: any = this.subtotal != 0 ? '65.00' : '0';
  tax: any;
  taxRate = 0.18;
  totalprice: any;
  size: any;
  cartlist: any;
  profileImg$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  fullName$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private store = inject(Store);
  layout: any;

  constructor(
      @Inject(DOCUMENT) private document: Document,
      // public _cookiesService: CookieService,
      private authenticationService: AuthenticationService,
      private renderer: Renderer2) {
  }


  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //
  //   var windowSize = document.documentElement.clientWidth;
  //
  // }


  ngOnInit(): void {
    // Fetch Data
    this.getUserDetails();
  }

  // scroll
  windowScroll() {
    var scrollUp = document.documentElement.scrollTop;
    if (scrollUp >= 50) {
      document.getElementById("page-topbar")?.classList.add('is-sticky');
    } else {
      document.getElementById("page-topbar")?.classList.remove('is-sticky');
    }
  }


  // Notification Filter
  NotifyFilter(type: any) {
    this.type = type
    if (type == 'all') {
      this.notifyList = notification
    } else {
      this.notifyList = notification.filter((item: any) => item.type == type)
    }
  }



  // Increment Decrement Quantity
  quantity: number = 0;
  calculateQty(id: any, quantity: any, i: any) {
    this.subtotal = 0;
    if (id == '0' && quantity > 1) {
      quantity--;
      this.cartlist[i].quantity = quantity
      this.cartlist[i].total = (this.cartlist[i].quantity * this.cartlist[i].price).toFixed(2)
    }
    if (id == '1') {
      quantity++;
      this.cartlist[i].quantity = quantity
      this.cartlist[i].total = (this.cartlist[i].quantity * this.cartlist[i].price).toFixed(2)
    }
    this.cartlist.map((x: any) => {
      this.subtotal += parseFloat(x['total'])
    })
    this.subtotal = this.subtotal.toFixed(2)
    this.discount = (this.subtotal * this.discountRate).toFixed(2)
    this.tax = (this.subtotal * this.taxRate).toFixed(2);
    this.totalprice = (parseFloat(this.subtotal) + parseFloat(this.tax) + parseFloat(this.shippingRate) - parseFloat(this.discount)).toFixed(2)
  }

  changeSidebar() {
    var windowSize = document.documentElement.clientWidth;
    let sidebarOverlay = document.getElementById("sidebar-overlay") as any;

    if (windowSize < 768) {
      this.document.body.classList.add("overflow-hidden");
      // Check if the sidebar overlay is hidden
      if (sidebarOverlay.classList.contains("hidden")) {
        sidebarOverlay.classList.remove("hidden");
        this.document.documentElement.querySelector('.app-menu')?.classList.remove("hidden");
      } else {
        sidebarOverlay.classList.add("hidden");
        this.document.documentElement.querySelector('.app-menu')?.classList.add("hidden");
      }
      // this.store.dispatch(changesidebarsize({ size: 'lg' }));
    } else {
      // this.store.select(getSidebarsize).subscribe((size) => {
      //   this.size = size
      // })
      // this.store.dispatch(changesidebarsize({ size: this.size === "sm" ? "lg" : "sm" }));
    }
  }

  getUserDetails() {
    this.authenticationService.getUserDetails().subscribe({
      next: (user) => {
        this.profileImg$.next('data:image/jpg;base64,' + user.profileImg);
        this.fullName$.next(user.fullName ?? null);
      },
      error: (err) => {
        console.error('Error fetching user details', err);
        // Handle error, maybe show a message or a different UI state
      }
    });
  }

}
