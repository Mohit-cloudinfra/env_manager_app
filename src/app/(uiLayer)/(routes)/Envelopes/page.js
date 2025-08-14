"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Envelopes.css";
import { useState, useRef, useEffect } from 'react';
import { RiSearchLine, RiCloseCircleFill } from 'react-icons/ri';
import { IoEyeOutline, IoRefreshCircleOutline, IoCopyOutline } from "react-icons/io5";
import { LiaEdit } from "react-icons/lia";
import { LiaDownloadSolid } from "react-icons/lia";

export default function EnvelopesPage() {
    // State for active tab and animation
    const [activeTab, setActiveTab] = useState('All');
    const [indicatorLeft, setIndicatorLeft] = useState(0);
    const [indicatorWidth, setIndicatorWidth] = useState(0);
    const tabRefs = useRef({});
    const tabs = ['All', 'Simple', 'Master', 'Child', 'Master-Child'];

    // State for refresh
    const [isRefreshing, setIsRefreshing] = useState(false);

    // State for envelopes data
    const [envelopes, setEnvelopes] = useState([
        { id: 1, envelopeName: 'shankar', type: 'Simple Page', clientName: 'Sankar', groupName: '8.5*11 envelope' },
        { id: 2, envelopeName: 'Snigdha_Test', type: 'Simple Page', clientName: 'Sankar', groupName: '8.5*11 envelope' },
        { id: 3, envelopeName: 'Dharani Testing File 8.5*11', type: 'Child Page', clientName: 'Dharani', groupName: '8.5*11 envelope' },
        { id: 4, envelopeName: '80_3420-Hashtag-ChildPage', type: 'Child Page', clientName: 'Sravani', groupName: '8.5*11 envelope' },
        { id: 5, envelopeName: 'campaigner Design', type: 'Simple Page', clientName: 'Dharani', groupName: '8.5*11 envelope' },
    ]);

    // State for popup and new envelope input
    const [showPopup, setShowPopup] = useState(false);
    const [newEnvelope, setNewEnvelope] = useState({ envelopeName: '', type: '', clientName: '', groupName: '' });

    // Effect to update the sliding indicator position and width
    useEffect(() => {
        if (tabRefs.current[activeTab]) {
            const { offsetLeft, offsetWidth } = tabRefs.current[activeTab];
            setIndicatorLeft(offsetLeft);
            setIndicatorWidth(offsetWidth);
        }
    }, [activeTab]);

    // Refresh handler
    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 3000); // 3-second animation
    };

    // Handler to add a new envelope
    const handleAddEnvelope = () => {
        if (newEnvelope.envelopeName && newEnvelope.type && newEnvelope.clientName && newEnvelope.groupName) {
            const newEnv = {
                id: envelopes.length + 1,
                ...newEnvelope,
            };
            setEnvelopes([...envelopes, newEnv]);
            setNewEnvelope({ envelopeName: '', type: '', clientName: '', groupName: '' });
            setShowPopup(false);
        }
    };

    return (
        <div className="main-cont">


            {/* Header with Search, Refresh, and Add Button */}
            <div className="main-cont-header">
                {/* Five Buttons with Sliding Animation */}
                <div className="tab-container">
                    <div
                        className="active-indicator"
                        style={{ left: `${indicatorLeft}px`, width: `${indicatorWidth}px` }}
                    />
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            ref={(el) => (tabRefs.current[tab] = el)}
                            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="header-actions d-flex flex-row align-items-center">
                    <div className="search-container position-relative">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Client or Group Name"
                        />
                        <span className="search-icon"><RiSearchLine /></span>
                    </div>
                    <span
                        className={`btn-refresh ml-2 ${isRefreshing ? 'refreshing' : ''}`}
                        onClick={handleRefresh}
                    >
                        <IoRefreshCircleOutline size={35} />
                    </span>
                    <button
                        className="ml-2 add-button p-2 px-4 rounded"
                        onClick={() => setShowPopup(true)}
                    >
                        Add Envelope
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="main-cont-main d-flex justify-content-center">
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Envelope Name</th>
                                <th>Type</th>
                                <th>Client Name</th>
                                <th>Group Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {envelopes.map((envelope) => (
                                <tr key={envelope.id}>
                                    <td>{envelope.envelopeName}</td>
                                    <td>{envelope.type}</td>
                                    <td>{envelope.clientName}</td>
                                    <td>{envelope.groupName}</td>
                                    <td>
                                        <IoCopyOutline className='action-icon' size={20} />
                                        <LiaEdit className="action-icon" size={20} />
                                        <LiaDownloadSolid className="action-icon ml-2" size={20} />
                                        <IoEyeOutline className="action-icon ml-2" size={20} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Popup for Adding Envelopes */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <div className="popup-header">
                            <h3>Add Envelope</h3>
                            <RiCloseCircleFill size={25} className="close-icon" onClick={() => setShowPopup(false)} />
                        </div>
                        <div className="popup-body">
                            <div className='row  d-flex align-items-center'>
                                <label className='labe-cont'>Page Type</label>
                                <div className="radio-group in-cont">
                                <label className='col-md-4'>
                                    <input type="radio" name="pageType" value="Simple Page" checked={newEnvelope.type === 'Simple Page'} onChange={(e) => setNewEnvelope({ ...newEnvelope, type: e.target.value })} />
                                    Simple Page
                                </label>
                                <label className='col-md-4'>
                                    <input type="radio" name="pageType" value="Master Page" checked={newEnvelope.type === 'Master Page'} onChange={(e) => setNewEnvelope({ ...newEnvelope, type: e.target.value })} />
                                    Master Page
                                </label>
                                <label className='col-md-4'>
                                    <input type="radio" name="pageType" value="Child Page" checked={newEnvelope.type === 'Child Page'} onChange={(e) => setNewEnvelope({ ...newEnvelope, type: e.target.value })} />
                                    Child Page
                                </label>
                                </div>
                            </div>
                            <div className='row  d-flex align-items-center'>
                                <label className='labe-cont'>Envelope Name</label>
                                <div className='in-cont'><input type="text" value={newEnvelope.envelopeName} onChange={(e) => setNewEnvelope({ ...newEnvelope, envelopeName: e.target.value })} className="form-control " /></div>
                            </div>

                            <div className='row  d-flex align-items-center'>
                            <label className='labe-cont'>Client Name</label>
                            <div className='in-cont'> 
                            <select value={newEnvelope.clientName} onChange={(e) => setNewEnvelope({ ...newEnvelope, clientName: e.target.value })} className="form-control" >
                                <option value="">Select Client</option>
                                {/* Add more options here as needed */}
                            </select>
                            </div>
                            </div>

                            <div className='row d-flex align-items-center'>
                            <label className='labe-cont'>Envelope Group Name</label>
                            <div className='in-cont'> 
                            <select value={newEnvelope.groupName} onChange={(e) => setNewEnvelope({ ...newEnvelope, groupName: e.target.value })} className="form-control" >
                                <option value="">Select Group</option>
                                {/* Add more options here as needed */}
                            </select>
                            </div>
                            </div>
                            <div className='d-flex justify-content-end'>
                            <button className="submit-btn" onClick={handleAddEnvelope}>Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}