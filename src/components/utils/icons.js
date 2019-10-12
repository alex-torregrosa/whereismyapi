import L from "leaflet";
import ArrivalImage from "../../images/arrival.svg";
import DepartureImage from "../../images/departure.svg";
import PlaneImage from "../../images/plane.svg";

export const IconArrival = new L.Icon({
  iconUrl: ArrivalImage,
  iconRetinaUrl: ArrivalImage,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(32, 32)
});

export const IconDeparture = new L.Icon({
  iconUrl: DepartureImage,
  iconRetinaUrl: DepartureImage,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(32, 32)
});

export const IconPlane = new L.Icon({
  iconUrl: PlaneImage,
  iconRetinaUrl: PlaneImage,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(32, 32)
});
