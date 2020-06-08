import React, {useState, useEffect} from "react";
import styled from 'styled-components'
import moment from 'moment'

const Characters = (props) => {
    const {match} = props
    const title = match.path.replace("/","")
    const [results, setResults] = useState([])
    const [endpoint, setEndpoint] = useState("")

    useEffect(() => {
        if (title === "news") {
            const date = moment().subtract(1, 'month').add(1, 'day').format().split("T")[0]
            const endpoint = `http://newsapi.org/v2/everything?q=studio+ghibli&from=${date}&sortBy=publishedAt&apiKey=deea81cb1db240e2ae23c1f3ca12c585`
            // setEndpoint(`http://newsapi.org/v2/everything?q=studio+ghibli&from=${date}&sortBy=publishedAt&apiKey=deea81cb1db240e2ae23c1f3ca12c585`)

        } else {
            const endpoint = "https://ghibliapi.herokuapp.com/people"
            // setEndpoint("https://ghibliapi.herokuapp.com/people")
            console.log(endpoint)
        }
        
        const fetchData = async () => {

        let response = await fetch(endpoint);
        let data = await response.json()
        // setResults(data)
        console.log(data)
        // data && data.articles ? setResults(data.articles) : setResults(data)
        }
        fetchData();
        // eslint-disable-next-line
    },[])

    const conditionalReturn = () => {
       
    }

    return (
        <div>
            <Title className="w3-center">{title.toUpperCase()}</Title>
            {conditionalReturn()}
            {results.length > 0 ? "loaded!" : "wait"}
        </div>
    )
}

export default Characters

const Title = styled.h2`
  font-size: 38px;
  margin: 0 auto 30px;
  font-family: "Open Sans Condensed", sans-serif;
`;