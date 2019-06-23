import { StyleSheet } from 'react-native'

export default StyleSheet.create({
	note: {
		position: 'relative',
		paddingVertical: 20,
		paddingRight: 60,
		borderBottomWidth: 2,
		borderBottomColor: '#ededed'
	},
	noteText: {
		paddingLeft: 50,
		borderLeftWidth: 40,
		borderLeftColor: '#32BC72',
	},
	noteTextMain: {
		color: '#2E3C3F',
		paddingLeft: 50,
		paddingRight: 45,
		borderLeftWidth: 40,
		fontSize: 20,
		borderLeftColor: '#32BC72',
	},
	noteDelete: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'transparent',
		padding: 10,
		top: 10,
		right: 10,
		bottom: 10
	},
})