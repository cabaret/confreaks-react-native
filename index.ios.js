'use strict';

var React = require('react-native');
var MenuView = require('./App/Components/MenuView');

var {
  AppRegistry,
  NavigatorIOS,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF'
  }
});

class Confreaks extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        barTintColor='#FFFFFF'
        initialRoute={{
          title: '',
          component: MenuView
        }}
       />
    )
  }
}

AppRegistry.registerComponent('Confreaks', () => Confreaks);
