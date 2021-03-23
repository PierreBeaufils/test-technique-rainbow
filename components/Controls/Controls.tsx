import { SearchBar } from "@components/SearchBar";
import { IconButton } from "@material-ui/core";
import DirectionsIcon from "@material-ui/icons/Directions";
import { FC, useRef, useEffect, useState } from "react";
import { DirectionsService } from "google-map-react";
import { AddressList } from "../AddressList";
import { useStateContext, useDispatchContext } from '../Context'
import { CodeSharp, MapSharp } from "@material-ui/icons";

interface Props {
  className?: string;
  children?: any;
  setDirections: Function;
}

const Controls: FC<Props> = ({ setDirections }) => {
  //const [startAddress, setStartAddress] = useState(null);
  const { addressList } = useStateContext();
  const { startAddress } = useStateContext();

  const fetchDirections = () => {
    let items = [];
    addressList.map((address) => {
      const directionsService = new google.maps.DirectionsService();

      const origin = address.address;
      const destination = startAddress;

      directionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.TRANSIT,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            items.push(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    });
    setDirections(items);
  };

  return (
    <div
      id="controls"
      className="w-1/6 p-4 absolute left-0 top-0 bottom-0 z-10 bg-white min-w-90 lg:min-w-25 "
    >
      <SearchBar
        fetchDirections={fetchDirections}
      />
      <AddressList />
    </div>
  );
};

export default Controls;
