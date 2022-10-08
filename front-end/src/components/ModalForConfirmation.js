import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ModalForConfirmation (
    {modalIsOpen,closeModal,action,questionAnswers}) {
        
    return (
    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ModalCustomStyles}
    >
        {
            <h1
                style={Modalh1Style}>
                {questionAnswers[0]}
            </h1>}
        <div>
            <button
                style={ModalNButtonStyle}
                onClick={closeModal}>
                {questionAnswers[1]}
            </button>
            <button
                style={ModalYButtonStyle}
                onClick={action}>
                {questionAnswers[2]}
            </button>
        </div>
    </Modal>)
}

const ModalCustomStyles = {
    content: {
        top: '50%',
        left: '50%',
        width:'100%',
        maxWidth:'320px',
        height:'180px',
        boxShadow:'0 1px 4px rgba(0,0,0,1)',
        border:'none',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '20px 10px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
};
const Modalh1Style = {
    color: '#021a67',
    fontSize: '18px',
    textAlign: 'center',
    lineHeight: '24px',
    marginBottom: '20px'
}
const ModalNButtonStyle = {
    border:'2px solid #021a67',
    width:'110px',
    borderRadius: '10px',
    backgroundColor: '#FFFFFF',
    height: '34px',
    color: '#021a67',
    fontWeight: '700',
    fontSize: '16px',
    margin: '5px'
}
const ModalYButtonStyle = {
    border: 'none',
    width:'110px',
    borderRadius: '10px',
    backgroundColor: '#021a67',
    height: '34px',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: '16px',
    margin: '5px'

}