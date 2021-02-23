import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { AngularFireAuth } from '@angular/fire/auth'
import { IProperty } from 'src/app/structures/interfaces';
import { PropertiesService } from 'src/app/services/properties/properties.service';
import { $ } from 'protractor';
declare var mapboxgl;
declare var MapboxGeocoder;
declare var mapboxSdk;

@Component({
  selector: 'app-property-map',
  templateUrl: './property-map.page.html',
  styleUrls: ['./property-map.page.scss'],
})
export class PropertyMapPage implements OnInit {

  map: any;
  address = [];
  properties: IProperty[] = [];

  options = {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 10,
  };


  constructor(private router: Router,
    private userservice: UserService,
    private _propertyService: PropertiesService,
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
    let uid, property;
    this._propertyService.getProperties().subscribe(
      responses => {
        responses.forEach(response => {
          uid = response.payload.doc.id;
          property = response.payload.doc.data();
          this.properties.push({
            id: uid,
            name: property.name,
            address: property.location,
            images: property.images,
            price: property.price,
            garages: property.garages,
            bedrooms: property.bedrooms,
            bathrooms: property.bathrooms,
            description: property.description,
            availability_status: property.availability,
            features: property.features,
            favorite: property.favorite
          })

          var _address;
          var _id,_name ,_img;

          this.properties.forEach(a => {
            
            _address = "";
            a.address.forEach(b => {
              _address = _address + " " + b
            });
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
