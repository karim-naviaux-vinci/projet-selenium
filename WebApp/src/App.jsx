/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from "./Components/Counter";
import Component from './Components/Component'
import Search from './Components/Search'
import TodoList from './Components/ListToDo';

function App() {

  return (
    <div>
      <Component/>
      <Search items={["Pomme", "Mandarine", "Orange", "Raisin"]} />
      <TodoList tab={["Etudier","Faire du sport","Lire un livre"]}/>
      <Counter /> 
    </div>
  )
}

export default App
