'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@material-tailwind/react'
import {
  Configurator,
  DashboardNavbar,
  Footer,
  Sidebar,
} from '../components/layouts'
import routes from './routes'
import { setOpenConfigurator } from '@/lib/redux/reducers/dashboard'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'

export function DashboardAdmin({ children }) {
  const dispatch = useDispatch()
  const { sidenavType, openSidenav } = useSelector((state) => state.dashboard)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    dashboardNavbarRender()
  }, [])

  const dashboardNavbarRender = () => {
    if (typeof document !== 'undefined') setLoaded(true)
  }

  return (
    loaded && (
      <div className={`bg-blue-gray-50/50 grid min-h-screen grid-cols-12`}>
        <Sidebar
          routes={routes}
          brandImg={
            sidenavType === 'dark'
              ? '/img/logo-ct.png'
              : '/img/logo-ct-dark.png'
          }
        />
        <div
          className={`p-4 xl:ml-80 ${openSidenav ? 'col-span-9 col-start-3' : 'col-span-12'}`}
        >
          <DashboardNavbar />
          <Configurator />
          <Button
            size="lg"
            color="white"
            className="shadow-blue-gray-900/10 fixed bottom-8 right-8 z-40 flex items-center justify-center rounded-full"
            ripple={false}
            onClick={() => {
              dispatch(setOpenConfigurator(true))
            }}
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </Button>
          <div className={``}>{children}</div>
          <div className="text-blue-gray-600">
            <Footer />
          </div>
        </div>
      </div>
    )
  )
}

export default DashboardAdmin
