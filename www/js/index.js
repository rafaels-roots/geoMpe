/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
   
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
   
    onDeviceReady: function() {

        app.receivedEvent('deviceready');
        
    },
   
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        this.enableGeo();
    },

    enableGeo: function() 
    {
       navigator.geolocation.watchPosition( function(position) 
        {
            const d = new Date();
            const wparam = "lat="+position.coords.latitude+
                        "&lng="+position.coords.longitude+
                        "&dt="+d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+" "+d.getHours()+ ":" + d.getMinutes() + ":" + d.getSeconds()+
                        "&action=f_insert";

            console.log("passei aqui");

            app.backFetch( wparam );              

        }, function(error) 
        {
            alert(error.code);
        }, 
        { enableHighAccuracy : true, timeout : 5000, maximunAge : 0} ); 
    },
    backFetch : async function(wres) 
    {
        console.log("pwa/processa.php?"+wres);
        const request = await fetch( "https://www.elohimsystems.com.br/pwa/processa.php?"+wres );

        const response = await request.json();
        console.log(response);


    }

};

