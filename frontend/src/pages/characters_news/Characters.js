import React, {useState, useEffect} from "react";
import styled from 'styled-components'

const Characters = (props) => {
    const {match} = props
    const title = match.path.replace("/","")
    const [results, setResults] = useState([])

    useEffect(() => {
        const endpoint = "https://ghibliapi.herokuapp.com/people"
        
        const fetchData = async () => {

        let response = await fetch(endpoint);
        let data = await response.json()
        setResults(data)
        }
        fetchData();
        // eslint-disable-next-line
    },[])

    return (
        <div>
            <Title className="w3-center">{title.toUpperCase()}</Title>
            {
                results.length > 0 ?
                    results.map((result, idx) => (
                    <React.Fragment key={idx} >
                    <StyledCard className="w3-card-4 w3-center" style={{width: "60%", }}>

                    <header className="w3-container w3-light-blue">
                        <h3>{result.name}</h3>
                    </header>
                    <div className="w3-container">
                        <p><b>Gender:</b> {result.gender} &nbsp; <b>Age:</b> {result.age}</p>
                        <hr/>
                        <a href={`${result.species}`}><b>Species</b></a> | 
                        <a href={`${result.films[0]}`}><b>Films</b></a>
                        </div><br></br>
                    </StyledCard><br></br>
                    </React.Fragment>
                
                     )) : 
                "loading..."
            }

        </div>
    )
}

export default Characters

const Title = styled.h2`
  font-size: 38px;
  margin: 0 auto 30px;
  font-family: "Open Sans Condensed", sans-serif;
`;

const StyledCard = styled.div`
    margin: 0 auto;
`