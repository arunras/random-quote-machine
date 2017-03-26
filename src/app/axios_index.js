import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

let i = 0;

let apiUrl = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

/*
$('#new-quote-button').on('click', function(e) {
    e.preventDefault();
    $.ajax( {
        //url: '/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
        url: apiUrl,
        success: function(data) {
            var post = data.shift(); // The data is an array of posts. Grab the first one.
            $('#quote-title').text(post.title);
            $('#quote-content').html(post.content);

            // If the Source is available, use it. Otherwise hide it.
            if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
                $('#quote-source').html('Source:' + post.custom_meta.Source);
            } else {
                $('#quote-source').text('');
            }
        },
        cache: false
    });
});
*/

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
        axios.get(apiUrl)
            .then(res => {
                var quote = res.data[0];
                this.setState({  
                    content: quote.content,
                    title: quote.title
                });
                console.log(res.data[0].content);
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
                <div className="d-flex justify-content-between mt-3">
                    <button id="tweet-button" onClick={this.tweet} className="btn btn-success">Tweet</button>
                    <button id="new-quote-button" onClick={this.getNewQuote} className="btn btn-primary">New Quote</button>
                </div>
            </div>
        )//end render
    }
}

var newQuote = {
    content: 'The most beautiful thing we can experience is the mysterious. It is the source of all true art and science.',
    title: 'Albert Einstein'
}

// put quote component into html page
ReactDOM.render(<QuoteComponent myQuote={newQuote} />, document.getElementById('quote-wrapper'));




