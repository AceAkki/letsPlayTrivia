export default function ModalSec({ blocker }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>
          Are you sure you want to leave? <br/>
          Your trivia progress will be lost!
        </p>
        <div className="btn-wrap">
          <button className="btn btn-warning" onClick={() => blocker.proceed()}>Yes, Leave</button>
          <button className="btn" onClick={() => blocker.reset()}>Stay & Finish</button>
        </div>
      </div>
    </div>
  );
}
