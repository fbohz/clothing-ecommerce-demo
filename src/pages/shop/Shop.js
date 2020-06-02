import React from 'react';
import styled from 'styled-components'
import { Route } from 'react-router-dom'

import CollectionsOverview from '../../components/collection/CollectionsOverview'
import Collection from './Collection'

const ShopPage = ({match}) => {
      return (
        <ShopStyle><br></br><br></br>
        
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} />
        
        </ShopStyle>
      );
}

export default ShopPage

const ShopStyle = styled.div`

`