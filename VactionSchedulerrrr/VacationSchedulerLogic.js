"use client";
import { useState, useEffect } from 'react';
import messages from '@/app/(uiLayer)/commonComponents/Messages';
import { useCustomContext } from '@/app/(uiLayer)/customComponents/CustomComponents';
import VaccationSchedulerDs from '@/app/(dsLayer)/VacationSchedulerDs';

const checkboxes = [
  { value: "10", label: "Federal - Trademark" },
  { value: "101", label: "NJ Traffic" },
  { value: "102", label: "NJ Criminal (DP)" },
  { value: "103", label: "NJ Indictables" },
  { value: "104", label: "NJ Small Claims" },
  { value: "105", label: "NJ Foreclosures" },
  { value: "106", label: "NJ Landlord Tenant" },
  { value: "107", label: "NJ Special Civil (DC)" },
  { value: "108", label: "NJ Accident Reports" },
  { value: "109", label: "NJ Expungements" },
  { value: "110", label: "NJ Criminal Expungements" },
  { value: "115", label: "NJ Workers Compensation" },
  { value: "201", label: "PA - Traffic, DUI, Criminal" },
  { value: "202", label: "Philadelphia - DUI, Criminal" },
  { value: "203", label: "PA - Civil" },
  { value: "204", label: "PA - Landlord Tenant" },
  { value: "301", label: "No Name" },
  { value: "401", label: "Missouri Traffic" },
  { value: "402", label: "Missouri Criminal" },
  { value: "403", label: "Missouri Civil" },
  { value: "601", label: "Ohio Traffic" },
  { value: "602", label: "Ohio Criminal" },
  { value: "801", label: "NC Traffic, Infraction" },
  { value: "802", label: "NC Criminal" },
  { value: "902", label: "VA Criminal" },
];

const regionMap = {
  '101-199': 'New Jersey',
  '201-299': 'Pennsylvania',
  '301-399': 'Unknown',
  '401-499': 'Missouri',
  '601-699': 'Ohio',
  '801-899': 'North Carolina',
  '901-999': 'Virginia',
  '1-99': 'USA - Nationwide',
};

