import React from 'react';
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import {connect} from 'react-redux'

import CollectionsOverview from '../../components/collection/CollectionsOverview'
import Collection from '../collection/Collection'
import withSpinner from '../../components/spinner/withSpinner'
import {createStructuredSelector} from 'reselect'

import {fetchCollectionsStartAsync} from '../../redux/actions/actions'
import {selectIsCollectionFetching} from '../../utils/selectors'

// this gives a new component wrapped around CollectionsOverview
const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview)
const CollectionPageWithSpinner = withSpinner(Collection)

class ShopPage extends React.Component {

  componentDidMount() {
    const {fetchCollectionsStartAsync} = this.props
    fetchCollectionsStartAsync()
  }


  render() {
        const { match, isCollectionFetching } = this.props
        return (
        <ShopStyle><br></br><br></br>
        
        <Route exact path={`${match.path}`}
          render={(props) => <CollectionsOverviewWithSpinner 
          isLoading={isCollectionFetching} {...props} />}
         />
        <Route path={`${match.path}/:collectionId`} 
          render={props => <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />}
         />
        
        </ShopStyle>
      );
    }
}

const msp = createStructuredSelector({
  isCollectionFetching: selectIsCollectionFetching
})

const mdp = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(msp,mdp)(ShopPage)

const ShopStyle = styled.div`

`