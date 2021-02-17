import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var mapboxgl;
declare var MapboxGeocoder;

@Component({
  selector: 'app-property-map',
  templateUrl: './property-map.page.html',
  styleUrls: ['./property-map.page.scss'],
})
export class PropertyMapPage implements OnInit {

  map
  constructor(private router: Router) { }

  ngOnInit() {
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
    this.markers();
    
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

    let arry1 = [28.218370, 28.212370, 28.215370];
    let arry2 = [-25.731340, -25.735340, -25.737340];
    let arry3 = ["Librito flets availeble", "D_head flets availeble", "vivis flets availeble"];

    // 28.218370, -25.731340       



    for (let i = 0; i < 3; i++) {

      const innerHtmlContent = `<div style=" min-width: 600px;font-size: large;color : black;">
                  <h4 >${arry3[i]} </h4> </div>`;

      const divElement = document.createElement('div');
      const viewBtn = document.createElement('div');
      viewBtn.innerHTML = `<button style="border: 1px solid gray; width:'400px';" > View </button>`;
      divElement.innerHTML = innerHtmlContent;
      divElement.appendChild(viewBtn);

      viewBtn.addEventListener('click', (e) => {
        // alert( arry3[i]);
        this.router.navigate(['searched-property'])
      });

      let popUp = new mapboxgl.Popup({ maxWidth: '300px', })

      var marker = new mapboxgl.Marker()
        .setLngLat([arry1[i], arry2[i]])
        .setPopup(new mapboxgl.Popup({
          offset: 25
        }).setDOMContent(divElement)

        )
        .addTo(this.map);
    }




    /*
    
        const name = 'abc';
    const innerHtmlContent = `<div style="min-width: 600px;font-size: large;color : black;">
                <h4 class="h4Class">${name} </h4> </div>`;
    
    const divElement = document.createElement('div');
    const assignBtn = document.createElement('div');
    assignBtn.innerHTML = `<button class="btn btn-success btn-simple text-white" > Assign</button>`;
    divElement.innerHTML = innerHtmlContent;
    divElement.appendChild(assignBtn);
    // btn.className = 'btn';
    assignBtn.addEventListener('click', (e) => {
      console.log('Button clicked' + name);
    });
    
    const popup = new mapboxgl.Popup({
        offset: 25
      })
      .setDOMContent(divElement);
    
    */









  }

  displayType() {

    var layerList = document.getElementById('menu');
    var inputs = layerList.getElementsByTagName('input');

    function switchLayer(layer) {
      var layerId = layer.target.id;
      this.map.setStyle('mapbox://styles/mapbox/' + layerId);
    }

    for (var i = 0; i < inputs.length; i++) {
      inputs[i].onclick = switchLayer;
    }
  }



}
