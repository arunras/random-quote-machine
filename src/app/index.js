import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

let apiUrl = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

// creat quote component
//var QuoteComponent = React.createClass({
class QuoteComponent extends React.Component{
    constructor(){
        super(); 
        this.state = {
            content: 'My quote',
            title: 'Arun Rasmey'
        };
        this.getNewQuote = this.getNewQuote.bind(this);
    }

    getNewQuote(){
        $.ajax( {
            url: apiUrl,
            success: function(data) {
                var quote = data.shift(); 
                $('#quote-title').text(quote.title);
                $('#quote-content').html(quote.content);
            },
            cache: false
        });
    }

    render(){
        return(
            <div className="card-block">
                <h3 id="quote-content" className="card-title">{this.state.content}</h3> 
                <span>— </span>
                <span id="quote-title" className="card-text">{this.state.title}</span>
                <div className="d-flex justify-content-between mt-3">
                    <button id="tweet-button" onClick={this.tweet} className="btn btn-link">Tweet</button>
                    <button id="new-quote-button" onClick={this.getNewQuote} className="btn btn-primary">New Quote</button>
                </div>
            </div>
        )
    }//end render

}

var newQuote = {
    content: 'The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.',
    title: 'Albert Einstein'
}

// put quote component into html page
ReactDOM.render(<QuoteComponent myQuote={newQuote} />, document.getElementById('quote-wrapper'));




