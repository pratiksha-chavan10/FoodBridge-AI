function DashboardCard({ title, value, icon: Icon, color }) {
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer">

            <div className="flex items-center justify-between">

                <div>

                    <h3 className="text-gray-500 text-lg font-medium">
                        {title}
                    </h3>

                    <h1 className="text-4xl font-bold mt-3">
                        {value}
                    </h1>

                </div>

                <div className={`text-5xl ${color}`}>
                    <Icon />
                </div>

            </div>

        </div>
    );
}

export default DashboardCard;