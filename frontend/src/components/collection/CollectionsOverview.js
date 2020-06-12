import React from 'react';
import styled from 'styled-components'
import CollectionPreview from './CollectionPreview'
import {connect} from 'react-redux'

import {createStructuredSelector} from 'reselect'
import {selectCollectionsForPreview} from '../../utils/selectors'


const CollectionsOverview = ({collections}) => {
    return (
        <CollectionsOvContainter>
            {
                 collections.map(({id, ...otherCollectionProps}) => {
                    return <CollectionPreview key={id} {...otherCollectionProps} />
                 })
            }
        </CollectionsOvContainter>
    )
}

const msp = createStructuredSelector({
    collections: selectCollectionsForPreview,
  })

export default connect(msp)(CollectionsOverview)

const CollectionsOvContainter = styled.div`
  display: flex;
  flex-direction: column;
`