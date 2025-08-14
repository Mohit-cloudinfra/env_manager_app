"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./indica.css";
import { useState } from 'react';
import { IoRefreshCircleOutline } from "react-icons/io5";
import { RiCloseCircleFill } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";


export default function IndiciaPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [indicia, setIndicia] = useState([
    { id: 1, line1: 'FIRST CLASS', line2: 'US POSTAGE PAID', line3: 'TRENTON NJ', line4: '', line5: '', description: '' },
    { id: 2, line1: 'Testing Indicia', line2: '', line3: '', line4: 'test 1.1', line5: 'test 1.4', description: '' },
    { id: 3, line1: 'Test Indicia', line2: '', line3: '', line4: '', line5: 'test 1.5', description: '' },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
  const [currentIndiciaId, setCurrentIndiciaId] = useState(null);
  const [newIndicia, setNewIndicia] = useState({ line1: '', line2: '', line3: '', line4: '', line5: '', description: '' });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 3000);
  };

  const handleInputChange = (field) => (e) => {
    setNewIndicia({ ...newIndicia, [field]: e.target.value });
  };

  const handleAddOrEditIndicia = () => {
    if (formMode === 'add') {
      if (Object.values(newIndicia).some(value => value.trim() !== '')) {
        const newId = indicia.length > 0 ? Math.max(...indicia.map(item => item.id)) + 1 : 1;
        const newItem = { id: newId, ...newIndicia };
        setIndicia([...indicia, newItem]);
      }
    } else if (formMode === 'edit' && currentIndiciaId !== null) {
      setIndicia(indicia.map(item =>
        item.id === currentIndiciaId ? { ...item, ...newIndicia } : item
      ));
    }
    resetForm();
  };

  const handleEditClick = (item) => {
    setFormMode('edit');
    setCurrentIndiciaId(item.id);
    setNewIndicia({
      line1: item.line1,
      line2: item.line2,
      line3: item.line3,
      line4: item.line4,
      line5: item.line5,
      description: item.description
    });
    setShowPopup(true);
  };

  const resetForm = () => {
    setNewIndicia({ line1: '', line2: '', line3: '', line4: '', line5: '', description: '' });
    setFormMode('add');
    setCurrentIndiciaId(null);
    setShowPopup(false);
  };

  return (
    <div className="main-cont">
      <div className="main-cont-header">
        <span className="header-title">Indicia</span>
        <div className="header-actions d-flex flex-row align-items-center">
          <span className={`btn-refresh ml-2 ${isRefreshing ? ' refreshing' : ''}`} onClick={handleRefresh}>
            <IoRefreshCircleOutline size={35} />
          </span>
          <button className="btn ml-2 add-button" onClick={() => {
            setFormMode('add');
            setShowPopup(true);
          }}>
            Add Indicia
          </button>
        </div>
      </div>
      <div className="main-cont-main d-flex justify-content-center">
        <div className='table-wrapper'>
          <table className="table">
            <thead>
              <tr>
                <th>Line 1</th>
                <th>Line 2</th>
                <th>Line 3</th>
                <th>Line 4</th>
                <th>Line 5</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {indicia.map((item) => (
                <tr key={item.id}>
                  <td>{item.line1}</td>
                  <td>{item.line2}</td>
                  <td>{item.line3}</td>
                  <td>{item.line4}</td>
                  <td>{item.line5}</td>
                  <td>
                    <div className="action-container">
                      <LiaEdit className="action-icon" size={20} onClick={() => handleEditClick(item)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPopup && (
        <div className="popup">
          <div className="popup-card">
            <div className="popup-header">
              <h3>{formMode === 'add' ? 'Add Indicia' : 'Edit Indicia'}</h3>
              <RiCloseCircleFill className="close-icon" onClick={resetForm} size={25} />
            </div>
            <div className='d-flex flex-column popup-body'>
              <div className='d-flex flex-row align-items-center'>
                <label className='popup-label'>Line 1</label>
                <input type="text" value={newIndicia.line1} onChange={handleInputChange('line1')} className="form-control" />
              </div>
              <div className='d-flex flex-row align-items-center'>
                <label className='popup-label'>Line 2</label>
                <input type="text" value={newIndicia.line2} onChange={handleInputChange('line2')} className="form-control" />
              </div>
              <div className='d-flex flex-row align-items-center'>
                <label className='popup-label'>Line 3</label>
                <input type="text" value={newIndicia.line3} onChange={handleInputChange('line3')} className="form-control" />
              </div>
              <div className='d-flex flex-row align-items-center'>
                <label className='popup-label'>Line 4</label>
                <input type="text" value={newIndicia.line4} onChange={handleInputChange('line4')} className="form-control" />
              </div>
              <div className='d-flex flex-row align-items-center'>
                <label className='popup-label'>Line 5</label>
                <input type="text" value={newIndicia.line5} onChange={handleInputChange('line5')} className="form-control" />
              </div>
              <div className='d-flex flex-row align-items-center'>
                <label className='popup-label'>Description</label>
                <input type="text" value={newIndicia.description} onChange={handleInputChange('description')} className="form-control" />
              </div>
              <div className='d-flex justify-content-end'>
                <button className="submit-btn" onClick={handleAddOrEditIndicia}>{formMode === 'add' ? 'Submit' : 'Update'}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}