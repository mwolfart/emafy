import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Modal } from './components/modal/modal.component';
import { Button } from './components/button/button.component';

function App(): JSX.Element {
  return (
    <div>
      <Modal>
        Testing
      </Modal>
    </div>
  )
}

export default App
