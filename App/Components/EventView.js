var React = require('react-native');
var Icon = require('FAKIconImage');

var VideoView = require('./VideoView');

var {
  ScrollView,
  ListView,
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  eventLogo: {
    marginTop: 95,
    height: 80,
    width: 300,
    alignSelf: 'center'
  },
  eventTitle: {
    marginTop: 20,
    fontSize: 24,
    textAlign: 'center'
  },
  eventsView: {
    marginTop: 0,
    paddingTop: 0
  },
  eventRow: {
    padding: 15,
    borderBottomColor: '#EEE',
    borderBottomWidth: 1,
    flex: 5,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  rowText: {
    flex: 4.5,
    alignSelf: 'flex-start'
  },
  iconArrow: {
    flex: .5,
    width: 20,
    height: 20,
    alignSelf: 'flex-end'
  },
  presenterName: {
    paddingTop: 5,
    fontSize: 12,
    color: '#999'
  }
});

class EventView extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.videos)
    };
  }
  getVideoUrl(video) {
    if(video.host === 'youtube') {
      var domain = 'https://www.youtube.com';
      return `${domain}/embed/${video.embed_code}?autoplay=1`
    }
    else if(video.host === 'vimeo') {
      var domain = 'https://player.vimeo.com/video/';
      return `${domain}/${video.embed_code}`
    }
  }
  showVideo(video) {
    if(this.getVideoUrl(video)) {
      this.props.navigator.push({
        component: VideoView,
        title: video.title,
        passProps: {
          videoUrl: this.getVideoUrl(video)
        }
      });
    }
  }
  getPresenters(video) {
    return video.presenters.map((presenter, index) => {
      return <Text key={index} style={styles.presenterName} >{presenter.first_name} {presenter.last_name}</Text>
    });

  }
  renderRow(rowData) {
    return (
      <TouchableHighlight underlayColor='#EEE' onPress={this.showVideo.bind(this, rowData)}>
          <View style={styles.eventRow}>
          <View style={styles.rowText}>
          <Text>{rowData.title}</Text>
          { this.getPresenters(rowData) }
          </View>
          { (this.getVideoUrl(rowData)) ?
            <Icon name='fontawesome|angle-right'
              size={20} color='#000000'
              style={styles.iconArrow} />
            : <View></View> }
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    return(
      <View style={styles.container}>
        {(this.props.event.logo) ?
          <Image style={styles.eventLogo} resizeMode='contain' source={{uri: this.props.event.logo}} />
          : <View></View>}
        <ListView
          style={styles.eventsView}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
}

module.exports = EventView;
