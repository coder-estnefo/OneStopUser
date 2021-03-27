import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { UserService } from 'src/app/services/user/user.service';
import { finalize } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { IUser } from 'src/app/structures/interfaces';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userID;

  user: any;
  user_details: IUser;
  frm_profile: FormGroup;
  addressForm: FormGroup;
  spinner: boolean = false;

  imageUpload = false;
  image;

  showAddress = false;
  showEditAddress = false;

  userLocation = ['' , '', '', ''];

  constructor(
    public route: Router,
    private formBuilder: FormBuilder,
    private _userService: UserService,
    private fireAuth: AngularFireAuth,
    private profileService: ProfileService,
    private storage: AngularFireStorage
    ) { }

  goConfirm(){
    this.route.navigateByUrl('confirm')
  }

  ngOnInit() {
    // this.user = this.profileService;

    this.fireAuth.onAuthStateChanged(user => {
      if(user){
        this.userID = user.uid;
        this.getUser(this.userID);
      }
    });
    this.createForm();
    this.createAddressForm();
  }

  createForm() {
		this.frm_profile = this.formBuilder.group({
			name: new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$')])),
		});
	}

  getUser(user_id: string){
    this._userService.getUser(user_id).subscribe(
      response => {
        this.user_details = response.payload.data() as IUser;

        if(this.user_details.hasOwnProperty('location')) {
          this.showAddress = true;
          this.showEditAddress = false;
        } else {
          this.showAddress = false;
          this.showEditAddress = true;
        }
      }
    )
  }

  updateProfile(){
    this.spinner = true;

    console.log(this.frm_profile.value);
  }

  uploadFile(event) {
    this.imageUpload = true;
    const file = event.target.files[0];
    //this.imagesList.push(file);

    const fileName = file.name;
    const fileExt = fileName.split('.').pop();
    const filename = Math.random().toString(36).substring(2) + '.' + fileExt;
    const filePath = 'profiles/' + filename;
    const task = this.storage.upload(filePath, file);
    const ref = this.storage.ref(filePath);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((downloadURL) => {
            this.image = downloadURL;
            this.imageUpload = false;
          });
        })
      )
      .subscribe();
  }

  updateImage() {
    this._userService.updateImage(this.userID, this.image);
  }

  createAddressForm() {
    console.log(this.user_details)
    this.addressForm = this.formBuilder.group({
      location: this.formBuilder.array([
        ['', [Validators.required, Validators.pattern('^[0-9 A-Z a-z]+$')]],
        ['', [Validators.required, Validators.pattern('^[A-Z a-z]+$')]],
        ['', [Validators.required, Validators.pattern('^[A-Z a-z]+$')]],
        ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      ]),
    })
  }

  editAddress() {
    if(this.user_details.hasOwnProperty('location')) {
      this.showAddress = !this.showAddress;
      this.showEditAddress = !this.showEditAddress;
      let address = this.user_details.location;
      this.addressForm.controls['location'].setValue(address);

    } else {
      this.showAddress = false;
      this.showEditAddress = true;
    }
  }

  updateAddress(){
    const address = this.addressForm.value.location;
    this._userService
      .updateAddress(this.userID, address)
      .then(() => {
        this.editAddress(); 
      })
  }
}
