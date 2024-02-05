'use client'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button, IconButton, Typography } from '@material-tailwind/react'
import { setOpenSidenav } from '@/lib/redux/reducers/dashboard'
import { useDispatch, useSelector } from 'react-redux'
import { sidebarFillColors, sidenavColors } from '@/app/constants/colors'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUp } from '../icons'

export function Sidebar({ routes }) {
  const { brandImg, brandName } = { ...defaultProps }
  const dispatch = useDispatch()
  const { sidenavColor, sidenavType, openSidenav } = useSelector(
    (state) => state.dashboard,
  )
  const pathname = usePathname()
  const [page, setPage] = useState()
  const [isOpen, setIsOpen] = useState({})

  useEffect(() => {
    setActivePage()
  }, [pathname])

  useEffect(() => {
    routes.map(({ layout, title, pages }, index) => {
      pages.map(({ icon, name, path }, index) => {
        setIsOpen({ ...isOpen, [name]: page === path })
      })
    })
  }, [])

  const sidenavTypes = {
    dark: 'bg-gradient-to-br from-gray-900 to-gray-800',
    white: 'bg-white shadow-sm',
    transparent: 'bg-transparent',
  }

  const handleChangeIsOpen = (activePage) => {
    routes.map(({ layout, title, pages }, index) => {
      pages.map(({ icon, name, path, childPages }, index) => {
        let isOpenPage =
          childPages && childPages.length > 0
            ? childPages.filter((x) => x.childPath === activePage).length > 0
            : activePage === path
        setIsOpen({ ...isOpen, [name]: isOpenPage })
      })
    })
  }

  const setActivePage = () => {
    const [layout, page] = pathname.split('/').filter((el) => el !== '')
    const activePage = page ? `/${page}` : ''
    setPage(activePage)
    handleChangeIsOpen(activePage)
  }

  const getBgColor = (path) => {
    const bgColor =
      page === path
        ? // isActive || (layout === 'dashboard' && path === '/')
          sidenavColors[sidenavColor]
        : sidenavType === 'dark'
          ? sidenavTypes['white']
          : sidenavTypes['blue-gray']
    return bgColor
  }

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? 'translate-x-0' : '-translate-x-80'
      } border-blue-gray-100 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl border transition-transform duration-300 xl:translate-x-0`}
    >
      <div className={`relative`}>
        <Link href="/" className="px-8 py-6 text-center">
          <Typography
            variant="h6"
            color={sidenavType === 'dark' ? 'white' : 'blue-gray'}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => dispatch(setOpenSidenav(false))}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mb-2 mt-4">
                <Typography
                  variant="small"
                  color={sidenavType === 'dark' ? 'white' : 'blue-gray'}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path, childPages }) => {
              return (
                <li key={name}>
                  {childPages ? (
                    <ul className="lg:w-[100%]" listtype="ul">
                      <p className="lg:p-[0%]">
                        <div className="my-[5px] p-[5px] lg:p-[0%]">
                          <Button
                            onClick={() =>
                              setIsOpen({ ...isOpen, [name]: !isOpen[name] })
                            }
                            variant={page === path ? 'gradient' : 'text'}
                            className={`mb-2 flex items-center justify-between gap-4 px-4 capitalize hover:opacity-[.8] ${getBgColor(path)}`}
                            fullWidth
                          >
                            <Typography
                              color="inherit"
                              className="flex items-center font-medium capitalize"
                            >
                              {icon}
                              {name}
                            </Typography>
                            <span name="accordion-header">
                              {isOpen[name] ? (
                                <ArrowUp
                                  size={'h-4 w-4'}
                                  fill={
                                    path === page
                                      ? sidebarFillColors.white
                                      : sidebarFillColors.slate
                                  }
                                />
                              ) : (
                                <ArrowDown
                                  size={'h-4 w-4'}
                                  fill={
                                    path === page
                                      ? sidebarFillColors.white
                                      : sidebarFillColors.slate
                                  }
                                />
                              )}
                            </span>
                          </Button>
                          {isOpen[name] ? (
                            <div>
                              <ul className="lg:pl-[25px]" listtype="ul">
                                {childPages.map(({ icon, name, childPath }) => {
                                  return (
                                    <div>
                                      <Link href={`/${layout}${childPath}`}>
                                        <Button
                                          variant={
                                            page === childPath
                                              ? 'gradient'
                                              : 'text'
                                          }
                                          className={`mb-2 flex items-center gap-4 px-4 capitalize hover:opacity-[.8] ${getBgColor(path)}`}
                                          fullWidth
                                        >
                                          {icon}
                                          <Typography
                                            color="inherit"
                                            className="font-medium capitalize"
                                          >
                                            {name}
                                          </Typography>
                                        </Button>
                                      </Link>
                                    </div>
                                  )
                                })}
                              </ul>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      </p>
                    </ul>
                  ) : (
                    <Link href={`/${layout}${path}`}>
                      <Button
                        variant={page === path ? 'gradient' : 'text'}
                        className={`flex items-center gap-4 px-4 capitalize hover:opacity-[.8] ${getBgColor(path)}`}
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        ))}
      </div>
    </aside>
  )
}

const defaultProps = {
  brandImg: '/img/logo-ct.png',
  brandName: 'Material Tailwind React',
}

Sidebar.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

Sidebar.displayName = '/src/widgets/layout/sidebar.jsx'

export default Sidebar
