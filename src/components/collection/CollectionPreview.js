import React from "react";
import styled from 'styled-components'
import CollectionItem from './CollectionItem'

const CollectionPreview = ({title, items}) => {
    return (
        <CollectionStyle>
            <h1 className="title">{title.toUpperCase()}</h1>
            <div className="preview">
                {
                    items
                    .filter((item, idx) => idx < 4)
                    .map(({id, ...otherItemProps}) => {
                        return <CollectionItem key={id} { ...otherItemProps} />
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
  }

  .preview {
    display: flex;
    justify-content: space-between;
  }
`