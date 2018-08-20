import React, { Component } from "react";
import {  StyleSheet, View } from "react-native";
import Header from "./Header";
import Menu from "./Menu";
import Footer from "./Footer";
import MapContainer from "./MapContainer";
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Axios from 'axios'

class App extends Component {
   // constructor
   constructor(props) {
    super(props);
    this.state = {
      togglestate: true,
      showingPlaces:[],
      query: '',
   data: [],
      locations: [{
              id: 1,
              name: "Cairo",
              title: "Cairo is the capital of Egypt",
              position:{lat: 30.06263, lng: 31.24967},
              description: 
                    {Country:	"Egypt",
                    Governorate:	"Muhafazat al Qahirah",
                    Population:	"7,734,614",
                    Elevation:	"23 m over sea level",
                    TimeZone:	"EEST",
                    Longitude:	31.249670,
                    Latitude:	30.062630,
                    Airport:	"Cairo International Airport",}
                  
            },{
              id: 2,
              name: "Giza",
              title: "Giza where pyramids located in Egypt",
              position:{lat:30.00808, lng:31.21093 },
              description: 
                    {Country:	"Egypt",
                    Governorate:	"Al Jizah",
                    Population:	"2,443,203",
                    Elevation:	"	30 m over sea level",
                    TimeZone:	"EEST",
                    Longitude:	31.210930,
                    Latitude:	30.008080,
                   Airport:	"Cairo International Airport"
                  }
                  
      },{
              id: 3,
              name: "Alexandria",
              title: "Alexandria is the Mediterranean Sea shore of Egypt",
              position:{lat: 31.21564, lng: 29.95527},
              description: 
                    {Country:	"Egypt",
                    Governorate:	"	Alexandria",
                    Population:	"3,811,516",
                    Elevation:	"0 m over sea level",
                    TimeZone:	"EEST",
                    Longitude:	29.955270,
                    Latitude:	31.215640,
                    Airport:	"Borg El Arab Airport",}
                  
      },{
              id: 4,
              name: "Hurghada",
              title: "Hurghada is the Red Sea shore of Egypt",
              position:{lat: 27.25738, lng: 33.81291},
              description: 
                    {Country:	"Egypt",
                    Governorate:	"Red Sea",
                    Population:	"95,622",
                    Elevation:	"11 m over sea level",
                    TimeZone:	"EEST",
                    Longitude:	33.812910,
                    Latitude:	27.257380,
                    Airport:	"Hurghada International Airport",}
                  
      },{
              id: 5,
              name: "Aswan",
              title: "Aswan is a famous palace to visit in Egypt",
              position:{lat:24.09082, lng:32.89942  },
              description: 
                    {Country:	"Egypt",
                    Governorate:	"Aswan",
                    Population:	"241,261",
                    Elevation:	"99 m over sea level",
                    TimeZone:	"EEST",
                    Longitude:	32.899420,
                    Latitude:	24.090820,
                    Airport:	"Aswan International Airport",}
                  
                }
    ],
    }
    this.togglestate = this.togglestate.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.clearQuery = this.clearQuery.bind(this);
    //this.getFsquareData= this.getFsquareData.bind(this);
    //this.fetchData= this.fetchData.bind(this);
  }
// mount function
componentDidMount=()=>{
  this.getFsquareData();
//this.fetchData()
}
// set api data to our state
/*fetchData = (apiData, data) => 
this.setState({
  data: apiData
}, console.log(data))
  */   
   

