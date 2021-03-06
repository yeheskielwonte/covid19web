import React from 'react';
import {StyleSheet,ImageBackground} from 'react-native';
import CountryPicker from './component/CountryPicker';
import Display from './component/Display';
import styles from './App.module.css';
import { fetchData, fetchFirstCountry } from './component/API';

class App extends React.Component {
    state = {
        data: {},
        dataCountry: {},
        country: ""
    }

    async componentDidMount() {
        const fetchedData = await fetchData()
        this.setState({ data: fetchedData })
        const firstCountry = await fetchFirstCountry()
        const firstData = await fetchData(firstCountry)
        this.setState({ dataCountry: firstData, country: firstCountry })
    }
    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country)
        this.setState({ dataCountry: fetchedData, country: country })
    }


    render() {
        return (
            <div style={{marginTop:-20}}>
               <ImageBackground source={require('./assets/Dunia.png')} style={styless.backgroundImage}>
                <div className={styles.container}>
                    <center>
                        <h1>Data Covid-19</h1>
                    </center>
                    <Display data={this.state.data} />
                    <CountryPicker handleCountryChange={this.handleCountryChange} />
                    <Display data={this.state.dataCountry} country={this.state.country} />
                </div>
                </ImageBackground>
            </div>
        )
    }
}

export default App;

const styless= StyleSheet.create({
    backgroundImage:{
        flex:1,
        width:undefined,
        height:undefined,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        justifyContent: 'flex-start'
    }
})