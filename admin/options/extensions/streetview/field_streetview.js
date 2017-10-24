/*
 Streetview field
 */

/*global jQuery, document, redux_change, redux*/

(function( $ ) {
    'use strict';
    


    $(function(){
        
        google.maps.event.addListener( $.pfcormarker, 'dragend', function ( event )
        {
          $.pfstmapdestroy();
          $.pfstmapregenerate();
          $.panoramamap.setCenter(event.latLng);
          $.pfpanorama.setPosition(event.latLng);
        } );


        $.pfstmapregenerate = function(){
          var current_heading = parseFloat($("#webbupointfinder_item_streetview-heading").val());
          var current_pitch = parseFloat($("#webbupointfinder_item_streetview-pitch").val());
          var current_zoom = parseInt($("#webbupointfinder_item_streetview-zoom").val());

          var pfitemcoordinatesLat = parseFloat($("#pfitempagestreetviewMap").data('pfcoordinateslat'));
          var pfitemcoordinatesLng = parseFloat($("#pfitempagestreetviewMap").data('pfcoordinateslng'));
          var pfitemzoom = parseInt($("#pfitempagestreetviewMap").data('pfzoom'));
          var testcoors = [pfitemcoordinatesLat,pfitemcoordinatesLng];
          var pfitemcoordinates_output = new google.maps.LatLng(testcoors[0],testcoors[1]);

          var defaultLoc;
          defaultLoc = $('.rwmb-map-canvas').data( 'default-loc');

          var defaultloc = defaultLoc ? defaultLoc.split( ',' ) : [40.71275, -74.00597];
          var defaultlocl = new google.maps.LatLng( defaultloc[0], defaultloc[1] );

          var curlatLng = (pfitemcoordinatesLat)? pfitemcoordinates_output:defaultlocl;

          if (current_heading != 0 && current_pitch != 0) {
          $('.pfitempagestreetview').remove();
          
          $("#pfitempagestreetviewMap").gmap3({
            map:{
              options:{
                zoom: pfitemzoom, 
                mapTypeId: google.maps.MapTypeId.ROADMAP, 
                streetViewControl: true, 
                center: pfitemcoordinates_output 
              },
              callback:function(map){
                $.panoramamap = map;
              }
            },    
            streetviewpanorama:{
              options:{
                id: "streetviewpanorama",
                container: $(document.createElement("div")).addClass("pfitempagestreetview").insertAfter($("#pfitempagestreetviewMap")),
                opts:{
                  position: pfitemcoordinates_output,
                  pov: {
                    heading: current_heading,
                    pitch: current_pitch,
                    zoom: current_zoom
                  }
                }
              },
              events:{
                pov_changed:function(marker, event, context){
                  $.pfmapHeading = marker.pov.heading;
                  $.pfmapPitch = marker.pov.pitch;
                  $.pfmapZoom = marker.pov.zoom;

                  $("#webbupointfinder_item_streetview-heading").val($.pfmapHeading);
                  $("#webbupointfinder_item_streetview-pitch").val($.pfmapPitch)
                  $("#webbupointfinder_item_streetview-zoom").val($.pfmapZoom)
                }
              },
              callback:function(panorama){
                  $.pfpanorama = panorama;
                  $.pfmapHeading = panorama.pov.heading;
                  $.pfmapPitch = panorama.pov.pitch;
                  $.pfmapZoom = panorama.pov.zoom;
              }
            }
          });
        
        }else{
          $("#pfitempagestreetviewMap").gmap3({
            map:{
              options:{
                zoom: pfitemzoom, 
                mapTypeId: google.maps.MapTypeId.ROADMAP, 
                streetViewControl: true, 
                center: curlatLng 
              },
              callback:function(map){
                $.panoramamap = map;
              }
            },    
            streetviewpanorama:{
              options:{
                id: "streetviewpanorama",
                container: $(document.createElement("div")).addClass("pfitempagestreetview").insertAfter($("#pfitempagestreetviewMap")),
                opts:{
                  position: curlatLng,
                  pov: {
                    heading: 90,
                    pitch: 5,
                    zoom: 1
                  }
                }
              },
              events:{
                pov_changed:function(marker, event, context){
                  $.pfmapHeading = marker.pov.heading;
                  $.pfmapPitch = marker.pov.pitch;
                  $.pfmapZoom = marker.pov.zoom;

                  $("#webbupointfinder_item_streetview-heading").val($.pfmapHeading);
                  $("#webbupointfinder_item_streetview-pitch").val($.pfmapPitch)
                  $("#webbupointfinder_item_streetview-zoom").val($.pfmapZoom)
                }
              },
              callback:function(panorama){
                  $.pfpanorama = panorama;
                  $.pfmapHeading = panorama.pov.heading;
                  $.pfmapPitch = panorama.pov.pitch;
                  $.pfmapZoom = panorama.pov.zoom;
              }
            }
          });
        };
        }

        $.pfstmapdestroy = function(){
          $('#pfitempagestreetviewMap').gmap3('destroy').html('<div id="pfitempagestreetviewMap"></div>');
          $('.pfitempagestreetview').remove();
        }


        setTimeout(function(){
          console.log("run");
          $.pfstmapregenerate();
        }, 3000);
        

    })

    
    
})( jQuery );
