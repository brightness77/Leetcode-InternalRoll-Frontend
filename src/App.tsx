import React from 'react';
import './App.css';
import RunContextProvider from './context/RunContextProvider';
import RunView from './view/RunView';


function HelloMessage(props : any) {
  return (
    <h1> Hello {props.name}!</h1>
  );
}

function ByeMessage(props : any) {
  return(
    <h3> Good bye {props.name}! </h3>
  );
}

function MyApp(props: any){

  return (
    <>
      <HelloMessage name = {props.name1} />
      <p> ========== </p>
      <ByeMessage  name = {props.name2} />
    </>
  );
}

const myProps = {
  name1 : "lulu",
  name2 : "ruru",
}

function App(): React.ReactElement {
  return (
    <>
    <MyApp name1 = {myProps.name1} name2 = {myProps.name2}/>
    <RunContextProvider>
      <RunView />
    </RunContextProvider>
    </>
  );
}

export default App;
