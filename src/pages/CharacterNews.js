import React from "react";
import styled from 'styled-components'
import moment from 'moment'

const CharacterNews = (props) => {
    const {match} = props
    const title = match.path.replace("/","")

    const getDate = () => {
        const date = new Date()
        let month = date.getMonth()

        if (month === 0) {
            month = 12
        }

        return `${month - 1}-${date.getFullYear()}-${date.getDay()}`

    }

    const conditionalReturn = () => {
        if (title === "news") {
            const date = getDate()
            console.log(date)


        } else {

        }
    }

    return (
        <div>
            <Title className="w3-center">{title.toUpperCase()}</Title>
            {conditionalReturn()}
        </div>
    )
}

export default CharacterNews

const Title = styled.h2`
  font-size: 38px;
  margin: 0 auto 30px;
  font-family: "Open Sans Condensed", sans-serif;
`;