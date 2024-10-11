import React from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null; // If not open, do not display anything

  return (
    <div className="modal show" style={{ display: 'block', backdropFilter: 'blur(5px)' }} tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content rounded-3 shadow">
          <div className="modal-header border-bottom-0">
            <h5 className="modal-title">Thông báo</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p className="lead">{message}</p>
          </div>
          <div className="modal-footer border-top-0">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
