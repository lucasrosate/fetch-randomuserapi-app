import React, { CSSProperties, useRef, useEffect, useState } from 'react';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
import store from '../../store/store';
import { map, marker } from 'leaflet';
import style from '../../styles/locationmap.module.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN;



const RenderMapLocation: React.FC = () => {

    // state for longitude
    var [lng, _setLng] = useState(0);

    // state for latitude
    var [lat, _setLat] = useState(0);

    // state for zoom
    var [zoom, _setZoom] = useState(7);

    // state for map container
    var [mapLocation, setMapLocation] = useState<Map>(null);

    // state for the dynamic marker
    var [markerUser, setMarkerUser] = useState<Marker>(null);


    // These 3 pass ref to map config during re-render after when position changes
    const lngRef = useRef(null);
    const latRef = useRef(null);
    const zoomRef = useRef(null);

    const setLng = (newValue: number) => {
        _setLng(newValue);
        lngRef.current = newValue
    }

    const setLat = (newValue: number) => {
        _setLat(newValue);
        latRef.current = newValue
    }

    const setZoom = (newValue: number) => {
        _setZoom(newValue);
        zoomRef.current = newValue
    }

    const mapContainerRef = useRef(null);



    // Initialize Map on first render
    useEffect(() => {
            const newMap: Map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center:  [lngRef.current, latRef.current],
                zoom: zoom,
                minZoom: 3,
            });

            newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');

            newMap.on('move', () => {
                setLng(parseFloat(newMap.getCenter().lng.toFixed(4)));
                setLat(parseFloat(newMap.getCenter().lat.toFixed(4)));
                setZoom(parseFloat(newMap.getZoom().toFixed(2)));
            });


            setMapLocation(newMap);

            let marker = new Marker({
                color: "#dd4747"
            });
            marker.setLngLat([0,0])
            marker.addTo(newMap);
            setMarkerUser(marker)
    

    }, [])

    // Called when coordinates from store (is not called when user moves the with mouse)
    useEffect(() => {
            let lngNumber: number = parseFloat(parseFloat(store.getState().user.location.coordinates.longitude).toFixed(4));
            let latNumber: number = parseFloat(parseFloat(store.getState().user.location.coordinates.latitude).toFixed(4));
            setLng(lngNumber);
            setLat(latNumber);

            // Prevent zoom decreases so much
            setZoom(5);

            // Convert lat, lon from SI to LngLat unit that mapbox-gl accepts
            let convertedLngLat = mapboxgl.LngLat.convert([lngNumber, latNumber]);

            // Changed position it's necessary make the map to move from old location to new location
            mapLocation?.flyTo({
                center: mapboxgl.LngLat.convert([convertedLngLat.lng, convertedLngLat.lat]),
                speed: 2.5,
                minZoom: 4,
            })

            // Change Marker location
            markerUser?.setLngLat([convertedLngLat.lng, convertedLngLat.lat])

       

        // useEffect dependencies (coordinates from store)
    }, [store.getState().user.location.coordinates.latitude, store.getState().user.location.coordinates.latitude])

    return (
        <div>
            <div>
                <div className='sidebarStyle'>
                    <div className={style.coordinateLabel}>
                        <div><b>Longitude:</b>  {parseFloat(lngRef.current).toFixed(2)}</div>
                        <div><b>Latitude:</b>  {parseFloat(latRef.current).toFixed(2)}</div>
                        <div><b>Zoom:</b> {parseFloat(zoomRef.current).toFixed(2)}</div>
                    </div>
                </div>

                {/* As mapbox-gl document says, it must have a container ref equals to mapbox-gl config when initialized */}
                <div className={style.mapContainer} ref={mapContainerRef} />
            </div>
        </div>
    )
}

export default RenderMapLocation;