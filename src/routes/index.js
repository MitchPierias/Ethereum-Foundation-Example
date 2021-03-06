import React, { Fragment } from 'react';
import { Mention } from 'react-twitter-widgets';
import Lottie from 'react-lottie';
import * as animationData from './../json/feature.json';
// Components
import Header from './header';
import ScrollBox from './../components/ScrollBox';
import PublishRoute from './../routes/publish';
import TwitterExample from './../components/TwitterExample';
// CSS
import '../styles/Home.css';
// Constants
const CAMPAIGN_TWITTER_HANDLE = 'MitchPierias';
const CAMPAIGN_TWITTER_HASHTAG = 'PlantATreeDay2019';

export default class HomeRoute extends React.Component {

    state = {
        featuredIndex: 0
    }

    constructor() {
        super();
        this.didCompleteTask = this.didCompleteTask.bind(this);
    }

    didCompleteTask(event) {
        event.preventDefault();
        let { featuredIndex } = this.state;
        if (featuredIndex < 4) featuredIndex++;
        this.setState({ featuredIndex });
    }

    render() {
        const { featuredIndex } = this.state;
        const defaultOptions = {
            loop: true,
            autoplay: true, 
            animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }
        return (
            <Fragment>
                <Header/>
                <svg height={40} width="100%" viewBox="0 0 64 64" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0,64 C 18,0 46,0 64,64" fill="#F6F6F6"/>
                </svg>
                <section style={{overflow:"hidden"}}>
                    <h2>{featuredIndex>0?`Step ${featuredIndex+1}`:'How can you help?'}</h2>
                    <ScrollBox index={featuredIndex}>
                        <div className="scroll-card" style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                            <div style={{textAlign:"center"}}>Plant a tree</div>
                            <Lottie options={defaultOptions} height={300} width={300} isStopped={true} isPaused={true}/>
                            <a href="#">Learn more</a>
                            <button className={featuredIndex>0?'done':''} onClick={this.didCompleteTask} name="complete" data-task={0}>Done! I did it!</button>
                        </div>
                        <div className="scroll-card">
                            <span>Take a photo with you and said tree</span>
                            <button className={`badge ${featuredIndex>1?'done':''}`} onClick={this.didCompleteTask} name="complete" data-task={0}>Done</button>
                        </div>
                        <div className="scroll-card" style={{position:"relative"}}>
                            <button className={`badge ${featuredIndex>2?'done':''}`} onClick={this.didCompleteTask} name="complete" data-task={0}>Done</button>
                            <span style={{marginBottom:"1vw"}}>Post to twitter, making sure to include @{CAMPAIGN_TWITTER_HANDLE} and #{CAMPAIGN_TWITTER_HASHTAG}</span>
                            <TwitterExample>
                                <span style={{margin:"-0.5vw 0.5vw 0px 0px"}}>
                                    <Mention username={CAMPAIGN_TWITTER_HANDLE} class="twitter-mention-button" data-show-count="false">Tweet to @{CAMPAIGN_TWITTER_HANDLE}</Mention>
                                </span>
                            </TwitterExample>
                        </div>
                        <div className="scroll-card">
                            <span>Tell us about your tweet</span>
                            <PublishRoute mention={CAMPAIGN_TWITTER_HANDLE} hashtag={CAMPAIGN_TWITTER_HASHTAG}/>
                        </div>
                    </ScrollBox>
                </section>
                <footer>
                    <a href="/">Home</a>
                    <a href="/moderate">Moderate</a>
                    <a href="/me">Profile</a>
                </footer>
            </Fragment>
        )
    }
}