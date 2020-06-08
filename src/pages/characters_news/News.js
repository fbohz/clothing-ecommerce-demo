import React, {useState, useEffect} from "react";
import styled from 'styled-components'
import moment from 'moment'
import IMG from "../../assets/placeholderIMG.jpeg"

const News = (props) => {
    const {match} = props
    const title = match.path.replace("/","")
    const [results, setResults] = useState([])

    useEffect(() => {
        const date = moment().subtract(1, 'month').format().split("T")[0]
        const endpoint = `https://newsapi.org/v2/everything?q=studio+ghibli&from=${date}&sortBy=publishedAt&apiKey=deea81cb1db240e2ae23c1f3ca12c585`


        
        const fetchData = async () => {
            try {
                let response = await fetch(endpoint);
                let data = await response.json()
                setResults(data.articles)
                
              } catch(e) {
                console.log(e);
              }
        }
        fetchData();
        // eslint-disable-next-line
    },[])

    return (
        <div>
            <Title className="w3-center">{title.toUpperCase()}</Title>
            {
                results && results.length > 0 ?
                    results.map((result, idx) => (
                    <React.Fragment key={idx}>
                    <StyledCard className="w3-card-4 w3-center"  style={{width: "60%", }}>

                        <header className="w3-container w3-light-blue" style={{padding: "10px"}}>
                            <h4>{result.source.name} </h4>
        
                            <img src={result.urlToImage ? result.urlToImage : IMG} alt="newsImg" style={{width: "60%"}} />
                        </header><br></br>
                        <div className="w3-container">
                            <h5>{result.title}</h5>
                            <hr/>
                            <p>{result.description}</p>
                        </div>
                        <footer className="w3-container w3-blue">
                                <a href={`${result.url}`} target="_blank" rel="noopener noreferrer"><b>Go to article</b></a>  
                        </footer>
                    </StyledCard><br></br>
                    </React.Fragment>
                
                     )) : 
                "loading..."
            }
        </div>
    )
}

export default News

const Title = styled.h2`
  font-size: 38px;
  margin: 0 auto 30px;
  font-family: "Open Sans Condensed", sans-serif;
`;

const StyledCard = styled.div`
    margin: 0 auto;
`