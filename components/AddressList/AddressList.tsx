import { useStateContext, useDispatchContext } from '../Context'
import { AddressItem } from "../AddressItem";

interface Props {
  className?: string;
  children?: any;
  addressesList: Array<EndAddress>;
  deleteAddress: Function;
}

const AddressList = () => {
  const { addressesList } = useStateContext();
  const { startAddress } = useStateContext();
  const dispatch = useDispatchContext();

  const handleDeleteAddress = (address) =>
    dispatch({
      type: 'DELETE_ADDRESS',
      payload: address
    })

  return (
    addressesList.map((address, index) => (
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