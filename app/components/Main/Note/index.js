import React, { Component } from 'react'
import {
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import styles from './styles'

//icons import
import Icon_1 from 'react-native-vector-icons/Feather'

class Note extends Component<>{
	
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<View key={this.props.keyval1} style={styles.note}>
			  <Text style={styles.noteText}>{this.props.val.date}</Text>
			  <Text style={styles.noteTextMain}>{this.props.val.note}</Text>
			  <Text style={styles.noteText}>{this.props.val.deadline}</Text>
			  <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
			    <Icon_1 name='check-circle' size={25} color="green" />
			  </TouchableOpacity>
			</View>
		);
	}
}

export default Note