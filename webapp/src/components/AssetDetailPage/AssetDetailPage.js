import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'semantic-ui-react'

import { assetType } from 'components/types'
import ParcelPreview from 'components/ParcelPreview'

import './AssetDetailPage.css'

export default class AssetDetailPage extends React.PureComponent {
  static propTypes = {
    asset: assetType.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.string,
    onError: PropTypes.func.isRequired,
    onAssetClick: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.isAdditionalResourcesFetched = false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      return this.props.onError(nextProps.error)
    }
  }

  render() {
    const { children, x, y, error, asset, onAssetClick } = this.props

    if (error) {
      return null
    }

    return (
      <div className="AssetDetailPage">
        <div className="parcel-preview">
          <ParcelPreview
            x={x}
            y={y}
            selected={asset}
            isDraggable
            showMinimap
            showPopup
            showControls
            onClick={onAssetClick}
          />
        </div>
        <Container>{children}</Container>
      </div>
    )
  }
}
