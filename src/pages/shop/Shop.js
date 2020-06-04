import React from 'react';
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import {connect} from 'react-redux'

import CollectionsOverview from '../../components/collection/CollectionsOverview'
import Collection from '../collection/Collection'
import {updateCollections} from '../../redux/actions/actions'

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null

  componentDidMount() {
    // collections is also the name of our collection in firestore
    const collectionRef = firestore.collection('collections')
    const updateCollections = this.props

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionsMap)
    })
  }


  return() {
        const { match } = this.props
        return (
        <ShopStyle><br></br><br></br>
        
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={Collection} />
        
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