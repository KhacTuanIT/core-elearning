'use client'
import {
  HomeIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid'

const icon = {
  className: 'w-5 h-5 text-inherit',
}

export const routes = [
  {
    layout: 'dashboard',
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: 'dashboard',
        path: '',
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: 'Learn Space',
        childPages: [
          {
            icon: <UserCircleIcon {...icon} />,
            name: 'category',
            childPath: '/category',
          },
          {
            icon: <UserCircleIcon {...icon} />,
            name: 'question',
            childPath: '/question',
          },
          {
            icon: <UserCircleIcon {...icon} />,
            name: 'answer',
            childPath: '/answer',
          },
        ],
      },
      {
        icon: <HomeIcon {...icon} />,
        name: 'Content',
        path: '/content',
      },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <InformationCircleIcon {...icon} />,
      //   name: "notifications",
      //   path: "/notifications",
      //   element: <Notifications />,
      // },
    ],
  },
  // {
  //   title: "auth pages",
  //   layout: "auth",
  //   pages: [
  //     {
  //       icon: <ServerStackIcon {...icon} />,
  //       name: "sign in",
  //       path: "/sign-in",
  //       element: <SignIn />,
  //     },
  //     {
  //       icon: <RectangleStackIcon {...icon} />,
  //       name: "sign up",
  //       path: "/sign-up",
  //       element: <SignUp />,
  //     },
  //   ],
  // },
]

export default routes
