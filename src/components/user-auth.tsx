'use client'

import * as React from 'react'
import { signIn } from 'next-auth/react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

// TODO: improve auth form
export function UserAuthForm() {
  const [isGitHubLoading, setIsGitHubLoading] = React.useState<boolean>(false)

  return (
    <div className="d-flex flex-column">
      <div className="text-xs">
        Continue with
      </div>
      <Button
        variant="primary"
        onClick={() => {
          setIsGitHubLoading(true)
          signIn('github')
        }}
        disabled={isGitHubLoading}
      >
        {isGitHubLoading ? (
          <Spinner animation="border" role="status" size="sm" />
        ) : (
          <FontAwesomeIcon icon={faGithub} />
        )}
        {' '}
        Github
      </Button>
    </div>
  )
}