  togglestate=(event)=> {
    this.setState((prevState) => ({
      togglestate: !prevState.togglestate
    }));
  }

 
  //fetch foursquare 
  getFsquareData = (query)=>{
    this.setState({
      data: []
    })
      
 const endPoint="https://api.foursquare.com/v2/venues/explore?"
      const params= {
        client_id: 'UCBUBFADHBK55015FZAGFQQVQRIVKVZ21HYB3YZF2EYUZ40M',
        client_secret: '1DSFNBLOZ2ZSLAFWB00HBZ014PIERWNBRLL3L2UC1XTH2BZN',
        ll: '30.06263,31.24967',
        query: query,
        near: query,
        //intent: 'match',
        v: '20180323',
        limit: 10,
        section: 'outdoors'
      }
      Axios.get(endPoint+ new URLSearchParams(params)).then(response=>{
        this.setState({data: response.data.response.groups[0].items})
        console.log(response)
      })
 /*fetch(`client_id=${params.client_id}&client_secret=${params.client_secret}&v=${params.v}&limit=1&ll=${params.ll}&query=${params.query}`)
        .then(response => response.json())

        .then(parsedJSON =>console.log(parsedJSON.response)
           
           /*.map(location=>(
         
          {
            locationPrefix: `${location.prefix}`,
            locationSuffix: `${location.suffix}`
           
        }
        ))
      )
      
        .then(data => this.setState({
          data,
        }))
        .catch((error) =>{
        // Code for handling errors
        console.log("this is not cool, api not responding", error)

    });*/
     
      }
     
      
     
    

  // add an update state function
updateQuery = (query)=>{
  this.setState({query: query})
}
// add areset function
clearQuery = ()=>{
  this.setState({query: '' })
}

// store the places
/*componentWillUpdate(nextProp, nextState){
  localStorage.setItem('data', JSON.stringify(nextState.data));
}*/
// change the query function
changeQuery = (event)=>{
this.setState({
  query: event.target.value
})
}

  render() {
    // filter function
const {data}= this.state
  if(this.state.query){
    const match = new RegExp(escapeRegExp(this.state.query), 'i')
    this.state.showingPlaces = this.state.locations.filter((place)=> match.test(place.name))
}else{
    this.state.showingPlaces = this.state.locations
}
this.state.showingPlaces.sort(sortBy('name'))

    return (
      <View style={styles.app}>
      
        <View style={styles.header}
        
        >
        <h1 
        style={{color: "#fff" }}
        tabIndex="0" 
        className={this.state.togglestate ? '' : 'animated jello'} 
            alt="app name"
            onMouseEnter={this.togglestate}
            onMouseLeave={this.togglestate}
        
        >Egyptourism</h1>
          <Header />
        </View>
        <View style={styles.main}>
          <View style={styles.menu}>
            <Menu 
            locations={this.state.locations}
            addAimation={this.state.togglestate}
            query={this.state.query}
            updateQuery={this.updateQuery}
            clearQuery={this.clearQuery}
            showingPlaces={this.state.showingPlaces}
            filterQuery={this.filterQuery}
            getFsquareData={this.getFsquareData}
            data={data}
            changeQuery={this.changeQuery}

            />
          </View>
          <View style={styles.mapcontainer}>
            <MapContainer 
            locations={this.state.locations}
            query={this.state.query}
            updateQuery={this.updateQuery}
            clearQuery={this.clearQuery}
            showingPlaces={this.state.showingPlaces}
            />
          </View>
        </View>
        <View style={styles.footer}>
<Footer />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    //marginHorizontal: "auto",
    //maxWidth: 500,
    flex: 1
  },
  header: {
    height: "25%",
    width: "100%",
    alignItems: "center",
    backgroundColor: "#1c262f",
    //color: "#fff",
    
  },
  main: {
    flex: 1,
    flexDirection: "row"
  },
  menu : {
    flex: 2,
    backgroundColor: "#2e3d49",
    overflow: "scroll",
  
  },
  mapcontainer: {
    flex: 5,
    backgroundColor: "#ddf0f0" ,
    

    boxShadow: "-4px -4px 29px 0px rgba(0,0,0,0.75)"
  },
  footer: {
    height: "10%",
    backgroundColor: "#1c262f",
    //color: "#fff",
    alignItems: "center",
  },
 
});

export default App;
