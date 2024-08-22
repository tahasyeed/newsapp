import React, { Component } from 'react'

export class Newsitem extends Component {


  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props
    return (
      <div className="my-3">
        <div className="card" >
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"style= 
         {{left:'85%', zIndex:'1'}}>
                {source}
              
              </span>
          <img src={!imageUrl ? "https://resize.indiatvnews.com/en/centered/newbucket/1200_675/2022/04/breaking-news-jpeg-1650328585.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}<span id="pill" className="badge rounded-pill text-bg-success">New</span>
           
            </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-body-secondary">By {!author ? "Unknown" : author} on 
             {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark ">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
