import React from 'react';
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import {connect} from 'react-redux'

import CollectionsOverviewContainer from '../../components/collection/CollectionsOverviewContainer'
import CollectionPageContainer from '../collection/CollectionContainer'

import {fetchCollectionsStartAsync} from '../../redux/actions/actions'


class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStartAsync } = this.props;

    fetchCollectionsStartAsync();
  }

  render() {
    const { match } = this.props;

    return (
      <ShopStyle><br></br><br></br>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionsOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </ShopStyle>
    );
  }
}


const mdp = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null,mdp)(ShopPage)

const ShopStyle = styled.div`

`