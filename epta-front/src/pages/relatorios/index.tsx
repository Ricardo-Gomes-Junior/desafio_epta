import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import Layout from "../../components/Layout";

export function Relatorios() {
  return (
    <Layout>
      <div className="flex max-h-screen flex-col overflow-hidden">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 space-y-6 p-6">
            <div className="flex h-screen items-center justify-center bg-gray-100">
              <div className="rounded-xl bg-white p-8 shadow-lg">
                <h1 className="text-2xl font-semibold text-gray-800">
                  Página em desenvolvimento...
                </h1>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
}

export default Relatorios;
