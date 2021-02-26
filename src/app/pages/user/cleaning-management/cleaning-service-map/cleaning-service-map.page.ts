import { Component, OnInit } from '@angular/core';
import {  ICleaning, IProperty } from 'src/app/structures/interfaces';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { $ } from 'protractor';
import { Router } from '@angular/router';
import { CarwashService } from 'src/app/services/carwash/carwash.service';
import { CleaningService } from 'src/app/services/cleaning/cleaning.service';
declare var mapboxgl;
declare var MapboxGeocoder;
declare var mapboxSdk;

@Component({
  selector: 'app-cleaning-service-map',
  templateUrl: './cleaning-service-map.page.html',
  styleUrls: ['./cleaning-service-map.page.scss'],
})
export class CleaningServiceMapPage implements OnInit {
 
  map: any;
  address = [];
  // properties: IProperty[] = [];
  cleaningServise:ICleaning[]=[];

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 10,
  };


  constructor(private router: Router,
    private _propertyService: PropertiesService,
    private _cleaningService: CleaningService,
  ) { }

  ngOnInit() {

    this.getProperties();

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
  getProperties() {
    let uid, servise;
    this._cleaningService.getCleaningServices().subscribe(
      responses => {
        responses.forEach(response => {
          uid = response.payload.doc.id;
          servise = response.payload.doc.data();
          this.cleaningServise.push({
            id: uid,
            name: servise.name,
            address:servise.location,
            images: servise.images,
            favorite:servise.favorite
          })


          var _address;
          var _id,_name ,_img;

          this.cleaningServise.forEach(a => {

            console.log(a);
            
           /* _address = "";
            a.address.forEach(b => {
              _address = _address + " " + b
            });
              _id=a.id
              _name=a.name
              _img=a.images

            console.log(_address);*/
            // this.convetAddressToCoo(_id,_name,_img,_address);
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
                  <h4 >${name} </h4> <h4> ${address}</h4> </div>`;

    const divElement = document.createElement('div');
    const viewBtn = document.createElement('div');
    viewBtn.innerHTML = `<button style="border: 1px solid gray; width:'400px';" > View </button>`;
    divElement.innerHTML = innerHtmlContent;
    divElement.appendChild(viewBtn);

    viewBtn.addEventListener('click', (e) => {
      // alert( arry3[i]);
      this.router.navigate(['/property-details/'+id])
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
