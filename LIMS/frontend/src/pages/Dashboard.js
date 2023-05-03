import { useEffect, useState } from "react";


const Dashboard = () => {

    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
        const now = new Date();
        const formattedTime = now.toLocaleTimeString();
        setCurrentTime(formattedTime);
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return(
        <div>
            <div style={{display:"flex"}}>
                <h1>Dashboard</h1>
                
                <h1 style={{ marginLeft: "700px" }}>{currentTime}</h1>
            </div>
            <div class="row row-cols-1 row-cols-md-3 g-4 ">
  <div class="col">
    <div class="card bg-warning h-100">
      <img src="" class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Pending</h5>
        
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card bg-success h-100">
      <img src="..." class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Completed</h5>
       
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card bg-secondary h-100">
      <img src="..." class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        
      </div>
    </div>
  </div>
</div>

        </div>
        
    )
}

export default Dashboard;