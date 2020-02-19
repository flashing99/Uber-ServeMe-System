import { Component, OnInit } from '@angular/core';
import { AlertController} from '@ionic/angular'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    public alertController: AlertController,
  ) { }

  ngOnInit() {
  }
  
  async clearHistory() {
    const alert = await this.alertController.create({
      message: 'Clear all your keyword, location and recent history?',
      buttons: ['Cancel', 'OK']
    })
   await alert.present()
  }

  async locationAccess() {
    const alert = await this.alertController.create({
      message: 'Enable location services on Uber SMS?',
      buttons: ['Cancel', 'OK']
    })
   await alert.present()
  }

}
