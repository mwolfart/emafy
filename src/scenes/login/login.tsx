import { useEffect, useState, VFC } from 'react'
import { Modal } from 'components/modal/modal'
import { Button, Canvas } from 'components/ui'
import {
  authenticate,
  hasAuthCode,
  hasToken,
  hasValidToken,
  requestValidToken,
} from 'api/credentials'
import { strings } from 'strings'
import { useHistory } from 'react-router'

export const LoginScene: VFC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(hasValidToken())
  const [isOnLoginProcess, setIsOnLoginProcess] = useState<boolean>(
    !isLoggedIn && (hasAuthCode() || hasToken()),
  )

  const apiAuth = (): void => {
    authenticate()
  }

  const onSuccessCallback = (): void => {
    setIsLoggedIn(true)
    setIsOnLoginProcess(false)
  }

  const onErrorCallback = (): void => {
    setIsLoggedIn(false)
    setIsOnLoginProcess(false)
  }

  useEffect(() => {
    let cancelled = false
    if (isOnLoginProcess && !cancelled) {
      requestValidToken({ onSuccessCallback, onErrorCallback })
    }
    return () => {
      cancelled = true
    }
  }, [isOnLoginProcess])

  const history = useHistory()
  !isOnLoginProcess && isLoggedIn && history.push('/saved-albums')

  const closeLoginModal = (): void => {}

  return (
    <Canvas>
      <Modal closeModalCallback={closeLoginModal}>
        <div className="title">{strings.scenes.login.signin}</div>
        <p>{strings.scenes.login.instructions}</p>
        <Button onClick={apiAuth}>
          {strings.scenes.login.loginUsingSpotify}
        </Button>
      </Modal>
    </Canvas>
  )
}
