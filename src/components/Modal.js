import { useGlobalContext } from '../context'
import Form from './Form'

const Modal = () => {
    const { isModalOpen, closeModal } = useGlobalContext()

        return (
            <div className={isModalOpen ? 'modal show-modal' : 'modal'}>
                <span className="close" onClick={closeModal}>X</span>
                <Form />
            </div>
        )
    
}

export default Modal


// const InlineEdit = ({ value, setValue }) => {
//     const onChange = (event) => setValue(event.target.value);
  
//     return (
//       <input
//         type="text"
//         aria-label="Field name"
//         value={value}
//         onChange={onChange}
//       />
//     )
//   }