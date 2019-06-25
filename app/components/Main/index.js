import React, { Component } from 'react'
import {
	Text,
	View,
	TextInput,
	ScrollView,
	Alert,
	TouchableOpacity,
} from 'react-native';

import styles from './styles'
import Note from './Note';
import moment from 'moment'
import _ from 'lodash'
import DateTimePicker from "react-native-modal-datetime-picker";

//offline local storage
import SQLite from "react-native-sqlite-storage"

//icons import
import Icon_1 from 'react-native-vector-icons/Entypo'
import Icon_2 from 'react-native-vector-icons/MaterialIcons'

class Main extends Component<>{

	constructor(props) {
		super(props);
		const db = SQLite.openDatabase(
			{name:'test.db', createFromLocation:'~notesData.db'},
			() => {},
			error => {console.log(error);}
		);
		this.state= {
			db,
			isVisible: false,
			noteArray: [],
			noteDate:'',
			noteText: '',
			noteDeadline:''
		}

	}

	render() { 

		const { noteArray } = this.state;

		let notes = noteArray.map((val, key)=> { 
					return <Note 
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
				  	onPress={() => Alert.alert(
					          'Delete all tasks?',
					          'Deleteing all tasks will clear every tasks stored',
					          [
					          	{text: 'Yes', onPress: this.clearData},
					            {text: 'No', onPress: () => console.log('Delete all canceled'),style: 'cancel'}
					          ],
					          { cancelable: false }
					        )}
				  	style={styles.delButton}>
				    <Icon_2 name='delete-sweep' size={20} color="#8A8867" />
				  </TouchableOpacity>
				</View>

				<ScrollView style={styles.scrollContainer}>				
					{notes}
				</ScrollView>

				<View style={styles.footer}>
				  <TextInput 											//addNoteField
				    style={styles.textInput}
				    onChangeText={(noteText)=>this.setState({noteText})}
				    value={this.state.noteText}
				    placeholder='Add note'
				    placeholderTextColor='white'
				    underlineColorAndroid='transparent'>
				  </TextInput>
				</View>

				<TouchableOpacity     									//deadlineButton
				  onPress={this.selectDateTime} 
				  style={this.state.noteDeadline==''?styles.addDeadline_notSet:styles.addDeadline_Set}>
				  <Text style={styles.addDeadlineText}>Deadline</Text>
				</TouchableOpacity>
				<DateTimePicker
				  isVisible={this.state.isVisible}
				  onConfirm={this.handlePicker}
				  onCancel={this.hidePicker}
				  mode={'datetime'}
				  is24Hour={false}
				/>

				<TouchableOpacity										//storeButton
				  onPress={this.storeData.bind(this)}
				  style={styles.addButton}>
				  <Icon_1 name='add-to-list' size={28} color="white" />
				</TouchableOpacity>

			</View>
		);
	}

	componentDidMount() {
		const { db } = this.state;
		db.transaction(tx => {
			tx.executeSql('SELECT * FROM tasks;', [], (tx, results) => {
				const rows = results.rows;
				let noteArray = [];
		        for (let i = 0; i < rows.length; i++) {
		          noteArray.push({
		            ...rows.item(i),
		          });
		        }
		        this.setState({ noteArray });
		    });
		});
	}

  	componentWillUnmount() {
  	    const { db } = this.state;
  	    db.close();
  	}

	
	storeData=() => {
		const { db } = this.state;
		const { noteText } = this.state;

		if (this.state.noteDeadline!='') {
			if(this.state.noteText) {

				var d = new Date();
				this.state.noteDate=JSON.parse(JSON.stringify("Date Added: "+d.getHours()+":"+d.getMinutes()+" "+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()))
				let temp=JSON.parse(JSON.stringify(this.state.noteDeadline))

				db.transaction(tx => {
					tx.executeSql(
						'INSERT INTO tasks (date, note, deadline) VALUES (?,?,?)',
						[this.state.noteDate, noteText,"Deadline: "+temp],
						(tx, results) => {
							console.log('Added rows ->', results.rowsAffected);
					});
				});

				db.transaction(tx => {
					tx.executeSql('SELECT * FROM tasks;', [], (tx, results) => {
						const rows = results.rows;
						let noteArray = [];
				        for (let i = 0; i < rows.length; i++) {
				          noteArray.push({
				            ...rows.item(i),
				          });
				        }
				        this.setState({ noteArray });
				    });
				});				

				this.setState({ noteText: ''})
				this.setState({ noteDeadline: ''})
			}
		}
		else {
			alert('Please select Deadline')
		}
	}

	deleteNote=(key) => {

		const { db } = this.state;
		const { noteArray } = this.state;

		db.transaction(tx => {
			tx.executeSql(
				'DELETE FROM  tasks where id=?', [noteArray[key].id],(tx, results) => {
					console.log('Deleted rows ->', results.rowsAffected);
			});
		});

		db.transaction(tx => {
			tx.executeSql('SELECT * FROM tasks;', [], (tx, results) => {
				const rows = results.rows;
				let noteArray = [];
		        for (let i = 0; i < rows.length; i++) {
		          noteArray.push({
		            ...rows.item(i),
		          });
		        }
		        this.setState({ noteArray });
		    });
		});

	}

	clearData=() => {

		const { db } = this.state;

		db.transaction(tx => {
			tx.executeSql(
				'DELETE FROM  tasks', [],(tx, results) => {
					console.log('Deleted rows ->', results.rowsAffected);
			});
		});

		db.transaction(tx => {
			tx.executeSql('SELECT * FROM tasks;', [], (tx, results) => {
				const rows = results.rows;
				let noteArray = [];
		        for (let i = 0; i < rows.length; i++) {
		          noteArray.push({
		            ...rows.item(i),
		          });
		        }
		        this.setState({ noteArray });
		    });
		});

	}

	handlePicker=(datetime)=> {
		this.setState({
			isVisible: false,
			noteDeadline: moment(datetime).format('HH:mm DD/MM/YYYY')
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

}

export default Main