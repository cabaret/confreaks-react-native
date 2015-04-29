var React = require('react-native');

var VideoView = require('./VideoView');

var {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Webview,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  featureTitle: {
    padding: 20,
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 30,
    alignSelf: 'center'
  },
  featureEvent: {
    color: '#2babcf',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 14,
    marginTop: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  featureAbstract: {
    padding: 20,
    fontSize: 15
  },
  featurePresenter: {
    paddingLeft: 20,
    paddingRight: 20,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  watchButton: {
    backgroundColor: '#2babcf',
    padding: 20,
    width: 300,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  watchButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
    alignSelf: 'center'
  }
})

class FeaturedVideo extends React.Component {
  getVideoUrl() {
    if(this.props.video.host === 'youtube') {
      var domain = 'https://www.youtube.com';
      return `${domain}/embed/${this.props.video.embed_code}?autoplay=1`
    }
    else if(this.props.video.host === 'vimeo') {
      var domain = 'https://player.vimeo.com/video/';
      return `${domain}/${this.props.video.embed_code}`
    }
  }
  showVideo() {
    this.props.navigator.push({
      component: VideoView,
      title: this.props.video.title,
      passProps: {
        videoUrl: this.getVideoUrl()
      }
    })
  }
  render() {
    var presenters = this.props.video.presenters.map((presenter, index) => {
      return <Text style={styles.featurePresenter} key={index}>{`${presenter.first_name} ${presenter.last_name}`}</Text>;
    });
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.featureEvent}>{this.props.video.event}</Text>
        <Text style={styles.featureTitle}>{this.props.video.title}</Text>
        {presenters}

        <Text style={styles.featureAbstract}>{this.props.video.abstract}</Text>

        <TouchableHighlight
          style={styles.watchButton}
          underlayColor="#333"
          onPress={this.showVideo.bind(this)}>
          <Text style={styles.watchButtonText}>Watch now</Text>
        </TouchableHighlight>
      </ScrollView>
    )
  }
}

module.exports = FeaturedVideo;
