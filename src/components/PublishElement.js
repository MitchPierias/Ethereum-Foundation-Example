import React, { Fragment } from 'react';
// Components
import TwitterExample from "./TwitterExample";
// Constants
const TweetIDPattern = /\d$/gi;

export default class PublishElement extends React.Component {

    state = {
        tweetID:''
    }

    constructor() {
        super();
        // Bind callbacks
        this.didChangeInput = this.didChangeInput.bind(this);
        this.didSubmitTweet = this.didSubmitTweet.bind(this);
    }

    didChangeInput(event) {
        const tweetID = event.target.value;
        this.setState({ tweetID });
    }

    didSubmitTweet(event) {
        event.preventDefault();
        // Cleanse ID (Remove URL)
        const tweetID = this.state.tweetID.replace(/\D/gi,'');
        this.props.drizzle.contracts.Bounty.methods["publishSubmission"](tweetID).send()
        .then(success => {
            if (success) console.log("Success!")
            this.setState({ tweetID:'' });
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <TwitterExample>
                <form onSubmit={this.didSubmitTweet}>
                    <input type="text" name="tweetID" placeholder="Paste Tweet ID here" defaultValue={this.state.tweetID} onChange={this.didChangeInput}></input>
                    <button type="submit">Publish</button>
                </form>
            </TwitterExample>
        )
    }
}