import React, { VFC } from 'react'
import { Modal } from 'components/modal/modal'
import { Button, Canvas } from 'components/ui'
import { authenticate } from 'api/credentials'

export const LoginScene: VFC = () => {
  const login: () => void = () => {
    authenticate()
  }

  const closeLoginModal: () => void = () => {}

  return (
    <Canvas>
      <Modal closeModalCallback={closeLoginModal}>
        <div className="title">Sign in</div>
        <p>
          To start using the platform, please login using the Spotify API
          through the link below
        </p>
        <Button onClick={login}>Login using Spotify</Button>
      </Modal>
    </Canvas>
  )
}
