import Head from 'next/head';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';


interface Props {
    lng: number,
    lat: number,
    zoom: number,
    updateLocation: Function
}

const style: CSSProperties = {
    width: "500px",
    height: "500px"
}

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN;

const LocationMap: React.FC<Props> = ({lng, lat, updateLocation, zoom}) => {
    const mapContainerRef = useRef(null);



    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [lng, lat],
            zoom: zoom
        })


        map.addControl(new mapboxgl.NavigationControl(), 'top-right');



        map.on('move', () => {
            updateLocation(parseFloat(map.getCenter().lng.toFixed(4)), 
            parseFloat(map.getCenter().lat.toFixed(4)),
            parseFloat(map.getZoom().toFixed(2)))
        })

    }, [])

    return (
        <>
            <div>
                Longitude: {lng}    Latitude: {lat}     Zoom: {zoom}
            </div>
            <div className='map-container' ref={mapContainerRef} style={style} />
        </>
    )
}

export default LocationMap;