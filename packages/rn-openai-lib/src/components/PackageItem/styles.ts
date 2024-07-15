import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginTop: 15,
    marginBottom: 15,
    //backgroundColor: '#1a1a1a',
    backgroundColor: '#10A37F',
    borderBottomWidth: 1,
    borderBottomColor: '#10A37F',
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  terms: {
    color: 'white',
    fontSize: 14,
  },
  left: {
    width: '80%',
  },
});

export default styles;
