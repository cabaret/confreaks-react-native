var React = require('react-native');
var Icon = require('FAKIconImage');

var EventView = require('./EventView');

var api = require('../Utils/ConfreaksApi');

var {
  ListView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} = React;

var styles = StyleSheet.create({
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
  }
});

class EventsView extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.events),
      event: '',
      error: ''
    };
  }
  showEvent(event) {
    api.getEvent(event.short_code).then((eventData) => {
      api.getEventVideos(event.short_code).then((eventVideos) => {
        this.props.navigator.push({
          component: EventView,
          title: event.display_name,
          passProps: {
            event: eventData,
            videos: eventVideos
          }
        })
      });
    });
  }
  renderRow(rowData) {
    return (
      <TouchableHighlight underlayColor='#EEE' onPress={this.showEvent.bind(this, rowData)}>
          <View style={styles.eventRow}>
          <Text style={styles.rowText}>{rowData.display_name}</Text>
          <Icon
            name='fontawesome|angle-right'
            size={20}
            color='#000000'
            style={styles.iconArrow}
          />
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
}

module.exports = EventsView;
