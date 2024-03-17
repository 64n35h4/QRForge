'use client'

import {
  LegacyRef, ReactNode, forwardRef,
} from 'react'
import HeaderSidebarToggler from '@/app/ui/dashboard/Header/HeaderSidebarToggler'
import Dropdown from 'react-bootstrap/Dropdown'
import Image from 'react-bootstrap/Image'
import { signOut, useSession } from 'next-auth/react'
import { Container } from 'react-bootstrap'

// eslint-disable-next-line react/display-name
const CustomToggle = forwardRef(
  ({ children, onClick }: { children: ReactNode; onClick: CallableFunction }, ref) => (
    <a
      href=""
      ref={ref as LegacyRef<HTMLAnchorElement>}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}
    >
      {children}
    </a>
  ),
)

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="header sticky-top mb-4 py-2 px-sm-2 border-bottom">
      <Container fluid className="header-navbar d-flex align-items-center">
        <HeaderSidebarToggler />
        <div className="header-nav ms-auto">
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-toggle">
              <Image src={session?.user?.image || ''} roundedCircle thumbnail height="40px" width="40px" alt="profile-image" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={(e) => {
                e.preventDefault()
                signOut({
                  callbackUrl: `${window.location.origin}/login`,
                })
              }}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </header>
  )
}
