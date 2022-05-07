import React from 'react';
import PropTypes from 'prop-types';

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000,
};

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000,
};

const SurveyModal = ({ children, onClose }) => {
    return (
        <>
            <div style={OVERLAY_STYLES} />
            <div style={MODAL_STYLES}>
                <button
                    className="btn btn-outline-info btn-sm mdi mdi-cancel ms-1 me-1"
                    style={{ width: 50 }}
                    onClick={onClose}></button>
                {children}
            </div>
        </>
    );
};

SurveyModal.propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default SurveyModal;
