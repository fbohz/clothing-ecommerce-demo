import React, {useState, useEffect} from "react";
import styled from 'styled-components'
import moment from 'moment'
import IMG from "../../assets/placeholderIMG.jpeg"

const News = (props) => {
    const {match} = props
    const title = match.path.replace("/","")
    const [results, setResults] = useState([])

    useEffect(() => {
        const date = moment().subtract(1, 'month').add(1, 'day').format().split("T")[0]
        const endpoint = `http://newsapi.org/v2/everything?q=studio+ghibli&from=${date}&sortBy=publishedAt&apiKey=deea81cb1db240e2ae23c1f3ca12c585`


        
        const fetchData = async () => {

        let response = await fetch(endpoint);
        let data = await response.json()
        setResults(data.articles)
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
            {
                results.length > 0 ?
                    results.map((result, idx) => (
                    <React.Fragment >
                    <StyledCard className="w3-card-4 w3-center" key={idx} style={{width: "60%", }}>

                        <header className="w3-container w3-light-blue" style={{padding: "10px"}}>
                            <h4><b></b> {result.source.name} </h4>
        
                            <img src={result.urlToImage ? result.urlToImage : IMG} alt="newsImg" style={{width: "60%"}} />
                        </header><br></br>
                        <div className="w3-container">
                            <h5>{result.title}</h5>
                            <hr/>
                            <p>{result.description}</p>
                        </div>
                        <footer class="w3-container w3-blue">
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