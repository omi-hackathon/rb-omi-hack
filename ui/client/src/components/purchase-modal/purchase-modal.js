import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import 'components/purchase-modal/purchase-modal.scss';

class PurchaseModal extends React.Component {
    componentWillMount() {
        Modal.setAppElement('#root');
    }

    action(name) {
        this.props.closeModal(name);
    }

    render() {
        const { title, content, actions } = this.props;
        return (
            <Modal
                portalClassName="select-license-modal"
                isOpen={this.props.isOpen}
                closeTimeoutMS={300}
                parentSelector={() => document.querySelector('#root')}
                className={{
                    base: 'modal',
                    afterOpen: 'modal__after-open',
                    beforeClose: 'modal__before-close',
                }}
                overlayClassName={{
                    base: 'modal-overlay',
                    afterOpen: 'modal-overlay__after-open',
                    beforeClose: 'modal-overlay__before-close',
                }}
                onRequestClose={this.props.closeModal}>
                <div className="modal__title">
                    <h4>{title}</h4>
                    <div className="close" onClick={() => this.action('cancel')}>
                        ×
                    </div>
                </div>
                <div className="modal__content">{content}</div>
                <div className="modal__actions">
                    {actions.length > 0 &&
                        actions.map((action, i) => (
                            <button
                                key={`action-${i}`}
                                onClick={() => this.action(action.name)}
                                type="button"
                                className={`button ${action.buttonClass}`}>
                                {action.name}
                            </button>
                        ))}
                </div>
            </Modal>
        );
    }
}

PurchaseModal.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    content: PropTypes.node,
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            buttonClass: PropTypes.string,
        }),
    ),
    title: PropTypes.string,
};

export default PurchaseModal;
