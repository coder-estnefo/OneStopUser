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

  constructor(private router: Router,
    private _carWashService: CarwashService
  ) { }

  ngOnInit() {

    this.getCarWashes();

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

  }

   // Get properties
   getCarWashes(){
    let id, carwash;
    this._carWashService.getCarwashes().subscribe(
      responses => {
        responses.forEach(response => {
          id = response.payload.doc.id;
          carwash = response.payload.doc.data();
          this.car_washes.push({
            id: id,
            name: carwash.name,
            // favorite: carwash.favorite,
            coordinates: carwash.coordinates,
            images: carwash.images
          });

          var _address;
          var _id,_name ,_img;

          this.car_washes.forEach(a => {

            _address = "";
           /* a.coordinates.forEach(b => {
              _address = _address + " " + b
            });*/
               _address=a.coordinates
              _id=a.id
              _name=a.name
              _img=a.images

            console.log(_address);
            this.convetAddressToCoo(_id,_name,_img,_address);
          });


        });
      }
    )
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
      }))
  }

  controls() {
    this.map.addControl(new mapboxgl.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }));
  }



  convetAddressToCoo(id,name,img,address) {

    const innerHtmlContent = `<div style=" font-size: large;color : black;">
                  <h4 >${name} </h4> </div>`;

    const divElement = document.createElement('div');
    const viewBtn = document.createElement('div');
    viewBtn.innerHTML = `<button style="border: 1px solid gray; width:'400px';" > View </button>`;
    divElement.innerHTML = innerHtmlContent;
    divElement.appendChild(viewBtn);

    viewBtn.addEventListener('click', (e) => {
      // alert( arry3[i]);
      this.router.navigate(['/carwash-details/'+id])
    });

    // "/property-details/{{property.id}}

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



            // Adding the marker to the Map
            new mapboxgl.Marker()
              .setLngLat([address[1],address[0]])
              .setPopup(new mapboxgl.Popup({
                offset: 25
              }).setDOMContent(divElement))
              .addTo(map);



    });

  }











}
