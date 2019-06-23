import React, { Component } from 'react'
import {
	Text,
	View,
	TextInput,
	ScrollView,
	TouchableOpacity,
} from 'react-native';

import styles from './styles'
import Note from './Note';
import moment from 'moment'
import _ from 'lodash'
import DateTimePicker from "react-native-modal-datetime-picker";

//offline local storage
import AsyncStorage from '@react-native-community/async-storage';

//icons import
import Icon_1 from 'react-native-vector-icons/Entypo'
import Icon_2 from 'react-native-vector-icons/MaterialIcons'

class Main extends Component<>{

	constructor(props) {
		super(props);
		this.state= {
			isVisible: false,
			chosenDate: '',
			noteArray: [],
			noteText: '',
			item: []
		}
	}

	handlePicker=(datetime)=> {
		this.setState({
			isVisible: false,
			chosenDate: moment(datetime).format('HH:mm DD/MM/YYYY')
		})
	}
	selectDateTime=()=> {
		this.setState({
			isVisible: true
		})
	}
	hidePicker=()=> {
		this.setState({
			isVisible: false
		})
	}

	async componentWillMount() {

		item: JSON.parse(await AsyncStorage.getItem("mylist"))
		noteArray: JSON.parse(await AsyncStorage.getItem("mylist"))
		if(this.state.item!=null) { this.setState({ item, noteArray }) }
		else {
			this.state.noteArray.push({
			'date':"Sample Date 1",
			'note':"Sample Note 1",
			'deadline':"Sample Deadline 1"
		});
		await AsyncStorage.setItem("mylist",JSON.stringify(this.state.noteArray))
		this.setState({ item: JSON.parse(await AsyncStorage.getItem("mylist"))})
		//this.state.noteArray= JSON.parse(await AsyncStorage.getItem("mylist"))
		}
	}

	render() { 
	console.log("render")	
	console.log(this.state)

		let notes = this.state.item.map((val,key)=> { return <Note 
						key={key} 
						keyval={key}
						val={val}
						deleteMethod={ ()=> this.deleteNote(key) } />
					});

		return (
			<View style={styles.container}>

				<View style={styles.header}>
				  <Text style={styles.headerText}>Tasks</Text>
				  <TouchableOpacity
				  	onPress={this.clearAsyncStorage}
				  	style={styles.delButton}>
				    <Icon_2 name='delete-sweep' size={20} color="#8A8867" />
				  </TouchableOpacity>
				</View>

				<ScrollView style={styles.scrollContainer}>
					{notes}
				</ScrollView>

				<View style={styles.footer}>
				  <TextInput
				    style={styles.textInput}
				    onChangeText={(noteText)=>this.setState({noteText})}
				    value={this.state.noteText}
				    placeholder='Add note'
				    placeholderTextColor='white'
				    underlineColorAndroid='transparent'>
				  </TextInput>
				</View>

				<TouchableOpacity 
				  onPress={this.selectDateTime} 
				  style={this.state.chosenDate==''?styles.addDeadline_notSet:styles.addDeadline_Set}>
				  <Text style={styles.addDeadlineText}>Deadline</Text>
				</TouchableOpacity>
				<DateTimePicker
				  isVisible={this.state.isVisible}
				  onConfirm={this.handlePicker}
				  onCancel={this.hidePicker}
				  mode={'datetime'}
				  is24Hour={false}
				/>

				<TouchableOpacity
				  onPress={this.storedata}
				  style={styles.addButton}>
				  <Icon_1 name='add-to-list' size={28} color="white" />
				</TouchableOpacity>

			</View>
		);
	}

	
	storedata=async()=>{
		if (this.state.chosenDate!='') {
			console.log("b_push")	
	        console.log(this.state)
			if(this.state.noteText) {
				var d = new Date();
				this.state.noteArray.push({
					'date': "Date Added: "+d.getHours()+":"+d.getMinutes()+" "+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear(),
					'note': this.state.noteText,
					'deadline': "Deadline: "+this.state.chosenDate
				});
				await AsyncStorage.setItem("mylist",JSON.stringify(this.state.noteArray))
				this.setState({ item: JSON.parse(await AsyncStorage.getItem("mylist")) })
				console.log("a_push")	
	            console.log(this.state)
				//this.setState({ noteArray: this.state.noteArray})
				this.setState({ noteText: ''})
				this.setState({ chosenDate: ''})
			}
		}
		else {
			alert('Please select Deadline')
		}
	}

	async deleteNote(key) {
		this.state.noteArray.splice(key, 1);
		await AsyncStorage.setItem("mylist",JSON.stringify(this.state.noteArray))
		this.setState({ item: JSON.parse(await AsyncStorage.getItem("mylist")) })
		//this.setState({ noteArray: this.state.noteArray})
	}

	clearAsyncStorage=async()=> { AsyncStorage.clear(); }
}

export default Main