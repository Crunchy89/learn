import React from "react";
import DashboardHead from "../../component/DashboardHead";
import DashboardCard from "../../component/DashboardCard";

const Dashboard = () => {
  return (
    <div>
      <DashboardHead title="Dashboard" />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <DashboardCard
              title="New Order"
              total="250"
              color="bg-info"
              icon="ion ion-bag"
            />
            <DashboardCard
              title="Bounce Rate"
              total="53%"
              color="bg-success"
              icon="ion ion-stats-bars"
            />
            <DashboardCard
              title="User Registrations"
              total="44"
              color="bg-warning"
              icon="ion ion-person-add"
            />
            <DashboardCard
              title="Unique Visitors"
              total="65"
              color="bg-danger"
              icon="ion ion-pie-graph"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
