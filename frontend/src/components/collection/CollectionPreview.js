import React from "react";
import styled from 'styled-components'
import CollectionItem from './CollectionItem'

import {Link} from 'react-router-dom'


const CollectionPreview = ({title, items, routeName}) => {
    return (
        <CollectionStyle>
            <h1 className="ghibli-title">
              <Link to={`shop/${routeName}`}>
                {title.toUpperCase()}
              </Link>
            </h1>
            <PreviewContainer>
                {
                    items
                    .filter((item, idx) => idx < 4)
                    .map((item) => {
                        return <CollectionItem key={item.id} item={item}/>
                    })
                }
            </PreviewContainer>

        </CollectionStyle>
    )
}

export default CollectionPreview

const CollectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  @media screen and (max-width: 800px) {
    align-items: center;
  }

  .ghibli-title {
    font-size: 28px;
    margin-bottom: 25px;
    cursor: pointer;
    font-family: "Open Sans Condensed", sans-serif;
  }
`

const PreviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
`