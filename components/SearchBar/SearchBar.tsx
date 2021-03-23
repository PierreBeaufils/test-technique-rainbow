import { FC, useState } from "react";
import DirectionsIcon from "@material-ui/icons/Directions";
import AddIcon from "@material-ui/icons/Add";
import { TextField, IconButton } from "@material-ui/core";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useStateContext, useDispatchContext } from '../Context'
import useOnclickOutside from "react-cool-onclickoutside";
import _uniqueId from "lodash/uniqueId";
import newId from "../../utils/newid";

interface Props {
  className?: string;
  children?: any;
  fetchDirections: Function;
}

const center = { lat: 48.85641, lng: 2.3488 };
const defaultBounds = {
  north: center.lat + 0.15,
  south: center.lat - 0.15,
  east: center.lng + 0.15,
  west: center.lng - 0.15,
};

const SearchBar: FC<Props> = ({
  fetchDirections,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      bounds: defaultBounds,
    },
    debounce: 300,
  });

  const { addressList } = useStateContext();
  const { startAddress } = useStateContext();
  const dispatch = useDispatchContext();

  const handleAddAddress = (address) =>
    dispatch({
      type: 'ADD_ADDRESS',
      payload: address
    })

  const setStartAddress = (address) =>
    dispatch({
      type: 'SET_START_ADDRESS',
      payload: address
    })

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();
  };

  const getDirections = () => {
    value === ""
      ? alert("adresse non renseignée")
      : (setStartAddress(value), fetchDirections());
  };

  const setEndAddresses = () => {
    let item = addressList.find(address => address === value);

    item ? alert("adresse déjà ajoutée") : null; // Handle duplicated items
    value === "" ? alert("adresse non renseignée") : null; // handle empty imput

    // Handle add to address List
    if (!item && value !== "") {
      handleAddAddress(value);
    }
  };

  return (
    <>
      <div className="w-full px-2 py-4 flex flex-row items-center ">
        <TextField
          variant="outlined"
          id="start-adress"
          autoComplete="off"
          onChange={handleInput}
          value={value}
          disabled={!ready}
          placeholder="Adresse de départ"
          className="w-11/12"
        />
        <IconButton
          color="primary"
          className="p-4 "
          aria-label="addtolist"
          onClick={setEndAddresses}
        >
          <AddIcon />
        </IconButton>
        <IconButton
          color="primary"
          className="p-4 "
          aria-label="directions"
          onClick={getDirections}
        >
          <DirectionsIcon />
        </IconButton>
      </div>

      {status === "OK" && (
        <ul className=" w-5/6 px-2 absolute">
          {data.map((suggestion) => {
            const {
              place_id,
              structured_formatting: { main_text, secondary_text },
            } = suggestion;
            return (
              <li
                className="hover:bg-gray-500 cursor-pointer bg-gray-300"
                key={place_id}
                onClick={handleSelect(suggestion)}
                ref={ref}
              >
                <strong>{main_text}</strong> <small>{secondary_text}</small>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default SearchBar;
