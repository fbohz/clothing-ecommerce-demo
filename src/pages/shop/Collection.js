import React from "react";
import styled from 'styled-components'

import CollectionItem from '../../components/collection/CollectionItem'

const Collection = ({match}) => {
    return (
        <CollectionStyle>
            <h2>CATEGORY</h2>
        </CollectionStyle>
    )
}

export default Collection

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