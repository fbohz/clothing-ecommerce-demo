import React from "react";
import styled from 'styled-components'
import {connect} from 'react-redux'

import CollectionItem from '../../components/collection/CollectionItem'
import {selectCollection} from '../../utils/selectors'

const Collection = ({collection}) => {
  const {title, items} = collection

  return (
    <CollectionPageContainer>
      <CollectionTitle>{title}</CollectionTitle>
      <CollectionItemsContainer>
        {items.sort((a,b) => a.id - b.id).map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </CollectionItemsContainer>
    </CollectionPageContainer>
  );
}

const msp = (state, ownProps) => ({
  // selectColleciton is a function selector that returns a function (currying)
  collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(msp)(Collection)

const CollectionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CollectionTitle = styled.h2`
  font-size: 38px;
  margin: 0 auto 30px;
  font-family: "Open Sans Condensed", sans-serif;
`;

const CollectionItemsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  & > div {
    margin-bottom: 30px;
  }
`;