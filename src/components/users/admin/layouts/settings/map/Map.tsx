import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import React from "react";

export const Map = withScriptjs(withGoogleMap((props: any) =>
    <GoogleMap
        defaultZoom={8}
        options={{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false
        }}
        onClick={props.clickMap}
        defaultCenter={{lat: 41.29242, lng: 69.27517}}
        center={props.mapPosition}
    >
        {props.isMarkerShown && <Marker position={props.position}/>}
    </GoogleMap>
));
