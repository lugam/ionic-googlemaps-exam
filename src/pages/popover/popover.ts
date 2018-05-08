import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMap, Marker, CameraPosition, ILatLng } from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  map: GoogleMap;
  position: any;

  @ViewChild('mapEl') mapElement: ElementRef;
  mapEl: google.maps.Map;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  ngOnInit() {
    if (this.navParams.data) {
      this.map = this.navParams.data.map;
      this.position = this.navParams.data.position;
    }

    //dummy map for placeservice
    this.mapEl = new google.maps.Map(this.mapElement.nativeElement, {
      center: this.position,
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
    });
  }

  doSearch(keyword) {

    // 현재 카메라 위치에서 찾기
    let cp:CameraPosition<ILatLng> = this.map.getCameraPosition();
    this.search(keyword, cp.target);
    
    // 현재 내 GPS 위치에서 찾기
    // this.map.getMyLocation({}).then(posisiton => {
    //   this.search(keyword, posisiton.latLng);
    // }).catch(err => {
    //   alert('error getting my location' + err);
    // })
  }

  search(keyword, latlng: ILatLng){
    let service = new google.maps.places.PlacesService(this.mapEl);
    service.nearbySearch({
      //location: { lat: this.position.coords.latitude, lng: this.position.coords.longitude },
      location: latlng,
      radius: 5000,
      keyword: keyword
    }, (results: google.maps.places.PlaceResult[], status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        //alert(results.length);
        this.map.clear();
        for (var i = 0; i < results.length; i++) {
          let result: google.maps.places.PlaceResult = results[i];

          this.map.addMarker({
            position: {
              lat: result.geometry.location.lat(),
              lng: result.geometry.location.lng()
            },
            title: result.name,
            animation: 'DROP',
            //icon: color
          }).then((marker: Marker) => {
            marker.addEventListener('click').subscribe(() => {
              marker.showInfoWindow();
            });
          })

        }
      }
    });
  }

}
