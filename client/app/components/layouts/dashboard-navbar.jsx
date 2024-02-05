'use client'
import Link from 'next/link'
import {
  Navbar,
  Typography,
  Button,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from '@material-tailwind/react'
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
} from '@heroicons/react/24/solid'
import {
  setOpenConfigurator,
  setOpenSidenav,
} from '@/lib/redux/reducers/dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'

export function DashboardNavbar() {
  const dispatch = useDispatch()
  const { fixedNavbar, openSidenav } = useSelector((state) => state.dashboard)
  const pathname = usePathname()
  const [layout, page] = pathname.split('/').filter((el) => el !== '')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <Navbar
      color={fixedNavbar ? 'white' : 'transparent'}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? 'shadow-gray-500/5 sticky top-4 z-40 py-3 shadow-md'
          : 'px-0 py-1'
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? 'mt-1' : ''
            }`}
          >
            <Link href={`/${layout}`}>
              <Typography
                variant="small"
                className="font-normal text-slate-600 opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography variant="small" className="font-normal text-gray-900">
              {page ? `/${page}` : ''}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" className="text-gray-900">
            {page ?? ''}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <form onSubmit={handleSubmit}>
              <Input
                className="rounded-md !border !border-slate-400 px-3 py-2 text-slate-600 !outline-none focus:!border focus:!border-slate-800 focus:!border-t-slate-800 focus:!outline-none active:!border-slate-800"
                placeholder="Search..."
              />
            </form>
          </div>
          <Button
            variant="text"
            className="grid xl:hidden"
            onClick={() => dispatch(setOpenSidenav(!openSidenav))}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-slate-600" />
          </Button>
          <Link href="/auth/sign-in">
            <Button
              variant="text"
              className="hidden items-center gap-1 px-4 normal-case text-slate-600 xl:flex"
            >
              <UserCircleIcon className="h-5 w-5" />
              Sign In
            </Button>
            <Button variant="text" className="grid text-slate-600 xl:hidden">
              <UserCircleIcon className="h-5 w-5" />
            </Button>
          </Link>
          <Menu>
            <MenuHandler>
              <Button variant="text">
                <BellIcon className="h-5 w-5 text-slate-600" />
              </Button>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    className="mb-1 font-normal text-slate-500"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 text-xs font-normal text-slate-500 opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    className="mb-1 font-normal text-slate-500"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 text-xs font-normal text-slate-500 opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="from-blue-gray-800 to-blue-gray-900 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    className="mb-1 font-normal text-slate-500"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    className="flex items-center gap-1 text-xs font-normal text-slate-500 opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5 text-slate-600" /> 2 days
                    ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
          <Button
            variant="text"
            className="text-slate-600"
            onClick={() => {
              dispatch(setOpenConfigurator(true))
            }}
          >
            <Cog6ToothIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Navbar>
  )
}

DashboardNavbar.displayName = '/src/widgets/layout/dashboard-navbar.jsx'

export default DashboardNavbar
