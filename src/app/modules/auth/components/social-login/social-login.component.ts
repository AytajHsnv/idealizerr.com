import { Component, OnInit } from '@angular/core';

// declare const FB: any;

//======================================================================
@Component({
  selector: 'social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})//======================================================================



export class SocialLoginComponent implements OnInit {
//======================================================================

  constructor() { }

//======================================================================

  ngOnInit() {}
//   ngOnInit() {
// /*

// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId            : 'your-app-id',
//       autoLogAppEvents : true,
//       xfbml            : true,
//       version          : 'v7.0'
//     });
//   };
// </script>
// <script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
// */
//     let connect = document.createElement("script");
//     connect.innerHTML = `
//     window.fbAsyncInit = function() {
//       FB.init({
//         appId            : '267399887968182',
//         autoLogAppEvents : true,
//         version          : 'v7.0'
//       });
//     };
//     `;
//     let def = document.createElement("script");
//     def.async = true;
//     def.defer = true;
//     def.src = 'https://connect.facebook.net/en_US/sdk.js';
//     document.querySelector("#login-sdks-load").appendChild(connect);
//     document.querySelector("#login-sdks-load").appendChild(def);
//   }

//   fbLogin() {
//     FB.login(function(response) {
//       if (response.authResponse) {
//        console.log('Welcome!  Fetching your information.... ');
//        FB.api('/me?fields=id,first_name,last_name,email,picture', function(response) {
//          console.log(response);
//        });
//       } else {
//        console.log('User cancelled login or did not fully authorize.');
//       }
//     });
//   }

}//======================================================================
