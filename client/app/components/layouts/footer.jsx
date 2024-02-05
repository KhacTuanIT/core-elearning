'use client'
import PropTypes from 'prop-types'
import { Typography } from '@material-tailwind/react'
import { HeartIcon } from '@heroicons/react/24/solid'

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear()

  return (
    <footer className="py-2 fixed right-0 bottom-0">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, made with{' '}
          <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" />{' '}
          by{' '}
          <a
            href={brandLink}
            target="_blank"
            className="font-bold transition-colors hover:text-blue-500"
          >
            {brandName}
          </a>{' '}
          for a better web.
        </Typography>
      </div>
    </footer>
  )
}

Footer.displayName = '/src/widgets/layout/footer.jsx'

export default Footer
