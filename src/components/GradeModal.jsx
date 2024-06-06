import React, { useState } from 'react';
import '../GradeModal.css';

const GradeModal = ({ onClose, onSave }) => {
    const [grade, setGrade] = useState(1);
    const [comment, setComment] = useState('');

    const handleSubmit = () => {
        onSave(grade, comment);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Thank You for using our service</h2>
                <h4 style={{marginBottom: '10px'}}>
                    Please feel free to rate and comment on your experience with using our application
                </h4>

                <div className="form-group">
                    <label htmlFor="grade">Grade:</label>
                    <select
                        id="grade"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        className="form-control"
                    >
                        {[1, 2, 3, 4, 5].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="button-group">
                    <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                    <button onClick={onClose} className="btn btn-secondary">Close</button>
                </div>
            </div>
        </div>
    );
};

export default GradeModal;
