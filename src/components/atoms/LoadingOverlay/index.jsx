import Spinner from 'components/atoms/Spinner'

import {
  OverlayLoading,
} from './styles'

function LoadingOverlay() {
  return (
    <OverlayLoading>
      <Spinner />
    </OverlayLoading>
  )
}

export default LoadingOverlay 
