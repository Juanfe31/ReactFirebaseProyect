import React from 'react'
import {ColorRing}from 'react-loader-spinner';

export default function Loading() {
  return (
    <div>
        <ColorRing
        colors={['#44f11e', '#71ac49', '#AAFF00', '#32CD32', '#228B22']}
        //height={100}
        //width={100}
        />
    </div>
  )
}