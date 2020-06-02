import React from "react";
import styled from 'styled-components'
import MenuItem from './MenuItem'
import {connect} from 'react-redux'

import { selectDirectorySections } from '../../utils/selectors'
import{ createStructuredSelector } from 'reselect'

const DMStyle = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

`

function DirectoryMenu({sections}) {
        return (
            <DMStyle>
                    {
                        sections.map(
                           ( {id, ...otherSectionProps}) => {
                                return  <MenuItem key={id} {...otherSectionProps}/>
                           })
                    }
            </DMStyle>
        )
}

const msp = createStructuredSelector({
    sections: selectDirectorySections,
})

export default connect(msp)(DirectoryMenu)