import React from 'react'
import PropTypes from 'prop-types'

import { isFeatureEnabled } from 'lib/featureUtils'
import AssetDetailPage from 'components/AssetDetailPage'
import Parcel from 'components/Parcel'
import { mortgageType } from 'components/types'

import './ParcelDetailPage.css'

export default class ParcelDetailPage extends React.PureComponent {
  static propTypes = {
    x: PropTypes.string,
    y: PropTypes.string,
    mortgage: mortgageType,
    user: PropTypes.string,
    onFetchParcelPublications: PropTypes.func.isRequired,
    onFetchActiveParcelMortgages: PropTypes.func.isRequired,
    onBuy: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.isAdditionalResourcesFetched = false
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLoading) {
      this.fetchAdditionalParcelResources()
    }
  }

  fetchAdditionalParcelResources() {
    if (!this.isAdditionalResourcesFetched) {
      const {
        x,
        y,
        onFetchParcelPublications,
        onFetchActiveParcelMortgages
      } = this.props

      if (isFeatureEnabled('MORTGAGES')) {
        onFetchActiveParcelMortgages(x, y)
      }
      onFetchParcelPublications(x, y)

      this.isAdditionalResourcesFetched = true
    }
  }

  render() {
    const { x, y } = this.props

    return (
      <div className="ParcelDetailPage">
        <Parcel x={x} y={y}>
          {(parcel, isOwner) => (
            <AssetDetailPage asset={parcel} {...this.props} />
          )}
        </Parcel>
      </div>
    )
  }
}
