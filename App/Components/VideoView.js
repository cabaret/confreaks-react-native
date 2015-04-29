var React = require('react-native');

var {
  ActivityIndicatorIOS,
  View,
  WebView,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cccccc',
    flexDirection: 'column'
  },
  loader: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    height: 80
  }
});

class VideoView extends React.Component {
  renderLoading() {
    return (
      <View style={styles.container}>
        <ActivityIndicatorIOS
          animating={true}
          style={styles.loader}
          size="large"
        />
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <WebView
          renderLoading={this.renderLoading}
          url={this.props.videoUrl}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    )
  }
}

module.exports = VideoView;

