import { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { useMachineContext } from '../hooks/useMachineContext'; 

const MachineList = () => {
  const navigate = useNavigate();
  // const [machines,setMachines] = useState(null);
  const {machines, dispatch} = useMachineContext();

  useEffect(() => {
    const fetchMachines = async () => {
      const response = await fetch('/api/machines')
      const json = await response.json();

      if (response.ok) {
        // setMachines(json);
        dispatch({type:'SET_MACHINES' , payload:json})
        $(function () {
          $('#machine-list').DataTable({
          //order: [[4, 'desc']],
          bDestroy: true,
        });
      });
      }
    };

    fetchMachines();
    // eslint-disable-next-line
  }, []);

  const handleClick = (id) => {
    navigate(`../machineHistory/${id}`);
  };

  const handleDelete = async(id) => {
    const response = await fetch('/api/machines/' + id , {
      method: 'DELETE'
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type: 'DELETE_MACHINE' , payload:json})
    }
  }


  return (
        <div className="container">
          <div>
            <h4>Machines</h4>
          </div>

          <table id="machine-list" className="table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th >Machine ID</th>
                <th >Machine Type</th>
                <th >Brand</th>
                <th >Purchased Date</th>
                <th>Delete Machine</th>
              </tr>
            </thead>
            <tbody>
              {machines &&
                machines.map((machine) => (
                  <tr
                    key={machine._id}
                    
                  >
                    <td onClick={() => handleClick(machine._id)}>{machine._id}</td>
                    <td onClick={() => handleClick(machine._id)}>{machine.MachineType}</td>
                    <td onClick={() => handleClick(machine._id)}>{machine.Brand}</td>
                    <td onClick={() => handleClick(machine._id)}>{machine.PurchaseDate}</td>
                    <td><button onClick={() => handleDelete(machine._id)}>Delete</button></td>
                  </tr>
                ))}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
  );
};

export default MachineList;
