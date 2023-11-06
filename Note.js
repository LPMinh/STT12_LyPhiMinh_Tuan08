import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

class NoteC {
    constructor(id, date, priority, content, iduser) {
        this.id = id;
        this.date = date;
        this.priority = priority;
        this.content = content;
        this.iduser = iduser;
    }
}

export default function Note({ route }) {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const id = route.params.id;
    const currentTime = new Date(Date.now());
    const formattedTime = currentTime.toLocaleString();
    useEffect(() => {
        fetch(`https://6548827bdd8ebcd4ab22faa6.mockapi.io/note/note?iduser=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setNotes(data);
            })
            .catch((error) => console.error('Error fetching notes:', error));
    }, [id]);

    const addNote = () => {
        if (newNote.trim() !== '') {
            const newNoteObj = new NoteC(notes.length + 1, formattedTime, 1, newNote, id);
            fetch('https://6548827bdd8ebcd4ab22faa6.mockapi.io/note/note', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newNoteObj),
                })
                .then((response) => response.json())
                .then((data) => {
                    setNotes([...notes, data]);
                    setNewNote('');
                })
                .catch((error) => console.error('Error adding note:', error));
        }
    };

    const removeNote = (id) => {
        fetch(`https://6548827bdd8ebcd4ab22faa6.mockapi.io/note/note/${id}`, {
                method: 'DELETE',
            })
            .then(() => {
                setNotes(notes.filter((note) => note.id !== id));
            })
            .catch((error) => console.error('Error deleting note:', error));
    };

    return ( <
        View style = { styles.container } >
        <
        Text > Todolist < /Text> <
        TextInput placeholder = "Add a note"
        value = { newNote }
        onChangeText = {
            (text) => setNewNote(text)
        }
        style = { styles.input }
        /> <
        Button title = "Add"
        onPress = { addNote }
        /> <
        FlatList data = { notes }
        keyExtractor = {
            (item) => item.id.toString()
        }
        renderItem = {
            ({ item }) => ( <
                View style = {
                    [styles.noteItem, { backgroundColor: item.priority == 1 ? "red" : "yellow" }]
                } >
                <
                Text > { item.id } < /Text> <
                Text > Date: { item.date } < /Text> <
                Text > { item.content } < /Text> <
                Button title = "Remove"
                onPress = {
                    () => removeNote(item.id)
                }
                /> < /
                View >
            )
        }
        /> < /
        View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        margin: 10,
        padding: 8,
    },
    noteItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
});