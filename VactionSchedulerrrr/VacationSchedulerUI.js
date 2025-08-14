"use client";
import React, { useState, useEffect, useRef } from 'react';
import { VscBook, VscGraph } from "react-icons/vsc";
import { RiDeleteBin6Fill } from "react-icons/ri";
import './VacationScheduler.css';
import useVacationScheduler from './VacationSchedulerLogic';
import { VacationSchedulerModal } from './VacationSchedulerModal';

export default function VacationSchedulerUI() {
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

  const addContainerRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      if (addContainerRef.current) {
        const height = addContainerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--add-cont-height', `${height}px`);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

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
    <div className="main-container-vacation-scheduler p-3">
      <div className="add-vacation-scheduler rounded-sm" ref={addContainerRef}>
        <div className='add-vacation-scheduler-header d-flex flex-row align-items-center p-2'>
          <VscBook size={16} className='me-2' color='#646464' />
          <span>Add Vacation Scheduler</span>
        </div>

        <div className="add-vacation-scheduler-body p-3 ps-4 pe-4 ">
          <div className='add-vacation-scheduler-body-first d-flex flex-row align-items-center mb-4'>
            <label className='me-5'>Turn Off Selected Data Service</label>
            <div className="add-vacation-scheduler-date-inputs d-flex flex-row ms-8 align-items-center">
              <div className='add-vacation-scheduler-from-container d-flex flex-row align-items-center'>
                <label className='add-vacation-scheduler-date-inputs-from-label'>From</label>
                <input className="form-control add-vacation-scheduler-date-inputs-input" type="date" value={fromDate} onChange={handleFromDateChange} min={todayDate} onMouseDown={e => { e.preventDefault(); e.target.showPicker?.(); }} />
              </div>
              <div className='add-vacation-scheduler-to-container d-flex flex-row align-items-center'>
                <label className='add-vacation-scheduler-date-inputs-to-label'>To</label>
                <input className="form-control add-vacation-scheduler-date-inputs-input" type="date" value={toDate} onChange={handleToDateChange} min={fromDate} onMouseDown={e => { e.preventDefault(); e.target.showPicker?.(); }} />
              </div>
            </div>
          </div>

          <div className='add-vacation-scheduler-body-second '>
            {Object.entries(groupedCheckboxes).map(([region, checkboxes]) => (
              <div key={region} className="region-group">
                <div className="city-select-deselectcont d-flex align-items-center flex-row" style={{ gap: '25px' }}>
                  <span className="" style={{ width: 'auto' }}>{region}</span>
                  <div className=" select-deselect d-flex align-items-center">
                    <span onClick={() => handleSelectAll(region)} className="selectdeselctspan pt-1 me-2 ">Select All</span> |
                    <span onClick={() => handleDeselectAll(region)} className="ms-2 pt-1 selectdeselctspan">Deselect All</span>
                  </div>
                </div>
                <div className="add-vacation-scheduler-checkboxes row">
                  {checkboxes.map(checkbox => (
                    <div key={checkbox.value} className="add-vacation-scheduler-each-checkboxe-container d-flex align-items-center">
                      <span className="d-flex align-items-center"><input
                        className="form-check-input me-2 mt-0"
                        type="checkbox"
                        checked={checkedItems[checkbox.value]}
                        onChange={() => handleCheckboxChange(checkbox.value)}
                        id={`checkbox-${checkbox.value}`}
                      /></span>
                      <span className="d-flex align-items-center"><label
                        className="form-check-label"
                        htmlFor={`checkbox-${checkbox.value}`}
                      >
                        {checkbox.label}
                      </label></span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="d-flex justify-end vacation-scheduler-buttons mt-3 mb-3 pe-2">
        <button className='vacation-scheduler-save-button' onClick={handleSaveClick}>SAVE</button>
        <button className="vacation-scheduler-clear-button" onClick={handleClearClick}>CLEAR</button>
      </div>

      <div className="vacation-history">
        <div className='vacation-history-header d-flex flex-row align-items-center p-2'>
          <VscGraph size={16} className='me-2' color='#646464' />
          <span>Vacation History</span>
        </div>
        <div className={`vacation-history-table-wrapper `}>
          {vacationHistoryData.length > 0 ? (
            <table className="vacation-history-table" style={{ height: "100%" }}>
              <thead>
                <tr>
                  <th>Leads Category</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Vacation Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vacationHistoryData.map((item, index) => (
                  <tr key={index} style={{ height: "100%" }}>
                    <td>{item.leadsCategory}</td>
                    <td>{item.startDate}</td>
                    <td>{item.endDate}</td>
                    <td>{item.vacationStatus}</td>
                    <td style={{ height: "100%" }}>
                      <div className="d-flex flex-row align-items-center" style={{ height: "100%" }}>
                        {(item.vacationStatus !== "Completed") && (
                          <div className="d-flex flex-row align-items-center" style={{ gap: "5px" }}>
                            <span
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEditClick(item)}
                            >Edit</span> |
                            <span><RiDeleteBin6Fill
                              size={16}
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDeleteClick(item)}
                            /></span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <span className='vacation-history-no-table-text p-2 d-flex align-items-center justify-content-center'>No Schedulers Added.</span>
          )}
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