import React, { Component } from 'react';
import Carousel, { Pagination, ParallaxImage, SliderEntry } from 'react-native-snap-carousel';
import { Modal, Dimensions,View, Text, Button } from 'react-native';
const SLIDER_1_FIRST_ITEM = 1;
const sliderWidth = Dimensions.get('window').width;
const itemHeight = Dimensions.get('window').height;
import styles from './styles';
import {SCREEN_HEIGHT, SCREEN_WIDTH, SCREEN_WIDTH_NEW} from "../../constants";


interface ICarousalProps {
    renderCarousalData : ({ item, index }, parallaxProps) => any;
    carousalData:any[],
}

interface ICarousalStates{
    activePollIndex:number,
    modalVisible:boolean,
    slider1ActiveSlide:number
}
class Carousal extends Component<ICarousalProps,ICarousalStates> {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            activePollIndex:0
        };
    }
    private _slider1Ref;

    render() {
        return (
                <View style={{flex:1,backgroundColor:'white'}}>
                    <View style={{flex:0}}>
                        <Pagination
                            dotsLength={this.props.carousalData && this.props.carousalData.length}
                            activeDotIndex={this.state.activePollIndex}
                            containerStyle={styles.paginationContainer}
                            dotColor={'red'}
                            dotStyle={styles.paginationDot}
                            inactiveDotColor={'black'}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                            carouselRef={this._slider1Ref}
                            tappableDots={this._slider1Ref}
                        />
                    </View>
                    <View style={{flex:12,marginTop:0}}>
                        <Carousel
                            ref={c => this._slider1Ref = c}
                            loop={false}
                            // hasParallaxImages={true}
                            autoplay={true}
                            autoplayDelay={500}
                            autoplayInterval={3000}
                            sliderWidth={SCREEN_WIDTH_NEW}
                            sliderHeight={SCREEN_HEIGHT}
                            itemWidth={sliderWidth}
                            data={this.props.carousalData}
                            renderItem={this.props.renderCarousalData}
                            enableMomentum={true}
                            onBeforeSnapToItem={(index)=>{this.setState({activePollIndex:index})}}
                        />
                    </View>
                </View>);
    }
}

export default Carousal;
