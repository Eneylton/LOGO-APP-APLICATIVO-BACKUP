import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, IonicPage } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage({})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public storage: Storage, public alertCtrl: AlertController) {

    this.username = "";
    this.password = "";

  }

  openPage(pageName: string){
    if(pageName == "signup"){
      this.navCtrl.push('Signup');
    }
  }

  login(){

    this.http.get("https://purezaweb.com/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.password)
    .subscribe( (res) => {
      console.log(res.json());

      let response = res.json();

      if(response.error){
        this.toastCtrl.create({
          message: response.error,
          duration: 5000
        }).present();
        return;
      }


      this.storage.set("userLoginInfo", response).then( (data) =>{

        this.alertCtrl.create({
          title: "Parabéns",
          message: "Login realizado com sucesso.",
          buttons: [{
            text: "OK",
            handler: () => {
              if(this.navParams.get("next")){
                this.navCtrl.push(this.navParams.get("next"));
              } else {
                this.navCtrl.pop();
              }
            }
          }]
        }).present();


      })




    });


  }

}
