import React from "react";
import styled from 'styled-components'
import DirectoryMenu from '../components/menu/DirectoryMenu'

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 80px;
`

const Home = () => {
    return (
        <HomeStyle>
            <DirectoryMenu/>
        </HomeStyle>
    )
}

export default Home