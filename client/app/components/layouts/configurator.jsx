'use client'
import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button, Switch, Typography } from '@material-tailwind/react'
import {
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from '@/lib/redux/reducers/dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { sidenavColors } from '@/app/constants/colors'

function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces)

  const abbrev = ['K', 'M', 'B', 'T']

  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3)

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1
        i++
      }

      number += abbrev[i]

      break
    }
  }

  return number
}

export function Configurator() {
  const dispatch = useDispatch()
  const { sidenavColor, sidenavType, fixedNavbar, openConfigurator } =
    useSelector((state) => state.dashboard)

  return (
    <aside
      className={`fixed right-0 top-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? 'translate-x-0' : 'translate-x-96'
      }`}
    >
      <div className="flex items-start justify-between px-6 pb-6 pt-8">
        <div>
          <Typography variant="h5" color="blue-gray">
            Dashboard Configurator
          </Typography>
          <Typography className="text-blue-gray-600 font-normal">
            See our dashboard options.
          </Typography>
        </div>
        <Button
          variant="text"
          color="blue-gray"
          onClick={() => {
            dispatch(setOpenConfigurator(false))
          }}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </Button>
      </div>
      <div className="px-6 py-4">
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            Sidenav Colors
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(sidenavColors).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  sidenavColors[color]
                } ${
                  sidenavColor === color ? 'border-black' : 'border-transparent'
                }`}
                onClick={() => dispatch(setSidenavColor(color))}
              />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            Sidenav Types
          </Typography>
          <Typography variant="small" color="gray">
            Choose between 3 different sidenav types.
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant={sidenavType === 'dark' ? 'gradient' : 'outlined'}
              onClick={() => dispatch(setSidenavType('dark'))}
            >
              Dark
            </Button>
            <Button
              variant={sidenavType === 'transparent' ? 'gradient' : 'outlined'}
              onClick={() => dispatch(setSidenavType('transparent'))}
            >
              Transparent
            </Button>
            <Button
              variant={sidenavType === 'white' ? 'gradient' : 'outlined'}
              onClick={() => dispatch(setSidenavType('white'))}
            >
              White
            </Button>
          </div>
        </div>
        <div className="mb-12">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Navbar Fixed
            </Typography>
            <input
              className="checked:bg-primary checked:after:bg-primary checked:focus:border-primary checked:focus:bg-primary dark:checked:bg-primary dark:checked:after:bg-primary mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type="checkbox"
              role="switch"
              value={fixedNavbar}
              onChange={() => dispatch(setFixedNavbar(!fixedNavbar))}
              id="flexSwitchCheckDefault"
            />
          </div>
          <hr />
        </div>
        <div className="text-center">
          <Typography variant="h6" color="blue-gray">
            Thank you for sharing ❤️
          </Typography>
          <div className="mt-4 flex justify-center gap-2">
            <Button variant="gradient" className="flex items-center gap-2">
              <i className="fa-brands fa-twitter text-white" />
              Tweet
            </Button>
            <Button variant="gradient" className="flex items-center gap-2">
              <i className="fa-brands fa-facebook text-white" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}

Configurator.displayName = '/src/widgets/layout/configurator.jsx'

export default Configurator
