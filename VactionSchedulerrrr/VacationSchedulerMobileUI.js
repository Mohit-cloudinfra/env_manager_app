"use client";
import React, { useState } from 'react';
import { VscBook, VscGraph } from "react-icons/vsc";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import './VacationScheduler.css';
import useVacationScheduler from './VacationSchedulerLogic';
import { VacationSchedulerModal } from './VacationSchedulerModal';

export default function VacationSchedulerMobileUI() {
  const {
    checkboxes,
    
    checkedItems,
    todayDate,
    fromDate,
    toDate,
    handleFromDateChange,
    handleToDateChange,
    handleSelectAll,
    handleDeselectAll,
    handleCheckboxChange,
    handleSaveClick,
    handleClearClick,
    handleDeleteClick,
    GetVacationScheduler,
    vacationHistoryData,
    groupedCheckboxes,
    modal,
    hideModal,
    handleEditClick,
    editFromDate,
    setEditFromDate,
    editToDate,
    setEditToDate,
    tomorrowDate,
  } = useVacationScheduler();

  // Render modal content based on mode
  const renderModalContent = () => {
    switch (modal.mode) {
      case 'Add':
        const selectedDatasets = Object.keys(checkedItems).filter(key => checkedItems[key]).join(' ');
        const selectedLabels = Object.keys(checkedItems)
          .filter(key => checkedItems[key])
          .map(key => checkboxes.find(cb => cb.value === key)?.label)
          .join(', ');
        return (
          <>Are you sure you want to add the vacation scheduler for <strong>{selectedLabels}</strong> from <strong>{fromDate}</strong> to <strong>{toDate}</strong>?</>
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
                  disabled={modal.item?.vacationStatus === "In Progress"}
                  onMouseDown={(e) => {
                    if (modal.item?.vacationStatus !== "In Progress") {
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
                  min={(modal.item?.vacationStatus === "In Progress") ? tomorrowDate : editFromDate}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.target.showPicker?.();
                  }}
                />
              </div>
            </div>
          </div>
        );
      case 'Delete':
        return "This will get back your services to normal mode";
      default:
        return null;
    }
  };

  return (
    <div className="vacation-scheduler-mobile-main-container">
      <div className="vacation-scheduler-mobile-top-container">
        <div className="vacation-scheduler-mobile-top-sub-container">
          <span className="people-mob-icon">Vacation Scheduler</span>
        </div>
      </div>
      <div className="main-container-vacation-scheduler-mobile p-2">
        <div className="add-vacation-scheduler rounded-sm">
          <div className='add-vacation-scheduler-header d-flex flex-row align-items-center p-2'>
            <VscBook size={16} className='me-2' color='#646464' />
            <span>Add Vacation Scheduler</span>
          </div>

          <div className="add-vacation-scheduler-body p-2">
            <div className='add-vacation-scheduler-body-first-mobile d-flex flex-column w-100 mb-3'>
              <label className='mb-2'>Turn Off Selected Data Service</label>
              <div className="add-vacation-scheduler-date-inputs-mobile d-flex flex-column align-items-center justify-content-start w-100">
                <div className="d-flex flex-row mb-2 justify-content-start align-items-center w-100">
                  <label className='add-vacation-scheduler-date-inputs-mobile-from-label '>From </label>
                  <input className='form-control'
                    type="date"
                    value={fromDate}
                    onChange={handleFromDateChange}
                    min={todayDate}
                    onMouseDown={e => { e.preventDefault(); e.target.showPicker?.(); }}
                  />
                </div>
                <div className='d-flex flex-row justify-content-start align-items-center w-100'>
                  <label className='add-vacation-scheduler-date-inputs-mobile-to-label '>To</label>
                  <input className='ms-2 form-control'
                    type="date"
                    value={toDate}
                    onChange={handleToDateChange}
                    min={fromDate}
                    onMouseDown={e => { e.preventDefault(); e.target.showPicker?.(); }}
                  />
                </div>
              </div>
            </div>

            <div className='add-vacation-scheduler-body-second-mobile d-flex flex-column'>
              {Object.entries(groupedCheckboxes).map(([region, checkboxes]) => (
                <div key={region} className="region-group-mobile">
                  <div className='add-vacation-scheduler-checkboxes-mobile-header '>
                    <span>{region}</span>
                    <div className="d-flex align-items-center select-deselect">
                      <span onClick={() => handleSelectAll(region)} className='selectdeselctspan pt-1 me-2 '>Select All</span> | <span onClick={() => handleDeselectAll(region)} className='pt-1 ms-2 selectdeselctspan'>Deselect All</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <div className="add-vacation-scheduler-checkboxes-mobile row mt-1">
                      {checkboxes.map(checkbox => (
                        <div key={checkbox.value} className="form-check add-vacation-scheduler-each-checkboxe-mobile d-flex flex-row align-items-center ">
                          <span className="d-flex align-items-center"><input
                            className="form-check-input"
                            type="checkbox"
                            checked={checkedItems[checkbox.value]}
                            onChange={() => handleCheckboxChange(checkbox.value)}
                            id={`checkbox-mobile-${checkbox.value}`}
                          /></span>
                          <span className="d-flex align-items-center"><label className="form-check-label" htmlFor={`checkbox-mobile-${checkbox.id}`}>
                            {checkbox.label}
                          </label></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="d-flex justify-end vacation-scheduler-buttons mt-2 mb-2">
          <button className="vacation-scheduler-save-button" onClick={handleSaveClick}>SAVE</button>
          <button className="vacation-scheduler-clear-button" onClick={handleClearClick}>CLEAR</button>
        </div>
        <div className="vacation-history">
          <div className='vacation-history-header d-flex flex-row align-items-center p-2'>
            <VscGraph size={16} className='me-2' color='#646464' />
            <span>Vacation History</span>
          </div>
          <div className="table-container vacation-history-table-wrapper-mobile">
            {vacationHistoryData.length > 0 ? (
              <table className="vacation-history-table vacation-history-table-mobile">
                <thead>
                  <tr>
                    <th>Leads Category</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Leads Category Vacation Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vacationHistoryData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.leadsCategory}</td>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>{item.vacationStatus}</td>
                      <td className="p-3">
                        {item.vacationStatus !== 'Completed' && (
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <span onClick={() => handleEditClick(item)}>Edit</span> <span onClick={() => handleDeleteClick(item)}><RiDeleteBin6Fill size={16} /></span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <span className='vacation-history-no-table-text p-2' style={{ height: '100%' }}>No Schedulers Added.</span>
            )}
          </div>
        </div>
      </div>
      <VacationSchedulerModal
        show={modal.show}
        mode={modal.mode}
        heading={modal.heading}
        content={renderModalContent()}
        buttons={modal.buttons}
        onClose={hideModal}
        item={modal.item}
      />
    </div>
  );
}