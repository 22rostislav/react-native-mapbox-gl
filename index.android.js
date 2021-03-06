'use strict'

var React = require('react-native');
var { NativeModules, requireNativeComponent } = React;

var ReactMapView = requireNativeComponent('RCTMapbox', {
    name: 'RCTMapbox',
    propTypes: {
      accessToken: React.PropTypes.string.isRequired,
      annotations: React.PropTypes.arrayOf(React.PropTypes.shape({
        title: React.PropTypes.string,
        subtitle: React.PropTypes.string,
        coordinates: React.PropTypes.array,
        alpha: React.PropTypes.number,
        fillColor: React.PropTypes.string,
        strokeColor: React.PropTypes.string,
        strokeWidth: React.PropTypes.number
      })),
      centerCoordinate: React.PropTypes.shape({
        latitude: React.PropTypes.number.isRequired,
        longitude: React.PropTypes.number.isRequired
      }),
      centerCoordinateZoom: React.PropTypes.shape(),
      debugActive: React.PropTypes.bool,
      direction: React.PropTypes.number,
      rotationEnabled: React.PropTypes.bool,
      scrollEnabled: React.PropTypes.bool,
      showsUserLocation: React.PropTypes.bool,
      styleUrl: React.PropTypes.string,
      userTrackingMode: React.PropTypes.number,
      zoomEnabled: React.PropTypes.bool,
      zoomLevel: React.PropTypes.number,
      tilt: React.PropTypes.number,
      compassIsHidden: React.PropTypes.bool,
      onRegionChange: React.PropTypes.func,
      onUserLocationChange: React.PropTypes.func,
      // Fix for https://github.com/mapbox/react-native-mapbox-gl/issues/118
      scaleY: React.PropTypes.number,
      scaleX: React.PropTypes.number,
      translateY: React.PropTypes.number,
      translateX: React.PropTypes.number,
      rotation: React.PropTypes.number,
      // Fix for https://github.com/mapbox/react-native-mapbox-gl/issues/175
      renderToHardwareTextureAndroid: React.PropTypes.bool,
      onLayout: React.PropTypes.bool,
      accessibilityLiveRegion: React.PropTypes.string,
      accessibilityComponentType: React.PropTypes.string,
      accessibilityLabel: React.PropTypes.string,
      testID: React.PropTypes.string,
      importantForAccessibility: React.PropTypes.string
    },
    defaultProps() {
      return {
        centerCoordinate: {
          latitude: 0,
          longitude: 0
        },
        debugActive: false,
        direction: 0,
        rotationEnabled: true,
        scrollEnabled: true,
        showsUserLocation: false,
        styleUrl: NativeModules.MapboxGLManager.mapStyles.streets,
        userTrackingMode: NativeModules.MapboxGLManager.userTrackingMode.none,
        zoomEnabled: true,
        zoomLevel: 0,
        tilt: 0,
        compassIsHidden: false
      };
    }
});

var ReactMapViewWrapper = React.createClass({
  statics: {
    Mixin: NativeModules.MapboxGLManager
  },
  handleOnChange(event) {
    if (this.props.onRegionChange) this.props.onRegionChange(event.nativeEvent.src);
  },
  handleUserLocation(event) {
    if (this.props.onUserLocationChange) this.props.onUserLocationChange(event.nativeEvent.src);
  },
  render() {
    return (
      <ReactMapView
        {...this.props}
        onChange={this.handleOnChange}
        onSelect={this.handleUserLocation} />
    );
  }
});

module.exports = ReactMapViewWrapper;
