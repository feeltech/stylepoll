import React from "react";
import {fetchLocalStorage} from "../../utils/local-storage";
import {SCREENS} from "../../shared/constants";
import {createStackNavigator} from "@react-navigation/stack";
import {navigate} from "./index";

interface IRouteGuardProps {
    name:string,
    component:any;
}

interface IRouteGuardStates{
    isLoggedIn:boolean
}

class RouteGuard extends React.Component<IRouteGuardProps, IRouteGuardStates>{

    constructor(props:IRouteGuardProps) {
        super(props);
        this.state = {
            isLoggedIn:false
        }
    }
    componentDidMount() {
        fetchLocalStorage("loggedUser").then(res => {
           navigate("login")
        })
    }

    render() {
        const Stack = createStackNavigator();
        return (
            <Stack.Screen name={this.props.name} component={this.props.component} />
        );
    }
}

export default RouteGuard;
