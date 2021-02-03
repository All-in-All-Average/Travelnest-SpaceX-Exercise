import React from 'react';
import logo from './logo.svg';
import './LaunchApp.css';

export default class LaunchApp extends React.Component{

    latestLaunchURL = "https://api.spacexdata.com/v4/launches/latest";
    shipURL = "https://api.spacexdata.com/v4/ships/";


    constructor(props){
        super(props);
        var latestLaunch;
        var ships = [];
        this.state = {latestLaunch, ships};
    }

    componentDidMount(){
      this.GetLatestLaunchInfo();
    }

    render() {
      const launchInfo = this.state
        return (
          <div className="LaunchApp">
            <header className="LaunchApp-header">
              <img src={logo} name="logo" className="LaunchApp-logo" alt="logo" />
              <div className="LaunchInfo">
                  <Loading launchInfo={launchInfo}/>
              </div>
            </header>
          </div>
        );
      }

    GetLatestLaunchInfo = async() => { 
      var listShips = [];
      await fetch(this.latestLaunchURL).then(res => res.json()).then(res => this.setState({latestLaunch: res}))

      await Promise.all(this.state.latestLaunch.ships.map(async (ship) =>{
        const tempShip = await fetch(this.shipURL+ship).then(res => res.json());
        listShips.push(tempShip);
      })).then(res => this.setState({ships: listShips}));
        
    }

}

function Loading(props) {
  try{
    if (props.launchInfo.latestLaunch != null) {
      return <LaunchInfo launchInfo = {props.launchInfo}/>;
    } else {
      return(<div className="Loading"><p>Loading!</p></div>)
    }
  }catch{
    return <Error />
  }
}

function LaunchInfo(props) {
  const launchDate = new Date(props.launchInfo.latestLaunch.date_unix * 1000);
  return (<div>
            <p>Latest Launch:</p>
            <div>
              Name: {props.launchInfo.latestLaunch.name}
            </div>
            <div>
              Date: {launchDate.toDateString()}
            </div>
            <div>
              Details:
              <div className = "DetailsBody">{props.launchInfo.latestLaunch.details}</div>
            </div>
            <div className="LaunchShips">
              Ships:
              <ShipsLoading ships = {props.launchInfo.ships}/>
            </div>
          </div>);
}


function ShipsLoading(props){
  try{
    if (props.ships[0] != null) {
      return <ShipsInfo ships = {props.ships}/>;
    } else {
      return(<p>Still loading ships!</p>)
    }
  }catch{
    return <Error />
  }
}

function ShipsInfo(props) {
  return(
    <ul>
    {props.ships.map(ship => (
      <li key={ship.id}>{
          <div className = "Ship">
            <ul>
              <div>Name: {ship.name}</div>
              <div>Type: {ship.type}</div>
              <div>Port: {ship.home_port}</div>
            </ul>
          </div>
        }
      </li>
    ))}
  </ul>
  )
}


function Error(props) {
  return(<p>Catasrophic loading failure captain!</p>)
}