import { Component, OnInit } from '@angular/core';
import { ICarWash, IProperty } from 'src/app/structures/interfaces';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { $ } from 'protractor';
import { Router } from '@angular/router';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
declare var mapboxgl;
declare var MapboxGeocoder;
declare var mapboxSdk;


@Component({
  selector: 'app-carwash-map',
  templateUrl: './carwash-map.page.html',
  styleUrls: ['./carwash-map.page.scss'],
})
export class CarwashMapPage implements OnInit {

  map: any;
  address = [];
  car_washes: ICarWash[] = [];

  infor: ICarWash[] = [];

  constructor(private router: Router,
    private _carWashService: CarwashService
  ) { }

  ngOnInit() {

    // this.getCarWashes();

    mapboxgl.accessToken = 'pk.eyJ1IjoidGVhcnoiLCJhIjoiY2toa2dqcmM3MWIwNjJ5cDlqazhyYzdteiJ9.jYlNVUpq4tkE1jva-mtyqg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [28.218370, -25.731340],
      zoom: 13
    });

    this.reSize();

    this.geoCoder();
    this.controls();
    this.getCarWashes();
  }


  // Get car
  getCarWashes() {
    let id, carwash;

    this._carWashService.getCarwashes().subscribe(response => {
      // response.forEach(data => {
      //   id = data.payload.doc.id;
      //   carwash = data.payload.doc.data();
      //   this.infor.push(carwash);
      //   this.car_washes.push({
      //     id: id,
      //     name: carwash.name,
      //     coordinates: carwash.location,
      //     images: carwash.images
      //   });
      // })

      // // this.infor.forEach(e => {
      // //   console.log(e)
      // // });

      // this.car_washes.forEach(e => {
      //   console.log(e)
      // });

      // var _address;
      // var _id, _name, _img;

      // this.car_washes.forEach(a => {

      //   _address = "";
      //   a.coordinates.forEach(b => {
      //     _address = _address + " " + b
      //   });
      //   _id = a.id
      //   _name = a.name
      //   _img = a.images

      //   console.log(_address);
      //       console.log("name"+ _name);
      //       console.log("img"+ _img);
      //   this.convetAddressToCoo(_id, _name, _img, _address);
      // });

        this.car_washes = response.map(carwash => {
          return ({
            id: carwash.payload.doc.id,
            ...carwash.payload.doc.data() as ICarWash
          })
        })
    })
  }



  reSize() {

    this.map.on("load", () => {
      this.map.resize();
    });

  }

  // Search location
  geoCoder() {

    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
        // countries:'+24',
      }))
  }

  controls() {
    this.map.addControl(new mapboxgl.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }));
  }

  markers() {

    // 28.218370, -25.731340
    for (let i = 0; i < 3; i++) {

      const innerHtmlContent = `<div style=" font-size: large;color : black;">
                  <h4 >${"massege"} </h4> </div>`;

      const divElement = document.createElement('div');
      const viewBtn = document.createElement('div');
      viewBtn.innerHTML = `<button style="border: 1px solid gray; width:'400px';" > View </button>`;
      divElement.innerHTML = innerHtmlContent;
      divElement.appendChild(viewBtn);

      viewBtn.addEventListener('click', (e) => {
        // alert( arry3[i]);
        this.router.navigate(['searched-property'])
      });

      var geojson = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'properties': {
              'message': "this.arry3[i]",
              'iconSize': [45, 45]
            },
            'geometry': {
              'type': 'Point',
              'coordinates': [-28.42534534, 25.56464665]
            }
          },
        ]
      };

      var map = this.map

      geojson.features.forEach(function (marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = el.style.backgroundImage = 'url(https://placekitten.com/g/' +
          marker.properties.iconSize.join('/') +
          '/)';
        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';

        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({
            offset: 25
          }).setDOMContent(divElement))
          .addTo(map);
      });

    }
  }

  convetAddressToCoo(id, name, img, address) {

    const innerHtmlContent = `<div style=" font-size: large;color : black;">
                  <h4 >${name} </h4> <h4> ${address}</h4> </div>`;

    const divElement = document.createElement('div');
    const viewBtn = document.createElement('div');
    viewBtn.innerHTML = `<button style="border: 1px solid gray; width:'400px';" > View </button>`;
    divElement.innerHTML = innerHtmlContent;
    divElement.appendChild(viewBtn);

    viewBtn.addEventListener('click', (e) => {
      // alert( arry3[i]);
      this.router.navigate(['/carwash-details/' + id])
    });

    // marker icon
    var geojson = {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'properties': {
            'message': "this.arry3[i]",
            'iconSize': [45, 45]
          },
          'geometry': {
            'type': 'Point',

          }
        },
      ]
    };

    var map = this.map

    geojson.features.forEach(function (marker) {
      // create a DOM element for the marker
      var el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundImage = el.style.backgroundImage = 'url(https://placekitten.com/g/' +
        marker.properties.iconSize.join('/') +
        '/)';
      el.style.width = marker.properties.iconSize[0] + 'px';
      el.style.height = marker.properties.iconSize[1] + 'px';

      // converting address to coodinates
      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken = 'pk.eyJ1IjoidGVhcnoiLCJhIjoiY2toa2dqcmM3MWIwNjJ5cDlqazhyYzdteiJ9.jYlNVUpq4tkE1jva-mtyqg' });
      mapboxClient.geocoding
        .forwardGeocode({
          query: address,
          autocomplete: false,
          limit: 1
        })
        .send()
        .then(function (response) {
          if (
            response &&
            response.body &&
            response.body.features &&
            response.body.features.length
          ) {
            var feature = response.body.features[0];

            // Adding the marker to the Map
            new mapboxgl.Marker()
              .setLngLat(feature.center)
              .setPopup(new mapboxgl.Popup({
                offset: 25
              }).setDOMContent(divElement))
              .addTo(map);
          }
        });

    });

  }


}
