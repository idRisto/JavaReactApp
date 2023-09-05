import React, { useEffect, useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import List from './components/List';

function App() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [selectedBook, setSelectedBook] = useState();
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch('/books')
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
    }, 15);
  }, [reload]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        Book List
      </header>
      <div className='container'>
        <InputForm setReload={setReload} book={selectedBook} trigger={trigger} setTrigger={setTrigger}/>
        <List books={books} setSelectedBook={setSelectedBook} setTrigger={setTrigger}/>
      </div>
    </div>
  );
}

export default App;
