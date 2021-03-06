import React from "react";
import {
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet, Switch, Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform
} from "react-native";
import {Header, Icon} from "react-native-elements";
import {SCREEN_HEIGHT, SCREEN_WIDTH, STATUS_BAR_HEIGHT} from "../../constants";
import DatePicker from "../date-picker/date-picker";
import {goBack, navigate} from "../../../services/navigation";
import {getMoods, getTags} from "../../../services/firebase/firebaseService";
import {map} from 'lodash'
import MultiSelect from 'react-native-multiple-select';
import {PostDoc} from "../../../modals";
import MyDatePicker from "../date-picker/date-picker";
import {fontSize} from "../../theme";
import moment from 'moment'

interface IFeedFormStates {
    description: string;
    mood: string;
    tags: string;
    address: string;
    when: any;
    imageURL: string;
    moodList: string[],
    tagList: string[],
    selectedMoods: string[],
    selectedTags: string[],
    pollStartDate: Date,
    isDynamicTime: boolean
}

interface IFeedFormProps {
    showHeader: boolean;
    onClose: () => void;
    onSubmit: (description: string, moods: string[], tags: string[], location: string, pollStartDate?: Date) => void;
    headerTitle: string;
    showDate: boolean;
    imageURI: string;
    headerRightLabel?: string
}

class FeedForm extends React.Component<IFeedFormProps, IFeedFormStates> {
    private multiSelectMoods;
    private multiSelectTags;

    constructor(props: any) {
        super(props);
        this.state = {
            description: '',
            mood: '',
            tags: '',
            address: '',
            when: new Date(),
            imageURL: '',
            moodList: [],
            tagList: [],
            selectedMoods: [],
            selectedTags: [],
            pollStartDate: new Date(),
            isDynamicTime: false
        }
    }

    componentDidMount() {
        this.getMoods();
        this.getTags()
    }

    private getMoods() {
        const moods = []
        getMoods().then(res => {
            map(res, (m, i) => {
                // @ts-ignore
                const mood = {
                    id: i,
                    name: m.data().mood
                }
                // @ts-ignore
                moods.push(mood)
            })
        }).catch(err => {
            console.log("moods fetch error")
        })
        this.setState({
            moodList: moods
        })
    }

    private getTags() {
        const tags = []
        getTags().then(res => {
            map(res, (t, i) => {
                // @ts-ignore
                const tag = {
                    id: i,
                    name: t.data().tag
                }
                // @ts-ignore
                tags.push(tag)
            })
        }).catch(err => {
            console.log("tags fetch error")
        })
        this.setState({
            tagList: tags
        })
    }

    private onMoodSelect = (moods) => {
        const formattedMoods = moods;
        map(formattedMoods, ((m, i) => {
            if (!Number.isInteger(m)) {
                formattedMoods.splice(i, 1)
            }
        }))
        this.setState({
            selectedMoods: formattedMoods
        })

    }

    private onTagSelect = (tags) => {
        const formattedTags = tags;
        map(formattedTags, ((m, i) => {
            if (!Number.isInteger(m)) {
                formattedTags.splice(i, 1)
            }
        }))
        this.setState({
            selectedTags: formattedTags
        })
    }

    private onSubmit = () => {
        const tags: string[] = [];
        const moods: string[] = [];
        map(this.state.selectedTags, t => tags.push(this.state.tagList[t]))
        map(this.state.selectedMoods, m => moods.push(this.state.moodList[m]))
        const diff = moment(this.state.when).diff(new Date(), "minutes")
        let endDate = this.state.when
        if (!this.state.isDynamicTime) {
            endDate = new Date(moment(this.state.when).add(2, "minutes").toISOString())
        }
        this.props.onSubmit(this.state.description, moods, tags, this.state.address, endDate)
    }

    private onMoodRemove = (moodIndex) => {
        const moods = this.state.selectedMoods.filter(mood => mood != moodIndex);
        this.setState({
            selectedMoods: moods
        })
    }

    private onTagRemove = (tagIndex) => {
        const tags = this.state.selectedTags.filter(tag => tag != tagIndex);
        this.setState({
            selectedTags: tags
        })
    }

    private handleDateChange = (date: Date) => {
        this.setState({
            when: date
        })
    }

    private onTimeSwitch = () => {
        if (this.state.isDynamicTime) {
            this.setState({
                when: new Date()
            })
        } else {
            this.setState({
                when: new Date()
            })
        }
        this.setState({
            isDynamicTime: !this.state.isDynamicTime
        })
    }

