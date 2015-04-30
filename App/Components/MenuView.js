var Icon = require('FAKIconImage');
var React = require('react-native');
var FeaturedVideo = require('./FeaturedVideo');
var EventsView = require('./EventsView');

var api = require('../Utils/ConfreaksApi');

var {
  ActivityIndicatorIOS,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  AlertIOS,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loader: {
    flex: 1,
    marginTop: 10
  },
  logoContainer: {
    marginTop: 64,
    borderBottomColor: '#e9e9e9',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    shadowColor: '#000000',
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: .175
  },
  logo: {
    width: 200,
    height: 40,
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  buttonTextDark: {
    fontSize: 24,
    color: '#333',
    alignSelf: 'center'
  }

})

class MenuView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }
  makeButton(idx) {
    var obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }

    if(idx === 0) {
      obj.backgroundColor = '#db6152';
    }
    if(idx === 1) {
      obj.backgroundColor = '#ed3e49';
    }
    if(idx === 2) {
      obj.backgroundColor = '#2babcf';
    }
    if(idx === 3) {
      obj.backgroundColor = '#f6f6e6';
    }
    return obj;
  }
  goToFeaturedVideo() {
    this.setState({
      isLoading: true
    })
    api.getFeaturedVideo().then((data) => {
      this.props.navigator.push({
        component: FeaturedVideo,
        title: 'Featured Video',
        passProps: {
          video: data
        }
      });
      this.setState({
        isLoading: false
      })
    });
  }
  goToEvents() {
    this.setState({
      isLoading: true
    })
    api.getEvents().then((data) => {
      this.props.navigator.push({
        component: EventsView,
        title: 'Events',
        passProps: {
          events: data
        }
      });
      this.setState({
        isLoading: false
      })
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('image!confreaks-logo')} style={styles.logo} />
          <ActivityIndicatorIOS
            animating={this.state.isLoading}
            color='#808080'
            size='small'
            style={styles.loader}
          />
        </View>
        <View style={styles.container}>
          <TouchableHighlight
            style={this.makeButton(2)}
            underlayColor='#333'
            onPress={this.goToFeaturedVideo.bind(this)}
          >
            <Text style={styles.buttonText}>
              Featured Video
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={this.makeButton(1)}
            underlayColor='#333'
            onPress={this.goToEvents.bind(this)}
          >
            <Text style={styles.buttonText}>Events</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={this.makeButton(3)}
            onPress={() => AlertIOS.alert('Presenters has not been implemented yet!') }
            underlayColor='#333'>
            <Text style={styles.buttonTextDark}>Presenters</Text>
          </TouchableHighlight>
        </View>

      </View>
    )
  }
}

module.exports = MenuView;
