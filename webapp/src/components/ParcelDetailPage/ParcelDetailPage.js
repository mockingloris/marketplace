import React from 'react'
import PropTypes from 'prop-types'

import { isFeatureEnabled } from 'lib/featureUtils'
import AssetDetailPage from 'components/AssetDetailPage'
import Parcel from 'components/Parcel'
import ParcelDetail from './ParcelDetail'
import { publicationType, districtType, mortgageType } from 'components/types'

import './ParcelDetailPage.css'

export default class ParcelDetailPage extends React.PureComponent {
  static propTypes = {
    x: PropTypes.string.isRequired,
    y: PropTypes.string.isRequired,
    publications: PropTypes.objectOf(publicationType).isRequired,
    districts: PropTypes.objectOf(districtType).isRequired,
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
    const { x, y, publications, districts, mortgage, onBuy } = this.props

    return (
      <div className="ParcelDetailPage">
        <Parcel x={x} y={y}>
          {(parcel, isOwner) => (
            <AssetDetailPage asset={parcel} {...this.props}>
              <ParcelDetail
                parcel={parcel}
                isOwner={isOwner}
                publications={publications}
                districts={districts}
                onBuy={onBuy}
                mortgage={mortgage}
              />
            </AssetDetailPage>
          )}
        </Parcel>
      </div>
    )
  }
}