    render() {
        console.log(" state ",this.state)
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView
                    style={styles.keyboardAvoidingViewContainer}
                    behavior={Platform.OS === "ios" ? "padding" : 'height'}>
                    {this.props.showHeader &&
                    <Header
                        statusBarProps={{barStyle: "light-content"}}
                        barStyle="dark-content"
                        containerStyle={{
                            display: "flex",
                            backgroundColor: "#0C0D34",
                        }}
                        leftComponent={<TouchableOpacity onPress={() => {
                            goBack()
                        }}>
                            <Icon
                                name="close"
                                color="white"/>
                        </TouchableOpacity>}
                        centerComponent={{
                            text: this.props.headerTitle,
                            style: {color: "#FFF", fontWeight: "bold"},
                        }}
                        rightComponent={<TouchableOpacity onPress={this.onSubmit}>
                            <Text style={{
                                color: "#58ddd9",
                                fontWeight: "bold"
                            }}>{this.props.headerRightLabel || 'Lancia'}</Text>
                        </TouchableOpacity>}
                    />
                    }

                    <ScrollView style={{backgroundColor: 'none', marginBottom: 0}}>
                        <View style={styles.centerContainer}>
                            <View style={styles.loginForm}>
                                <Text style={styles.input_label}>Aggiungi una descrizione</Text>
                                <View style={styles.textInputWrapper}>
                                    <TextInput autoCapitalize="none" value={this.state.description}
                                               onChangeText={(text) => {
                                                   this.setState({description: text})
                                               }} placeholder="Descrivi il tuo outfit e l'occasione" placeholderTextColor={'#515151'}
                                               style={styles.input}/>
                                </View>
                                {/* <Text style={styles.input_label}>ADD A Mood</Text> */}
                                <View style={styles.dropDownWrapper}>
                                    {/*<TextInput autoCapitalize="none" value={this.state.description}*/}
                                    {/*           onChangeText={() => {*/}
                                    {/*           }} placeholder="example: I feel cool" placeholderTextColor={'black'} */}
                                    {/*           style={styles.input}/>*/}
                                    <MultiSelect
                                        hideTags
                                        items={this.state.moodList}
                                        uniqueKey="id"
                                        ref={(component) => {
                                            this.multiSelectMoods = component
                                        }}
                                        onSelectedItemsChange={this.onMoodSelect}
                                        selectedItems={this.state.selectedMoods}
                                        selectText="Come ti senti?"
                                        fontSize={15}
                                        searchInputPlaceholderText="Cerca"
                                        onChangeInput={(text) => console.log(text)}
                                        // altFontFamily="ProximaNova-Light"
                                        tagRemoveIconColor="#CCC"
                                        tagBorderColor="#CCC"
                                        tagTextColor="#CCC"
                                        selectedItemTextColor="#CCC"
                                        selectedItemIconColor="#CCC"
                                        itemTextColor="#000"
                                        displayKey="name"
                                        searchInputStyle={{color: '#CCC'}}
                                        submitButtonColor="#CCC"
                                        submitButtonText="Submit"
                                        // hideSubmitButton={true}
                                    />
                                </View>

                                {
                                    this.multiSelectMoods &&
                                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                                        {
                                            this.state.selectedMoods.map(mood => {
                                                return (
                                                    this.state.moodList[mood] &&
                                                    <View style={{
                                                        borderRadius: 10,
                                                        borderWidth: 1,
                                                        borderColor: "#a2a2a2",
                                                        padding: 5,
                                                        marginLeft: 2,
                                                        marginBottom: 2
                                                    }}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            <Text style={{
                                                                color: '#393737',
                                                                fontSize: 12
                                                            }}>{this.state.moodList[mood].name}</Text>
                                                            <TouchableOpacity onPress={() => {
                                                                this.onMoodRemove(mood)
                                                            }}>
                                                                <Icon name={"close"} size={12} color={'red'}/>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )

                                            })
                                        }
                                    </View>
                                }

                                {/* <Text style={styles.input_label}>ADD TAGS FOR WARDROBE</Text> */}
                                <View style={styles.dropDownWrapper}>
                                    {/*<TextInput autoCapitalize="none" value={this.state.description}*/}
                                    {/*           onChangeText={() => {*/}
                                    {/*           }} placeholder="example: I feel cool" placeholderTextColor={'black'} */}
                                    {/*           style={styles.input}/>*/}
                                    <MultiSelect
                                        hideTags
                                        items={this.state.tagList}
                                        uniqueKey="id"
                                        ref={(component) => {
                                            this.multiSelectTags = component
                                        }}
                                        onSelectedItemsChange={this.onTagSelect}
                                        selectedItems={this.state.selectedTags}
                                        selectText="Cosa indossi?"
                                        fontSize={15}
                                        fixedHeight={false}
                                        searchInputPlaceholderText="Cerca"
                                        onChangeInput={(text) => console.log(text)}
                                        // altFontFamily="ProximaNova-Light"
                                        tagRemoveIconColor="#CCC"
                                        tagBorderColor="#CCC"
                                        tagTextColor="#CCC"
                                        selectedItemTextColor="#CCC"
                                        selectedItemIconColor="#CCC"
                                        itemTextColor="#000"
                                        displayKey="name"
                                        searchInputStyle={{color: '#CCC'}}
                                        submitButtonColor="#CCC"
                                        submitButtonText="Submit"
                                    />
                                </View>
                                {
                                    this.multiSelectTags &&
                                    <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10}}>
                                        {
                                            this.state.selectedTags.map(tag => {
                                                return (
                                                    this.state.tagList[tag] &&
                                                    <View style={{
                                                        borderRadius: 10,
                                                        borderWidth: 1,
                                                        borderColor: "#a2a2a2",
                                                        padding: 5,
                                                        marginLeft: 2,
                                                        marginBottom: 2
                                                    }}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between'
                                                        }}>
                                                            <Text style={{
                                                                color: '#393737',
                                                                fontSize: 12
                                                            }}>{this.state.tagList[tag].name}</Text>
                                                            <TouchableOpacity onPress={() => {
                                                                this.onTagRemove(tag)
                                                            }}>
                                                                <Icon name={"close"} size={12} color={'red'}/>
                                                            </TouchableOpacity>
                                                        </View>

                                                    </View>
                                                )

                                            })
                                        }
                                    </View>
                                }
                                <Text style={styles.input_label}>Dove ti trovi?</Text>
                                <View style={styles.textInputWrapper}>
                                    <TextInput autoCapitalize="none" value={this.state.address}
                                               onChangeText={(text) => {
                                                   this.setState({address: text})
                                               }}
                                               placeholder="Aggiungi la tua posizione"
                                               placeholderTextColor={'#515151'}
                                               style={styles.input}/>
                                </View>
                                {this.props.showDate &&
                                <View>
                                    <View style={{
                                        flex: 0,
                                        flexDirection: 'row',
                                        marginBottom: 10,
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{flex: 1, flexDirection: 'column'}}>
                                            <Text style={styles.input_label}>Imposta la durata del tuo Poll</Text>
                                        </View>
                                        <View
                                            style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
                                            <Switch value={this.state.isDynamicTime} onValueChange={this.onTimeSwitch}/>
                                        </View>
                                        <View
                                            style={{
                                                borderBottomColor: 'black',
                                                borderBottomWidth: 1,
                                            }}
                                        />
                                    </View>
                                    {this.state.isDynamicTime &&
                                    <>
                                        <Text style={styles.input_label}>Quando</Text>
                                        <MyDatePicker onDateChange={this.handleDateChange} date={this.state.when}
                                                      disabled={!this.state.isDynamicTime}/>
                                    </>
                                    }

                                </View>
                                }
                                <View style={styles.logoWrapper}>
                                    <Image
                                        resizeMode="contain"
                                        style={styles.logo}
                                        source={{uri: `${this.props.imageURI}`}}/>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

export default FeedForm;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        height: '100%',
    },
    keyboardAvoidingViewContainer: {
        position: "relative",
    },
    scrollContainer: {},
    loadingIcon: {
        position: "relative",
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    loginForm: {
        marginTop: 10,
        width: SCREEN_WIDTH * 0.9,
    },
    textInputWrapper: {
        position: 'relative',
        width: '100%',
        height: 44,
        borderRadius: 5,
        borderColor: '#ddd',
        borderWidth: 1,
        marginVertical: 7.5
    },
    dropDownWrapper: {
        width: '100%',
        borderRadius: 5,
        // borderColor: '#ddd',
        // borderWidth: 1,
        marginVertical: 7.5
    },
    centerContainer: {
        // height: SCREEN_HEIGHT - 50 - 40 - STATUS_BAR_HEIGHT,
        width: SCREEN_WIDTH,
        marginBottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 10
    },
    input_label: {
        color: '#626060',
        fontSize: 15,
    },
    logoWrapper: {
        marginTop: 20,
    },
    logo: {
        display: 'flex',
        alignSelf: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        marginBottom: 30
    },
});
