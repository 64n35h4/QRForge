import {
  faCode,
  faGauge,
} from '@fortawesome/free-solid-svg-icons'
import React, { PropsWithChildren } from 'react'
import SidebarNavItem from '@/app/ui/dashboard/Sidebar/SidebarNavItem'
import { DASHBOARD, WEB_QR_DYNAMIC, WEB_QR_STATIC } from '@/lib/constants'

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}

export default function SidebarNav() {
  return (
    <ul className="list-unstyled">
      <SidebarNavItem icon={faGauge} href={DASHBOARD}>Dashboard</SidebarNavItem>

      <SidebarNavTitle>QR Codes</SidebarNavTitle>
      <SidebarNavItem icon={faCode} href={WEB_QR_DYNAMIC}>Dynamic</SidebarNavItem>
      <SidebarNavItem icon={faCode} href={WEB_QR_STATIC}>Static</SidebarNavItem>
    </ul>
  )
}
