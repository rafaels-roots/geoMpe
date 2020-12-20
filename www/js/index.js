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

         if (navigator.Fonts) 
         {
            console.log("Fonts object in navigator");
            navigator.Fonts.getFontList(
                function (fontList) {
                    if (fontList) {
                        for (var i = 0; i < fontList.length; i++) {
                            console.log("Font: " + fontList[i]);
                        }
                    }
                },
                function (error) {
                    console.log("FontList error: " + error);
                }
            );
        } else {
            console.log("Plugin error: Fonts plugin not found (is it installed?)");
        }

        navigator.Fonts.getDefaultFont(
        function (defaultFont) {
            if (defaultFont) {
                console.log("Default Font: " + defaultFont);
            }
        },
        function (error) {
            console.log("DefaultFont error: " + error);
        }
    );

        //app.receivedEvent('deviceready');
        /*try {
            ;    
        }
        catch(err) {
            console.log(err);
        }*/
        
        //this.enableGeo();
        
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

            app.backFetch( wparam );              

        }, function(error) 
        {
            alert(error.code);
        }, 
        { enableHighAccuracy : true, timeout : 5000, maximunAge : 0} ); 
    },
    backFetch : async function(wres) 
    {
        console.log("https://www.elohimsystems.com.br/pwa/processa.php?"+wres);
        const request = await fetch( "https://www.elohimsystems.com.br/pwa/processa.php?"+wres );

        const response = await request.json();
        


    }

};

