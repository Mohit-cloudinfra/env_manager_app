"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./envgroups.css";
import { useState } from 'react';
import { RiSearchLine, RiCloseCircleFill } from 'react-icons/ri';
import { IoEyeOutline, IoRefreshCircleOutline } from "react-icons/io5";

export default function EnvelopeGroupsPage() {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [envelopeGroups, setEnvelopeGroups] = useState([
        { id: 1, name: 'Group 1' },
        { id: 2, name: 'Group 2' },
        { id: 3, name: 'Sample Group' },
    ]);
    const [showPopup, setShowPopup] = useState(false); // Popup visibility
    const [newEnvelope, setNewEnvelope] = useState({
        envelopeName: '',
        textColor: '#f1f1db',
        image: null,
        isWindow: false,
        width: 7,
        height: 8,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 6,
        marginBottom: 6,
        sections: [
            {
                type: 'Select',
                width: 5,
                height: 6,
                x: 1,
                y: 2,
                detail: '',
                color: '#989127',
                transparency: 50,
            },
        ],
    });

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 3000); // 3-second animation
    };

    const handleAddGroup = () => {
        if (newEnvelope.envelopeName) {
            const newGroup = {
                id: envelopeGroups.length + 1,
                name: newEnvelope.envelopeName,
                // Additional fields can be stored if needed
            };
            setEnvelopeGroups([...envelopeGroups, newGroup]);
            setNewEnvelope({
                envelopeName: '',
                textColor: '#f1f1db',
                image: null,
                isWindow: false,
                width: 7,
                height: 8,
                marginLeft: 6,
                marginRight: 6,
                marginTop: 6,
                marginBottom: 6,
                sections: [
                    {
                        type: 'Select',
                        width: 5,
                        height: 6,
                        x: 1,
                        y: 2,
                        detail: '',
                        color: '#989127',
                        transparency: 50,
                    },
                ],
            });
            setShowPopup(false);
        }
    };

    const addSection = () => {
        setNewEnvelope({
            ...newEnvelope,
            sections: [
                ...newEnvelope.sections,
                {
                    type: 'Select',
                    width: 5,
                    height: 6,
                    x: 1,
                    y: 2,
                    detail: '',
                    color: '#989127',
                    transparency: 50,
                },
            ],
        });
    };

    const removeSection = (index) => {
        if (newEnvelope.sections.length > 1) {
            const updatedSections = newEnvelope.sections.filter((_, i) => i !== index);
            setNewEnvelope({ ...newEnvelope, sections: updatedSections });
        }
    };

    const handleSectionChange = (index, field, value) => {
        const updatedSections = newEnvelope.sections.map((section, i) =>
            i === index ? { ...section, [field]: value } : section
        );
        setNewEnvelope({ ...newEnvelope, sections: updatedSections });
    };

    return (
        <div className="main-cont">
            <div className="main-cont-header">
                <span className="header-title">Envelope Groups</span>
                <div className="header-actions d-flex flex-row align-items-center">
                    <div className="search-container position-relative">
                        <input
                            type="text"
                            className="form-control search-input"
                            placeholder="Envelope Group Name"
                        />
                        <span className="search-icon"><RiSearchLine /></span>
                    </div>
                    <span
                        className={`btn-refresh ml-2 ${isRefreshing ? ' refreshing' : ''}`}
                        onClick={handleRefresh}
                    >
                        <IoRefreshCircleOutline size={35} />
                    </span>
                    <button
                        className="btn ml-2 add-button"
                        onClick={() => setShowPopup(true)}
                    >
                        Add Envelope Groups
                    </button>
                </div>
            </div>
            <div className="main-cont-main d-flex justify-content-center">
                <div className='table-wrapper'>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {envelopeGroups.map((group) => (
                                <tr key={group.id}>
                                    <td>{group.name}</td>
                                    <td>
                                        <button className="action-icon">
                                            <IoEyeOutline size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {showPopup && (
                <div className="envgroup-popup">
                    <div className="envgroup-popup-content">
                        <div className="envgroup-popup-header">
                            <RiCloseCircleFill
                                size={25}
                                className="close-icon"
                                onClick={() => setShowPopup(false)}
                            />
                            <h3>Add Envelope Group</h3>
                            <button className="submit-btn" onClick={handleAddGroup}>
                                Submit
                            </button>
                        </div>
                        <div className="envgroup-popup-body">
                            {/* Envelope Group Settings */}
                            <div className='envgroup-popup-first-container'>
                                <div className='envgroup-popup-first-container-sub1'>
                                    <div className='form-group-envelop'>
                                        <label className='form-label-inputs'>Envelope Name</label>
                                        <input type='text' placeholder='Enter Name' className='form-control form-control-envelop'/>
                                    </div>
                                    <div className='form-group-envelop'>
                                        <label className='form-label-inputs'>Envelope Color Text</label>
                                        <input type='text' placeholder='Enter Name' className='form-control form-control-envelop'/>
                                        <input type='color' className='color-picker-enevelop'/>
                                    </div>
                                    <div className='form-group-envelop'>
                                        <label className='form-label-inputs'>Envelope Color Text</label>
                                        <input type='file' placeholder='Enter Name' className='form-control'/> 
                                    </div>
                                </div>
                                <div className='envgroup-popup-first-container-sub2'>
                                    <div className='form-group-envelop'>
                                        <label className='form-label-inputs'>Envelope Width</label>
                                        <input type='number' placeholder='Width' className='form-control form-control-envelop mini-input'/> 
                                        <label className='form-label-inputs' style={{marginLeft :'18px'}}>Envelope Height</label>
                                        <input type='number' placeholder='Height' className='form-control form-control-envelop mini-input'/> 
                                    </div>
                                    <div className='form-group-envelop'>
                                        <label className='form-label-inputs'>Envelope Margin</label>
                                        <div className='margin-inputs'>
                                            <input type='text' className='form-control form-control-inputs mini-input' placeholder='Top'/>
                                            <input type='text' className='form-control form-control-inputs mini-input' placeholder='Left'/>
                                            <input type='text' className='form-control form-control-inputs mini-input' placeholder='Bottom'/>
                                            <input type='text' className='form-control form-control-inputs mini-input' placeholder='Right'/>
                                        </div>
                                    </div>
                                    <div className='form-checkbox'>
                                        <label className='checkbox-label'>Is Window</label>
                                        <input type='checkbox' className='checkbox-control'/>
                                    </div>
                                </div>
                                <div className='envelope-preview-wrapper'>
                                    <span className='envelope-preview-wrapper-title '>preview</span>
                                </div>
                            </div>

                            <div className='section-div'>
                                <span className='section-div-span'>Sections :</span>
                                <button className='button-group-section'>Add section</button>
                                </div>

                                <div className='container-drop'>
                                    <div className='section-box'>
                                        <div style={{width:"100%"}}>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <div className='form-group-envelope-1 row'>
                                                    <label className='form-label-inputs'>Section Type </label>
                                                    <select className='form-control-inputs form-select'>Select</select>
                                                </div>
                                            </div>
                                            <div className='col-md-4'></div>
                                            <div className='col-md-4'></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>

                            {/* Section Settings */}
                            <div className="section-settings">
                                <h4>Sections:</h4>
                                {newEnvelope.sections.map((section, index) => (
                                    <div key={index} className="section-row">
                                        <select
                                            value={section.type}
                                            onChange={(e) =>
                                                handleSectionChange(index, 'type', e.target.value)
                                            }
                                            className="form-control"
                                        >
                                            <option value="Select">Select</option>
                                            {/* Add additional options as needed */}
                                        </select>
                                        <input
                                            type="number"
                                            value={section.width}
                                            onChange={(e) =>
                                                handleSectionChange(index, 'width', e.target.value)
                                            }
                                            placeholder="Width"
                                        />
                                        <input
                                            type="number"
                                            value={section.height}
                                            onChange={(e) =>
                                                handleSectionChange(index, 'height', e.target.value)
                                            }
                                            placeholder="Height"
                                        />
                                        <input
                                            type="number"
                                            value={section.x}
                                            onChange={(e) =>
                                                handleSectionChange(index, 'x', e.target.value)
                                            }
                                            placeholder="X"
                                        />
                                        <input
                                            type="number"
                                            value={section.y}
                                            onChange={(e) =>
                                                handleSectionChange(index, 'y', e.target.value)
                                            }
                                            placeholder="Y"
                                        />
                                        <input
                                            type="text"
                                            value={section.detail}
                                            onChange={(e) =>
                                                handleSectionChange(index, 'detail', e.target.value)
                                            }
                                            placeholder="Detail"
                                        />
                                        <input
                                            type="color"
                                            value={section.color}
                                            onChange={(e) =>
                                                handleSectionChange(index, 'color', e.target.value)
                                            }
                                            className="form-control"
                                        />
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={section.transparency}
                                            onChange={(e) =>
                                                handleSectionChange(index, 'transparency', e.target.value)
                                            }
                                        />
                                        <button
                                            className="remove-section-btn"
                                            onClick={() => removeSection(index)}
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                                <button className="add-section-btn" onClick={addSection}>
                                    Add Section
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}