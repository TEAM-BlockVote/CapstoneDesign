import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';

function SignInModal(props) {
  return (
    <div
      style={{
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        background: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        zIndex: '999',
      }}
    >
      <div
        className='modal show'
        style={{ display: 'block', position: 'initial' }}
      >
        <Modal.Dialog>
          <Modal.Header style={{ borderBottom: 'rgb(222,222,222)' }}>
            <div
              style={{
                paddingRight: '3%',
                paddingTop: '2%',
                fontSize: '20px',
                margin: '0 0 0 auto',
              }}
              onClick={() => props.setModal(false)}
            >
              <CloseButton />
            </div>
          </Modal.Header>
          <div>
            <h2
              style={{
                fontWeight: '700',
                fontSize: '18px',
                textAlign: 'center',
              }}
            >
              로그인이 필요한 기능입니다.
            </h2>
          </div>
          <div>
            <p
              style={{
                fontWeight: '400',
                fontSize: '13px',
                color: 'gray',
                textAlign: 'center',
                fontFamily: 'Pretendard',
                fontStyle: 'normal',
                padding: '0rem 1rem',
                lineHeight: '18px',
              }}
            >
              로그인을 하시겠습니까?
            </p>
          </div>
          <Modal.Body>
            <form style={{ display: 'flex' }}>
              <button
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '50%',
                  color: 'rgb(148,179,249)',
                  marginBottom: '3%',
                  borderRadius: '5px',
                  backgroundColor: 'white',
                  border: '1px solid rgb(148,179,249)',
                  borderRadius: '5px',
                  marginRight: '3%',
                }}
                onClick={() => props.setModal(false)}
              >
                아니오
              </button>
              <button
                type='button'
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '50%',
                  height: '7vh',
                  marginBottom: '3%',
                  borderRadius: '5px',
                  backgroundColor: 'rgb(148,179,249)',
                  border: '1px solid rgba(222,222,222,0.2)',
                  borderRadius: '5px',
                }}
                onClick={() => {
                  props.navigate('/Login');
                }}
              >
                <div
                  style={{
                    alignItems: 'center',
                    textAlign: 'center',
                    paddingLeft: '3%',
                    color: 'white',
                  }}
                >
                  예
                </div>
              </button>
            </form>
          </Modal.Body>
        </Modal.Dialog>
      </div>
    </div>
  );
}
export default SignInModal;