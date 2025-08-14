"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./clients.css";
import { useState } from 'react';
import { IoRefreshCircleOutline } from "react-icons/io5";
import { MdOutlineImage } from "react-icons/md";
import { RiCloseCircleFill } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";

export default function ClientsPage() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [clients, setClients] = useState([
        { id: 1, name: 'Group 1' },
        { id: 2, name: 'Group 2' },
        { id: 3, name: 'Sample Group' },
    ]);
    const [toggleStates, setToggleStates] = useState(clients.map(() => false));
    const [showPopup, setShowPopup] = useState(false);
    const [formMode, setFormMode] = useState("add"); // 'add' or 'edit'
    const [currentClientId, setCurrentClientId] = useState(null);
    // Changed from string to object for consistency with Indicia
    const [newClient, setNewClient] = useState({ name: '' });

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 3000);
    };

    // New handler for edit icon click
    const handleEditClick = (client) => {
        setFormMode('edit');
        setCurrentClientId(client.id);
        setNewClient({ name: client.name });
        setShowPopup(true);
    };

    // Updated to handle both add and edit, similar to Indicia
    const handleAddOrEditClient = () => {
        if (formMode === 'add') {
            if (newClient.name.trim()) {
                const newId = clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1;
                const newClientObj = { id: newId, name: newClient.name };
                setClients([...clients, newClientObj]);
                setToggleStates([...toggleStates, false]);
            }
        } else if (formMode === 'edit' && currentClientId !== null) {
            setClients(clients.map(client =>
                client.id === currentClientId ? { ...client, name: newClient.name } : client
            ));
        }
        resetForm();
    };

    // Reset form and close popup, mirroring Indicia
    const resetForm = () => {
        setNewClient({ name: '' });
        setFormMode('add');
        setCurrentClientId(null);
        setShowPopup(false);
    };

    const handleToggle = (index) => {
        const newToggleStates = [...toggleStates];
        newToggleStates[index] = !newToggleStates[index];
        setToggleStates(newToggleStates);
    };

    return (
        <div className="main-cont">
            <div className="main-cont-header">
                <span className="header-title">Clients</span>
                <div className="header-actions d-flex flex-row align-items-center">
                    <span className={`btn-refresh ml-2 ${isRefreshing ? ' refreshing' : ''}`} onClick={handleRefresh}>
                        <IoRefreshCircleOutline size={35} />
                    </span>
                    <button className="btn ml-2 add-button" onClick={() => {
                        setFormMode('add');
                        setShowPopup(true);
                    }}>
                        Add Client
                    </button>
                </div>
            </div>
            <div className="main-cont-main d-flex justify-content-center">
                <div className='table-wrapper'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((group) => (
                                <tr key={group.id}>
                                    <td>{group.id}</td>
                                    <td>{group.name}</td>
                                    <td>
                                        <div className="action-container">
                                            <MdOutlineImage className="action-icon" size={20} width={100} />
                                            {/* Added onClick for edit functionality */}
                                            <LiaEdit className="action-icon" size={20} onClick={() => handleEditClick(group)} />
                                            <label className="switch">
                                                <input type="checkbox" checked={toggleStates[group.id - 1]} onChange={() => handleToggle(group.id - 1)} />
                                                <span className="slider round"></span>
                                            </label>
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
                            {/* Dynamic title based on form mode */}
                            <h3>{formMode === 'add' ? 'Add Client' : 'Edit Client'}</h3>
                            <RiCloseCircleFill className="close-icon" onClick={resetForm} size={25} />
                        </div>
                        <div className="popup-body">
                            <div className='d-flex flex-row align-items-center'>
                                {/* Updated to use "Client Name" label */}
                                <label className='popup-label'>Client Name</label>
                                <input
                                    type="text"
                                    value={newClient.name}
                                    onChange={(e) => setNewClient({ name: e.target.value })}
                                    className="form-control"
                                />
                            </div>
                            <div className='d-flex justify-content-end'>
                                <button className="submit-btn" onClick={handleAddOrEditClient}>
                                    {formMode === 'add' ? 'Submit' : 'Update'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}