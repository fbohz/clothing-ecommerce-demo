import React from "react";
import styled from 'styled-components'
import MenuItem from './MenuItem'


const DMStyle = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

`

class DirectoryMenu extends React.Component {
    constructor(){
        super()

        this.state = {
            sections: [
                {
                  title: 'memorabilia',
                  imageUrl: 'https://i.ibb.co/BydFmjr/shop.jpg',
                  id: 1,
                  linkUrl: 'shop/memorabilia',
                  subtitle: 'SHOP NOW'
                },
                {
                    title: 'characters',
                    imageUrl: 'https://i.ibb.co/xHSCYkX/characters.jpg',
                    id: 2,
                    linkUrl: 'info/characters'
                },
                {
                    title: 'latest news',
                    imageUrl: 'https://i.ibb.co/bRVtBYz/news-nausicaa.jpg',
                    id: 3,
                    linkUrl: 'info/news'
                },
                {
                  title: 'films',
                  imageUrl: 'https://i.ibb.co/1rqTmMB/films.jpg',
                  id: 4,
                  size: 'large',
                  linkUrl: 'shop/films',
                  subtitle: 'SHOP NOW'
                },
            ]
        }
    }


    render() {
        return (
            <DMStyle>
                    {
                        this.state.sections.map(
                           ( {id, ...otherSectionProps}) => {
                                return  <MenuItem key={id} {...otherSectionProps}/>
                           })
                    }
            </DMStyle>
        )
    }
}


export default DirectoryMenu