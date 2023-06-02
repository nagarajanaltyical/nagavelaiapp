export const Inital_State1 = {
  states: "$",
  district: "$",
  job_title: "$",
  duration: "$",
  salary: "$",
  page: 0,
  filter_click: false,
};

export const ShortTimeFilter = (state, action) => {
  switch (action.type) {
    case "SET_STATE": {
      return {
        ...state,
        states: action.payload,
      };
    }
    case "HASH_VALUES": {
      return {
        states: "$",
        district: "$",
        job_title: "$",
        duration: "$",
        salary: "$",
      };
    }
    case "SET_DISTRICT": {
      return {
        ...state,
        district: action.payload,
      };
    }
    case "Page_Increase": {
      return {
        ...state,
        page: action.payload,
      };
    }
    case "Is_filter_clicked": {
      return {
        ...state,
        filter_click: true,
      };
    }
    case "Revert_CLick": {
      return {
        ...state,
        filter_click: false,
      };
    }
    case "SET_JOBTITLE": {
      return {
        ...state,
        job_title: action.payload,
      };
    }

    case "SET_Duration": {
      return {
        ...state,
        duration: action.payload,
      };
    }

    case "SET_SALARY": {
      return {
        ...state,
        salary: action.payload,
      };
    }
    // case "RESET1": {
    //   return {
    //     states: "$",
    //     district: "$",
    //     job_title: "$",
    //     duration: "$",
    //     salary: "$",
    //   };
    // }
    case "GET Data": {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
};
