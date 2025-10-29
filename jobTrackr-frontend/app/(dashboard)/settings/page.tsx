import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="p-4 sm:p-8 space-y-8">
      <h1 className="text-gray-800 text-2xl sm:text-3xl font-semibold">
        Settings
      </h1>

      <section className="space-y-8">
        {/* Profile Section */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 space-y-6">
          <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
            Profile
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-600">Name</label>
              <input
                type="text"
                defaultValue="Semilore"
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-600 focus:outline-none"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">
                Email
              </label>
              <input
                type="text"
                id="email"
                defaultValue="Semilore@gmail.com"
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 space-y-6">
          <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
            Password
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-jobtrackr-primary focus:ring-1 focus:ring-jobtrackr-primary"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-jobtrackr-primary focus:ring-1 focus:ring-jobtrackr-primary"
            />
          </div>

          <Button className="bg-jobtrackr-primary hover:bg-jobtrackr-primary-dark text-white font-medium px-6 py-2 rounded-lg">
            Update Password
          </Button>
        </div>

        {/* Theme Section */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-lg text-gray-700 border-b pb-2">
            Appearance
          </h2>

          <div className="flex items-center justify-between mt-4">
            <label htmlFor="dark-mode" className="text-gray-700 font-medium">
              Dark Mode
            </label>
            <Switch id="dark-mode" />
          </div>
        </div>
      </section>
    </div>
  );
}
