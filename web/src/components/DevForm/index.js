import React, { useState, useEffect } from 'react';
import "./style.css"

export default function DevForm({ onSubmit }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github, setGithub] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (error) => {
        console.log(error);
      },
      {
        timeout: 30000
      }
    )
  }, []);

  function submit(e) {
    e.preventDefault();
    setGithub('');
    setTechs('')
    onSubmit({
      github,
      techs,
      latitude,
      longitude
    })

  }

  return (
    <form onSubmit={submit}>
      <div className="input-block">
        <label htmlFor="github">Usuário do GitHub</label>
        <input className="github" id="github" required value={github} onChange={e => setGithub(e.target.value)} />
      </div>
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input className="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)} />
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input type="number" onChange={e => setLatitude(e.target.value)} className="latitude" value={latitude} id="latitude" required />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input type="number" onChange={e => setLongitude(e.target.value)} className="longitude" value={longitude} id="longitude" required />
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
