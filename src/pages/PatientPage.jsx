// import { CrossIcon } from "../icons/icons";
import NavBar from "../components/NavBar";
import { Input } from "../components";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import { Separator } from "../components/Separator";

function PatientPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <header className="bg-gray-900 text-white px-4 lg:px-6 h-12 flex items-center">
        <a href="#" className="flex items-center">
          <CrossIcon className="h-6 w-6" />
          <span className="font-bold text-lg ml-2">Clinica SePrice</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">

        </nav>
      </header> */}
      <NavBar message="Logout"></NavBar>

      <div className="flex flex-1">
        <nav className="w-64 bg-gray-100 dark:bg-gray-900 flex flex-col gap-1 p-4">
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 bg-gray-200 dark:bg-gray-800 dark:text-gray-50 transition-all">
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50">
            Appointments
          </a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50">
            Profile
          </a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50">
            Medical Records
          </a>
          <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 dark:text-gray-400 transition-all hover:text-gray-900 dark:hover:text-gray-50">
            Settings
          </a>
        </nav>

        <div className="flex-1 p-4 md:p-6">
          <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800 px-4 md:px-6">
            <div className="flex items-center gap-4">
              <button size="icon" className="lg:hidden">
                <span className="sr-only">Toggle navigation</span>
              </button>
              <h1 className="text-white font-semibold md:text-xl">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <form>
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="Search"
                    className="w-full rounded-md bg-white px-8 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 dark:bg-gray-950 dark:text-gray-50 dark:focus:ring-gray-300"
                  />
                </div>
              </form>
            </div>
          </header>

          <main className="grid gap-8 p-4 md:p-6">
            <div className="grid gap-8 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          June 15, 2023 at 2:30 PM
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Dr. Jane Doe</div>
                        <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-900/20 dark:text-green-400">
                          Confirmed
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          June 1, 2023 at 10:00 AM
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Dr. John Smith</div>
                        <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                          Completed
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          May 15, 2023 at 3:45 PM
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>Dr. Sarah Lee</div>
                        <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                          Completed
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div>Name</div>
                      <div>John Doe</div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>Email</div>
                      <div>john.doe@example.com</div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>Phone</div>
                      <div>+1 (555) 555-5555</div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>Date of Birth</div>
                      <div>January 1, 1990</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
            <CardHeader>
              <CardTitle>Medical Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">Blood Test</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">June 1, 2023</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div>Hemoglobin</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">14.2 g/dL</div>
                    </div>
                    <div>
                      <div>Cholesterol</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">180 mg/dL</div>
                    </div>
                    <div>
                      <div>Glucose</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">95 mg/dL</div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">X-Ray</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">May 15, 2023</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div>Chest X-Ray</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <a href="#" className="underline">
                          View Report
                        </a>
                      </div>
                    </div>
                    <div>
                      <div>Bone Density</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <a href="#" className="underline">
                          View Report
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </main>
        </div>
      </div>
    </div>
  );
}

export default PatientPage;
