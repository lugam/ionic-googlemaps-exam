import { Component } from '@angular/core';
import { NavController, Platform, NavParams, PopoverController } from 'ionic-angular';
import { GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
import { PopoverPage } from '../popover/popover';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  myPosition: any;

  constructor(public navCtrl: NavController,
    private platform: Platform,
    public popoverCtrl: PopoverController,
    public navParams: NavParams) {

    this.platform.ready().then(() => {
      this.loadMap();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoogleMapNativePage');
  }

  loadMap() {
    this.map = new GoogleMap('map', {
      'backgroundColor': 'white',
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'myLocation': true,
        'indoorPicker': true,
        'zoom': true
      },
      'gestures': {
        'scroll': true,
        'tilt': true,
        'rotate': true,
        'zoom': true
      },
      'camera': {
        'target': {
          lat: 37.5666103,
          lng: 126.9783882
        },
        'tilt': 0,
        'zoom': 16,
        //'bearing': 50
      }
    });

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      this.map.addMarker({
        position: {
          lat: 37.5666103,
          lng: 126.9783882
        },
        title: "서울시청",
        icon: 'blue'
      })
    });
  }


  presentPopover(e) {
    let popover = this.popoverCtrl.create(PopoverPage, {
      map: this.map,
      position: {
        lat: 37.5666103,
        lng: 126.9783882
      }
    });
    popover.present({
      ev: e
    });
  }

}
