import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/app'
import { CarwashService } from 'src/app/services/carwash/carwash.service';

@Component({
  selector: 'app-carwash-appointment',
  templateUrl: './carwash-appointment.page.html',
  styleUrls: ['./carwash-appointment.page.scss'],
})
export class CarwashAppointmentPage implements OnInit {

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  progressVall = 0;
  progressContro = 0;
  selectorVal;
  totalPrice = 0;
  washPrice = 0;
  CarModelPrice = 0;
  collectWashPrice = 0
  collectProgress = 0

  fullWash = 'diactive'
  exterior = 'diactive'
  interior = 'diactive'
  washType
  carModel

  collectWash = 'diactive'
  homeWash = 'diactive'

  carwash_id = this.activatedRoute.snapshot.paramMap.get('id');
  userID = firebase.auth().currentUser.uid;
  carwash = [];


  slideOpts = {
    grabCursor: true,
    autoplay: 1000,
    loop: true,
    speed: 200,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    on: {
      beforeInit: function () {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}cube`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true,
        };

        this.params = Object.assign(this.params, overwriteParams);
        this.originalParams = Object.assign(this.originalParams, overwriteParams);
      },
      setTranslate: function () {
        const swiper = this;
        const {
          $el, $wrapperEl, slides, width: swiperWidth, height: swiperHeight, rtlTranslate: rtl, size: swiperSize,
        } = swiper;
        const params = swiper.params.cubeEffect;
        const isHorizontal = swiper.isHorizontal();
        const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
        let wrapperRotate = 0;
        let $cubeShadowEl;
        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
              $wrapperEl.append($cubeShadowEl);
            }
            $cubeShadowEl.css({ height: `${swiperWidth}px` });
          } else {
            $cubeShadowEl = $el.find('.swiper-cube-shadow');
            if ($cubeShadowEl.length === 0) {
              $cubeShadowEl = swiper.$('<div class="swiper-cube-shadow"></div>');
              $el.append($cubeShadowEl);
            }
          }
        }

        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let slideIndex = i;
          if (isVirtual) {
            slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
          }
          let slideAngle = slideIndex * 90;
          let round = Math.floor(slideAngle / 360);
          if (rtl) {
            slideAngle = -slideAngle;
            round = Math.floor(-slideAngle / 360);
          }
          const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          let tx = 0;
          let ty = 0;
          let tz = 0;
          if (slideIndex % 4 === 0) {
            tx = -round * 4 * swiperSize;
            tz = 0;
          } else if ((slideIndex - 1) % 4 === 0) {
            tx = 0;
            tz = -round * 4 * swiperSize;
          } else if ((slideIndex - 2) % 4 === 0) {
            tx = swiperSize + (round * 4 * swiperSize);
            tz = swiperSize;
          } else if ((slideIndex - 3) % 4 === 0) {
            tx = -swiperSize;
            tz = (3 * swiperSize) + (swiperSize * 4 * round);
          }
          if (rtl) {
            tx = -tx;
          }

          if (!isHorizontal) {
            ty = tx;
            tx = 0;
          }

          const transform$$1 = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${isHorizontal ? slideAngle : 0}deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;
          if (progress <= 1 && progress > -1) {
            wrapperRotate = (slideIndex * 90) + (progress * 90);
            if (rtl) wrapperRotate = (-slideIndex * 90) - (progress * 90);
          }
          $slideEl.transform(transform$$1);
          if (params.slideShadows) {
            // Set shadows
            let shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
        }
        $wrapperEl.css({
          '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-moz-transform-origin': `50% 50% -${swiperSize / 2}px`,
          '-ms-transform-origin': `50% 50% -${swiperSize / 2}px`,
          'transform-origin': `50% 50% -${swiperSize / 2}px`,
        });

        if (params.shadow) {
          if (isHorizontal) {
            $cubeShadowEl.transform(`translate3d(0px, ${(swiperWidth / 2) + params.shadowOffset}px, ${-swiperWidth / 2}px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`);
          } else {
            const shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
            const multiplier = 1.5 - (
              (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
              + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
            );
            const scale1 = params.shadowScale;
            const scale2 = params.shadowScale / multiplier;
            const offset$$1 = params.shadowOffset;
            $cubeShadowEl.transform(`scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${(swiperHeight / 2) + offset$$1}px, ${-swiperHeight / 2 / scale2}px) rotateX(-90deg)`);
          }
        }

        const zFactor = (swiper.browser.isSafari || swiper.browser.isUiWebView) ? (-swiperSize / 2) : 0;
        $wrapperEl
          .transform(`translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${swiper.isHorizontal() ? -wrapperRotate : 0}deg)`);
      },
      setTransition: function (duration) {
        const swiper = this;
        const { $el, slides } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
          $el.find('.swiper-cube-shadow').transition(duration);
        }
      },
    }
  }



  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _carwashService: CarwashService,) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  selectInterior() {

    this.totalPrice = this.totalPrice - this.washPrice;
    if (this.interior == "active") {
      this.interior = 'diactive'
      this.washPrice = this.washPrice - 25
      this.progressVall = this.progressVall - 0.5

    }
    else {
      this.interior = 'active';
      this.washPrice = 25;
      if (this.progressVall < 0.4) {
        this.progressVall = this.progressVall + 0.5;
      }

    }

    this.fullWash = "diactive"
    this.exterior = "diactive"

    this.totalPrice = this.totalPrice + this.washPrice;
  }

  selectExterior() {

    this.totalPrice = this.totalPrice - this.washPrice;
    if (this.exterior == "active") {
      this.exterior = 'diactive'
      this.washPrice = this.washPrice - 35
      this.progressVall = this.progressVall - 0.5
    }
    else {
      this.exterior = 'active';
      this.washPrice = 35;
      if (this.progressVall < 0.4) {
        this.progressVall = this.progressVall + 0.5;
      }
    }

    this.fullWash = "diactive"
    this.interior = "diactive"

    this.totalPrice = this.totalPrice + this.washPrice;

  }


  selectFullWash() {

    this.totalPrice = this.totalPrice - this.washPrice;
    if (this.fullWash == "active") {
      this.fullWash = 'diactive'
      this.washPrice = this.washPrice - 50
      this.progressVall = this.progressVall - 0.5
    }
    else {
      this.fullWash = 'active';
      this.washPrice = 50;
      if (this.progressVall < 0.4) {
        this.progressVall = this.progressVall + 0.5;
      }
    }
    this.interior = "diactive"
    this.exterior = "diactive"

    this.totalPrice = this.totalPrice + this.washPrice;

  }

  collectW() {

    this.totalPrice = this.totalPrice - this.collectWashPrice;
    if (this.collectWash == "active") {
      this.collectWash = 'diactive'
      this.collectWashPrice = this.collectWashPrice - 15

    }
    else {
      this.collectWash = 'active';
      this.collectWashPrice = 15
    }

    this.homeWash = "diactive";


    this.totalPrice = this.totalPrice + this.collectWashPrice;

  }


  homeW() {

    this.totalPrice = this.totalPrice - this.collectWashPrice;
    if (this.homeWash == "active") {
      this.homeWash = 'diactive';
      this.collectWashPrice = this.collectWashPrice - 20;

      this.progressVall = this.progressVall - 0.2;
      this.collectProgress = this.collectProgress - 0.2;

    }
    else {
      this.homeWash = 'active';

      this.collectWashPrice = 20;

    }


    this.collectWash = "diactive"

    this.totalPrice = this.totalPrice + this.collectWashPrice;


  }

  getval(val) {
    // console.log(val)
    this.progressVall = this.progressVall - this.progressContro;
    this.progressContro = 0.2;
    switch (val) {
      case '01':
        this.totalPrice = this.totalPrice - this.CarModelPrice;
        this.CarModelPrice = 30;
        this.totalPrice = this.totalPrice + this.CarModelPrice;

        this.carModel = "Sedan";

        break;
      case '02':
        this.totalPrice = this.totalPrice - this.CarModelPrice;
        this.CarModelPrice = 25;
        this.totalPrice = this.totalPrice + this.CarModelPrice;
        this.carModel = "Station wagon";

        break;
      case '03':
        this.totalPrice = this.totalPrice - this.CarModelPrice;
        this.CarModelPrice = 40;
        this.totalPrice = this.totalPrice + this.CarModelPrice;
        this.carModel = "HatchBack";

        break;
      case '04':
        this.totalPrice = this.totalPrice - this.CarModelPrice;
        this.CarModelPrice = 45;
        this.totalPrice = this.totalPrice + this.CarModelPrice;
        this.carModel = "Minivan";

        break;
      case '05':
        this.totalPrice = this.totalPrice - this.CarModelPrice;
        this.CarModelPrice = 55;
        this.totalPrice = this.totalPrice + this.CarModelPrice;
        this.carModel = "Bus";

        break;
      case '06':
        this.totalPrice = this.totalPrice - this.CarModelPrice;
        this.CarModelPrice = 55;
        this.totalPrice = this.totalPrice + this.CarModelPrice;

        this.carModel = "Truck";

        break;

      default:
        break;
    }
    this.progressVall = this.progressVall + this.progressContro;
  }


  sendRequest() {

    let id, temp_carwash;
    this._carwashService.getCarwashById(this.carwash_id).subscribe(
      response => {
        id = response.payload.id;
        temp_carwash = response.payload.data();
        this.carwash.push(temp_carwash)

        this.carwash.forEach(data => {
          console.log(data)
          this.startChat(id, data.ownerID, data.name)
        })
      }

    )
  }

  //  this.router.navigate(['tabs-pages/tabs/dashboard'])

  startChat(id, ownerID, carWashName) {

    const from = this.userID;
    const to = ownerID;
    const message = 'I am interested in Washing  : ' + carWashName;
    const date = new Date();
    const time = date.getHours() + ':' + date.getMinutes();
    // const senderName = this.userDetails.name;
    const chat = { id, message, from, to, time, date };

    if (this.fullWash === 'active') {
      this.washType = "fullWash"
    }
    if (this.exterior === 'active') {

      this.washType = "Exterior"
    }
    if (this.interior === 'active') {
      this.washType = "Interior"
    }

    this.router.navigate(['/carwash-messages/' + ownerID], {
      queryParams: {
        carwashID: id,
        userID: from,
        sendTo: to,
        carwashName: carWashName,
        carPrice: this.totalPrice,
        washType: this.washType,
        carModel: this.carModel
      },
    });

  }

}
