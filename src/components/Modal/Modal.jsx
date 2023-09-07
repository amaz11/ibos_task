import { RxCross2 } from "react-icons/rx";

// eslint-disable-next-line react/prop-types
const Modal = ({ modalToggle, setModalToggle, title ,children  }) => {



  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded p-4 z-10 w-1/4 overflow-hidden">
      <div className="flex justify-between mb-3">
        <h3 className="font-semibold text-lg">{title}</h3>
        <RxCross2
          onClick={() => setModalToggle(!modalToggle)}
          className="cursor-pointer"
        />
        
      </div>
      {
          children
        }
    </div>
  );
};

export default Modal;
