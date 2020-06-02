import React from "react";
import styled from 'styled-components'
import {connect} from 'react-redux'

import CollectionItem from '../../components/collection/CollectionItem'
import {selectCollection} from '../../utils/selectors'

const Collection = ({collection}) => {
  const {title, items} = collection

    return (
        <CollectionStyle>
            <h2 className="title">{title}</h2>
            <div className="items">
              {
                items.map(item => (
                      <CollectionItem key={item.id} item={item} />
                ))
              }
            </div>
        </CollectionStyle>
    )
}

const msp = (state, ownProps) => ({
  // selectColleciton is a function selector that returns a function (currying)
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(msp)(Collection)

const CollectionStyle = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-size: 38px;
    margin: 0 auto 30px;
  }

  .items {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;

    & .collection-item {
      margin-bottom: 30px;
    }
  }
`