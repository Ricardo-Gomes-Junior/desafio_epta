import { DashboardContent } from "../../components/DashboardContent";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { UserTable } from "../../components/Table";
import Layout from "../../components/Layout";


export function Dashboard() {
  return (
    <Layout>
      <div>
        <div className="flex max-h-screen flex-col overflow-hidden">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 space-y-6 p-6">
              <DashboardContent />
              <UserTable />
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
}
