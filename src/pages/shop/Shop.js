import React from 'react';
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import {connect} from 'react-redux'

import CollectionsOverview from '../../components/collection/CollectionsOverview'
import Collection from '../collection/Collection'
import withSpinner from '../../components/spinner/withSpinner'

import {updateCollections} from '../../redux/actions/actions'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

// this gives a new component wrapped around CollectionsOverview
const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview)
const CollectionPageWithSpinner = withSpinner(Collection)

class ShopPage extends React.Component {
  state = {
    loading: true,
  }

  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }


  render() {
        const { match } = this.props
        const { loading } = this.state
        return (
        <ShopStyle><br></br><br></br>
        
        <Route exact path={`${match.path}`}
          render={(props) => <CollectionsOverviewWithSpinner 
          isLoading={loading} {...props} />}
         />
        <Route path={`${match.path}/:collectionId`} 
          render={props => <CollectionPageWithSpinner isLoading={loading} {...props} />}
         />
        
        </ShopStyle>
      );
    }
}

const mdp = dispatch => ({
  updateCollections: collectionsMap => (
    dispatch(updateCollections(collectionsMap))
  )
})

export default connect(null,mdp)(ShopPage)

const ShopStyle = styled.div`

`