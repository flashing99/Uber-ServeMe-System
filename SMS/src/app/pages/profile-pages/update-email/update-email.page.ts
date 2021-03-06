import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ToastController, IonInput } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Keyboard } from '@ionic-native/keyboard/ngx'

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.page.html',
  styleUrls: ['./update-email.page.scss'],
})
export class UpdateEmailPage implements OnInit {

  @ViewChild('myInput', {static: true}) myInput: IonInput;

  sub
  mainuser: AngularFirestoreDocument
  email: string;

  busy: boolean = false

  constructor(
		private router: Router,
		private toastController: ToastController,
    private afs: AngularFirestore,
    public user: UserService,
    public afAuth: AngularFireAuth,
    public keboard: Keyboard,
  ) { 
    this.mainuser = afs.doc(`users/${afAuth.auth.currentUser.uid}`)
    this.sub = this.mainuser.valueChanges().subscribe(event => {
			this.email = event.email
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 200)
  }

  // ngOnDestroy() {
	// 	this.sub.unsubscribe()
  // }
  
  async presentAlert(content: string) {
		const alert = await this.toastController.create({
			message: content,
      duration: 2000,
      position: 'top'
		})

		await alert.present()
	}

  async updateDetails() {
		this.busy = true

		if(this.email !== this.user.getUserEmail()) {
			await this.user.updateEmail(this.email)
			this.mainuser.update({
				email: this.email
			})
		}

		this.busy = false

		await this.presentAlert('Your profile was updated!')

		this.router.navigate(['/home/me/profile'])
	}

}
