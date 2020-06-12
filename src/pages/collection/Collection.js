import React, {useContext} from "react";
import styled from 'styled-components'

import CollectionItem from '../../components/collection/CollectionItem'
import CollectionsContext from '../../contexts/collections/collections.context'

const Collection = ({match}) => {
  const collections = useContext(CollectionsContext)
  const collection = collections[match.params.collectionId]
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