import React from "react";
import "./home.css";
const ImgUpload = ({ onChange, src }) => (
  <label htmlFor="photo-upload" className="custom-file-upload fas">
    <div className="img-wrap img-upload">
      <img for="photo-upload" src={src} />
    </div>
    <input id="photo-upload" type="file" onChange={onChange} />
  </label>
);

const Profile = ({ onSubmit, src, name, status }) => (
  <div className="">
    <form onSubmit={onSubmit}>
      <label className="custom-file-upload fas">
        <div className="img-wrap">
          <img for="photo-upload" src={src} />
        </div>
      </label>
      <div className="name">{name}</div>
      <div className="status">{status}</div>
      <button type="submit" className="edit">
        Resmi Değiştir{" "}
      </button>
    </form>
  </div>
);

const Edit = ({ onSubmit, children }) => (
  <div className="">
    <form onSubmit={onSubmit}>
      {children}
      <button type="submit" className="save">
        Kaydet
      </button>
    </form>
  </div>
);

class CardProfile extends React.Component {
  state = {
    file: "",
    imagePreviewUrl:
      "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
    name: "",
    status: "",
    active: "edit",
  };

  photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let activeP = this.state.active === "edit" ? "profile" : "edit";
    this.setState({
      active: activeP,
    });
  };

  render() {
    const { imagePreviewUrl, name, status, active } = this.state;
    return (
      <div>
        {active === "edit" ? (
          <Edit onSubmit={this.handleSubmit}>
            <ImgUpload onChange={this.photoUpload} src={imagePreviewUrl} />
          </Edit>
        ) : (
          <Profile
            onSubmit={this.handleSubmit}
            src={imagePreviewUrl}
            name={name}
            status={status}
          />
        )}
      </div>
    );
  }
}

export default CardProfile;
