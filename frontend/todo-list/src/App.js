import { Container } from '@material-ui/core';
import './App.css';
import logo from "./logo.png";
import TodoList from "./components/todoList";

function App() {
  return (
    <div className="App">
      {/* TODO pensar algo copado para esto */}
      <Container>
        <header className="App-header">
          <img src={logo} alt="logo" />
        </header>
      </Container>
      <div>
        <Container>
          <TodoList/>
        </Container>
      </div>
    </div>
  );
}

export default App;
