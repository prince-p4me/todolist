import PropTypes from "prop-types";
import React from 'react';
import { Image, TextInput, TouchableOpacity, ViewPropTypes } from 'react-native';
import colors from '../../utilities/Colors';
import { TextRegular } from '../TextView';
import Fonts from '../../utilities/Fonts'


const MyTextInput = (props) => {
    if (props.disabled) {
        return (
            <TouchableOpacity
                disabled={!props.touchable}
                onPress={() => { props.onPress() }}
                style={[{
                    flex: 1, overflow: 'hidden',
                    borderRadius: 6,
                    // backgroundColor: 'red',
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 40,
                    paddingLeft: 10,
                    padding: 8,
                }, props.containerStyle ? props.containerStyle : {},]}>
                {props.placeholderIcon && props.placeholderPosition != 'right' ?
                    <Image tintColor={props.placeholderIconTint} source={props.placeholderIcon} style={{ height: 18, width: 18, marginLeft: 10, resizeMode: 'contain', tintColor: props.placeholderIconTint }} /> : null}
                <TextRegular
                    style={[{
                        flex: 1,
                        // margin: 4,
                        // padding:4,
                        // backgroundColor:'red',
                        fontSize: 13,
                        fontFamily: Fonts.regular,
                    }, props.style]}
                    numberOfLines={props.numberOfLines}
                    title={props.value && props.value.length > 0 ? props.value : props.placeholder}
                />
                {props.placeholderIcon && props.placeholderPosition == 'right' ?
                    <Image tintColor={props.placeholderIconTint} source={props.placeholderIcon} style={{ height: 18, width: 18, marginRight: 10, resizeMode: 'contain', tintColor: props.placeholderIconTint }} /> : null}

            </TouchableOpacity>
        )
    }
    return (
        <TouchableOpacity
            disabled={true}
            style={[{
                flex: 1, overflow: 'hidden', borderRadius: 6, alignItems: 'center',
                flexDirection: 'row'
            }, props.containerStyle ? props.containerStyle : {},]}>
            {props.placeholderIcon && props.placeholderPosition != 'right' ?
                <Image tintColor={props.placeholderIconTint} source={props.placeholderIcon} style={{ height: 18, width: 18, marginLeft: 10, resizeMode: 'contain', tintColor: props.placeholderIconTint }} /> : null}
            <TextInput
                style={[{
                    flex: 1,
                    margin: 4,
                    // backgroundColor:'white',
                    fontSize: 13,
                    padding: 4,
                    height: 40,
                    paddingLeft: 10,
                    fontFamily: Fonts.regular,
                }, props.style]}
                value={props.value}
                onChangeText={text => { if (props.onChangeText) props.onChangeText(text) }}
                placeholder={props.placeholder}
                autoCapitalize={"none"}
                numberOfLines={props.numberOfLines}
                onContentSizeChange={props.onContentSizeChange}
                multiline={props.multiline}
                autoCorrect={false}
                maxLength={props.maxLength}
                keyboardType={props.keyboardType || 'default'}
                clearButtonMode="while-editing"
                secureTextEntry={props.secureTextEntry}
                placeholderTextColor={props.placeholderTextColor || colors.black}
            />
            {props.placeholderIcon && props.placeholderPosition == 'right' ?
                <Image tintColor={props.placeholderIconTint} source={props.placeholderIcon} style={{ height: 18, width: 18, marginRight: 10, resizeMode: 'contain', tintColor: props.placeholderIconTint }} /> : null}
        </TouchableOpacity>
    );
}

const propsType = {
    style: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
    value: PropTypes.string,
    onChangeText: PropTypes.func,
    onContentSizeChange: PropTypes.func,
    onPress: PropTypes.func,
    placeholder: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    touchable: PropTypes.bool,
    multiline: PropTypes.bool,
    numberOfLines: PropTypes.number,
    disabled: PropTypes.bool,
    donotshowLine: PropTypes.bool,
    keyboardType: TextInput.propTypes.keyboardType,
    placeholderTextColor: PropTypes.string,
    placeholderIcon: PropTypes.any,
    placeholderIconTint: PropTypes.any,
    maxLength: PropTypes.number,
    placeholderPosition: PropTypes.oneOf(['left', 'right']),
};

MyTextInput.propTypes = propsType;

export default MyTextInput

