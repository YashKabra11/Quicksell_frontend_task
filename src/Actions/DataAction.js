import axios from 'axios';

export const fetchAllData = () => async (dispatch) => {
  try {
    dispatch({ type: 'DATA_REQUEST' });
    const { data } = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment/");
    dispatch({ type: 'DATA_SUCCESS', payload: data });
  } catch (error) {
    dispatch({ type: 'DATA_FAILURE' });
  }
};

export const selectData = (group, allTickets, orderValue) => async (dispatch) => {
  try {
    dispatch({ type: 'SELECT_DATA_REQUEST' });

    let selectedData = [];
    let user = false;

    if (group === 'status') {
      const statusSet = new Set(allTickets.map(elem => elem.status));
      const arr = [...statusSet];

      arr.forEach((elem, index) => {
        const value = allTickets.filter(fElem => elem === fElem.status);
        selectedData.push({ [index]: { title: elem, value } });
      });
    } else if (group === 'user') {
      user = true;
      allTickets?.allUser?.forEach((elem, index) => {
        const value = allTickets?.allTickets?.filter(Felem => elem.id === Felem.userId);
        selectedData.push({ [index]: { title: elem.name, value } });
      });
    } else {
      const priorityList = ["No priority", "Low", "Medium", "High", "Urgent"];

      priorityList.forEach((elem, index) => {
        const value = allTickets.filter(fElem => index === fElem.priority);
        selectedData.push({ [index]: { title: elem, value } });
      });
    }

    if (orderValue === "title" || orderValue === "priority") {
      selectedData.forEach(elem => {
        elem[Object.keys(elem)[0]].value.sort((a, b) => {
          if (orderValue === "title") return a.title.localeCompare(b.title);
          if (orderValue === "priority") return b.priority - a.priority;
        });
      });
    }

    dispatch({ type: 'SELECT_DATA_SUCCESS', payload: { selectedData, user } });

  } catch (error) {
    dispatch({ type: 'SELECT_DATA_FAILURE', payload: error.message });
  }
};
