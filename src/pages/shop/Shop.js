import React from 'react';
import styled from 'styled-components'
import CollectionPreview from '../../components/collection/CollectionPreview'
import {connect} from 'react-redux'

import {selectCollections} from '../../utils/selectors'
import {createStructuredSelector} from 'reselect'

const ShopPage = ({collections}) => {
      return (
        <ShopStyle><br></br><br></br>
        <div>
            {
                 collections.map(({id, ...otherCollectionProps}) => {
                    return <CollectionPreview key={id} {...otherCollectionProps} />
                 })
            }
        </div>
    
        </ShopStyle>
      );
}

const msp = createStructuredSelector({
  collections: selectCollections,
})

export default connect(msp)(ShopPage)

const ShopStyle = styled.div`

`