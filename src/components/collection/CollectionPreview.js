import React from "react";
import styled from 'styled-components'
import CollectionItem from './CollectionItem'

import {Link} from 'react-router-dom'


const CollectionPreview = ({title, items, routeName}) => {
    return (
        <CollectionStyle>
            <h1 className="title">
              <Link to={`shop/${routeName}`}>
                {title.toUpperCase()}
              </Link>
            </h1>
            <div className="preview">
                {
                    items
                    .filter((item, idx) => idx < 4)
                    .map((item) => {
                        return <CollectionItem key={item.id} item={item}/>
                    })
                }
            </div>

        </CollectionStyle>
    )
}

export default CollectionPreview

const CollectionStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  .title {
    font-size: 28px;
    margin-bottom: 25px;
    cursor: pointer;
  }

  .preview {
    display: flex;
    justify-content: space-between;
  }
`