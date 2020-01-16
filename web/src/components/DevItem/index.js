import React, { } from "react";
import "./style.css";

export default function DevItem({dev}) {
  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(', ')}</span>
          <p>{dev.bio}</p>
          <a href={`http://github.com/${dev.github}`}>Acessar Perfil</a>
        </div>
      </header>
    </li>
  )
}
