import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import { Loader } from './Loader';
import { PhotoFrame } from './PhotoFrame';

const App = () => {
  const [id, setId] = useState('');
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);
      setPhoto(null);
      fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
        .then(response => response.json())
        .then(data => {
          setLoading(false);
          setPhoto(data);
        })
        .catch(err => {
          setLoading(false);
          setError('Failed to fetch data');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (value && !isNaN(value)) {
      setId(value);
    } else {
      setId('');
      setPhoto(null);
    }
  };

  return (
    <div id="main">
      <input
        type="text"
        placeholder="Enter a number"
        value={id}
        onChange={handleChange}
      />
      {loading && <Loader />}
      {error && <div className="error">{error}</div>}
      {photo && <PhotoFrame url={photo.url} title={photo.title} />}
    </div>
  );
};

export default App;
