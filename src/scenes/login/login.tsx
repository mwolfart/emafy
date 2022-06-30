import { useEffect, useState, FC } from 'react'
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
import { Navigate } from 'react-router'

interface Props {
  onLogin: (value: boolean) => void
}

export const LoginScene: FC<Props> = ({ onLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(hasValidToken())
  const [isOnLoginProcess, setIsOnLoginProcess] = useState<boolean>(
    !isLoggedIn && (hasAuthCode() || hasToken()),
  )

  const apiAuth = (): void => {
    authenticate()
  }

  useEffect(() => {
    const onSuccessCallback = (): void => {
      setIsLoggedIn(true)
      setIsOnLoginProcess(false)
    }

    const onErrorCallback = (): void => {
      setIsLoggedIn(false)
      setIsOnLoginProcess(false)
    }

    let cancelled = false
    if (isOnLoginProcess && !cancelled) {
      requestValidToken({ onSuccessCallback, onErrorCallback })
    }

    onLogin(isLoggedIn)
    return () => {
      cancelled = true
    }
  }, [isOnLoginProcess, onLogin, isLoggedIn])

  return !isOnLoginProcess && isLoggedIn ? (
    <Navigate to="/saved-artists" />
  ) : (
    <Canvas>
      <Modal>
        <div className="title">{strings.pages.signIn}</div>
        <p>{strings.content.signInInstructions}</p>
        <Button onClick={apiAuth}>{strings.ui.loginUsingSpotify}</Button>
      </Modal>
    </Canvas>
  )
}
