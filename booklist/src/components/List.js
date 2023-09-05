import React from 'react';

function List(props)
{

  function handleClick(book) {
    props.setSelectedBook(book)
    props.setTrigger(true)
  }

  return (
    <div className='listbox'>
      {
        props.books.map(book => <div key={book.id} onClick={() => handleClick(book)}> {book.title}, {book.author} </div>)
      }
    </div>
  );
}

export default List;