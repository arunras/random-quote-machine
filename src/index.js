import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

let apiUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";


let newQuote = {
    content: '',
    title: ''
};   

function fetchQuotes() {
$.ajax( {
    url: apiUrl,
    success: function(data) {
        var quote = data.shift(); 
        $('#quote-title').text(quote.title);
        $('#quote-content').html(quote.content);
        $('#tweet-button').html(
            '<a target="_blank" href="https://twitter.com/intent/tweet?hashtags=quotes&related=design&text=' + quote.content + '" >Tweet</a>'
        );
        $('#facebook-button').html(
            '<a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=' + quote.content + '" >Share</a>'
        );

        newQuote['content'] = quote.content;
        newQuote['title'] = quote.title;
    },
    cache: false
});
}
// creat quote component
//var QuoteComponent = React.createClass({
class QuoteComponent extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
            content: props.Quote.content,
            title: props.Quote.title
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }
    
    componentDidMount() {
        axios.get(apiUrl)
            .then(res => {
                var Quotes = res.data;
                this.setState({  
                    content: Quotes.content,
                    title: Quotes.title
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(){
        return(
            <div className="card-block">
                <h3 id="quote-content" className="card-title">{this.state.content}</h3> 
                <span>— </span>
                <span id="quote-title" className="card-text">{this.state.title}</span>
                <div className="d-flex justify-content-start mt-3">
                    <button id="tweet-button" className="btn btn-link"></button>
                    <button id="facebook-button" className="btn btn-link"></button>
                    <button id="new-quote-button" onClick={fetchQuotes} className="btn btn-primary ml-auto">New Quote</button>
                </div>
            </div>
        )
    }//end render

}



fetchQuotes();
// put quote component into html page
ReactDOM.render(
    <QuoteComponent Quote={newQuote} />, 
    document.getElementById('quote-wrapper')
);




