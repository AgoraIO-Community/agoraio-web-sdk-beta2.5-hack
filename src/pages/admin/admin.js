import 'bulma';
import $ from 'jquery';
import 'bulma-checkradio/dist/bulma-checkradio.min.css';
import '@/assets/css/icons.css';
import * as Cookies from 'js-cookie';

import '@/assets/global.scss';
import './admin.scss';
import { RESOLUTION_ARR ,server} from '@/utils/Settings';
// eslint-disable-next-line
import Polyfill from '@/utils/Polyfill';
import Validator from '@/utils/Validate';
// if(localStorage.getItem('admin')!= "true")
// {
//   window.location.href='/home.html'
// }

window.onload = function () {
    
    $.ajax({
        type: "get",
        url: server + "/users",
        error: function (returnval) {
            console.log("Error")

        },
        success: function (returnval) {
            console.log(returnval);
            var users= document.getElementById("Users")
           

            for ( var i=0;i<returnval.length;i++)
            {
                var element = document.createElement("tr");
                element.innerHTML = "<td>"+i+1+"</td>"+"<td>"+returnval[i]['name']+"<td>"+returnval[i]['email']+"</td>"+"<td>"+returnval[i]['rooms']+"</td>"+"<td><input id="+i+"><button id='addroom'>Add Room</button></td>"+"</td>"+"<td><input id="+i+"><button id='deleteroom'>Remove Room</button></td>";
                users.appendChild(element)

            }
            $("#addroom").click(function(event){
                var roomname = event.target.parentElement.querySelector('input').value;
                var useremail = returnval[event.target.parentElement.querySelector('input').id]['email'] ;
                $.ajax({
                    type: "post",
                    url: server + "/addroom",
                    data: { "room": roomname, "email": useremail },

                    error: function (returnval) {
                        console.log("Error")
            
                    },
                    success: function (returnval) {
                        if(returnval === "Updated")
                        {
                            alert("User Updated")
                        }

                        location.reload(true);
                    }
                })
                
        }) 
        
        $("#deleteroom").click(function(event){
            var roomname = event.target.parentElement.querySelector('input').value;
            var useremail = returnval[event.target.parentElement.querySelector('input').id]['email'] ;
            $.ajax({
                type: "post",
                url: server + "/deleteroom",
                data: { "room": roomname, "email": useremail },

                error: function (returnval) {
                    console.log("Error")
        
                },
                success: function (returnval) {
                    if(returnval === "Updated")
                    {
                        alert("User Updated")
                        location.reload(true)

                    }
                  

    
                }
            })
            
    }) 
        }
    });
   
   
}

if(localStorage.getItem('admin')!= "true")
{
  window.location.href='/home.html'
}