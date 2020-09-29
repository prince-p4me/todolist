import React, { Component } from 'react';
import { StatusBar, View, SafeAreaView, Text, SectionList, Image, FlatList, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from 'react-redux'
import Colors from '../utilities/Colors';
import CommonHeader from '../components/CommonHeader';
import TextInput from '../components/TextInput/index';
import Globalstyles from "./style";
import { TextSemiBold, TextRegular, TextMedium } from '../components/TextView';
import Sizes from '../utilities/Sizes';
import Images from '../utilities/Images';
import NavigationService from '../Services/NavigationService';
import { TextBold } from '../components/TextView';
import Constants from '../utilities/Constants';
import * as Actions from "../redux/action";
import Toast from 'react-native-simple-toast';

class HomeScreen extends Component {
  state = {
    todo: ""
  }

  componentDidMount = async () => {
    // console.log(this.props);
  }

  markedItem = (item) => {
    let { data } = this.props;
    var foundArray = data[1].data.filter(el => el.name === item.name);
    if (foundArray.length) {
      return true;
    } else return false;
  }

  renderItem = (item, index) => {
    console.log("rendering index++" + JSON.stringify(index));
    return (
      <TouchableOpacity style={styles.row} activeOpacity={.7}
        disabled={!this.markedItem(item)} onPress={() => this.props.markIncomplete(item)}>
        <View style={{ flex: 1, paddingEnd: 10 }}>
          <TextSemiBold title={item.name} style={{ fontSize: Sizes.regular }} numberOfLines={2} />
        </View>
        {
          this.markedItem(item) ?
            <Image source={Images.checked} style={{ width: 20, height: 20 }} resizeMode="contain"></Image> :
            <>
              <TouchableOpacity style={styles.button} activeOpacity={.7}
                onPress={() => this.props.markComplete(item)}>
                <Image source={Images.checked} style={{ width: 15, height: 15, tintColor: Colors.white }} resizeMode="contain"></Image>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { marginStart: 15 }]} activeOpacity={.7}
                onPress={() => this.props.deleteTodo(item)}>
                <Image source={Images.trash} style={{ width: 15, height: 15 }} resizeMode="contain"></Image>
              </TouchableOpacity>
            </>
        }
      </TouchableOpacity>
    )
  }

  addItem = () => {
    let { todo } = this.state;
    let { data } = this.props;
    if (!todo) {
      Toast.showWithGravity("Todo can't be blank", Toast.LONG, Toast.BOTTOM)
      return
    }
    var foundArray = data[0].data.filter(el => el.name === todo);
    if (foundArray.length) {
      Toast.showWithGravity("Todo can't be duplicate", Toast.LONG, Toast.BOTTOM)
      return;
    }
    this.props.createTodo({ id: (data[0].data.length + 1).toString(), name: todo });
    this.setState({ todo: "" })
  }

  render() {
    let { data } = this.props;
    let { todo } = this.state;
    // console.log("list:--" + data.length);
    return (
      <View style={Globalstyles.safeArea}>
        <SafeAreaView style={{ width: "100%", backgroundColor: Colors.theme }}></SafeAreaView>
        <StatusBar backgroundColor={Colors.theme} barStyle="light-content" />
        <CommonHeader title={"TODOS"} noBack={true} />
        <View style={{ flex: 1 }}>
          <View style={styles.inputBox}>
            <TextInput placeholder="Enter Todo" style={{ height: 40, flex: 1 }}
              value={todo} placeholderTextColor={Colors.black}
              onChangeText={(todo) => this.setState({ todo })}
            ></TextInput>
            <TouchableOpacity style={styles.button} activeOpacity={.7}
              onPress={() => this.addItem()}>
              <TextBold title="ADD TODOS" style={{ color: Colors.white, fontSize: Sizes.regular }}></TextBold>
            </TouchableOpacity>
          </View>
          <SectionList sections={data}
            keyboardShouldPersistTaps={true}
            keyExtractor={(item, index) => index.toString()}
            extraData={this.props}
            renderSectionHeader={({ section: { header } }) => (
              <Text style={styles.header}>{header}</Text>
            )}
            renderItem={({ item, index, section }) => this.renderItem(item, index)}
          />
        </View>
      </View >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.todoData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createTodo: (data) => dispatch(Actions.createTodo(data)),
    markComplete: (data) => dispatch(Actions.markComplete(data)),
    markIncomplete: (data) => dispatch(Actions.markIncomplete(data)),
    deleteTodo: (data) => dispatch(Actions.deleteTodo(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

const styles = StyleSheet.create({
  header: { padding: 10, paddingVertical: 14, backgroundColor: Colors.grey },
  row: {
    width: "100%", padding: 10,
    flexDirection: "row", alignItems: "center",
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  inputBox: {
    width: Constants.width, height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.grey,
    paddingEnd: 10
  },
  button: {
    paddingHorizontal: 7,
    backgroundColor: Colors.theme,
    paddingVertical: 7
  }
});