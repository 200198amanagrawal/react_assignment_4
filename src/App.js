import React,{Component} from 'react';
import Main from './components/MainComponent';
import css from './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
const store = ConfigureStore();
class App extends Component {
  /*In this code the Menu component is called which is taking the dishes state inside it. now this state 
  is used as a prop here so it will be passed as a prop to the menu component in the menucompnent file.
  */ 
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="css">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App; 
