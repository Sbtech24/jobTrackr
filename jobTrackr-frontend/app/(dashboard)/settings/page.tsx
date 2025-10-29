import { Switch } from "@/components/ui/switch";

export default function Settings() {
  return (
    <div>
      <h1 className="text-gray-700 text-xl font-semibold sm:text-3xl ">
        Settings
      </h1>

      <section>
        {/* Profile */}
        <div>
          <h2 className="font-semibold text-md">Profile</h2>

          <div>
            <div className="flex flex-col">
              <label htmlFor="" className="flex">
                Name
              </label>
              <input
                type="text"
                defaultValue="Semilore"
                disabled
                className="cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="flex">
                Email
              </label>
              <input
                type="text"
                defaultValue="Semilore@gmail.com"
                id="email"
                disabled
                className="cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div>
          <div>
            <h2>Password</h2>

            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm New Password" />
          </div>

          <div>
            <h2>Theme</h2>

            {/* Toogle component */}
            <div className="flex items-center space-x-2">
              <Switch id="dark-mode" />
              <label htmlFor="dark-mode">Dark Mode</label>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
