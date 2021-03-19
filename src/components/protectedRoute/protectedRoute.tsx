import { ComponentType, VFC } from 'react'
import { Route, Redirect } from 'react-router-dom'

type Props = {
  isLoggedIn: boolean
  path: string
  component: ComponentType
}

export const ProtectedRoute: VFC<Props> = ({ isLoggedIn, path, component }) =>
  isLoggedIn ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: path } }} />
  )
