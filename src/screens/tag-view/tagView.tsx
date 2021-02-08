 import React from "react";
 import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
 import {Header, Icon} from "react-native-elements";
 import {goBack} from "../../services/navigation";

export default class TagView extends React.Component<any, any>{

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Header
                    statusBarProps={{barStyle: "dark-content"}}
                    barStyle="dark-content"
                    containerStyle={{
                        display: "flex",
                        backgroundColor: "#053280",
                    }}
                    leftComponent={<TouchableOpacity onPress={goBack}>
                        <Icon
                            name="chevron-left"
                            color="black"/>
                    </TouchableOpacity>}
                    centerComponent={{
                        text: 'Top',
                        style: {color: "#FFF", fontWeight: "bold"},
                    }}
                />
                <ScrollView style={{backgroundColor: 'none'}}>
                    <View style={{
                        flex: 5,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start'
                    }}>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection: 'column', borderColor: 'white', borderWidth: 1}}>
                            <Image
                                source={{uri: 'https://cdn.vox-cdn.com/thumbor/Oi6jzvQzWetJGlkpwLqlP1L9p28=/0x0:5568x3712/1200x800/filters:focal(2858x720:3748x1610)/cdn.vox-cdn.com/uploads/chorus_image/image/62207705/922984782.jpg.0.jpg'}}
                                style={{width: 120, height: 120}}
                            />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
 const styles = StyleSheet.create({
     container: {
         backgroundColor: "#fff",
         height: '100%'
     },
 })
