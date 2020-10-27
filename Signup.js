import React from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Picker } from 'react-native'
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { Input, Button, CheckBox } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/FontAwesome'
import DateTimePicker from '@react-native-community/datetimepicker'

export default class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameKana: '',
            email: '',
            password: '',
            postalCode: '',
            address: '',
            phoneNumber: '',
            gender: '',
            birthday: new Date(),
            height: '160',
        }
    }

    login = async () => {
        const { email, password } = this.state
        try {
            const user = await Auth.signIn(email, password)
            console.log('successfully signuped!')
            console.log(user)
        } catch(error) {
            console.log('error signing up ', error)
        }
    }

    navigateSignin = () => {
        this.props.onStateChange('signIn')
    }

    onGenderCheck = (gender) => {
        if(this.state.gender === gender) {
            this.setState({ gender: ''})
        } else {
            this.setState({ gender: gender})
        }
    }

    onPressSignup = async () => {
        console.log('サインアップが押されました')
        const { name, nameKana, email, password, phoneNumber, address, postalCode, height, birthday, gender } = this.state
        try {
            console.log('Cognitoにサインアップします')
            await Auth.signUp(email, password)
            this.props.onStateChange('confirmSignUp', {name, nameKana, email, phoneNumber, address, postalCode, height, birthday, gender})
        } catch(error) {
            console.error(error)
        }
    }

    render() {
        const { gender } = this.state
        if(this.props.authState !== 'signUp') {
            return null;
        } else {
            return(
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Icon name='angle-left' size={40} onPress={this.navigateSignin} style={styles.backIcon}/>
                    </View>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.formContainer}>
                            <View>
                                <View>
                                    <Text style={styles.signupText}>Sign up</Text>
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.title}>お名前<Text style={styles.must}>必須</Text></Text>
                                    <Input
                                        onChangeText={val => this.setState({ name: val })}
                                        placeholder='姓名(漢字)'
                                    />
                                    <Input
                                        onChangeText={val => this.setState({ nameKana: val })}
                                        placeholder='姓名(カナ)'
                                    />
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.title}>性別</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon.Button
                                            name='check-circle'
                                            onPress={() => this.onGenderCheck('male')}
                                            backgroundColor='white'
                                            iconStyle={{ color: (gender === 'male') ? '#7389D9' : 'white' }}
                                        >
                                            <Text style={{ color: 'black' }}>男性</Text>
                                        </Icon.Button>
                                        <Icon.Button
                                            name='check-circle'
                                            onPress={() => this.onGenderCheck('female')}
                                            backgroundColor='white'
                                            iconStyle={{ color: (gender === 'female') ? '#7389D9' : 'white' }}
                                        >
                                            <Text style={{ color: 'black' }}>女性</Text>
                                        </Icon.Button>
                                        <Icon.Button
                                            name='check-circle'
                                            onPress={() => this.onGenderCheck('other')}
                                            backgroundColor='white'
                                            iconStyle={{ color: (gender === 'other') ? '#7389D9' :  'white'}}
                                        >
                                            <Text style={{ color: 'black' }}>その他</Text>
                                        </Icon.Button>
                                    </View>
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.title}>お届け先<Text style={styles.must}>必須</Text></Text>
                                    <Input
                                        placeholder='郵便番号'
                                        onChangeText={val => this.setState({ postalCode: val })}
                                    />
                                    <Input
                                        placeholder='住所'
                                        onChangeText={val => this.setState({ address: val })}
                                    />
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.title}>生年月日</Text>
                                    <DateTimePicker
                                        style={{ width: wp('70%')}}
                                        value={this.state.birthday}
                                        mode={'date'}
                                        onChange={(event, date) => this.setState({ birthday: date })}
                                    />
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.title}>電話番号</Text>
                                    <Input
                                        placeholder='ハイフン不要'
                                        onChangeText={val => this.setState({ phoneNumber: val })}
                                    />
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.title}>メールアドレス<Text style={styles.must}>必須</Text></Text>
                                    <Input
                                        onChangeText={val => this.setState({ email: val })}
                                    />
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.title}>身長</Text>
                                    <Picker
                                        selectedValue={this.state.height}
                                        onValueChange={value => this.setState({ height: value })}
                                    >
                                        <Picker.Item label='120' value='120' />
                                        <Picker.Item label='130' value='130' />
                                        <Picker.Item label='140' value='140' />
                                        <Picker.Item label='150' value='150' />
                                        <Picker.Item label='160' value='160' />
                                        <Picker.Item label='170' value='170' />
                                        <Picker.Item label='180' value='180' />
                                        <Picker.Item label='190' value='190' />
                                        <Picker.Item label='200' value='200' />
                                        <Picker.Item label='210' value='210' />
                                        <Picker.Item label='220' value='220' />
                                        <Picker.Item label='230' value='230' />
                                    </Picker>
                                </View>
                                <View style={styles.form}>
                                    <Text style={styles.title}>パスワード<Text style={styles.must}>必須</Text></Text>
                                    <Input
                                        placeholder='半角英数字'
                                        onChangeText={val => this.setState({ password: val })}
                                        secureTextEntry={true}
                                    />
                                </View>
                                <View style={{ height: hp('20%') }}></View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={styles.button}>
                        <Button
                            title='next →'
                            buttonStyle={{ borderRadius: 30, width: wp('30%'), height: hp('6%'), backgroundColor: 'white' }}
                            titleStyle={{ color: '#7389D9', fontSize: 16, fontWeight: 'bold' }}
                            onPress={this.onPressSignup}
                        />
                    </View>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: wp('100%'),
        height: hp('100%'),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        left: wp('7%'),
        top: wp('3%'),
        height: hp('8%')
    },
    backIcon: {
        left: wp('10%')
    },
    scrollView: {
        flex: 1,
        width: wp('100%')
    },
    formContainer: {
        width: wp('80%'),
        alignItems: 'center',
        top: hp('3%'),
        //bottom: hp('10%')
    },
    signupText: {
        width: wp('40%'),
        fontSize: wp('10%'),
        fontWeight: '500'
    },
    form: {
        marginTop: hp('3%')
    },
    title: {
        marginBottom: hp('2%'),
        fontSize: 16
    },
    checkbox: {
        backgroundColor: 'white',
    },
    button: {
        flex: 1,
        position: 'absolute',
        bottom: hp('4%'),
        right: wp('8%'),
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.6,
        shadowRadius: 20,
        borderRadius: 30,
    },
    must: {
        backgroundColor: '#7389D9',
        color: 'white',
        textAlign: 'center',
        width: wp('6%'),
        fontSize: wp('3%'),
    }
})
