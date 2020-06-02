import React from 'react';
import styled from 'styled-components'
import {SHOP_DATA} from './shop.data'
import CollectionPreview from '../../components/collection/CollectionPreview'

class ShopPage extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
          collections: SHOP_DATA
      }
  }
    
  render() {
      const {collections} = this.state
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
}

export default ShopPage

const ShopStyle = styled.div`

`