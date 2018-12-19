import 'bulma';
import $ from 'jquery';
import 'bulma-checkradio/dist/bulma-checkradio.min.css';
import '@/assets/css/icons.css';
import * as Cookies from 'js-cookie';

import '@/assets/global.scss';
import './home.scss';
import { RESOLUTION_ARR } from '@/utils/Settings';
import {  server} from '@/utils/Settings';

// eslint-disable-next-line
import Polyfill from '@/utils/Polyfill';
import Validator from '@/utils/Validate';
var weburl = server;
$('#loginshow').click(function () {
    $("#login-form")[0].style.display = "block";
    $("#signup-form")[0].style.display = "none";

})

$("#signupshow").click(function () {
    $("#login-form")[0].style.display = "none";
    $("#signup-form")[0].style.display = "block";


})

$("#signup").click(function () {
    var name = $("#signup-name").val();
    var email = $("#signup-email").val()
    var password = $("#signup-password").val();

    
    $.ajax({
        type: "post",
        url: weburl + "/signup",
        data: { "name": name, "email": email, "password": password },
        error: function (returnval) {
            console.log("Error")

        },
        success: function (returnval) {
            if (returnval === "Success") {
                alert("SignUp Successful. Login to Continue");
                $("#login-form")[0].style.display = "block";
                $("#signup-form")[0].style.display = "none";

            }

        }
    })

})



$("#login").click(function () {
    var email = $("#login-email").val()
    var password = $("#login-password").val();
    if(email === "admin@agora.com" && password === "admin@agora.com")
    {alert("admin")
        localStorage.setItem("admin",true)
        localStorage.setItem("login",true);
        window.location.href= "/admin.html"
    }
    else{
        $.ajax({
            type: "post",
            url: weburl + "/login",
            data: { "email": email, "password": password },
            error: function (returnval) {
                console.log("Error")
    
            },
            success: function (returnval) {
                if (returnval === "Login Success") {
                    localStorage.setItem("login", email)
    
                    window.location.href = "/index.html";
    
                }
    
            }
        })
    }

    

})