// import React, { useState, useEffect } from "react";
// import { getData, setProfileImage } from "../../helpers/db.helpers";
// import "./home.css";
// import { useCookies } from "react-cookie";
// import { parseJwt } from "../../helpers/jwt.helpers";

// const ImgUpload = ({ onChange, src }) => (
//   <label htmlFor="photo-upload" className="custom-file-upload fas">
//     <div className="img-wrap img-upload">
//       <img for="photo-upload" src={src} />
//     </div>
//     <input id="photo-upload" type="file" onChange={onChange} />
//   </label>
// );

// const Profiles = ({ onSubmit, src }) => (
//   <div className="">
//     <form onSubmit={onSubmit}>
//       <label className="custom-file-upload fas">
//         <div className="img-wrap">
//           <img for="photo-upload" src={src} />
//         </div>
//       </label>
//       <button type="submit" className="edit">
//         Resmi Değiştir{" "}
//       </button>
//     </form>
//   </div>
// );

// const Edit = ({ onSubmit, children, sendImage }) => (
//   <div className="">
//     <form onSubmit={onSubmit}>
//       {children}
//       <button type="submit" className="save" onClick={sendImage}>
//         Kaydet
//       </button>
//     </form>
//   </div>
// );
// /// Kaydetme işleminde resmin base kodu database e gönderilecek. Öncelikle bu componenti func componente dönüştür.

// export default function Profile(props) {
//   const { data } = props;
//   const [datas, setDatas] = useState({});
//   console.log(datas);
//   const [cookies, setCookie] = useCookies();
//   const token = cookies.jwt;
//   const [state, setState] = useState({
//     file: "",
//     imagePreviewUrl:
//       "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
//   });

//   const photoUpload = (e) => {
//     e.preventDefault();
//     const reader = new FileReader();
//     const file = e.target.files[0];
//     reader.onloadend = () => {
//       setState({
//         file: file,
//         imagePreviewUrl: reader.result,
//       });
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!datas.profileImage) {
//       setProfileImage(
//         datas,
//         "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
//         "edit"
//       );
//     } else {
//       setProfileImage(
//         datas,
//         "https://static.vecteezy.com/system/resources/previews/005/544/718/original/profile-icon-design-free-vector.jpg",
//         "profile"
//       );
//     }
//   };
//   const sendImage = () => {
//     setProfileImage(datas, state.imagePreviewUrl, "profile");
//   };

//   useEffect(() => {
//     if (token) {
//       getData(parseJwt(token).id, setDatas);
//     }
//   }, []);
//   return (
//     <div>
//       {datas.isActive === "edit" ? (
//         <div className="">
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="photo-upload" className="custom-file-upload fas">
//               <div className="img-wrap img-upload">
//                 <img for="photo-upload" src={datas.profileImage} />
//               </div>
//               <input id="photo-upload" type="file" onChange={photoUpload} />
//             </label>{" "}
//             <button type="submit" className="save" onClick={sendImage}>
//               Kaydet
//             </button>
//           </form>
//         </div>
//       ) : (
//         // <Edit onSubmit={handleSubmit} sendImage={sendImage}>
//         //   <ImgUpload onChange={photoUpload} src={state.imagePreviewUrl} />
//         // </Edit>
//         <div className="">
//           <form onSubmit={handleSubmit}>
//             <label className="custom-file-upload fas">
//               <div className="img-wrap">
//                 <img for="photo-upload" src={datas.profileImage} />
//               </div>
//             </label>
//             <button type="submit" className="edit">
//               Resmi Değiştir{" "}
//             </button>
//           </form>
//         </div>
//         // <Profiles
//         //   onSubmit={handleSubmit}
//         //   src={datas.profileImage}
//         //   sendImage={sendImage}
//         // />
//       )}
//     </div>
//   );
// }
