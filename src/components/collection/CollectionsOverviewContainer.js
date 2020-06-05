import {connect} from 'react-redux'
import CollectionsOverview from '../../components/collection/CollectionsOverview'
import withSpinner from '../../components/spinner/withSpinner'
import {createStructuredSelector} from 'reselect'
import {compose} from 'redux'

import {selectIsCollectionFetching} from '../../utils/selectors'

const msp = createStructuredSelector({
    isLoading: selectIsCollectionFetching,
})

const CollectionsOverviewContainer = compose(
    connect(msp),
    withSpinner
)(CollectionsOverview)

// compose is equivalent as this export default connect(msp)(withSpinner(CollectionsOverviewContainer))

export default CollectionsOverviewContainer

