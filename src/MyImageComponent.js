import React, { useState, useEffect, useRef } from 'react';
import './MyImageComponent.css';
import edit from '../src/img/edit.svg';
import info from '../src/img/info.svg';
import remove from '../src/img/remove.svg';
import share from '../src/img/share.svg';
import './App.css';

function MyImageComponent() {

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <>
      <div className='menu-container' ref={menuRef}>

        <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
        </div>

        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} >
          <ul>
            <DropdownItem img={edit} text={"Edit"} />
            <DropdownItem img={info} text={"Courier info"} />
            <DropdownItem img={share} text={"Share"} />
            <DropdownItem img={remove} text={"Remove"} />
          </ul>
        </div>
      </div>

      {open && <div className="overlay" />}
    </>
  );
}

function DropdownItem(props) {
  return (
    <li className='dropdownItem'>
      <img alt='icons' src={props.img}></img>
      <a href> {props.text} </a>
    </li>
  );
}

export default MyImageComponent;