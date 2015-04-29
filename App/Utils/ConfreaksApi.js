var ConfreaksApi = {
  getFeaturedVideo() {
    return fetch('http://confreaks.tv/api/v1/featured-video.json')
      .then((res) => res.json());
  },
  getEvents() {
    return fetch('http://confreaks.tv/api/v1/events.json')
      .then((res) => res.json());
  },
  getEvent(shortcode) {
    return fetch(`http://confreaks.tv/api/v1/events/${shortcode}.json`)
      .then((res) => res.json());
  },
  getEventVideos(shortcode) {
    return fetch(`http://confreaks.tv/api/v1/events/${shortcode}/videos.json`)
      .then((res) => res.json());
  }
};

module.exports = ConfreaksApi;
