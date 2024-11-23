import './App.css';
import Counter from "./Components/Counter";
import Component from './Components/Component';
import Search from './Components/Search';
import TodoList from './Components/ListToDo';
import Download from './Components/Download';

function App() {
  return (
    <>
      <header className="header">
        <nav>
          <ul className="nav-list">
            <li className="nav-item"><a href="#component">Component</a></li>
            <li className="nav-item"><a href="#search">Search</a></li>
            <li className="nav-item"><a href="#todolist">TodoList</a></li>
            <li className="nav-item"><a href="#counter">Counter</a></li>
            <li className="nav-item"><a href="#download">Download</a></li>
          </ul>
        </nav>
      </header>
      <div className="content">
        <section id="component" className="section">
          <Component />
        </section>
        <section id="search" className="section">
          <Search items={["Pomme", "Mandarine", "Orange", "Raisin"]} />
        </section>
        <section id="todolist" className="section">
          <TodoList tab={["Etudier", "Faire du sport", "Lire un livre"]} />
        </section>
        <section id="counter" className="section">
          <Counter />
        </section>
        <section id="download" className="section">
          <Download />
        </section>
      </div>
    </>
  );
}

export default App;