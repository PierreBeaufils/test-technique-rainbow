import { useStateContext, useDispatchContext } from '../Context'
import { AddressItem } from "../AddressItem";

interface Props {
  className?: string;
  children?: any;
  addressList: Array<EndAddress>;
  deleteAddress: Function;
}

const AddressList = () => {
  const { addressList } = useStateContext();
  const dispatch = useDispatchContext();

  const handleAddAddress = (address) =>
    dispatch({
      type: 'ADD_ADDRESS',
      payload: address
    })
  const handleDeleteAddress = (address) =>
    dispatch({
      type: 'DELETE_ADDRESS',
      payload: address
    })

  return (
    addressList.map((address, index) => (
      <AddressItem key={index} address={address} deleteAddress={handleDeleteAddress} />
    ))
  )
};


export default AddressList
/*
return stateContext.map((address, index) => (
  <AddressItem key={index} address={address} deleteAddress={deleteAddress} />
));
*/