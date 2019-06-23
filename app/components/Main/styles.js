import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F6'
  },
  header:{
  	backgroundColor:'#32BC72',
  	alignItems: 'center',
  	justifyContent: 'center',
  	borderTopWidth: 5,
  	borderTopColor: '#2E3C3F',
  	borderBottomWidth: 10,
  	borderBottomColor: '#98AA9F',
  },
  headerText: {
  	color: 'white',
  	fontSize: 23,
  	fontWeight: 'bold',
  	padding: 26
  },
  scrollContainer: {
  	flex: 1,
  	marginBottom:100,
  },
  footer: {
  	position: 'absolute',
  	bottom: 0,
  	left: 0,
  	right: 0,
  	zIndex: 10
  },
  textInput: {
  	alignSelf: 'stretch',
  	color: '#fff',
  	padding: 20,
  	backgroundColor: '#2E3C3F',
  	borderTopWidth: 2,
  	borderTopColor: '#ededed',
  },
  addButton: {
  	position: 'absolute',
  	zIndex: 11,
  	right: 20,
  	bottom: 90,
  	backgroundColor: '#8A8867',
  	width: 60,
  	height: 60,
  	borderRadius: 50,
  	alignItems: 'center',
  	justifyContent: 'center',
  	elevation: 8
  },
  delButton: {
    position: 'absolute',
    zIndex: 11,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },  
  addDeadline_notSet: {
  	position: 'absolute',
  	zIndex: 5,
  	right: 90,
  	bottom: 90,
  	backgroundColor: '#D09797',
  	width: 100,
  	height: 50,
  	borderRadius: 50,
  	alignItems: 'center',
  	justifyContent: 'center',
  	elevation: 8
  },
  addDeadline_Set: {
  	position: 'absolute',
  	zIndex: 5,
  	right: 90,
  	bottom: 90,
  	backgroundColor: '#A3D097',
  	width: 100,
  	height: 50,
  	borderRadius: 50,
  	alignItems: 'center',
  	justifyContent: 'center',
  	elevation: 8
  },
  addDeadlineText: {
  	color: '#fff',
  	fontSize: 17,
  	justifyContent: 'center',
	alignItems: 'center'
  }
})