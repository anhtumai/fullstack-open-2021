import { connect, useDispatch } from "react-redux";

import { createChangeFilterAction } from "../reducers/filterReducer";

const Filter = ({ changeFilter }) => {
  const handleChange = (event) => {
    changeFilter(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  changeFilter: createChangeFilterAction,
};

export default connect(null,mapDispatchToProps)(Filter);
