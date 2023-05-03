import React, { useState, useEffect } from 'react';
import {
    makeStyles,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardHeader,
} from '@material-ui/core';
import '../App.css';
const useStyles = makeStyles({
    card: {
        maxWidth: 550,
        height: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 5,
        border: '1px solid #1e8678',
        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
    },
    titleHead: {
        borderBottom: '1px solid #1e8678',
        fontWeight: 'bold',
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row',
    },
    media: {
        height: '100%',
        width: '100%',
    },
    button: {
        color: '#1e8678',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

function News() {
    const [articles, setArticles] = useState([]);
    const [loading, setloading] = useState(true)
    const classes = useStyles()

    useEffect(() => {
        const url = `https://newsapi.org/v2/everything?q=Apple&from=2023-04-29&sortBy=popularity&apiKey=fa787c7ec3c849c8bb3f6b3802a8e5c7`;

        fetch(url)
            .then(response => response.json())
            .then(data => setArticles(data.articles));
    }, []);

    return (
        <div>
            <Card className={classes.card} variant='outlined'>
                <h1>News</h1>
                <ul>
                    {articles.map((article, index) => (
                        <li key={index}>
                            <CardHeader className={classes.titleHead} title={article.title} />
                            <CardContent>
                                <Typography>
                                    {/* <h2>{article.title}</h2> */}
                                    <p>Description: {article.description}</p>
                                    <a href={article.url}>Read more</a>

                                </Typography>
                            </CardContent>
                        </li>
                    ))}

                </ul>
            </Card >
        </div >
    );
}

export default News;
