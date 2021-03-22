import { connect } from 'react-redux';
import { addAdress, deleteAddress } from '../../redux/actions';
import AddressList from './AddressList';

const mapStateToProps = (state) => ({
  addressList: state.addressList,
});

const mapDispatchToProps = (dispatch) => ({
  deleteAddress: (address) => {
    dispatch(deleteAddress(address));
  },
});
// Container
const AddressListContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddressList);

// == Export
export default AddressListContainer;