import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { locations } from 'locations'
import { getMatchParams } from 'modules/location/selectors'
import { navigateTo } from 'modules/location/actions'
import { getError, isLoading } from 'modules/parcels/selectors'
import { getDistricts } from 'modules/districts/selectors'
import { getPublications } from 'modules/publication/selectors'
import { fetchParcelPublicationsRequest } from 'modules/publication/actions'
import { fetchActiveParcelMortgagesRequest } from 'modules/mortgage/actions'
import { getParcelMortgageFactory } from 'modules/mortgage/selectors'
import { PUBLICATION_STATUS } from 'shared/publication'
import ParcelDetailPage from './ParcelDetailPage'

const mapState = (state, ownProps) => {
  // Instanciate selectors
  const { x, y } = getMatchParams(ownProps)
  const getParcelMortgage = getParcelMortgageFactory(x, y)
  // Return mapStateToProps function
  return (state, ownProps) => {
    const { x, y } = getMatchParams(ownProps)
    return {
      x,
      y,
      isLoading: isLoading(state),
      error: getError(state),
      districts: getDistricts(state),
      publications: getPublications(state),
      mortgage: getParcelMortgage(state)
    }
  }
}

const mapDispatch = dispatch => ({
  onFetchParcelPublications: (x, y) =>
    dispatch(fetchParcelPublicationsRequest(x, y, PUBLICATION_STATUS.open)),
  onError: () => dispatch(navigateTo(locations.root)),
  onBuy: parcel => dispatch(navigateTo(locations.buyLand(parcel.x, parcel.y))),
  onParcelClick: (x, y) => dispatch(navigateTo(locations.parcelDetail(x, y))),
  onFetchActiveParcelMortgages: (x, y) =>
    dispatch(fetchActiveParcelMortgagesRequest(x, y))
})

export default withRouter(connect(mapState, mapDispatch)(ParcelDetailPage))
