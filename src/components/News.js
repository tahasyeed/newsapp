import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


  capitalleter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0

    }

    document.title = `${this.capitalleter(this.props.category)} - NewsUpdate`
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70c238a33941411c8076869d8f941511&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let res = await data.json();
    // console.log(res);

    this.setState({
      articles: res.articles,
      totalResults: res.totalResults,
      loading: false,
      
    })
  }





  // handlepreviousclick = async () => {
  //   console.log("previous");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70c238a33941411c8076869d8f941511&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let res = await data.json();
  //   console.log(res);
  //   this.setState({
  //     page: this.state.page - 1,
  //     articles: res.articles,
  //     loading: false
  //   })
  // }



  // handleNextclick = async () => {
  //   console.log("next");
  //   if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70c238a33941411c8076869d8f941511&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({ loading: true });
  //     let data = await fetch(url);
  //     let res = await data.json()

  //     this.setState({
  //       page: this.state.page + 1,
  //       articles: res.articles,
  //       loading: false
  //     })

  //   }

  // }

  fetchMoreData =async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=70c238a33941411c8076869d8f941511&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let res = await data.json();
    // console.log(res);

    this.setState({
      articles: this.state.articles.concat( res.articles ),
      totalResults: res.totalResults,
      loading: false,
      
    })
  
  };

  render() {
    return (
      <div className="container my-3 ">
        <h2 className="text-center">NewsUpdate: Presenting Headlines from {this.capitalleter(this.props.category)}</h2>
        {/* {this.state.loading && <Spinner />} */}


        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
      
          
          <div className="row">

            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url} >
                <Newsitem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />


              </div>

            })}
            </div>
           
        </InfiniteScroll>
     

      </div>
    )
  }
}

export default News
