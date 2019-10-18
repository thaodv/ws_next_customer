import { listingDetailsReducer, ListingDetailsReducerState, ListingDetailsReducerAction } from './LTR/UpdateListing/listingdetails';
import reuderBooking, { BookingAction, BookingState } from '@/store/Redux/Reducers/Booking/booking';
import {
  amenitiesReducer,
  AmenitiesReducerAction,
  AmenitiesReducerState
} from '@/store/Redux/Reducers/LTR/CreateListing/Step2/amenities';
import {
  PriceTermActions,
  PriceTermReducer,
  PriceTermState
} from '@/store/Redux/Reducers/LTR/CreateListing/Step3/priceTerm';
import {
  StepPricesActions,
  stepPricesReducer,
  StepPricesState
} from '@/store/Redux/Reducers/LTR/CreateListing/Step3/stepPrice';
import {
  CompareRoomsActions,
  CompareRoomsState,
  ComparisonListReducer
} from '@/store/Redux/Reducers/Room/CompareRooms';
import reducerSearch, {
  SearchFilterAction,
  SearchFilterState
} from '@/store/Redux/Reducers/Search/searchFilter';
import { NextPageContext } from 'next';
import { Router } from 'next/router';
import { combineReducers, Reducer, Store } from 'redux';
import { BookActions, bookReducer, BookState } from './Book/book';
import { RoomHomepageAction, roomHomepageReducer, RoomHomepageState } from './Home/roomHomepage';
import {
  CreateListingActions,
  createListingReducer,
  CreateListingState
} from '@/store/Redux/Reducers/LTR/CreateListing/Basic/CreateListing';
import {
  descriptionReducer,
  DescriptionReducerAction,
  DescriptionReducerState
} from './LTR/CreateListing/Step2/description';
import {
  detailsReducer,
  DetailsReducerAction,
  DetailsReducerState
} from './LTR/CreateListing/Step2/details';
import {
  imageReducer,
  ImageReducerAction,
  ImageReducerState
} from './LTR/CreateListing/Step2/images';
import {
  notificationReducer,
  NotificationReducerAction,
  NotificationReducerState
} from './Notification/notification';
import { iProfileReducer, ProfileAction, ProfileState } from './Profile/profile';
import { UserProfileActions, userProfileReducer, UserProfileState } from './Profile/userProfile';
import { PomotionActions, PomotionState, promotionReducer } from './promotion';
import { roomReducer, RoomReducerAction, RoomReducerState } from './Room/roomReducer';
import { VisitedRoomActions, visitedRoomReducer, VisitedRoomState } from './Room/visitedRoom';
import { ProcessReducerState, ProcessReducerAction, processReducer } from './LTR/CreateListing/process';
import { RoomListReducerAction, RoomListReducerState, roomListReducer } from './LTR/RoomList/roomlist';

export type ReducersType = {
  searchFilter: Reducer<SearchFilterState, SearchFilterAction>;
  booking: Reducer<BookingState, BookingAction>;
  roomHomepage: Reducer<RoomHomepageState, RoomHomepageAction>;
  roomPage: Reducer<RoomReducerState, RoomReducerAction>;
  book: Reducer<BookState, BookActions>;
  userProfile: Reducer<UserProfileState, UserProfileActions>;
  iProfile: Reducer<ProfileState, ProfileAction>;
  visitedRoom: Reducer<VisitedRoomState, VisitedRoomActions>;
  compareRooms: Reducer<CompareRoomsState, CompareRoomsActions>;
  promotion: Reducer<PomotionState, PomotionActions>;
  notifications: Reducer<NotificationReducerState, NotificationReducerAction>;
  description: Reducer<DescriptionReducerState, DescriptionReducerAction>;
  amenities: Reducer<AmenitiesReducerState, AmenitiesReducerAction>;
  images: Reducer<ImageReducerState, ImageReducerAction>;
  details: Reducer<DetailsReducerState, DetailsReducerAction>;
  createListing: Reducer<CreateListingState, CreateListingActions>;
  priceTerm: Reducer<PriceTermState, PriceTermActions>;
  stepPrice: Reducer<StepPricesState, StepPricesActions>;
  process: Reducer<ProcessReducerState, ProcessReducerAction>;
  roomlist: Reducer<RoomListReducerState, RoomListReducerAction>;
  listingdetails: Reducer<ListingDetailsReducerState, ListingDetailsReducerAction>;
};

export type ReducersList = {
  searchFilter: SearchFilterState;
  booking: BookingState;
  roomHomepage: RoomHomepageState;
  roomPage: RoomReducerState;
  book: BookState;
  userProfile: UserProfileState;
  iProfile: ProfileState;
  visitedRoom: VisitedRoomState;
  compareRooms: CompareRoomsState;
  promotion: PomotionState;
  notifications: NotificationReducerState;
  description: DescriptionReducerState;
  amenities: AmenitiesReducerState;
  images: ImageReducerState;
  details: DetailsReducerState;
  createListing: CreateListingState;
  priceTerm: PriceTermState;
  stepPrice: StepPricesState;
  process: ProcessReducerState;
  roomlist: RoomListReducerState;
  listingdetails: ListingDetailsReducerState;
};

export type ReducresActions =
  | SearchFilterAction
  | RoomHomepageAction
  | BookingAction
  | RoomReducerAction
  | BookActions
  | UserProfileActions
  | ProfileAction
  | VisitedRoomActions
  | NotificationReducerAction
  | CompareRoomsActions
  | PomotionActions
  | DescriptionReducerAction
  | AmenitiesReducerAction
  | ImageReducerAction
  | DetailsReducerAction
  | CreateListingActions
  | PriceTermActions
  | StepPricesActions
  | ProcessReducerAction
  | RoomListReducerAction
  | ListingDetailsReducerAction;

const reducers: ReducersType = {
  searchFilter: reducerSearch,
  booking: reuderBooking,
  roomHomepage: roomHomepageReducer,
  roomPage: roomReducer,
  book: bookReducer,
  userProfile: userProfileReducer,
  iProfile: iProfileReducer,
  visitedRoom: visitedRoomReducer,
  promotion: promotionReducer,
  notifications: notificationReducer,
  compareRooms: ComparisonListReducer,
  description: descriptionReducer,
  amenities: amenitiesReducer,
  images: imageReducer,
  details: detailsReducer,
  createListing: createListingReducer,
  priceTerm: PriceTermReducer,
  stepPrice: stepPricesReducer,
  process: processReducer,
  roomlist: roomListReducer,
  listingdetails: listingDetailsReducer
};

export interface NextContextPage extends NextPageContext {
  store: Store<ReducersList, ReducresActions>;
  isServer: boolean;
  router: Router;
}

const rootReducer = combineReducers(reducers);

export default rootReducer;
