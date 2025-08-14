"use client";
import React from 'react';
import { MdCancel } from "react-icons/md";
import './vsmodal.css';

export const VacationSchedulerModal = ({ 
  show, 
  mode, 
  checkboxes,
  onClose, 
  item, 
  fromDate, 
  toDate, 
  editFromDate, 
  setEditFromDate, 
  editToDate, 
  setEditToDate, 
  tomorrowDate, 
  handleAddConfirm, 
  handleEditUpdate, 
  handleDeleteConfirm 
}) => {
  if (!show) return null;

  const messageContent = () => {
    switch (mode) {
      case 'Add':
        const selectedLabels = Object.keys(checkedItems)
          .filter(key => checkedItems[key])
          .map(key => checkboxes.find(cb => cb.value === key)?.label)
          .join(', ');
        return (
          <>
            <span>Are you sure you want to add the vacation scheduler for 
              <strong>{selectedLabels}</strong> 
              from 
              <strong>{fromDate}</strong> 
              to 
              <strong>{toDate}</strong> ?</span>
            <button onClick={handleAddConfirm}>Yes</button>
            <button onClick={onClose}>No</button>
          </>
        );
      case 'Edit':
        return (
          <div className="add-vacation-scheduler-body-first-edit ">
            <label className="">Turn Off Selected Data Service</label>
            <div className="add-vacation-scheduler-date-inputs-edit">
              <div className="d-flex flex-row align-items-center w-100">
                <label className="add-vacation-scheduler-date-inputs-from-label-edit">From</label>
                <input
                  className="form-control add-vacation-scheduler-date-inputs-input-edit"
                  type="date"
                  value={editFromDate}
                  onChange={e => setEditFromDate(e.target.value)}
                  min={tomorrowDate}
                  disabled={item?.vacationStatus === "In Progress"}
                  onMouseDown={(e) => {
                    if (item?.vacationStatus !== "In Progress") {
                      e.preventDefault();
                      e.target.showPicker?.();
                    }
                  }}
                />
              </div>
              <div className="d-flex flex-row align-items-center w-100">
                <label className="add-vacation-scheduler-date-inputs-to-label-edit">To</label>
                <input
                  className="form-control add-vacation-scheduler-date-inputs-input-edit"
                  type="date"
                  value={editToDate}
                  onChange={e => setEditToDate(e.target.value)}
                  min={(item?.vacationStatus === "In Progress") ? tomorrowDate : editFromDate}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.target.showPicker?.();
                  }}
                />
              </div>
            </div>
            <button onClick={handleEditUpdate}>Update</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        );
      case 'Delete':
        return (
          <>
            <span>This will get back your services to normal mode</span>
            <button onClick={handleDeleteConfirm}>YES</button>
            <button onClick={onClose}>NO</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className='vs-custom-popup'>
      <div className="vs-main-popup">
        <div className='vs-popup-header'>
          <span>{
          mode === 'Add' ? 'Add Vacation Schedule' : 
          mode === 'Edit' ? `Edit ${item?.leadsCategory} Vacation Schedule` : 'Confirm'
          }</span>
          <span>
            <MdCancel size={22} onClick={onClose} style={{ cursor: 'pointer' }} />
          </span>
        </div>
        <div className='vs-popup-body'>
          {messageContent()}
        </div>
      </div>
    </div>
  );
};