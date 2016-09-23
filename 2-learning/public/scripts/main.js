/*
	container:
		<Weather>
			<div>beijing		300</div>  //OneWeather
			<div>shanghai	500</div>
			<增加 按钮>
		</Weather>
*/
var OneWeather = React.createClass({
	rawMarkup : function(){
		var md = new Remarkable();
		var rawMarkup = md.render(this.props.children.toString());
		return {__html: rawMarkup};
	},
	deleCity : function(){
		var city = this.props.place;
		this.props.onDeleCity(city);
	},
	render : function() {
		return (
			<tr>
				<td>{this.props.place}</td>
				<td dangerouslySetInnerHTML={this.rawMarkup()}></td>
				<td onClick={this.deleCity}><span className="button">Delete</span></td>
			</tr>
		);
	}
});
var Weather = React.createClass({
	loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;

    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  //这个事件默认会执行
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  dc : function(city){
  	var weathers = this.state.data;
  	weathers = weathers.filter((value)=>{
  		if(value.place == city)
  			return false;
  		return true;
  	});
  	this.setState({data: weathers});
	$.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {list : weathers},
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: weathers});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className="Weather">
        <h1>城市污染表</h1>
        <WeatherList data={this.state.data} onOnDeleCity={this.dc}/>
        <WeatherForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var WeatherList = React.createClass({
	onDeleCity: function(city){
		this.props.onOnDeleCity(city);
	},
  	render: function() {
  		var self = this;
	    var WeatherNodes = this.props.data.map(function(One) {
	      return (
	        <OneWeather place={One.place} key={One.id} onDeleCity={self.onDeleCity}>
	          {One.weather}
	        </OneWeather>
	      );
	    });
	    return (
	      <tbody className="weathertable">
	      	<tr>
	      		<th>城市</th>
	      		<th>污染程度</th>
	      		<th></th>
	      	</tr>
	        {WeatherNodes}
	      </tbody>
	    );
  }
});

var WeatherForm = React.createClass({
  getInitialState: function() {
    return {place: '', weather: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({place: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({weather: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var place = this.state.place.trim();
    var weather = this.state.weather.trim();
    if (!place || !weather) {
      return;
    }
    this.props.onCommentSubmit({place: place, weather: weather});
    this.setState({place: '', weather: ''});
  },
  render: function() {
    return (
      <form className="weatherform" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="the city"
          value={this.state.place}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="How much the weather"
          value={this.state.weather}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

ReactDOM.render(
  <Weather url="/data/weather" pollInterval={2000} />,
  document.getElementById('content')
);
