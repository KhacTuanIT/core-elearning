import dynamic from 'next/dynamic'
const DashboardAdmin = dynamic(() => import('./dashboardAdmin.jsx'), {
  ssr: false,
})

const RootLayout = ({children}) => <DashboardAdmin>{children}</DashboardAdmin>
export default RootLayout
