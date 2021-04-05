import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const styles = StyleSheet.create({
    textInput: {
        flex: 1,
        color: 'white',
    },
    container: {
        height: 40,
        width: 300,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 40,
        paddingHorizontal: 10,
        borderRadius: 5,
    }
});

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    onChangeText = (text) => {
        this.setState({
            text: text
        })
    }

    onSubmitEditing = () => {
        let { text } = this.state;
        let { onSubmit } = this.props;

        if (!text) return;
        onSubmit(text);
        this.setState({
            text: ''
        })
    }

    render() {
        let { searchPlaceHoder } = this.props;
        let { text } = this.state;
        return (
            <View style={styles.container}>
                <TextInput
                    value={text}
                    autoCorrect={false}
                    placeholder={searchPlaceHoder}
                    placeholderTextColor="white"
                    underlineColorAndroid="transparent"
                    style={styles.textInput}
                    clearButtonMode="always" // only available on IOS
                    onChangeText={this.onChangeText}
                    onSubmitEditing={this.onSubmitEditing}
                />
            </View>
        );
    }
}

export default SearchInput;