export default function useVacationScheduler() {
  const { showAlert, hud, stopHudRotation } = useCustomContext();
  const vacationdata = new VaccationSchedulerDs();

  const firmDetails = JSON.parse(localStorage.getItem('firmDetails'));
  const FirmID = firmDetails?.firmid;
  const FirmName = firmDetails?.["firm-name"];
  const Datasets = firmDetails?.["firm-dataset-accesssearch"];
  const UserID = localStorage.getItem('sub');
  const UserEmail = localStorage.getItem('rememberedEmail');
  console.log("userid", UserID);
  console.log("useremail", UserEmail);

  const datasetIds = Datasets ? Datasets.split(/[,\s]+/).map(id => id.trim()).filter(Boolean) : [];
  const availableCheckboxes = checkboxes.filter(checkbox => datasetIds.includes(checkbox.value));
  const [checkedItems, setCheckedItems] = useState(() =>
    Object.fromEntries(availableCheckboxes.map(cb => [cb.value, false]))
  );
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [vacationHistoryData, setVacationHistoryData] = useState([]);
  const [modal, setModal] = useState({ show: false, mode: '', item: null });
  const [editFromDate, setEditFromDate] = useState('');
  const [editToDate, setEditToDate] = useState('');

  const today = new Date();
  const todayDate = today.toISOString().split('T')[0];
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowDate = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    GetVacationScheduler();
  }, []);

  const showModal = (mode, item = null) => {
    setModal({ show: true, mode, item });
    if (mode === 'Edit' && item) {
      setEditFromDate(item.startDate);
      setEditToDate(item.endDate);
    }
  };

  const hideModal = () => {
    setModal({ show: false, mode: '', item: null });
    setEditFromDate('');
    setEditToDate('');
  };

  const groupCheckboxes = () => {
    const grouped = {};
    availableCheckboxes.forEach(checkbox => {
      const value = parseInt(checkbox.value, 10);
      for (const [range, region] of Object.entries(regionMap)) {
        if (range.includes('-')) {
          const [start, end] = range.split('-').map(Number);
          if (value >= start && value <= end) {
            if (!grouped[region]) grouped[region] = [];
            grouped[region].push(checkbox);
            break;
          }
        } else {
          if (value === parseInt(range, 10)) {
            if (!grouped[region]) grouped[region] = [];
            grouped[region].push(checkbox);
            break;
          }
        }
      }
    });

    const sortedGrouped = {};
    const regions = Object.keys(grouped);
    const nonNationwideRegions = regions.filter(region => region !== 'USA - Nationwide');
    const nationwideRegion = regions.includes('USA - Nationwide') ? ['USA - Nationwide'] : [];

    nonNationwideRegions.forEach(region => {
      sortedGrouped[region] = grouped[region];
    });
    nationwideRegion.forEach(region => {
      sortedGrouped[region] = grouped[region];
    });

    return sortedGrouped;
  };

  const groupedCheckboxes = groupCheckboxes();

  const handleFromDateChange = (e) => {
    const selectedFromDate = e.target.value;
    setFromDate(selectedFromDate);
    if (toDate && new Date(toDate) < new Date(selectedFromDate)) {
      setToDate('');
    }
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const handleSelectAll = (region) => {
    const newCheckedItems = { ...checkedItems };
    groupedCheckboxes[region].forEach(checkbox => {
      newCheckedItems[checkbox.value] = true;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleDeselectAll = (region) => {
    const newCheckedItems = { ...checkedItems };
    groupedCheckboxes[region].forEach(checkbox => {
      newCheckedItems[checkbox.value] = false;
    });
    setCheckedItems(newCheckedItems);
  };

  const handleCheckboxChange = (value) => {
    setCheckedItems(prev => ({
      ...prev,
      [value]: !prev[value]
    }));
  };

  const handleSaveClick = () => {
    const isAnyCheckboxSelected = Object.values(checkedItems).some(value => value);
    const areFieldsEmpty = !fromDate || !toDate || !isAnyCheckboxSelected;

    if (areFieldsEmpty) {
      showAlert(messages.FILL_ALL_FIELDS_MESSAGE, [
        { label: 'OK', onClick: () => { } },
      ]);
      return;
    }
    showModal('Add');
  };

  const handleClearClick = () => {
    showAlert(messages.CONFIRM_CLEAR_MESSAGE, [
      {
        label: 'Yes',
        onClick: () => {
          setFromDate('');
          setToDate('');
          const newCheckedItems = { ...checkedItems };
          Object.keys(newCheckedItems).forEach(key => {
            newCheckedItems[key] = false;
          });
          setCheckedItems(newCheckedItems);
        },
      },
      { label: 'No', onClick: () => { } },
    ]);
  };

  const handleEditClick = (item) => {
    showModal('Edit', item);
  };

  const handleDeleteClick = (item) => {
    showModal('Delete', item);
  };

  const handleAddConfirm = () => {
    const selectedDatasets = Object.keys(checkedItems).filter(key => checkedItems[key]).join(' ');
    AddVacationScheduler(selectedDatasets);
    hideModal();
  };

  const handleEditUpdate = () => {
    if (modal.item) {
      const matchedCheckbox = checkboxes.find(checkbox => checkbox.label === modal.item.leadsCategory);
      const editValue = matchedCheckbox ? matchedCheckbox.value : '';
      UpdateVacationScheduler(modal.item, editValue, editFromDate, editToDate);
      hideModal();
    }
  };

  const handleDeleteConfirm = () => {
    if (modal.item) {
      const matchedCheckbox = checkboxes.find(checkbox => checkbox.label === modal.item.leadsCategory);
      const deleteValue = matchedCheckbox ? matchedCheckbox.value : '';
      DeleteVacationScheduler(deleteValue, modal.item);
      hideModal();
    }
  };

  const GetVacationScheduler = () => {
    hud('Please Wait...');
    const requestData = {
      firmID: FirmID.toString(),
      firmname: FirmName,
      datasetaccesssearch: Datasets,
      "record-fetch-by-user-id": UserID,
      "record-fetch-by-user-email": UserEmail
    };
    vacationdata.VacationSchedulerGet(requestData)
      .then(response => {
        const data = response.data;
        if (data.message?.statusCode === 200) {
          const vacationData = data.message.vacationData || [];
          setVacationHistoryData(vacationData);
        } else {
          const errorMessage = data.message?.description || 'An error occurred.';
          showAlert(errorMessage, [{ label: 'Ok', onClick: () => { } }]);
        }
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred.';
        showAlert(errorMessage, [{ label: 'Ok', onClick: () => { } }]);
      })
      .finally(() => stopHudRotation());
  };

  const AddVacationScheduler = (selectedDatasets) => {
    hud('Please Wait...');
    const requestData = {
      firmID: FirmID.toString(),
      firmname: FirmName,
      datasetaccesssearch: selectedDatasets,
      startdate: fromDate,
      enddate: toDate,
      "record-fetch-by-user-id": UserID,
      "record-fetch-by-user-email": UserEmail
    };
    vacationdata.VacationSchedulerAdd(requestData)
      .then(response => {
        const data = response.data;
        if (data.message?.statusCode === 200) {
          const messageData = data.message.message || 'Saved successfully';
          showAlert(messageData, [{ label: 'Ok', onClick: () => { 
            GetVacationScheduler();
            setFromDate('');
            setToDate('');
            const newCheckedItems = { ...checkedItems };
            Object.keys(newCheckedItems).forEach(key => {
              newCheckedItems[key] = false;
            });
            setCheckedItems(newCheckedItems); 
          } }]);
        } else {
          const errorMessage = data.message?.description || 'An error occurred.';
          showAlert(errorMessage, [{ label: 'Ok', onClick: () => { } }]);
        }
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred.';
        showAlert(errorMessage, [{ label: 'Ok', onClick: () => { } }]);
      })
      .finally(() => stopHudRotation());
  };

  const UpdateVacationScheduler = async (item, editValue, newEditedStartDate, newEditedEndDate) => {
    hud("Please Wait...");
    const requestData = {
      firmID: FirmID.toString(),
      firmname: FirmName,
      datasetaccesssearch: editValue,
      prevoiusstartdate: item.startDate,
      prevoiusenddate: item.endDate,
      startdate: newEditedStartDate,
      enddate: newEditedEndDate,
    };
    try {
      const response = await vacationdata.VacationSchedulerUpdate(requestData);
      const data = response.data;
      if (data.message?.statusCode === 200) {
        GetVacationScheduler();
        showAlert(data.message.message || "Updated successfully", [
          { label: "Ok", onClick: () => { } },
        ]);
      } else {
        const errorMessage = data.message?.description || "An error occurred.";
        showAlert(errorMessage, [{ label: "Ok", onClick: () => { } }]);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "An error occurred.";
      showAlert(errorMessage, [{ label: "Ok", onClick: () => { } }]);
    } finally {
      stopHudRotation();
    }
  };

  const DeleteVacationScheduler = (deleteValue, item) => {
    hud("Please Wait...");
    const requestData = {
      firmID: FirmID.toString(),
      firmname: FirmName,
      datasetaccesssearch: deleteValue,
      startdate: item.startDate,
      enddate: item.endDate,
      "record-fetch-by-user-id": UserID,
      "record-fetch-by-user-email": UserEmail
    };
    vacationdata.VacationSchedulerDelete(requestData)
      .then(response => {
        const data = response.data;
        if (data.message?.statusCode === 200) {
          GetVacationScheduler();
          showAlert(data.message.message || "Deleted successfully", [
            { label: "Ok", onClick: () => {} },
          ]);
        } else {
          const errorMessage = data.message?.description || "An error occurred.";
          showAlert(errorMessage, [{ label: "Ok", onClick: () => { } }]);
        }
      })
      .catch(error => {
        const errorMessage = error.response?.data?.message || error.message || "An error occurred.";
        showAlert(errorMessage, [{ label: "Ok", onClick: () => { } }]);
      })
      .finally(() => stopHudRotation());
  };

  return {
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
    handleAddConfirm,
    handleEditUpdate,
    handleDeleteConfirm,
  };
}