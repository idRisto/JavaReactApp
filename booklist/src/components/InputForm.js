import React, { useState, useEffect } from 'react';
import '../App.css';

function InputForm (props)
{
  const [formData, setFormData] = useState({title: '', author: '', description: ''});
  const [titleE, setTitleE] = useState(false);
  const [authorE, setAuthorE] = useState(false);

  useEffect(() => {
    if (props.trigger) {
      setFormData(props.book)
      props.setTrigger(false)
    }
  }, [props.trigger]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSaveNew = (event) => {
    event.preventDefault();
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }
    checkFields();
    if (formData.title !== '' && formData.author !== '') {
      fetch('/add', request)
        .then((res) => res.json)
        .then(props.setReload(prev=>!prev))
      setFormData({title: "", author: "", description: ""});
    }
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const id = formData.id;
    const request = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }
    checkFields();
    if (formData.title !== '' && formData.author !== '') {
      fetch(`/update/${id}`, request)
        .then((res) => res.json)
        .then(props.setReload(prev=>!prev))
      setFormData({title: "", author: "", description: ""});
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const id = formData.id;
    const request = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(`/delete/${id}`, request)
      .then((res) => res.json)
      .then(props.setReload(prev=>!prev))
    setFormData({title: "", author: "", description: ""});
  };

  function checkFields () {
    if (formData.title === '')
      setTitleE(true);
    else setTitleE(false);
    if (formData.author === '')
      setAuthorE(true);
    else setAuthorE(false);
  }

  return (
    <div className='Form'>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" value={formData.title} onChange={handleChange}/>
      {
        titleE ? <div className='errorText'>Title required</div> : null
      }

      <label htmlFor="author">Author:</label>
      <input type="text" id="author" name="author" value={formData.author} onChange={handleChange}/>
      {
        authorE ? <div className='errorText'>Author required</div> : null
      }

      <label htmlFor="description">Description:</label>
      <textarea id="description" name="description" value={formData.description} onChange={handleChange}/>

      <div className='buttons'>
        <button onClick={handleSaveNew}>Save New</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      
    </div>
  );
};

export default InputForm;