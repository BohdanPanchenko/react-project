import "./Preview.css";
const Preview = (props) => {
  return (
    <div
      className={!props.exitAnimation ? "preview" : "preview exit"}
      onClick={(e) => {
        if (!e.target.parentElement.classList.contains("preview-img")) {
          props.closePreview();
        }
      }}
    >
      <div className="preview-img">
        <img src={props.src} alt="preview-img" />
      </div>
      <button type="button" className="close-btn">
        <img src="images/icons/close.png" alt="close-btn" />
      </button>
    </div>
  );
};

export default Preview;
