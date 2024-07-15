import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  page: {
    padding: 26,
  },
  header: {
    marginTop: 26,
    color: 'grey',
    fontSize: 30,
  },
  text: {
    color: 'grey',
    marginBottom: 12,
  },
  headerFooterContainer: {
    marginVertical: 25,
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
  },
  link: {
    color: 'blue',
  },
});

export default styles;
